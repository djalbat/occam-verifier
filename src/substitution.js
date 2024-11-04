"use strict";

export default class Substitution {
  constructor(string, node, tokens) {
    this.string = string;
    this.node = node;
    this.tokens = tokens;
  }

  getString() {
    return this.string;
  }

  getNode() {
    return this.node;
  }

  getTokens() {
    return this.tokens;
  }

  getTerm() {
    const term = null;

    return term;
  }

  getFrame() {
    const frame = null;

    return frame;
  }

  getVariable() {
    const variable = null;

    return variable;
  }

  getStatement() {
    const statement = null;

    return statement;
  }

  getMetavariable() {
    const metavariableNode = null;

    return metavariableNode;
  }

  getSubstitution() {
    const substitution = null;

    return substitution;
  }

  isSimple() {
    const simple = true;

    return simple;
  }

  isComplex() {
    const simple = this.isSimple(),
          complex = !simple;

    return complex;
  }

  isEqualTo(substitution) {
    let equalTo = false;

    if (substitution !== null) {
      const substitutionString = substitution.getString();

      equalTo = (substitutionString === this.string);
    }

    return equalTo;
  }

  isTermEqualTo(term) {
    const termEqualTo = false;

    return termEqualTo;
  }

  isFrameEqualTo(frame) {
    const frameEqualTo = false;

    return frameEqualTo;
  }

  isVariableEqualTo(variable) {
    const variableEqualTo = false;

    return variableEqualTo;
  }

  isStatementEqualTo(statement) {
    const statementEqualTo = false;

    return statementEqualTo;
  }

  isMetavariableEqualTo(metavariable) {
    const metavariableEqualTo = false;

    return metavariableEqualTo;
  }

  isSubstitutionEqualTo(substitution) {
    const substitutionEqualTo = false;

    return substitutionEqualTo;
  }

  resolve(substitutions, context) {
    const resolved = true;

    return resolved;
  }

  unifyWithEquivalence(equivalence) {
    let unifiedWithEquivalence = false;

    return unifiedWithEquivalence;
  }
}
