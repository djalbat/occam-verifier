"use strict";

import Equality from "../equality";
import fileMixins from "../mixins/file";
import loggingMixins from "../mixins/logging";
import callbacksMixins from "../mixins/callbacks";

import { push, last } from "../utilities/array";
import { MAXIMUM_INDEXES_LENGTH } from "../constants";

class ProofContext {
  constructor(context, variables, proofSteps) {
    this.context = context;
    this.variables = variables;
    this.proofSteps = proofSteps;
  }

  getContext() {
    return this.context;
  }

  getVariables() {
    const variables = [];

    push(variables, this.variables);

    const contextVariables = this.context.getVariables();

    push(variables, contextVariables);

    return variables;
  }

  getProofSteps() {
    let proofSteps = this.context.getProofSteps();

    proofSteps = [
      ...proofSteps,
      ...this.proofSteps
    ];

    return proofSteps;
  }

  getLastProofStep() {
    let lastProofStep = null;

    const proofStepsLength = this.proofSteps.length;

    if (proofStepsLength > 0) {
      lastProofStep = last(this.proofSteps);
    }

    return lastProofStep;
  }

  getMetavariables() { return this.context.getMetavariables(); }

  getEqualities() {
    const equalities = [],
          start = -MAXIMUM_INDEXES_LENGTH,  ///
          proofSteps = this.proofSteps.slice(start); ///

    proofSteps.forEach((proofStep) => {
      const equality = Equality.fromProofStep(proofStep);

      if (equality !== null) {
        equalities.push(equality);
      }
    });

    return equalities;
  }

  addVariable(variable) {
    this.variables.push(variable);
  }

  addProofStep(proofStep) {
    this.proofSteps.push(proofStep);
  }

  matchStatement(statementNode) {
    let statementMatches;

    statementMatches = this.proofSteps.some((proofStep) => {
      statementMatches = proofStep.matchStatement(statementNode);

      if (statementMatches) {
        return true;
      }
    });

    if (!statementMatches) {
      statementMatches = this.context.matchStatement(statementNode);
    }

    return statementMatches;
  }

  findVariableByVariableName(variableName) {
    const name = variableName,  ///
          variables = this.getVariables(),
          variable = variables.find((variable) => {
            const matches = variable.matchName(name);

            if (matches) {
              return true;
            }
          }) || null;

    return variable;
  }

  isVariablePresentByVariableName(variableName) {
    const variable = this.findVariableByVariableName(variableName),
          variablePresent = (variable !== null);

    return variablePresent;
  }

  static fromFileContext(fileContext) {
    const context = fileContext,  ///
          variables = [],
          proofSteps = [],
          proofContext = new ProofContext(context, variables, proofSteps);

    return proofContext;
  }

  static fromProofContext(proofContext) {
    const context = proofContext,  ///
          variables = [],
          proofSteps = [];

    proofContext = new ProofContext(context, variables, proofSteps);

    return proofContext;
  }
}

Object.assign(ProofContext.prototype, fileMixins);
Object.assign(ProofContext.prototype, loggingMixins);
Object.assign(ProofContext.prototype, callbacksMixins);

export default ProofContext;

function equalitiesFromProofSteps(proofSteps, context) {
  let equalities = [];


  return equalities;
}
