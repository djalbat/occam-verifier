"use strict";

const queries = require("../miscellaneous/queries"),
      verifyUtilities = require("../utilities/verify");

const { verifyStatement } = verifyUtilities,
      { qualificationNodeQuery, statementNodeQuery } = queries;

function verifyQualifiedStatement(qualifiedStatementNode, context, ruleMap) {
  const statementNode = statementNodeQuery(qualifiedStatementNode);

  verifyStatement(statementNode, context, ruleMap);

  const qualificationNode = qualificationNodeQuery(qualifiedStatementNode);

  if (qualificationNode !== undefined) {
    debugger
  }
}

module.exports = verifyQualifiedStatement;
