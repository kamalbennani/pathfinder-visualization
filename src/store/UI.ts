import { types, Instance } from "mobx-state-tree";

import { GridModel } from "../models/grid";
import { observable } from "mobx";

enum State {
  START,
  FINISHED
}

export enum Algo {
  DIJKSTRA,
  ASTAR,
  GREEDY,
  DEPTH,
  BREADTH
}
interface IVolatile {
  state?: State;
  algo?: Algo;
}

const UIStore = types
  .model("UIStore", {
    grid: types.maybe(GridModel)
  })
  .volatile(() =>
    observable<IVolatile>({
      state: undefined,
      algo: Algo.DIJKSTRA
    })
  )
  .actions(self => {
    const actions = {
      afterCreate() {
        actions.generateGrid();
      },
      generateGrid() {
        self.grid = GridModel.create();
      },
      markStart() {
        self.state = State.START;
      },
      markFinish() {
        self.state = State.FINISHED;
      },
      changeAlgo(algo: Algo) {
        self.algo = algo;
      },
      clearBoard() {
        if (self.grid) {
          self.grid.clean();
        }
      }
    };

    return actions;
  });

export const uiStore = UIStore.create();

export interface IUIStore extends Instance<typeof UIStore> {}
