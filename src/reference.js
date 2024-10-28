"use strict";

import shim from "./shim";
import LocalContext from "./context/local";

import { nodeQuery } from "./utilities/query";
import { referenceMetaType } from "./metaType";
import { metavariableFromJSON, metavariableToMetavariableJSON } from "./utilities/json";
import labelUnifier from "./unifier/label";

const metavariableNodeQuery = nodeQuery("//reference/metavariable");

export default class Reference {
  constructor(metavariable) {
    this.metavariable = metavariable;
  }

  getMetavariable() {
    return this.metavariable;
  }

  getString() { return this.metavariable.getString(); }

  matchMetavariableNode(metavariableNode) { return this.metavariable.matchMetavariableNode(metavariableNode); }

  getMetavariableName() {
    const metavariableName = this.metavariable.getName();

    return metavariableName;
  }

  getMetavariableNode() {
    const metavariableNode = this.metavariable.getNode();

    return metavariableNode;
  }

  unifyLabel(label, substitutions, generalContext, specificContext) {
    let labelUnified;

    const reference = this,
          labelString = label.getString(),
          referenceString = reference.getString();

    specificContext.trace(`Unifying the '${labelString}' label with the '${referenceString}' reference...`);

    const labelMetavariable = label.getMetavariable(),
          referenceMetavariable = reference.getMetavariable(),
          labelMetavariableNode = labelMetavariable.getNode(),
          referenceMetavariableNode = referenceMetavariable.getNode();

    labelUnified = labelUnifier.unify(labelMetavariableNode, referenceMetavariableNode, substitutions, generalContext, specificContext);

    if (labelUnified) {
      specificContext.debug(`...unified the '${labelString}' label with the '${referenceString}' reference.`);
    }

    return labelUnified;
  }

  verify(context) {
    let verified = false;

    const referenceString = this.getString(); ///

    context.trace(`Verifying the '${referenceString}' reference...`);

    if (!verified) {
      const metaType = referenceMetaType, ///
            metavariableVerifiedGivenMetaType = this.metavariable.verifyGivenMetaType(metaType, context);

      verified = metavariableVerifiedGivenMetaType; ///
    }

    if (verified) {
      context.debug(`...verified the '${referenceString}' reference.`);
    }

    return verified;
  }

  toJSON() {
    const metavariableJSON = metavariableToMetavariableJSON(this.metavariable),
          metavariable = metavariableJSON,  ///
          string = this.string,
          json = {
            string,
            metavariable
          };

    return json;
  }

  static fromJSON(json, fileContext) {
    const metavariable = metavariableFromJSON(json, fileContext),
          reference = new Reference(string, metavariable);

    return reference;
  }

  static fromReferenceNode(referenceNode, fileContext) {
    const { Metavariable } = shim,
          metavariableNode = metavariableNodeQuery(referenceNode),
          localContext = LocalContext.fromFileContext(fileContext),
          context = localContext, ///
          metavariable = Metavariable.fromMetavariableNode(metavariableNode, context),
          reference = new Reference(metavariable);

    return reference;
  }
}
