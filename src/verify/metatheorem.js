"use strict";

import Metatheorem from "../metatheorem";
import verifyLabels from "../verify/labels";
import verifyMetaproof from "../verify/metaproof";
import LocalMetaContext from "../context/localMeta";
import verifyMetaConsequent from "../verify/metaConsequent";
import verifyMetaSuppositions from "../verify/metaSuppositions";

import { first } from "../utilities/array";
import { nodeQuery, nodesQuery } from "../utilities/query";

const labelsNodeQuery = nodeQuery("/metatheorem/labels!"),
      metaproofNodeQuery = nodeQuery("/metatheorem/metaproof!"),
      metaConsequentNodeQuery = nodeQuery("/metatheorem/metaConsequent!"),
      metaSuppositionsNodeQuery = nodesQuery("/metatheorem/metaSupposition");

export default function verifyMetatheorem(metatheoremNode, fileContext) {
  let metatheoremVerified = false;

  const labelsNode = labelsNodeQuery(metatheoremNode),
        labelsString = fileContext.nodeAsString(labelsNode),
        localMetaContext = LocalMetaContext.fromFileContext(fileContext);

  fileContext.trace(`Verifying the '${labelsString}' metatheorem...`, metatheoremNode);

  const labels = [],
        labelsVerified = verifyLabels(labelsNode, labels, fileContext);

  if (labelsVerified) {
    const substitutions = [],
          metaSuppositions = [],
          metaSuppositionNodes = metaSuppositionsNodeQuery(metatheoremNode),
          metaSuppositionsVerified = verifyMetaSuppositions(metaSuppositionNodes, metaSuppositions, substitutions, localMetaContext);

    if (metaSuppositionsVerified) {
      const metaConsequents = [],
            metaConsequentNode = metaConsequentNodeQuery(metatheoremNode),
            metaConsequentVerified = verifyMetaConsequent(metaConsequentNode, metaConsequents, substitutions, localMetaContext);

      if (metaConsequentVerified) {
        const metaproofNode = metaproofNodeQuery(metatheoremNode),
              firstMetaConsequent = first(metaConsequents),
              metaConsequent = firstMetaConsequent, ///
              metaproofVerified = verifyMetaproof(metaproofNode, metaConsequent, substitutions, localMetaContext);

        if (metaproofVerified) {
          const metatheorem = Metatheorem.fromLabelsMetaSuppositionsMetaConsequentSubstitutionsAndFileContext(labels, metaSuppositions, metaConsequent, substitutions, fileContext);

          fileContext.addMetatheorem(metatheorem);

          metatheoremVerified = true;
        }
      }
    }
  }

  if (metatheoremVerified) {
    fileContext.debug(`...verified the '${labelsString}' metatheorem.`, metatheoremNode);
  }

  return metatheoremVerified;
}
