import React from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react";
import { isUndefined } from "lodash";

import { INode, AnimationType } from "../models/node";
import { IGrid } from "../models/grid";
import { animatePathNodes, animateVisitedNodes } from "./animations";

interface IProps {
  node: INode;
  grid: IGrid;
}

interface INodeCellProps {
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  animate?: AnimationType;
}

const NodeCell = styled.div<INodeCellProps>`
  width: 32px;
  height: 32px;
  outline: 1px solid #A3D5FF;
  background-color: white;
  user-select: none;
  position: relative;

  ${({ isWall }) => isWall && `background-color: #071E22;`}
  ${({ isStart }) => isStart && `background-color: #736CED;`}
  ${({ isEnd }) => isEnd && `background-color: #E15554;`}
  ${({ isVisited, animate }) => {
    if (!isVisited) {
      return;
    }

    if (!isUndefined(animate)) {
      return css`
        :after {
          position: relative;
          left: 0;
          top: 0;
          display: block;
          content: " ";
          height: 100%;
          width: 100%;

          animation-name: ${getAnimationName(animate)};
          animation-duration: 1000ms;
          animation-delay: 0;
          animation-direction: alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-play-state: running;
        }
      `;
    }
  }}
`;

const getAnimationName = (animate: AnimationType) => {
  console.log(
    "animate",
    animate,
    AnimationType.VISITED_NODES,
    AnimationType.PATH
  );
  console.log(
    "animate === AnimationType.VISITED_NODES",
    animate === AnimationType.VISITED_NODES
  );
  if (animate === AnimationType.VISITED_NODES) {
    return animateVisitedNodes;
  }

  return animatePathNodes;
};

export const Node: React.FC<IProps> = observer(({ node }) => {
  console.log("node.animate", node.animate);
  console.log("node.isVisited", node.isVisited);
  return (
    <NodeCell
      onMouseDown={node.toggleWall}
      isStart={node.isStart}
      isEnd={node.isEnd}
      isWall={node.isWall}
      isVisited={node.isVisited}
      animate={node.animate}
      onMouseEnter={event => {
        if (event.buttons === 1) {
          node.toggleWall();
        }
      }}
    />
  );
});
