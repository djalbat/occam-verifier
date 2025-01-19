"use strict";

import dom from "../../dom";

import { nodeQuery } from "../../utilities/query";
import { domAssigned } from "../../dom";

const variableNodeQuery = nodeQuery("/propertyAssertion/variable"),
      propertyRelationNodeQuery = nodeQuery("/propertyAssertion/propertyRelation"),
      propertyAssertionNodeQuery = nodeQuery("/statement/propertyAssertion");

export default domAssigned(class PropertyAssertion {
  constructor(string, node, tokens, variable, propertyRelation) {
    this.string = string;
    this.node = node;
    this.tokens = tokens;
    this.variable = variable;
    this.propertyRelation = propertyRelation;
  }

  getString() {
    return this.string;
  }

  getNode() {
    return this.node;
  }

  getTokens() {
    return this.tokens;
  }

  getVariable() {
    return this.variable;
  }

  getPropertyRelation() {
    return this.propertyRelation;
  }

  verify(assignments, stated, context) {
    let verified = false;

    const propertyAssertionString = this.string; ///

    context.trace(`Verifying the '${propertyAssertionString}' property assertion...`);

    const variableVerified = this.verifyVariable(assignments, stated, context);

    if (variableVerified) {
      const propertyRelationVerified = this.verifyPropertyRelation(assignments, stated, context);

      if (propertyRelationVerified) {
        let verifiedWhenStated = false,
            verifiedWhenDerived = false;

        if (stated) {
          verifiedWhenStated = this.verifyWhenStated(assignments, context);
        } else {
          verifiedWhenDerived = this.verifyWhenDerived(context);
        }

        if (verifiedWhenStated || verifiedWhenDerived) {
          verified = true;
        }
      }
    }

    if (verified) {
      context.debug(`...verified the '${propertyAssertionString}' property assertion.`);
    }

    return verified;
  }

  verifyVariable(assignments, stated, context) {
    let variableVerified;

    const variableString = this.variable.getString(),
          propertyAssertionString = this.string; ///

    context.trace(`Verifying the '${propertyAssertionString}' property assertion's '${variableString}' variable...`);

    variableVerified = this.variable.verify(context);

    if (variableVerified) {
      context.debug(`...verified the '${propertyAssertionString}' property assertion's '${variableString}' variable.`);
    }

    return variableVerified;
  }

  verifyPropertyRelation(assignments, stated, context) {
    let propertyRelationVerified;

    const propertyRelationString = this.propertyRelation.getString(),
          propertyAssertionString = this.string; ///

    context.trace(`Verifying the '${propertyAssertionString}' property assertion's '${propertyRelationString}' property relation...`);

    propertyRelationVerified = this.propertyRelation.verify(context);

    if (propertyRelationVerified) {
      context.debug(`...verified the '${propertyAssertionString}' property assertion's '${propertyRelationString}' property relation.`);
    }

    return propertyRelationVerified;
  }

  verifyWhenStated(assignments, context) {
    let verifiedWhenStated = false;

    const propertyAssertionString = this.string; ///

    context.trace(`Verifying the '${propertyAssertionString}' stated property assertion...`);

    if (assignments !== null) {
      const variableName = this.variable.getName(),
            variable = context.findVariableByVariableName(variableName);

      debugger

    }

    verifiedWhenStated = true;

    if (verifiedWhenStated) {
      context.debug(`...verified the '${propertyAssertionString}' stated property assertion.`);
    }

    return verifiedWhenStated;
  }

  verifyWhenDerived(assignments, context) {
    let verifiedWhenDerived = false;

    const propertyAssertionString = this.string; ///

    context.trace(`Verifying the '${propertyAssertionString}' derived property assertion...`);

    debugger

    if (verifiedWhenDerived) {
      context.debug(`...verified the '${propertyAssertionString}' derived property assertion.`);
    }

    return verifiedWhenDerived;
  }

  static name = "PropertyAssertion";

  static fromStatementNode(statementNode, context) {
    let propertyAssertion = null;

    const propertyAssertionNode = propertyAssertionNodeQuery(statementNode);

    if (propertyAssertionNode !== null) {
      const { Variable, PropertyRelation } = dom,
            node = propertyAssertionNode,  ///
            string = context.nodeAsString(node),
            tokens = context.nodeAsTokens(node),
            variableNode = variableNodeQuery(propertyAssertionNode),
            propertyRelationNode = propertyRelationNodeQuery(propertyAssertionNode),
            variable = Variable.fromVariableNode(variableNode, context),
            propertyRelation = PropertyRelation.fromPropertyRelationNode(propertyRelationNode, context);

      propertyAssertion = new PropertyAssertion(string, node, tokens, variable, propertyRelation);
    }

    return propertyAssertion;
  }
});
