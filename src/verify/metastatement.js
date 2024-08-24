"use strict";

import verifyJudgement from "../verify/judgement";
import verifyMetaEquality from "../verify/metaEquality";
import metastatementNodeVerifier from "../verifier/node/metastatement";

import { nodeQuery } from "../utilities/query";

const judgementNodeQuery = nodeQuery("/metastatement/judgement!"),
      metaEqualityNodeQuery = nodeQuery("/metastatement/metaEquality!");

function verifyMetastatement(metastatementNode, assignments, derived, localMetaContext) {
  let metastatementVerified;

  const metastatementString = localMetaContext.nodeAsString(metastatementNode);

  localMetaContext.trace(`Verifying the '${metastatementString}' metastatement...`, metastatementNode);

  const verifyMetaStatementFunctions = [
    verifyMetastatementAsMetaEquality,
    verifyMetastatementAsJudgement,
    verifyMetastatementAsIs
  ];

  metastatementVerified = verifyMetaStatementFunctions.some((verifyStatementFunction) => {
    const metastatementVerified = verifyStatementFunction(metastatementNode, assignments, derived, localMetaContext);

    if (metastatementVerified) {
      return true;
    }
  });

  if (metastatementVerified) {
    localMetaContext.debug(`...verified the '${metastatementString}' metastatement.`, metastatementNode);
  }

  return metastatementVerified;
}

Object.assign(metastatementNodeVerifier, {
  verifyMetastatement
});

export default verifyMetastatement;

function verifyMetastatementAsMetaEquality(metastatementNode, assignments, derived, localMetaContext) {
  let metastatementVerifiedAsMetaEquality = false;

  const metaEqualityNode = metaEqualityNodeQuery(metastatementNode);

  if (metaEqualityNode !== null) {
    const metastatementString = localMetaContext.nodeAsString(metastatementNode);

    localMetaContext.trace(`Verifying the '${metastatementString}' metastatement as a meta-equality...`, metastatementNode);

    const metaEqualityVerified = verifyMetaEquality(metaEqualityNode, assignments, derived, localMetaContext);

    metastatementVerifiedAsMetaEquality = metaEqualityVerified;  ///

    if (metastatementVerifiedAsMetaEquality) {
      localMetaContext.debug(`...verified the '${metastatementString}' metastatement as a meta-equality.`, metastatementNode);
    }
  }

  return metastatementVerifiedAsMetaEquality;
}

function verifyMetastatementAsJudgement(metastatementNode, assignments, derived, localMetaContext) {
  let metastatementVerifiedAsJudgement = false;

  const judgementNode = judgementNodeQuery(metastatementNode);

  if (judgementNode !== null) {
    const metastatementString = localMetaContext.nodeAsString(metastatementNode);

    localMetaContext.trace(`Verifying the '${metastatementString}' metastatement as a judgement...`, metastatementNode);

    const judgementVerified = verifyJudgement(judgementNode, derived, localMetaContext);

    metastatementVerifiedAsJudgement = judgementVerified;  ///

    if (metastatementVerifiedAsJudgement) {
      localMetaContext.debug(`...verified the '${metastatementString}' metastatement as a judgement.`, metastatementNode);
    }
  }

  return metastatementVerifiedAsJudgement;
}

function verifyMetastatementAsIs(metastatementNode, assignments, derived, localMetaContext) {
  let metastatementVerifiedAsIs = false;

  const judgementNode = judgementNodeQuery(metastatementNode),
        metaEqualityNode = metaEqualityNodeQuery(metastatementNode);

  if ((judgementNode === null) && (metaEqualityNode === null)) {
    const metastatementString = localMetaContext.nodeAsString(metastatementNode);

    localMetaContext.trace(`Verifying the '${metastatementString}' metastatement as is...`, metastatementNode);

    const nonTerminalNode = metastatementNode, ///
          nonTerminalNodeVerified = metastatementNodeVerifier.verifyNonTerminalNode(nonTerminalNode, localMetaContext, () => {
            const verifiedAhead = true;

            return verifiedAhead;
          });

    metastatementVerifiedAsIs = nonTerminalNodeVerified;  ///

    if (metastatementVerifiedAsIs) {
      localMetaContext.debug(`...verified the '${metastatementString}' metastatement as is.`, metastatementNode);
    }
  }

  return metastatementVerifiedAsIs;
}
