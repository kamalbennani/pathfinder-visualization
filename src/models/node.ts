import { observable } from "mobx";
import { types, Instance, IAnyModelType } from "mobx-state-tree";

export enum AnimationType {
  VISITED_NODES,
  PATH
}

interface IVolatile {
  animate?: AnimationType;
  isWall: boolean;
  isVisited: boolean;
  distance: number;
  f: number;
}

export const Node = types
  .model("Node", {
    id: types.identifier,
    x: types.number,
    y: types.number,
    isStart: types.boolean,
    isEnd: types.boolean,
    prevNode: types.maybe(
      types.reference(types.late((): IAnyModelType => Node))
    )
  })
  .volatile(self =>
    observable<IVolatile>({
      animate: undefined,
      isWall: false,
      isVisited: false,
      distance: self.isStart ? 0 : Infinity,
      f: 0
    })
  )
  .views(self => ({
    heuristic(finishNode: INode): number {
      return Math.abs(self.x - finishNode.x) + Math.abs(self.y - finishNode.y);
    }
  }))
  .actions(self => {
    const actions = {
      clear() {
        self.isVisited = false;
        self.animate = undefined;
        self.distance = self.isStart ? 0 : Infinity;
        self.f = 0;
      },
      toggleWall() {
        if (self.isStart || self.isEnd || self.isVisited) {
          return;
        }

        self.isWall = !self.isWall;
      },

      setIsVisited() {
        if (self.isStart || self.isEnd || self.isWall) {
          return;
        }

        self.isVisited = true;
      },

      setAnimate(animation: AnimationType) {
        self.animate = animation;
      },

      setPreviousNode(prevNode: INode) {
        self.prevNode = prevNode;
      },

      incrementDistance(prevNode: INode, finishNode?: INode) {
        if (prevNode.distance + 1 < self.distance) {
          actions.setPreviousNode(prevNode);
          self.distance = prevNode.distance + 1;

          if (finishNode) {
            self.f = self.distance + self.heuristic(finishNode);
          }
        }
      }
    };

    return actions;
  });

export interface INode extends Instance<typeof Node> {}
