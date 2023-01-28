"use strict";

import Variable from "../variable";

import { objectType } from "../type";
import { typeNameFromTypeNode, variableNameFromVariableNode } from "../utilities/query";

export default function verifyVariable(variableNode, typeNode, fileContext) {
  let variableVerified = false;

  const variableName = variableNameFromVariableNode(variableNode),
        variableString = fileContext.nodeAsString(variableNode),
        variablePresent = fileContext.isVariablePresentByVariableName(variableName);

  if (variablePresent) {
    fileContext.error(variableNode, `The variable '${variableName}' is already present.`);
  } else {
    let variable;

    const typeName = typeNameFromTypeNode(typeNode);
    
    if (typeName === null) {
      const type = objectType,
            name = variableName;  ///

      variable = Variable.fromTypeAndName(type, name);
    } else {
      const type = fileContext.findTypeByTypeName(typeName);

      if (type === null) {
        fileContext.error(variableNode, `The '${variableName}' variable's '${typeName}' type is missing.`);
      } else {
        const name = variableName;  ///

        variable = Variable.fromTypeAndName(type, name);
      }
    }

    if (variable !== null) {
      fileContext.addVariable(variable);

      variableVerified = true;
    }
  }

  if (variableVerified) {
    fileContext.info(variableNode, `Verified the '${variableString}' variable.`);
  }

  return variableVerified;
}
