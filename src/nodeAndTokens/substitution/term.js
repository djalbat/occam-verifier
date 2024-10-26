"use strict";

import NodeAndTokens from "../../nodeAndTokens";

import { ruleFromBNF } from "../../nodeAndTokens";

const bnf = `

            _ ::= termSubstitution... <END_OF_LINE> ;
            
      `,
      rule = ruleFromBNF(bnf);

export default class TermSubstitutionNodeAndTokens extends NodeAndTokens {
  static rule = rule;

  static fromString(string, context) { return NodeAndTokens.fromString(TermSubstitutionNodeAndTokens, string, context); }
}
