"use strict";

import Label from "./label";
import Consequent from "./consequent";
import Supposition from "./supposition";
import StatementForMetavariableSubstitution from "./substitution/statementForMetavariable";

import { reverse, correlate } from "./utilities/array";

export default class TopLevelAssertion {
  constructor(labels, suppositions, consequent, substitutions, fileContext) {
    this.labels = labels;
    this.suppositions = suppositions;
    this.consequent = consequent;
    this.substitutions = substitutions;
    this.fileContext = fileContext;
  }

  getLabels() {
    return this.labels;
  }

  getSuppositions() {
    return this.suppositions;
  }

  getConsequent() {
    return this.consequent;
  }

  getSubstitutions() {
    return this.substitutions;
  }

  getFileContext() {
    return this.fileContext;
  }

  unifyStatement(statementNode, localContext) {
    let statementUnified = false;

    const proofSteps = localContext.getProofSteps(),
          substitutions = [],
          suppositionsUnified = unifySuppositions(this.suppositions, proofSteps, substitutions, this.fileContext, localContext);

    if (suppositionsUnified) {
      const consequentUnified = unifyConsequent(this.consequent, statementNode, substitutions, this.fileContext, localContext);

      statementUnified = consequentUnified;  ///
    }

    return statementUnified;
  }

  matchMetavariableNode(metavariableNode) {
    const matchesMetavariableNode = this.labels.some((label) => {
      const labelMatchesMetavariableNode = label.matchMetavariableNode(metavariableNode);

      if (labelMatchesMetavariableNode) {
        return true;
      }
    });

    return matchesMetavariableNode;
  }

  toJSON(tokens) {
    const labelsJSON = this.labels.map((label) => {
            const labelJSON = label.toJSON(tokens);

            return labelJSON;
          }),
          suppositionsJSON = this.suppositions.map((supposition) => {
            const suppositionJSON = supposition.toJSON(tokens);

            return suppositionJSON;
          }),
          consequentJSON = this.consequent.toJSON(tokens),
          substitutionsJSON = this.substitutions.map((substitution) => {
            const substitutionJSON = substitution.toJSON();

            return substitutionJSON;
          }),
          labels = labelsJSON,  ///
          suppositions = suppositionsJSON,  ///
          consequent = consequentJSON,  ///
          substitutions = substitutionsJSON,  ///
          json = {
            labels,
            suppositions,
            consequent,
            substitutions
          };

    return json;
  }

  static fromJSONAndFileContext(Class, json, fileContext) {
    let { labels } = json;

    const labelsJSON = labels;  ///

    labels = labelsJSON.map((labelJSON) => {
      const json = labelJSON, ///
            label = Label.fromJSONAndFileContext(json, fileContext);

      return label;
    });

    let { suppositions, consequent, substitutions } = json;

    const suppositionsJSON = suppositions;  ///

    suppositions = suppositionsJSON.map((suppositionJSON) => {
      const json = suppositionJSON, ///
            supposition = Supposition.fromJSONAndFileContext(json, fileContext);

      return supposition;
    });

    const consequentJSON = consequent;  ///

    json = consequentJSON;  ///

    consequent = Consequent.fromJSONAndFileContext(json, fileContext);

    const substitutionsJSON = substitutions;  ///

    substitutions = substitutionsJSON.map((substitutionJSON) => {
      const json = substitutionJSON,  ///
            statementForMetavariableSubstitution = StatementForMetavariableSubstitution.fromJSONAndFileContext(json, fileContext),
            substitution = statementForMetavariableSubstitution;  ///

      return substitution;
    });

    return new Class(labels, suppositions, consequent, substitutions, fileContext);  ///
  }

  static fromLabelsSuppositionsConsequentSubstitutionsAndFileContext(Class, labels, suppositions, consequent, substitutions, fileContext) { return new Class(labels, suppositions, consequent, substitutions, fileContext); }
}

function unifySuppositions(suppositions, proofSteps, substitutions, fileContext, localContext) {
  suppositions = reverse(suppositions); ///

  proofSteps = reverse(proofSteps); ///

  const suppositionsUnified = correlate(suppositions, proofSteps, (supposition, proofStep) => {
    const suppositionUnified = unifySupposition(supposition, proofStep, substitutions, fileContext, localContext);

    if (suppositionUnified) {
      return true;
    }
  });

  return suppositionsUnified;
}

function unifySupposition(supposition, proofStep, substitutions, fileContext, localContext) {
  let suppositionUnified = false;

  const subproofNode = proofStep.getSubproofNode(),
        statementNode = proofStep.getStatementNode();

  if (subproofNode !== null) {
    const subproofUnified = supposition.unifySubproof(subproofNode, substitutions, fileContext, localContext);

    suppositionUnified = subproofUnified; ///
  }

  if (statementNode !== null) {
    const statementUnified = supposition.unifyStatement(statementNode, substitutions, fileContext, localContext);

    suppositionUnified = statementUnified;  ///
  }

  return suppositionUnified;
}

function unifyConsequent(consequent, statementNode, substitutions, fileContext, localContext) {
  const statementUnified = consequent.unifyStatement(statementNode, substitutions, fileContext, localContext),
        consequentUnified = statementUnified; ///

  return consequentUnified;
}
