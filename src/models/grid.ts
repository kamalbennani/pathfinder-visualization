import { types, Instance } from "mobx-state-tree";
import { range, sample, chain, find, compact } from "lodash";

import { Node, INode } from "./node";

export const NB_ROWS = 25;
export const NB_ITEM_PER_ROWS = 40;

export const GridModel = types
  .model("Grid", {
    nodes: types.array(Node)
  })
  .views(self => {
    const views = {
      get startNode() {
        return find(self.nodes, { isStart: true }) as INode;
      },
      get endNode() {
        return find(self.nodes, { isEnd: true }) as INode;
      },
      getUnvisitedNodes() {
        return chain(self.nodes)
          .reject(node => node.isVisited || node.isWall)
          .value();
      },
      getNodeNeighbours(node: INode) {
        const topIndex = node.x + (node.y - 1) * NB_ITEM_PER_ROWS;
        const rightIndex = node.x + 1 + node.y * NB_ITEM_PER_ROWS;
        const bottomIndex = node.x + (node.y + 1) * NB_ITEM_PER_ROWS;
        const leftIndex = node.x - 1 + node.y * NB_ITEM_PER_ROWS;

        // Diagonals
        // const topRightIndex = node.x + 1 + (node.y - 1) * NB_ITEM_PER_ROWS;
        // const bottomRightIndex = node.x + 1 + (node.y + 1) * NB_ITEM_PER_ROWS;
        // const bottomLeftIndex = node.x - 1 + (node.y + 1) * NB_ITEM_PER_ROWS;
        // const topLeftIndex = node.x - 1 + (node.y - 1) * NB_ITEM_PER_ROWS;

        return chain([
          topIndex > 0 && self.nodes[topIndex], // TOP
          // topRightIndex > 0 &&
          //   Math.floor(topRightIndex / NB_ITEM_PER_ROWS) === node.y - 1 &&
          //   self.nodes[topRightIndex], // TOP RIGHT
          Math.floor(rightIndex / NB_ITEM_PER_ROWS) === node.y &&
            self.nodes[rightIndex], // RIGHT

          // bottomRightIndex < NB_ROWS * NB_ITEM_PER_ROWS &&
          //   Math.floor(bottomRightIndex / NB_ITEM_PER_ROWS) === node.y + 1 &&
          //   self.nodes[bottomRightIndex], // BOTTOM RIGHT
          bottomIndex < NB_ROWS * NB_ITEM_PER_ROWS && self.nodes[bottomIndex], // BOTTOM
          // bottomLeftIndex < NB_ROWS * NB_ITEM_PER_ROWS &&
          //   Math.floor(bottomLeftIndex / NB_ITEM_PER_ROWS) === node.y + 1 &&
          //   self.nodes[bottomLeftIndex], // BOTTOM LEFT

          Math.floor(leftIndex / NB_ITEM_PER_ROWS) === node.y &&
            self.nodes[leftIndex] // LEFT
          // topLeftIndex > 0 &&
          //   Math.floor(topLeftIndex / NB_ITEM_PER_ROWS) === node.y - 1 &&
          //   self.nodes[topLeftIndex] // BOTTOM LEFT
        ])
          .compact()
          .reject(node => node.isVisited || node.isWall || node.isStart)
          .value();
      },
      getShortestPath(node: INode): INode[] {
        if (!node || !node.prevNode) {
          return [];
        }

        return compact([...views.getShortestPath(node.prevNode), node]);
      }
    };

    return views;
  })
  .actions(self => ({
    afterCreate() {
      const nodeIndices = range(NB_ITEM_PER_ROWS * NB_ROWS);
      // Randomly choose the start and end node
      const startNodeIndex = sample(nodeIndices) as number;
      const endNodeIndex = sample([
        ...nodeIndices.slice(0, startNodeIndex),
        ...nodeIndices.slice(startNodeIndex + 1)
      ]);

      nodeIndices.forEach(index => {
        const x = index % NB_ITEM_PER_ROWS;
        const y = Math.floor(index / NB_ITEM_PER_ROWS);
        self.nodes.push(
          Node.create({
            id: `${x}+${y}`,
            x,
            y,
            isStart: index === startNodeIndex,
            isEnd: index === endNodeIndex
          })
        );
      });
    },
    clean() {
      self.nodes.forEach(node => {
        node.clear();
      });
    }
  }));

export interface IGrid extends Instance<typeof GridModel> {}
