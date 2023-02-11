"use strict";

import Lemma from "../lemma";
import verifyProof from "../verify/proof";
import ProofContext from "../context/proof";
import verifyLabels from "../verify/labels";
import verifySupposition from "./supposition";
import verifyConsequence from "./consequence";

import { first } from "../utilities/array";
import { EMPTY_STRING } from "../constants";
import { nodeQuery, nodesQuery } from "../utilities/query";

const proofNodeQuery = nodeQuery("/lemma/proof!"),
      labelNodesQuery = nodesQuery("/lemma/label"),
      consequenceNodeQuery = nodeQuery("/lemma/consequence!"),
      suppositionsNodeQuery = nodesQuery("/lemma/supposition");

export default function verifyLemma(lemmaNode, fileContext) {
  let lemmaVerified = false;

  const labelNodes = labelNodesQuery(lemmaNode),
        labelsString = fileContext.nodesAsString(labelNodes),
        proofContext = ProofContext.fromFileContext(fileContext);

  (labelsString === EMPTY_STRING) ?
    fileContext.debug(`Verifying a lemma...`, lemmaNode) :
      fileContext.debug(`Verifying the '${labelsString}' lemma...`, lemmaNode);

  const labels = [],
        labelsVerified = verifyLabels(labelNodes, labels, fileContext);

  if (labelsVerified) {
    const suppositions = [],
          suppositionNodes = suppositionsNodeQuery(lemmaNode),
          suppositionsVerified = suppositionNodes.every((suppositionNode) => {
            const suppositionVerified = verifySupposition(suppositionNode, suppositions, proofContext);

            if (suppositionVerified) {
              return true;
            }
          });

    if (suppositionsVerified) {
      const consequences = [],
            consequenceNode = consequenceNodeQuery(lemmaNode),
            consequenceVerified = verifyConsequence(consequenceNode, consequences, proofContext);

      if (consequenceVerified) {
        const proofNode = proofNodeQuery(lemmaNode),
              firstConsequence = first(consequences),
              consequence = firstConsequence, ///
              proofVerified = verifyProof(proofNode, consequence, proofContext);

        if (proofVerified) {
          const lemma = Lemma.fromLabelsSuppositionsConsequenceAndProofContext(labels, suppositions, consequence, proofContext);

          fileContext.addLemma(lemma);

          lemmaVerified = true;
        }
      }
    }
  }

  if (lemmaVerified) {
    (labelsString === EMPTY_STRING) ?
      fileContext.info(`Verified the lemma.`, lemmaNode) :
        fileContext.info(`Verified the '${labelsString}' lemma.`, lemmaNode);
  }

  return lemmaVerified;
}
