"use strict";

import verifyType from "../../verify/type";

import { nodeQuery } from "../../utilities/query";

const firstTypeNodeQuery = nodeQuery("/typeDeclaration/type[0]"),
      secondTypeNodeQuery = nodeQuery("/typeDeclaration/type[1]");

export default function verifyTypeDeclaration(typeDeclarationNode, fileContext) {
  let typeDeclarationVerified;

  fileContext.begin(typeDeclarationNode);

  const firstTypeNode = firstTypeNodeQuery(typeDeclarationNode),
        secondTypeNode = secondTypeNodeQuery(typeDeclarationNode),
        typeNode = firstTypeNode, ///
        superTypeNode = secondTypeNode; ///

  const typeVerified = verifyType(typeNode, superTypeNode, fileContext);

  typeDeclarationVerified = typeVerified; ///

  typeDeclarationVerified ?
    fileContext.complete(typeDeclarationNode) :
      fileContext.halt(typeDeclarationNode);

  return typeDeclarationVerified;
}
