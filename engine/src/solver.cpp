#include "../include/solver.hpp"
CircuitSolver::CircuitSolver() {}

void CircuitSolver::addComponent(std::unique_ptr<Component> comp) {
  if (comp) {
    components.push_back(std::move(comp));
  }
}

std::string CircuitSolver::simulate(const std::string &jsonData) {
  /* * future work:
   * 1. parse 'jsonData' using a JSON library.
   * 2. build MNA Matrices based on 'components'.
   * 3. solve the system (AX = Z).
   * 4. return results as a JSON string.
   */
  return "{\"status\": \"success\", \"message\": \"CircuitSetu engine is alive "
         "and received your data!\"}";
}