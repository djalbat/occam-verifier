"use strict";

import { nodeQuery } from "../utilities/query";
import { FRAME_META_TYPE_NAME, STATEMENT_META_TYPE_NAME } from "../metaTypeNames";

const metavariableNodeQuery = nodeQuery("/statement/metavariable"),
      metaTypeTerminalNodeQuery = nodeQuery("/metaType/@meta-type!");

export default function unifyStatementWithMetaType(statementNode, metaTypeNode, localContext) {
  let statementUnifiedWithMetaType = false;

  const metaTypeTerminalNode = metaTypeTerminalNodeQuery(metaTypeNode),
        metaTypeTerminalNodeContent = metaTypeTerminalNode.getContent(),
        metaTypeName = metaTypeTerminalNodeContent; ///

  switch (metaTypeName) {
    case FRAME_META_TYPE_NAME: {
      const metavariableNode = metavariableNodeQuery(statementNode);

      if (metavariableNode !== null) {
        const metavariable = localContext.findMetavariableByMetavariableNode(metavariableNode);

        if (metavariable !== null) {
          const metavariableMetaTypeName = metavariable.getMetaTypeName();

          if (metavariableMetaTypeName === metaTypeName) {
            statementUnifiedWithMetaType = true;
          }
        }
      }

      break;
    }

    case STATEMENT_META_TYPE_NAME: {

      debugger

      statementUnifiedWithMetaType = statementVerified;

      break;
    }
  }

  return statementUnifiedWithMetaType;
}
