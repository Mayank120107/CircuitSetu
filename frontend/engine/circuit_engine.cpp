#include "circuit_engine.hpp"
#include <Eigen/Dense>
#include <iostream>
#include <nlohmann/json.hpp>
#include <string>
#include <vector>

using json = nlohmann::json;
using namespace Eigen;

MNASolver::MNASolver() {}
MNASolver::~MNASolver() {}

std::string MNASolver::simulate(const std::string &frontend_payload) {
  try {
    auto components = json::parse(frontend_payload);
    int maxNode = 0;
    int numVoltageSources = 0;

    for (const auto &comp : components) {
      int nA = comp["nodeA"];
      int nB = comp["nodeB"];
      if (nA > maxNode)
        maxNode = nA;
      if (nB > maxNode)
        maxNode = nB;

      std::string type = comp["type"];
      if (type == "voltage_source" || type == "ammeter") {
        numVoltageSources++;
      }
    }
    int N = maxNode;
    int M = numVoltageSources;
    int matrixSize = N + M;

    if (matrixSize == 0)
      return "{\"status\": \"empty\"}";
    MatrixXd A = MatrixXd::Zero(matrixSize, matrixSize);
    VectorXd z = VectorXd::Zero(matrixSize);
    int vIndex = 0;
    for (const auto &comp : components) {
      std::string type = comp["type"];
      int nA = comp["nodeA"];
      int nB = comp["nodeB"];
      double val = comp.value("value", 0.0);
      std::string id = comp["id"];

      if (type == "resistor") {
        double g = 1.0 / val;
        if (nA > 0)
          A(nA - 1, nA - 1) += g;
        if (nB > 0)
          A(nB - 1, nB - 1) += g;
        if (nA > 0 && nB > 0) {
          A(nA - 1, nB - 1) -= g;
          A(nB - 1, nA - 1) -= g;
        }
      } else if (type == "voltage_source" || type == "ammeter") {
        double v = (type == "ammeter") ? 0.0 : val;
        int row = N + vIndex;

        if (nA > 0) {
          A(nA - 1, row) += 1;
          A(row, nA - 1) += 1;
        }
        if (nB > 0) {
          A(nB - 1, row) -= 1;
          A(row, nB - 1) -= 1;
        }

        z(row) = v;
        vIndex++;
      }
    }
    VectorXd x = A.colPivHouseholderQr().solve(z);
    json results;
    results["nodes"] = json::object();
    results["currents"] = json::object();

    results["nodes"]["0"] = 0.0;
    for (int i = 0; i < N; i++) {
      results["nodes"][std::to_string(i + 1)] = x(i);
    }

    vIndex = 0;
    for (const auto &comp : components) {
      std::string type = comp["type"];
      if (type == "voltage_source" || type == "ammeter") {
        results["currents"][comp["id"]] = x(N + vIndex);
        vIndex++;
      }
    }

    results["status"] = "success";
    return results.dump();

  } catch (const std::exception &e) {
    return "{\"status\": \"error\", \"message\": \"Matrix Singularity / "
           "Unclosed Loop\"}";
  }
}

extern "C" {
EMSCRIPTEN_KEEPALIVE
const char *run_circuit_simulation(const char *json_str) {
  static MNASolver solver;
  static std::string result;
  result = solver.simulate(json_str);
  return result.c_str();
}
}