import { isEmpty } from "lodash";

import { INode } from "../models/node";
import { IGrid } from "../models/grid";

export const depthFirstSearch = (
  grid: IGrid,
  startNode: INode,
  finishNode: INode
) => {
  let unvisitedNeighbours = [startNode];
  let visitedNodes = [];

  while (!isEmpty(unvisitedNeighbours)) {
    const currentNode = unvisitedNeighbours.shift() as INode;
    if (currentNode.id === finishNode.id) {
      return visitedNodes;
    }

    if (currentNode.isVisited) {
      continue;
    }

    currentNode.setIsVisited();
    visitedNodes.push(currentNode);

    const neighbours = grid.getNodeNeighbours(currentNode);

    neighbours.forEach(neighbour => {
      neighbour.setPreviousNode(currentNode);
      unvisitedNeighbours.push(neighbour);
    });
  }

  return visitedNodes;
};
