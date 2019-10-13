import React from "react";
import { chunk } from "lodash";
import styled from "styled-components";

import { NB_ITEM_PER_ROWS, IGrid } from "../models/grid";
import { INode } from "../models/node";

import { Node } from "./Node";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface IProps {
  grid: IGrid;
}

export const Grid: React.FC<IProps> = ({ grid }) => {
  const nodeChunks = chunk(grid.nodes, NB_ITEM_PER_ROWS);

  const renderRow = (row: INode[], rowIdx: number) => {
    return (
      <RowContainer key={rowIdx}>
        {row.map(node => renderNode(node))}
      </RowContainer>
    );
  };

  const renderNode = (node: INode) => {
    return <Node key={node.x + node.y} node={node} grid={grid} />;
  };

  return <GridContainer>{nodeChunks.map(renderRow)}</GridContainer>;
};
