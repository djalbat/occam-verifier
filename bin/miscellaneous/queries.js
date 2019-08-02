'use strict';

const dom = require('occam-dom');

const { Query } = dom;

const termNodeQuery = nodeQuery(Query.fromExpression('//term', 1)),
      equalityNodeQuery = nodeQuery(Query.fromExpression('//equality', 1)),
      statementNodeQuery = nodeQuery(Query.fromExpression('//statement', 1)),
			nameTerminalNodeQuery = nodeQuery(Query.fromExpression('//name/@*')),
      qualificationNodeQuery = nodeQuery(Query.fromExpression('//qualification', 1)),
			keywordTerminalNodeQuery = nodeQuery(Query.fromExpression('//@keyword', 1)),
      typeDeclarationNodeQuery = nodeQuery(Query.fromExpression('//typeDeclaration', 1)),
			termNameTerminalNodeQuery = nodeQuery(Query.fromExpression('/term/name/@*')),
			typesDeclarationNodeQuery = nodeQuery(Query.fromExpression('//typesDeclaration', 1)),
      typeNameTerminalNodeQuery = nodeQuery(Query.fromExpression('//typeName/@*')),
      qualifiedStatementNodeQuery = nodeQuery(Query.fromExpression('//qualifiedStatement', 1)),
      parenthesisedLabelsNodeQuery = nodeQuery(Query.fromExpression('//parenthesisedLabels', 1)),
      variableDeclarationNodeQuery = nodeQuery(Query.fromExpression('//variableDeclaration', 1)),
      variablesDeclarationNodeQuery = nodeQuery(Query.fromExpression('//variablesDeclaration', 1)),
      unqualifiedStatementNodeQuery = nodeQuery(Query.fromExpression('//unqualifiedStatement', 1)),
      indicativeConditionalNodeQuery = nodeQuery(Query.fromExpression('//indicativeConditional', 1)),
      constructorDeclarationNodeQuery = nodeQuery(Query.fromExpression('//constructorDeclaration', 1)),
      constructorsDeclarationNodeQuery = nodeQuery(Query.fromExpression('//constructorsDeclaration', 1)),
      expressionTermNameTerminalNodeQuery = nodeQuery(Query.fromExpression('/expression/term/name/@*')),
			expressionNodesQuery = nodesQuery(Query.fromExpression('//expression', 1)),
			typeDeclarationNodesQuery = nodesQuery(Query.fromExpression('//typeDeclaration', 1)),
			typeNameTerminalNodesQuery = nodesQuery(Query.fromExpression('//typeName/@*')),
			labelNameTerminalNodesQuery = nodesQuery(Query.fromExpression('//labelName/@*')),
			axiomOrDeclarationNodesQuery = nodesQuery(Query.fromExpression('//axiom|declaration', 1)),
			variableDeclarationNodesQuery = nodesQuery(Query.fromExpression('//variableDeclaration', 1)),
			constructorDeclarationNodesQuery = nodesQuery(Query.fromExpression('//constructorDeclaration', 1));

module.exports = {
  termNodeQuery,
  equalityNodeQuery,
  statementNodeQuery,
	nameTerminalNodeQuery,
  qualificationNodeQuery,
	keywordTerminalNodeQuery,
  typeDeclarationNodeQuery,
	termNameTerminalNodeQuery,
	typesDeclarationNodeQuery,
  typeNameTerminalNodeQuery,
  qualifiedStatementNodeQuery,
  parenthesisedLabelsNodeQuery,
  variableDeclarationNodeQuery,
  variablesDeclarationNodeQuery,
  unqualifiedStatementNodeQuery,
  indicativeConditionalNodeQuery,
  constructorDeclarationNodeQuery,
  constructorsDeclarationNodeQuery,
  expressionTermNameTerminalNodeQuery,
	expressionNodesQuery,
	typeDeclarationNodesQuery,
	typeNameTerminalNodesQuery,
	labelNameTerminalNodesQuery,
	axiomOrDeclarationNodesQuery,
	variableDeclarationNodesQuery,
	constructorDeclarationNodesQuery
};

function nodeQuery(query) {
  return function(node) {
    const nodes = query.execute(node);

    node = nodes.shift(); ///

    return node;
  };
}

function nodesQuery(query) {
  return function(node) {
    const nodes = query.execute(node);

    return nodes;
  };
}