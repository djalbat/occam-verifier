"use strict";

import Label from "./label";
import Consequent from "./consequent";
import Supposition from "./supposition";
import LocalContext from "./context/local";
import TopLevelAssertion from "./topLevelAssertion";

import { nodeQuery, nodesQuery } from "./utilities/query";
import { labelsStringFromLabels } from "./topLevelAssertion";

const labelNodesQuery = nodesQuery("/lemma/label"),
      consequentNodeQuery = nodeQuery("/lemma/consequent"),
      suppositionNodesQuery = nodesQuery("/lemma/supposition");

export default class Lemma extends TopLevelAssertion {
  verify() {
    let verified = false;

    const labelsString = labelsStringFromLabels(this.labels);

    (labelsString === null) ?
      this.fileContext.trace(`Verifying a lemma...`) :
        this.fileContext.trace(`Verifying the '${labelsString}' lemma...`);

    const labelsVerifiedAtTopLevel = this.labels.every((label) => {
      const labelVVerifiedAtTopLevel = label.verifyAtTopLevel(this.fileContext);

      if (labelVVerifiedAtTopLevel) {
        return true;
      }
    });

    if (labelsVerifiedAtTopLevel) {
      const localContext = LocalContext.fromFileContext(this.fileContext),
            suppositionsVerified = this.suppositions.every((supposition) => {
              const suppositionVerified = supposition.verify(localContext);

              if (suppositionVerified) {
                return true;
              }
            });

      if (suppositionsVerified) {
        const consequentVerified = this.consequent.verify(localContext);

        if (consequentVerified) {
          const lemma = this;  ///

          this.fileContext.addLemma(lemma);

          verified = true;
        }
      }
    }

    if (verified) {
      (labelsString === null) ?
        this.fileContext.debug(`...verified a lemma.`) :
          this.fileContext.debug(`...verified the '${labelsString}' lemma.`);
    }

    return verified;
  }

  static fromJSON(json, fileContext) { return TopLevelAssertion.fromJSON(Lemma, json, fileContext); }

  static fromLemmaNode(lemmaNode, fileContext) {
    const labelNodes = labelNodesQuery(lemmaNode),
          suppositionNodes = suppositionNodesQuery(lemmaNode),
          consequentNode = consequentNodeQuery(lemmaNode),
          labels = labelNodes.map((labelNode) => {
            const label = Label.fromLabelNode(labelNode, fileContext);

            return label;
          }),
          suppositions = suppositionNodes.map((suppositionNode) => {
            const supposition = Supposition.fromSuppositionNode(suppositionNode, fileContext);

            return supposition;
          }),
          consequent = Consequent.fromConsequentNode(consequentNode, fileContext),
          proof = null, ///
          lemma = new Lemma(fileContext, labels, suppositions, consequent, proof);

    return lemma;
  }
}
