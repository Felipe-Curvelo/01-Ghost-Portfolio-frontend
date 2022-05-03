import React from "react";

import { 
  PieChart, 
  Pie, 
  Cell,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from "recharts";

import { 
  Flex, 
  useColorModeValue, 
  Center, 
  VStack,
  Text
} from "@chakra-ui/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  

  return (
    
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize='25'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Visualization({ rollups }) {
  const bgOverallColor = useColorModeValue("linear(to-r, gray.100, gray.100, white)", "linear(to-r, gray.800, gray.800, gray.700, gray.600)" );

  return (
    <Flex 
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgGradient={bgOverallColor}
    >
      <Flex 
        mb='10'
        p='6'
        direction={['column', 'column', 'column', 'column', 'row']}
        gap={10}
        boxShadow="xl"
        bgGradient={bgOverallColor}
      >
        <VStack>
          <Text fontSize='20'>Investimento Inicial</Text>
          <Center>
            <PieChart width={400} height={480}>
              <Pie
                data={rollups}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="total_cost" 
                nameKey="name"
                isAnimationActive={false}

              >
                {rollups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{fontSize: "22px"}} />
              <Tooltip></Tooltip>
            </PieChart>
          </Center>
        </VStack>
        <VStack>
        <Text fontSize='20'>Investimento Atual</Text>
          <Center>
            <PieChart width={400} height={480}>
              <Pie
                data={rollups}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="total_equity" 
                nameKey="name"
                isAnimationActive={false}
              >
                {rollups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{fontSize: "22px"}} />
              <Tooltip></Tooltip>
            </PieChart>
          </Center>
        </VStack>
        <VStack>
          <Text fontSize='20'>Evolução do Portfolio</Text>
          <Center>
            <BarChart
              width={500}
              height={300}
              data={rollups}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}

            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend wrapperStyle={{fontSize: "22px"}} />
              <Bar yAxisId="left" dataKey="total_cost" name="Valor Inicial" fill="#82ca9d" fontSize="22px" /> 
              <Bar yAxisId="left" dataKey="total_equity" name="Valor Atual" fill="#8884d8" fontSize="22px" />
            </BarChart>
          </Center>
        </VStack>
      </Flex>  
    </Flex>
  );
}