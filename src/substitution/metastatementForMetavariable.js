"use strict";

import Substitution from "../substitution";

import { bracketedMetastatementChildNodeFromMetastatementNode } from "../utilities/metaproof";
import {nodeAsString} from "../utilities/string";
import {metastatementNodeFromMetastatementString, metavariableNodeFromMetavariableString} from "../utilities/node";

export default class MetastatementForMetavariableSubstitution extends Substitution {
  constructor(metavariableNode, metastatementNode) {
    super();

    this.metavariableNode = metavariableNode;
    this.metastatementNode = metastatementNode;
  }

  getMetavariableNode() {
    return this.metavariableNode;
  }

  getMetastatementNode() {
    return this.metastatementNode;
  }

  matchMetavariableNode(metavariableNode) {
    const metavariableNodeMatches = this.metavariableNode.match(metavariableNode);

    return metavariableNodeMatches;
  }

  matchMetastatementNode(metastatementNode) {
    let metastatementNodeMatches;

    metastatementNodeMatches = this.metastatementNode.match(metastatementNode)

    if (!metastatementNodeMatches) {
      const bracketedMetastatementChildNode = bracketedMetastatementChildNodeFromMetastatementNode(metastatementNode);

      if (bracketedMetastatementChildNode !== null) {
        const metastatementNode = bracketedMetastatementChildNode; ///

        metastatementNodeMatches = this.metastatementNode.match(metastatementNode);
      }
    }

    return metastatementNodeMatches;
  }

  toJSON(tokens) {
    const metavariableString = nodeAsString(this.metavariableNode, tokens),
          metastatementString = nodeAsString(this.metastatementNode, tokens),
          metavariable = metavariableString, ///
          metastatement = metastatementString,  ///
          json = {
            metavariable,
            metastatement
          };

    return json;
  }

  static fromJSONAndFileContext(json, fileContext) {
    const { metavariable, metastatement } = json,
          metavariableString = metavariable,  ///
          metastatementString = metastatement,  ///
          lexer = fileContext.getLexer(),
          parser = fileContext.getParser(),
          metastatementNode = metastatementNodeFromMetastatementString(metastatementString, lexer, parser),
          metavariableNode = metavariableNodeFromMetavariableString(metavariableString, lexer, parser),
          metastatementForMetavariableSubstitution = new MetastatementForMetavariableSubstitution(metastatementNode, metavariableNode);

    return metastatementForMetavariableSubstitution;
  }

  static fromMetavariableNodeAndMetastatementNode(metavariableNode, metastatementNode) {
    let metastatementForMetavariableSubstitution;

    metastatementForMetavariableSubstitution = new MetastatementForMetavariableSubstitution(metavariableNode, metastatementNode);

    const bracketedMetastatementChildNode = bracketedMetastatementChildNodeFromMetastatementNode(metastatementNode);

    if (bracketedMetastatementChildNode !== null) {
      const metastatementNode = bracketedMetastatementChildNode; ///

      metastatementForMetavariableSubstitution = new MetastatementForMetavariableSubstitution(metavariableNode, metastatementNode);
    }

    return metastatementForMetavariableSubstitution;
  }
}
