#include "../include/solver.hpp"
#include "../include/components.hpp"
#include "../include/json.hpp"
#include <algorithm>
#include <cmath>
#include <emscripten/bind.h>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

using json = nlohmann::json;
using namespace emscripten;

CircuitSolver::CircuitSolver() {}

void CircuitSolver::addComponent(std::unique_ptr<Component> comp) {
  if (comp) {
    components.push_back(std::move(comp));
  }
}

std::vector<double> solveLinearSystem(std::vector<std::vector<double>> A,
                                      std::vector<double> z) {
  int n = A.size();

  for (int i = 0; i < n; i++) {
    int pivotRow = i;
    for (int j = i + 1; j < n; j++) {
      if (std::abs(A[j][i]) > std::abs(A[pivotRow][i])) {
        pivotRow = j;
      }
    }

    if (pivotRow != i) {
      std::swap(A[i], A[pivotRow]);
      std::swap(z[i], z[pivotRow]);
    }

    if (std::abs(A[i][i]) < 1e-9) {
      throw std::runtime_error(
          "Singular Matrix: Circuit is unsolvable. Check for floating nodes.");
    }

    for (int j = i + 1; j < n; j++) {
      double factor = A[j][i] / A[i][i];
      for (int k = i; k < n; k++) {
        A[j][k] -= factor * A[i][k];
      }
      z[j] -= factor * z[i];
    }
  }

  std::vector<double> voltages(n, 0.0);
  for (int i = n - 1; i >= 0; i--) {
    double sum = 0.0;
    for (int j = i + 1; j < n; j++) {
      sum += A[i][j] * voltages[j];
    }
    voltages[i] = (z[i] - sum) / A[i][i];
  }
  return voltages;
}

std::string CircuitSolver::simulate(const std::string &jsonData) {
  try {
    auto data = json::parse(jsonData);
    components.clear();
    int maxNode = 0;
    int numBatteries = 0;
    if (data.contains("components") && data["components"].is_array()) {
      for (const auto &item : data["components"]) {
        int nA = item.value("nodeA", 0);
        int nB = item.value("nodeB", 0);
        maxNode = std::max({maxNode, nA, nB});

        if (item.value("type", "") == "voltage_source") {
          numBatteries++;
        }
      }
    }
    int matrixSize = maxNode + numBatteries;

    if (matrixSize <= 0) {
      return R"({"status": "success", "message": "No active nodes to solve.", "voltages": {"Node_0": 0.0}})";
    }

    std::vector<std::vector<double>> A(matrixSize,
                                       std::vector<double>(matrixSize, 0.0));
    std::vector<double> z(matrixSize, 0.0);

    int currentBatteryIndex = maxNode;

    if (data.contains("components") && data["components"].is_array()) {
      for (const auto &item : data["components"]) {
        std::string type = item.value("type", "");
        int nA = item.value("nodeA", 0);
        int nB = item.value("nodeB", 0);
        double val = item.value("value", 0.0);

        if (type == "resistor") {
          if (val > 0) {
            double G = 1.0 / val;
            int i = nA - 1;
            int j = nB - 1;

            if (nA > 0)
              A[i][i] += G;
            if (nB > 0)
              A[j][j] += G;
            if (nA > 0 && nB > 0) {
              A[i][j] -= G;
              A[j][i] -= G;
            }
          }

          std::string id_str = "R" + std::to_string(components.size() + 1);
          std::string nA_str = std::to_string(nA);
          std::string nB_str = std::to_string(nB);

          auto res = std::make_unique<Resistor>(id_str, nA_str, nB_str, val);
          addComponent(std::move(res));
        } else if (type == "voltage_source") {
          int nA = item.value("nodeA", 0);
          int nB = item.value("nodeB", 0);
          double val = item.value("value", 0.0);

          int i = nA - 1;
          int j = nB - 1;
          int k = currentBatteryIndex;

          if (nA > 0) {
            A[i][k] += 1.0;
            A[k][i] += 1.0;
          }
          if (nB > 0) {
            A[j][k] -= 1.0;
            A[k][j] -= 1.0;
          }

          z[k] = val;

          currentBatteryIndex++;
        }
      }
    }

    std::vector<double> solvedVoltages;
    try {
      solvedVoltages = solveLinearSystem(A, z);
    } catch (const std::exception &e) {
      json errorResponse;
      errorResponse["status"] = "error";
      errorResponse["message"] = std::string("Matrix Error: ") + e.what();
      return errorResponse.dump();
    }

    json response;
    response["status"] = "success";
    response["message"] = "Circuit passed successfully!";
    response["matrix_size"] = matrixSize;

    json nodeVoltages;
    nodeVoltages["Node_o"] = 0.0;

    for (int i = 0; i < maxNode; ++i) {
      std::string nodeName = "Node_" + std::to_string(i + 1);
      nodeVoltages[nodeName] = solvedVoltages[i];
    }

    return response.dump();
  } catch (const json::parse_error &e) {
    return "{\"status\": \"error\", \"message\": \"JSON Parse Error: " +
           std::string(e.what()) + "\"}";
  } catch (const std::exception &e) {
    return "{\"status\": \"error\", \"message\": \"Engine Error: " +
           std::string(e.what()) + "\"}";
  }
}

EMSCRIPTEN_BINDINGS(circuit_engine) {
  class_<CircuitSolver>("CircuitSolver")
      .constructor<>()
      .function("simulate", &CircuitSolver::simulate);
}