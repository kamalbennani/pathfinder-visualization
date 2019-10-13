import { isEmpty, minBy, reject, some, chain } from "lodash";

import { INode } from "../models/node";
import { IGrid } from "../models/grid";

export const greedyBestFirst = (
  grid: IGrid,
  startNode: INode,
  finishNode: INode
) => {
  let unvisitedNeighbours = [startNode];
  let visitedNodes: INode[] = [];

  while (!isEmpty(unvisitedNeighbours)) {
    const currentNode = minBy(unvisitedNeighbours, "f") as INode;

    if (currentNode.id === finishNode.id) {
      return visitedNodes;
    }

    unvisitedNeighbours = reject(unvisitedNeighbours, { id: currentNode.id });
    currentNode.setIsVisited();
    visitedNodes.push(currentNode);

    const neighbours = grid.getNodeNeighbours(currentNode);

    chain(neighbours)
      .orderBy([node => node.heuristic(finishNode)], ["asc"])
      // eslint-disable-next-line
      .forEach(neighbour => {
        if (some(visitedNodes, { id: neighbour.id })) {
          return;
        }

        neighbour.incrementDistance(currentNode, finishNode);

        if (!some(unvisitedNeighbours, { id: neighbour.id })) {
          unvisitedNeighbours.push(neighbour);
        }
      })
      .value();
  }

  return visitedNodes;
};
