import React from "react";

import { Tr, Td } from "@chakra-ui/react";

export default function TransactionItem({ transaction }) {
  return (
    <Tr>
      <Td>{transaction["name"]}</Td>
      <Td isNumeric whiteSpace="nowrap">{transaction["type"].toLocaleString().replace("1", "Compra").replace("2", "Venda")}</Td>
      <Td isNumeric whiteSpace="nowrap">$ {transaction["amount"].toLocaleString()}</Td>
      {transaction["price_purchased_at"] > 1 ? <Td isNumeric whiteSpace="nowrap">$ {transaction["price_purchased_at"].toLocaleString()}</Td>
      : <Td isNumeric whiteSpace="nowrap">$ {transaction["price_purchased_at"].toFixed(9).replace(".", ",")}</Td>}

      {transaction["type"] === 2 ?
        transaction["amount"]/transaction["no_of_coins"] >1 ?
        <Td isNumeric whiteSpace="nowrap">$ {(transaction["amount"]/transaction["no_of_coins"]).toLocaleString()}</Td>
      : <Td isNumeric whiteSpace="nowrap">$ {(transaction["amount"]/transaction["no_of_coins"]).toFixed(9).replace(".", ",")}</Td>
      : <Td isNumeric whiteSpace="nowrap">$ 0</Td>}

      {transaction["no_of_coins"] >= 1 ? <Td isNumeric whiteSpace="nowrap">{transaction["no_of_coins"].toLocaleString()}</Td>
      :<Td isNumeric whiteSpace="nowrap">{transaction["no_of_coins"].toFixed(9).replace(".", ",")}</Td>}

      <Td isNumeric whiteSpace="nowrap">{transaction["time_created"]}</Td>
      {transaction["type"] === 1 ? <Td isNumeric whiteSpace="nowrap">$ 0</Td>
      : <Td isNumeric whiteSpace="nowrap">$ {(transaction["amount"]-transaction["price_purchased_at"]*transaction["no_of_coins"]).toLocaleString()}</Td>}
    </Tr>
  );
}