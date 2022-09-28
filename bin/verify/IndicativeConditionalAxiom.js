"use strict";

const { arrayUtilities, loggingUtilities } = require("necessary");

const Axiom = require("../axiom"),
      ProofContext = require("../context/proof"),
      verifyLabels = require("../verify/labels"),
      verifyAntecedent = require("../verify/antecedent"),
      verifyConsequent = require("../verify/consequent");

const { labelsAsString } = require("../utilities/string"),
      { nodeQuery, nodesQuery } = require("../utilities/query");

const { log } = loggingUtilities,
      { first } = arrayUtilities;

const labelNodesQuery = nodesQuery("/axiom/label"),
      antecedentNodeQuery = nodeQuery("/indicativeConditional/antecedent!"),
      consequentNodeQuery = nodeQuery("/indicativeConditional/consequent!"),
      indicativeConditionalNodeQuery = nodeQuery("/axiom/indicativeConditional!");

function verifyIndicativeConditionalAxiom(axiomNode, context) {
  let conditionalAxiomVerified = false;

  const indicativeConditionalNode = indicativeConditionalNodeQuery(axiomNode);

  if (indicativeConditionalNode !== null) {
    const labels = [],
          labelNodes = labelNodesQuery(axiomNode),
          labelsVerified = verifyLabels(labelNodes, labels, context);

    if (labelsVerified) {
      const proofContext = ProofContext.fromContext(context);

      context = proofContext; ///

      const antecedents = [],
            antecedentNode = antecedentNodeQuery(indicativeConditionalNode),
            antecedentVerified = verifyAntecedent(antecedentNode, antecedents, context);

      if (antecedentVerified) {
        const consequents = [],
              consequentNode = consequentNodeQuery(indicativeConditionalNode),
              consequentVerified = verifyConsequent(consequentNode, consequents, context);

        if (consequentVerified) {
          const firstAntecedent = first(antecedents),
                firstConsequent = first(consequents),
                antecedent = firstAntecedent, ///
                consequent = firstConsequent, ///
                axiom = Axiom.fromAntecedentConsequentAndLabels(antecedent, consequent, labels),
                labelsString = labelsAsString(labels);

          context.addAxiom(axiom);

          conditionalAxiomVerified = true;

          log.info(`Verified the '${labelsString}' axiom.`);
        }
      }
    }
  }

  return conditionalAxiomVerified;
}

module.exports = verifyIndicativeConditionalAxiom;
