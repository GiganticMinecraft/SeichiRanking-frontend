import { Box } from "@mui/material";
import React from "react";

type Props = {
  readonly nth: number;
  readonly name: string;
  readonly value: number;
  readonly last: Date;
};

/// Grid Column Fragment
const Item: React.FC<Props> = ({ nth, name, value, last }) => {
  return (
    <>
      <Box>{`${nth} 位`}</Box>
      <Box>{`${name}`}</Box>
      <Box>{`${value}`}</Box>
      <Box>{`${last.toDateString()}`}</Box>
    </>
  );
};

export const Ranking: React.FC<{
  readonly data: Props[];
}> = ({ data }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)" }}>
      {data.map(({ nth, name, value, last }, index) => (
        <Item key={index} last={last} nth={nth} name={name} value={value} />
      ))}
    </Box>
  );
};

export { type Props as RankingItemProps };
