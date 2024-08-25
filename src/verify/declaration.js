"use strict";

import referenceMetaType from "../metaType/reference";
import metastatementNodeVerifier from "../verifier/node/metastatement";

import { nodeQuery } from "../utilities/query";

const metavariableNodeQuery = nodeQuery("/declaration/metavariable!"),
      metastatementNodeQuery = nodeQuery("/declaration/metastatement!");

export default function verifyDeclaration(declarationNode, derived, localMetaContext) {
  let declarationVerified = false;

  const declarationString = localMetaContext.nodeAsString(declarationNode);

  localMetaContext.trace(`Verifying the '${declarationString}' declaration...`, declarationNode);

  const metavariableNode = metavariableNodeQuery(declarationNode),
        metavariable = localMetaContext.findMetavariableByMetavariableNode(metavariableNode, localMetaContext);

  if (metavariable !== null) {
    const metaType = metavariable.getMetaType();

    if (metaType === referenceMetaType) {
      const metastatementNode = metastatementNodeQuery(declarationNode);

      if (metastatementNode !== null) {
        const { verifyMetastatement } = metastatementNodeVerifier,
              assignments = [],
              metastatementVerified = verifyMetastatement(metastatementNode, assignments, derived, localMetaContext, () => {
                const verifiedAhead = true;

                return verifiedAhead;
              });

        declarationVerified = metastatementVerified;  ///
      }
    } else {
      const referenceMetaTypeName = referenceMetaType.getName(),
            metavariableString = localMetaContext.nodeAsString(metavariableNode),
            metaTypeString = metaType.asString();

      localMetaContext.debug(`The '${metavariableString}' metavariable's meta-type is '${metaTypeString}' when it should be '${referenceMetaTypeName}'.`, declarationNode);
    }
  }

  if (declarationVerified) {
    localMetaContext.debug(`...verified the '${declarationString}' declaration.`, declarationNode);
  }

  return declarationVerified;
}