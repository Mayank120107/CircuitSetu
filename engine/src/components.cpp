#include "../include/components.hpp"
#include <string>

Component::Component(std::string id, std::string type, std::string nA,
                     std::string nB) {
  this->id = id;
  this->type = type;
  this->nodea = nA;
  this->nodeb = nB;
}

Resistor::Resistor(std::string id, std::string nA, std::string nB, double r)
    : Component(id, "Resistor", nA, nB) {
  this->ohms = r;
}
double Resistor::calculateCurrent() { return 0.0; }

VoltageSource::VoltageSource(std::string id, std::string nA, std::string nB,
                             double v)
    : Component(id, "VoltageSource", nA, nB) {
  this->voltage = v;
}
double VoltageSource::calculateCurrent() { return 0.0; }

CurrentSource::CurrentSource(std::string id, std::string nA, std::string nB,
                             double i)
    : Component(id, "CurrentSource", nA, nB) {
  this->current = i;
}
double CurrentSource::calculateCurrent() { return this->current; }

Ground::Ground(std::string id, std::string nA)
    : Component(id, "Ground", nA, "0") {}
double Ground::calculateCurrent() { return 0.0; }

Ammeter::Ammeter(std::string id, std::string nA, std::string nB)
    : Component(id, "Ammeter", nA, nB) {
  this->measuredCurrent = 0.0;
}
double Ammeter::calculateCurrent() { return this->measuredCurrent; }

Voltmeter::Voltmeter(std::string id, std::string nA, std::string nB)
    : Component(id, "Voltmeter", nA, nB) {
  this->measuredVoltage = 0.0;
}
double Voltmeter::calculateCurrent() { return 0.0; }
