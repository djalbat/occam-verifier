"use strict";

import verifyTermAsConstructor from "../../verify/termAsConstructor";

import { nodeQuery } from "../../utilities/query";

const termNodeQuery = nodeQuery("/constructorDeclaration/term"),
      typeNodeQuery = nodeQuery("/constructorDeclaration/type");

export default function verifyConstructorDeclaration(constructorDeclarationNode, context) {
  let constructorDeclarationVerified;

  context.begin(constructorDeclarationNode);

  const termNode = termNodeQuery(constructorDeclarationNode),
        typeNode = typeNodeQuery(constructorDeclarationNode),
        termVerifiedAsConstructor = verifyTermAsConstructor(termNode, typeNode, context);

  constructorDeclarationVerified = termVerifiedAsConstructor; ///

  constructorDeclarationVerified ?
    context.complete(constructorDeclarationNode) :
      context.halt(constructorDeclarationNode);

  return constructorDeclarationVerified;
}
