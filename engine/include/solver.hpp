#pragma once
#include "components.hpp"
#include <memory>
#include <string>
#include <vector>

class CircuitSolver {
private:
  std::vector<std::unique_ptr<Component>> components;

public:
  CircuitSolver();
  void addComponent(std::unique_ptr<Component> comp);
  std::string simulate(const std::string &jsonData);
};
