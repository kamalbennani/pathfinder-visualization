import { isEmpty } from "lodash";

import { INode } from "../models/node";
import { IGrid } from "../models/grid";

export const breadthFirstSearch = (
  grid: IGrid,
  startNode: INode,
  finishNode: INode
) => {
  let unvisitedNeighbours = [startNode];
  let visitedNodes = [];
  startNode.setIsVisited();

  while (!isEmpty(unvisitedNeighbours)) {
    const currentNode = unvisitedNeighbours.pop() as INode;

    visitedNodes.push(currentNode);

    if (currentNode.id === finishNode.id) {
      return visitedNodes;
    }

    const neighbours = grid.getNodeNeighbours(currentNode);

    neighbours.forEach(neighbour => {
      neighbour.setPreviousNode(currentNode);
      neighbour.setIsVisited();
      unvisitedNeighbours.push(neighbour);
    });
  }

  return visitedNodes;
};
