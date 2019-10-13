import React from "react";
import { observer } from "mobx-react";

import { Grid } from "./components/Grid";
import { GlobalStyle } from "./style/globalStyle";
import {
  dijkstra,
  astar,
  greedyBestFirst,
  depthFirstSearch,
  breadthFirstSearch
} from "./algorithms";
import { AnimationType, INode } from "./models/node";
import { uiStore, Algo } from "./store/UI";
import { IGrid } from "./models/grid";
import { asyncForEach, sleep } from "./utils";

const App: React.FC = observer(() => {
  const grid = uiStore.grid as IGrid;

  const getAlgo = () => {
    const algo = uiStore.algo as Algo;
    switch (algo) {
      case Algo.DIJKSTRA:
        return dijkstra;
      case Algo.ASTAR:
        return astar;
      case Algo.GREEDY:
        return greedyBestFirst;
      case Algo.DEPTH:
        return depthFirstSearch;
      case Algo.BREADTH:
        return breadthFirstSearch;
      default:
        return dijkstra;
    }
  };

  const handleClick = async () => {
    const algoFunction = getAlgo();
    const visitedNodes = algoFunction(grid, grid.startNode, grid.endNode);
    const shortestPath = grid.getShortestPath(grid.endNode);

    await asyncForEach(visitedNodes, async (node: INode) => {
      await sleep(20);
      node.setAnimate(AnimationType.VISITED_NODES);
    });

    await asyncForEach(shortestPath, async (node: INode) => {
      await sleep(20);
      node.setAnimate(AnimationType.PATH);
    });
  };

  const handleChangeAlgo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    uiStore.changeAlgo(+event.target.value);
  };

  return (
    <React.Fragment>
      <button onClick={handleClick}>Start Algo</button>
      <button onClick={uiStore.generateGrid}>Generate Grid</button>
      <select onChange={handleChangeAlgo} value={uiStore.algo}>
        <option value={Algo.DIJKSTRA}>Dijsktra</option>
        <option value={Algo.ASTAR}>A*</option>
        <option value={Algo.GREEDY}>Greedy Best First</option>
        <option value={Algo.DEPTH}>Depth Best First</option>
        <option value={Algo.BREADTH}>Breadth Best First</option>
      </select>
      <button onClick={uiStore.clearBoard}>Clean Board</button>
      <Grid grid={grid} />
      <GlobalStyle />
    </React.Fragment>
  );
});

export default App;
