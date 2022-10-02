"use strict";

class ProofContext {
  constructor(context, derived, variables) {
    this.context = context;
    this.derived = derived;
    this.variables = variables;
  }

  getContext() {
    return this.context;
  }

  isDerived() {
    return this.derived;
  }

  getVariables() {
    return this.variables;
  }

  getRules() { return this.context.getRules(); }

  getTypes() { return this.context.getTypes(); }

  getAxioms() { return this.context.getAxioms(); }

  getCombinators() { return this.context.getCombinators(); }

  getConstructors() { return this.context.getConstructors(); }

  findTypeByTypeName(typeName) { return this.context.findTypeByTypeName(typeName); }

  findRuleByReferenceName(referenceName) { return this.context.findRuleByReferenceName(referenceName); }

  findVariableByVariableName(variableName) {
    const name = variableName,  ///
          variable = this.variables.find((variable) => {
            const matches = variable.matchName(name);

            if (matches) {
              return true;
            }
          }) || this.context.findVariableByVariableName(variableName);  ///

    return variable;
  }

  isLabelPresent(label) { return this.context.isLabelPresent(label); }

  isTypePresentByTypeName(typeName) { return this.context.isTypePresentByTypeName(typeName); }

  isVariablePresentByVariableName(variableName) {
    const variable = this.findVariableByVariableName(variableName),
          variablePresent = (variable !== null);

    return variablePresent;
  }

  setDerived(derived) {
    this.derived = derived;
  }

  addAxiom(axiom) { this.context.addAxiom(axiom); }

  addVariable(variable) {
    this.variables.push(variable);
  }

  static fromContext(context) {
    const variables = [],
          derived = false,
          proofContext = new ProofContext(context, derived, variables);

    return proofContext;
  }
}

module.exports = ProofContext;
