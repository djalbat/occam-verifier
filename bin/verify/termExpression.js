"use strict";

const Error = require("../error"),
      ruleNames = require("../miscellaneous/ruleNames"),
      typeUtilities = require("../utilities/type"),
      nodeUtilities = require("../utilities/node"),
      variableUtilities = require("../utilities/variable"),
      NonTerminalNodeContext = require("../context/nonTerminalNode");

const { nodeAsString } = nodeUtilities,
      { NAME_RULE_NAME, TERM_RULE_NAME, EXPRESSION_RULE_NAME } = ruleNames,
      { variableFromTermNode, variableFromExpressionNode } = variableUtilities,
      { typeFromConstructorTermNode, typeFromOperatorExpressionNode } = typeUtilities;

function verifyExpression(expressionNode, fileContext) { return verifyExpressionAgainstOperators(expressionNode, fileContext); }

function verifyTerm(termNode, fileContext) { return verifyTermAgainstConstructors(termNode, fileContext); }

module.exports = {
  verifyExpression,
  verifyTerm
};

function verifyExpressionAgainstOperators(expressionNode, fileContext) {
  const operators = fileContext.getOperators(),
        operator = operators.find((operator) => {
          const operatorExpressionNode = operator.getExpressionNode(),
                verified = verifyExpressionAgainstOperator(expressionNode, operatorExpressionNode, fileContext);

          if (verified) {
            return true;
          }
        });

  return operator;
}

function verifyExpressionAgainstOperator(expressionNode, operatorExpressionNode, fileContext) {
  const nonTerminalNode = expressionNode, ///
        constructorOrOperatorNonTerminalNode = operatorExpressionNode, ///
        childNodes = nonTerminalNode.getChildNodes(),
        constructorOrOperatorChildNodes = constructorOrOperatorNonTerminalNode.getChildNodes(),
        verified = verifyChildNodes(childNodes, constructorOrOperatorChildNodes, fileContext);

  return verified;
}

function verifyTermAgainstConstructors(termNode, fileContext) {
  const constructors = fileContext.getConstructors(),
        constructor = constructors.find((constructor) => {
          const constructorOrExpressionTermNode = constructor.getTermNode(),
                verified = verifyTermAgainstConstructor(termNode, constructorOrExpressionTermNode, fileContext);

          if (verified) {
            return true;
          }
        });

  return constructor;
}

function verifyTermAgainstConstructor(termNode, constructorOrExpressionTermNode, fileContext) {
  const nonTerminalNode = termNode, ///
        constructorOrExpressionNonTerminalNode = constructorOrExpressionTermNode, ///
        childNodes = nonTerminalNode.getChildNodes(),
        constructorOrExpressionChildNodes = constructorOrExpressionNonTerminalNode.getChildNodes(),
        verified = verifyChildNodes(childNodes, constructorOrExpressionChildNodes, fileContext);

  return verified;
}

function verifyNode(node, constructorOrExpressionNode, fileContext) {
  let verified = false;

  const nodeTerminalNode = node.isTerminalNode();

  if (nodeTerminalNode) {
    const constructorNodeTerminalNode = constructorOrExpressionNode.isTerminalNode();

    if (constructorNodeTerminalNode) {
      const terminalNode = node,  ///
            constructorOrExpressionTerminalNode = constructorOrExpressionNode; ///

      verified = verifyTerminalNode(terminalNode, constructorOrExpressionTerminalNode, fileContext);
    }
  } else {
    const constructorNodeNonTerminalNode = constructorOrExpressionNode.isNonTerminalNode();

    if (constructorNodeNonTerminalNode) {
      const nonTerminalNode = node, ///
            constructorOrExpressionNonTerminalNode = constructorOrExpressionNode; ///

      verified = verifyNonTerminalNode(nonTerminalNode, constructorOrExpressionNonTerminalNode, fileContext);
    }
  }

  return verified;
}

function verifyTerminalNode(terminalNode, constructorOrExpressionTerminalNode, fileContext) {
  let verified = false;

  const terminalNodeType = terminalNode.getType(),
        constructorTerminalNodeType = constructorOrExpressionTerminalNode.getType();

  if (terminalNodeType === constructorTerminalNodeType) {
    const terminalNodeContent = terminalNode.getContent(),
          constructorTerminalNodeContent = constructorOrExpressionTerminalNode.getContent();

    if (terminalNodeContent === constructorTerminalNodeContent) {
      verified = true;
    }
  }

  return verified;
}

function verifyNonTerminalNode(nonTerminalNode, constructorOrExpressionNonTerminalNode, fileContext) {
  let verified = false;

  const nonTerminalNodeRuleName = nonTerminalNode.getRuleName(),
        constructorOrExpressionNonTerminalNodeRuleName = constructorOrExpressionNonTerminalNode.getRuleName();

  if (nonTerminalNodeRuleName === constructorOrExpressionNonTerminalNodeRuleName) {
    const ruleName = nonTerminalNodeRuleName; ///

    if (ruleName !== NAME_RULE_NAME) {
      switch (ruleName) {
        case EXPRESSION_RULE_NAME: {
          const expressionNode = nonTerminalNode, ///
                operatorExpressionNode = constructorOrExpressionNonTerminalNode;  ///

          verified = verifyExpressionNode(expressionNode, operatorExpressionNode, fileContext);

          break;
        }

        case TERM_RULE_NAME: {
          const termNode = nonTerminalNode, ///
                constructorTermNode = constructorOrExpressionNonTerminalNode; ///

          verified = verifyTermNode(termNode, constructorTermNode, fileContext);

          break;
        }
      }

      if (!verified) {
        const childNodes = nonTerminalNode.getChildNodes(),
              constructorOrExpressionChildNodes = constructorOrExpressionNonTerminalNode.getChildNodes();

        verified = verifyChildNodes(childNodes, constructorOrExpressionChildNodes, fileContext);
      }
    }
  }

  return verified;
}

function verifyExpressionNode(expressionNode, operatorExpressionNode, fileContext) {
  let verified = false;

  const type = typeFromOperatorExpressionNode(operatorExpressionNode, fileContext);

  if (type !== undefined) {
    if (verified === false) {
      const variable = variableFromExpressionNode(expressionNode, fileContext);

      if (variable !== undefined) {
        const variableType = variable.getType(),
              variableTypeEqualToOrSubTypeOfType = variableType.isEqualToOrSubTypeOf(type);

        if (variableTypeEqualToOrSubTypeOfType) {
          verified = true;
        }
      }
    }

    if (verified === false) {
      const operator = verifyExpression(expressionNode, fileContext);

      if (operator !== undefined) {
        const operatorType = operator.getType();

        if (operatorType === undefined) {
          const node = expressionNode,  ///
                expressionString = nodeAsString(expressionNode),
                message = `The '${expressionString}' sub-expression cannot be verified because its type is undefined.`;

          throw new Error(node, message);
        } else {
          const operatorTypeEqualToOrSubTypeOfType = operatorType.isEqualToOrSubTypeOf(type);

          if (operatorTypeEqualToOrSubTypeOfType) {
            verified = true;
          }
        }
      }
    }
  }

  return verified;
}

function verifyTermNode(termNode, constructorTermNode, fileContext) {
  let verified = false;

  const type = typeFromConstructorTermNode(constructorTermNode, fileContext);

  if (type !== undefined) {
    if (verified === false) {
      const variable = variableFromTermNode(termNode, fileContext);

      if (variable !== undefined) {
        const variableType = variable.getType(),
              variableTypeEqualToOrSubTypeOfType = variableType.isEqualToOrSubTypeOf(type);

        if (variableTypeEqualToOrSubTypeOfType) {
          verified = true;
        }
      }
    }

    if (verified === false) {
      const constructor = verifyTerm(termNode, fileContext);

      if (constructor !== undefined) {
        const constructorType = constructor.getType();

        if (constructorType === undefined) {
          const node = termNode,  ///
                termString = nodeAsString(termNode),
                message = `The '${termString}' sub-term cannot be verified because its type is undefined.`;

          throw new Error(node, message);
        } else {
          const constructorTypeEqualToOrSubTypeOfType = constructorType.isEqualToOrSubTypeOf(type);

          if (constructorTypeEqualToOrSubTypeOfType) {
            verified = true;
          }
        }
      }
    }

    if (verified === false) {
      // const node = termNode,  ///
      //       noSuperType = true,
      //       typeString = type.asString(noSuperType),
      //       termString = nodeAsString(termNode),
      //       message = `The '${termString}' sub-term cannot be verified because its type is not equal to or a sub-type of the '${typeString}' type.`;
      //
      // throw new Error(node, message);
    }
  }

  return verified;
}

function verifyChildNodes(childNodes, constructorOrExpressionChildNodes, fileContext) {
  let verified = false;

  const nonTerminalNodeContext = NonTerminalNodeContext.fromChildNodesAndFileContext(childNodes, fileContext),
        constructorOrExpressionNonTerminalNodeContext = NonTerminalNodeContext.fromChildNodesAndFileContext(constructorOrExpressionChildNodes, fileContext);

  let nextChildNode = nonTerminalNodeContext.getNextChildNode(),
      nextConstructorOrExpressionChildNode = constructorOrExpressionNonTerminalNodeContext.getNextChildNode();

  while (nextChildNode !== undefined) {
    if (nextConstructorOrExpressionChildNode === undefined) {
      break;
    }

    const node = nextChildNode,  ///
          constructorOrExpressionNode = nextConstructorOrExpressionChildNode;  ///

    verified = verifyNode(node, constructorOrExpressionNode, fileContext);

    if (!verified) {
      break;
    }

    nextChildNode = nonTerminalNodeContext.getNextChildNode();
    nextConstructorOrExpressionChildNode = constructorOrExpressionNonTerminalNodeContext.getNextChildNode();
  }

  if (verified) {
    if (nextConstructorOrExpressionChildNode !== undefined) {
      verified = false;
    }
  }

  return verified;
}