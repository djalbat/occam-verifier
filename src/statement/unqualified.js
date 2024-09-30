"use strict";

import Statement from "../statement";

import { trim } from "../utilities/string";
import { nodeQuery } from "../utilities/query";

const statementNodeQuery = nodeQuery("/unqualifiedStatement/statement");

export default class UnqualifiedStatement {
  constructor(string, statement) {
    this.string = string;
    this.statement = statement;
  }

  getString() {
    return this.string;
  }

  getStatement() {
    return this.statement;
  }

  verify(assignments, stated, localContext) {
    let verified = false;

    const unqualifiedStatementString = this.string;

    if (this.statement !== null) {
      localContext.trace(`Verifying the '${unqualifiedStatementString}' unqualified statement...`);

      const statementUnified = this.statement.unify(assignments, stated, localContext);

      if (statementUnified) {
        verified = true;
      } else {
        const statementVerified = this.statement.verify(assignments, stated, localContext);

        if (statementVerified) {
          verified = true;
        }
      }

      if (verified) {
        localContext.debug(`...verified the '${unqualifiedStatementString}' unqualified statement.`);
      }
    } else {
      localContext.debug(`The '${unqualifiedStatementString}' unqualified statement cannot be verified because it is nonsense.`);
    }

    return verified;
  }

  static fromUnqualifiedStatementNode(unqualifiedStatementNode, fileContext) {
    const statementNode = statementNodeQuery(unqualifiedStatementNode),
          statement = (statementNode !== null) ?
                        Statement.fromStatementNode(statementNode, fileContext) :
                          null,
          node = unqualifiedStatementNode,  ///
          string = trim(fileContext.nodeAsString(node)),
          unqualifiedStatement = new UnqualifiedStatement(string, statement);

    return unqualifiedStatement;
  }
}
