"use strict";

class Variable {
  constructor(type, name, value) {
    this.type = type;
    this.name = name;
    this.value = value;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  matchName(name) {
    const matchesName = (this.name === name);

    return matchesName;
  }

  asString() {
    let string;

    if (this.type === null) {
      string = this.name;
    } else {
      const typeName = this.type.getName();

      string = `${this.name}:${typeName}`;
    }

    return string;
  }

  static fromTypeAndName(type, name) {
    const value = undefined,
          variable = new Variable(type, name, value);

    return variable;
  }
}

module.exports = Variable;
