## PathFinder Visualization

I built this project to experience the popular pathfinding algorithms and visualize them in action.

See it in action: https://kamalbennani.github.io/pathfinder-visualization/

### Algorithms

This application supports the following algorithms:

#### Weighted Algorithms

**Dijkstra's Algorithm:** the father of pathfinding algorithms; guarantees the shortest path

**A Search*:** arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm

**Greedy Best-first Search:** a faster, more heuristic-heavy version of A*; does not guarantee the shortest path

#### Unweighted Algorithms

**Breath-first Search:** a great algorithm; guarantees the shortest path

**Depth-first Search:** a very bad algorithm for pathfinding; does not guarantee the shortest path

### Technologies

This project was built using the following technologies:

- [react](https://github.com/facebook/react) and [styled-components](https://github.com/styled-components/styled-components) for User Interface and Interactions
- [mobx](https://github.com/mobxjs/mobx) and [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) for State Management
- [create-react-app](https://github.com/facebook/create-react-app) for bootstrapping the application
