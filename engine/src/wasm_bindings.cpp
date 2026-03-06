#include "../include/solver.hpp"
#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(circuit_solver_module) {
  class_<CircuitSolver>("CircuitSolver")
      .constructor<>()
      .function("simulate", &CircuitSolver::simulate)
      .function("addComponent", &CircuitSolver::addComponent);
}