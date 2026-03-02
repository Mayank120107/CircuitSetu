#pragma once
#include <string>

class Component {
public:
  std::string id;
  std::string type;
  std::string nodea;
  std::string nodeb;

  Component(std::string id, std::string type, std::string nA, std::string nB);
  virtual double calculateCurrent() = 0;
  virtual ~Component() = default;
};

class Resistor : public Component {
public:
  double ohms;

  Resistor(std::string id, std::string nA, std::string nB, double r);
  double calculateCurrent() override;
};

class VoltageSource : public Component {
public:
  double voltage;

  VoltageSource(std::string id, std::string nA, std::string nB, double v);
  double calculateCurrent() override;
};

class CurrentSource : public Component {
public:
  double current;

  CurrentSource(std::string id, std::string nA, std::string nB, double i);
  double calculateCurrent() override;
};

class Ground : public Component {
public:
  Ground(std::string id, std::string nA);
  double calculateCurrent() override;
};

class Ammeter : public Component {
public:
  double measuredCurrent;

  Ammeter(std::string id, std::string nA, std::string nB);
  double calculateCurrent() override;
};

class Voltmeter : public Component {
public:
  double measuredVoltage;

  Voltmeter(std::string id, std::string nA, std::string nB);
  double calculateCurrent() override;
};