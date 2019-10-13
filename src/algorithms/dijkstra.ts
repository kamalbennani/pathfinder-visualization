import { isEmpty, orderBy } from "lodash";

import { INode } from "../models/node";
import { IGrid } from "../models/grid";

export const dijkstra = (grid: IGrid, startNode: INode, finishNode: INode) => {
  let unvisitedNeighbours = grid.getUnvisitedNodes();
  let visitedNodes = [];

  while (!isEmpty(unvisitedNeighbours)) {
    unvisitedNeighbours = orderBy(unvisitedNeighbours, ["distance"], ["asc"]);
    const currentNode = unvisitedNeighbours.shift() as INode;

    if (currentNode.distance === Infinity) {
      return visitedNodes;
    }

    if (currentNode.id === finishNode.id) {
      return visitedNodes;
    }

    grid.getNodeNeighbours(currentNode).forEach(unvisitedNode => {
      unvisitedNode.incrementDistance(currentNode);
    });
    currentNode.setIsVisited();
    visitedNodes.push(currentNode);
  }

  return visitedNodes;
};
