"use strict";

import { nodeQuery, referenceNameFromReferenceNode } from "../../utilities/query";

const referenceNodeQuery = nodeQuery("/qualifiedMetastatement/qualification!/reference!"),
      metastatementNodeQuery = nodeQuery("/qualifiedMetastatement/metastatement!");

export default function verifyQualifiedMetastatement(qualifiedMetastatementNode, assignments, derived, metaproofContext) {
  let qualifiedMetastatementVerified = false;

  const metastatementNode = metastatementNodeQuery(qualifiedMetastatementNode);

  if (metastatementNode !== null) {
    const metastatementString = metaproofContext.nodeAsString(metastatementNode),
          metastatementMetaproofContext = metaproofContext; ///

    metaproofContext.trace(`Verifying the '${metastatementString}' qualified metastatement...`, qualifiedMetastatementNode);

    const referenceNode = referenceNodeQuery(qualifiedMetastatementNode),
          referenceName = referenceNameFromReferenceNode(referenceNode),
          rule = metaproofContext.findRuleByReferenceName(referenceName);

    if (rule !== null) {
      const ruleMatchesMetastatement = rule.matchMetastatement(metastatementNode, metastatementMetaproofContext);

      qualifiedMetastatementVerified = ruleMatchesMetastatement;  ///
    }

    if (qualifiedMetastatementVerified) {
      metaproofContext.debug(`...verified the '${metastatementString}' qualified metastatement.`, qualifiedMetastatementNode);
    }
  }

  return qualifiedMetastatementVerified;
}
