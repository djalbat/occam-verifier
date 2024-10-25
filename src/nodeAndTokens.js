"use strict";

import { BNFLexer } from "occam-lexers";
import { BNFParser } from "occam-parsers";
import { arrayUtilities } from "necessary";

import { nodeQuery } from "./utilities/query";

const { first } = arrayUtilities;

const bnfLexer = BNFLexer.fromNothing(),
      bnfParser = BNFParser.fromNothing();

const childNodeQuery = nodeQuery("/*/*!");

export default class NodeAndTokens {
  constructor(node, tokens) {
    this.node = node;
    this.tokens = tokens;
  }

  getNode() {
    return this.node;
  }

  getTokens() {
    return this.tokens;
  }

  static fromString(Class, string, context) {
    const { rule } = Class,
          lexer = context.getLexer(),
          parser = context.getParser(),
          ruleMap = parser.getRuleMap(),
          ruleName = rule.getName();

    ruleMap[ruleName] = rule;

    const startRule = rule, ///
          content = `${string}
`;

    let tokens = lexer.tokenise(content),
        node = parser.parse(tokens, startRule);

    delete  ruleMap[ruleName];

    const childNode = childNodeQuery(node);

    node = childNode; ///

    tokens = tokensFromTokensAndNode(tokens, node);  ///

    const nodeAndTokens = new Class(node, tokens);

    return nodeAndTokens;
  }
}

export function ruleFromBNF(bnf) {
  const tokens = bnfLexer.tokensFromBNF(bnf),
        rules = bnfParser.rulesFromTokens(tokens),
        firstRule = first(rules),
        rule = firstRule; ///

  return rule;
}

function tokensFromTokensAndNode(tokens, node) {
  const lastSignificantTokenIndex = node.getLastSignificantTokenIndex(tokens),
        firstSignificantTokenIndex = node.getFirstSignificantTokenIndex(tokens),
        start = firstSignificantTokenIndex, ///
        end = lastSignificantTokenIndex + 1;

  tokens = tokens.slice(start, end);  ///

  return tokens;
}
