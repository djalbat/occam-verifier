"use strict";

import dom from "../dom";

import { domAssigned } from "../dom";
import { assignAssignments } from "../utilities/assignments";
import { subproofAssertionFromStatement } from "../utilities/verification";
import { statementFromJSON, procedureCallFromJSON, statementToStatementJSON, procedureCallToProcedureCallJSON } from "../utilities/json";

export default domAssigned(class Supposition {
  constructor(string, statement, procedureCall) {
    this.string = string;
    this.statement = statement;
    this.procedureCall = procedureCall;
  }

  getString() {
    return this.string;
  }

  getStatement() {
    return this.statement;
  }

  getProcedureCall() {
    return this.procedureCall;
  }

  unifyIndependently(substitutions, generalContext, specificContext) {
    let unifiedIndependently;

    if (this.statesment !== null) {
      const statementResolvedIndependently = this.statement.unifyIndependently(substitutions, generalContext, specificContext);

      unifiedIndependently = statementResolvedIndependently;  ///
    }

    if (this.procedureCall !== null) {
      const procedureCallResolvedIndependently = this.procedureCall.unifyIndependently(substitutions, generalContext, specificContext);

      unifiedIndependently = procedureCallResolvedIndependently;  ///
    }

    return unifiedIndependently;
  }

  unifyProofStepSubproof(proofStepSubproof, substitutions, generalContext, specificContext) {
    let proofStepSubproofUnified = false;

    const proofStepSubProofProofStep = proofStepSubproof.isProofStep(),
          subproof = proofStepSubProofProofStep ?
                       null :
                         proofStepSubproof,
          proofStep = proofStepSubProofProofStep ?
                        proofStepSubproof :
                          null;

    substitutions.snapshot();

    if (subproof !== null) {
      const subproofUnified = this.unifySubproof(subproof, substitutions, generalContext, specificContext);

      proofStepSubproofUnified = subproofUnified; ///
    }

    if (proofStep !== null) {
      const statementUnified = this.unifyProofStep(proofStep, substitutions, generalContext, specificContext);

      proofStepSubproofUnified = statementUnified;  ///
    }

    if (proofStepSubproofUnified) {
      substitutions.resolve(generalContext, specificContext);
    }

    const context = specificContext;  ///

    proofStepSubproofUnified ?
      substitutions.continue() :
        substitutions.rollback(context);

    return proofStepSubproofUnified;
  }

  unifyProofStep(proofStep, substitutions, generalContext, specificContext) {
    let proofStepUnified;

    const statement = proofStep.getStatement(),
          statementUnified = this.unifyStatement(statement, substitutions, generalContext, specificContext);

    proofStepUnified = statementUnified;  ///

    return proofStepUnified;
  }

  unifySubproof(subproof, substitutions, generalContext, specificContext) {
    let subproofUnified = false;

    const supposition = this, ///
          subproofString = subproof.getString(),
          suppositionStatement = supposition.getStatement(),
          suppositionStatementString = suppositionStatement.getString();

    specificContext.trace(`Unifying the '${subproofString}' subproof with the supposition's '${suppositionStatementString}' statement...`);

    const context = generalContext,
          subproofAssertion = subproofAssertionFromStatement(this.statement, context);

    if (subproofAssertion !== null) {
      subproofUnified = subproofAssertion.unifySubproof(subproof, substitutions, generalContext, specificContext);
    }

    if (subproofUnified) {
      specificContext.debug(`...unified the '${subproofString}' subproof with the supposition's '${suppositionStatementString}' statement.`);
    }

    return subproofUnified;
  }

  unifyStatement(statement, substitutions, generalContext, specificContext) {
    let statementUnified;

    const supposition = this, ///
          suppositionString = supposition.getString(),
          statementString = statement.getString();

    specificContext.trace(`Unifying the '${statementString}' statement with the '${suppositionString}' supposition...`);

    statementUnified = this.statement.unifyStatement(statement, substitutions, generalContext, specificContext);

    if (statementUnified) {
      specificContext.debug(`...unified the '${statementString}' statement with the '${suppositionString}' supposition.`);
    }

    return statementUnified;
  }

  verify(context) {
    let verified = false;

    const suppositionString = this.string; ///

    context.trace(`Verifying the '${suppositionString}' supposition...`);

    if (false) {
      ///
    } else if (this.statement !== null) {
      const stated = true,
            assignments = [],
            statementVerified = this.statement.verify(assignments, stated, context);

      if (statementVerified) {
        const assignmentsAssigned = assignAssignments(assignments, context);

        if (assignmentsAssigned) {
          const { ProofStep } = dom,
                proofStep = ProofStep.fromStatement(this.statement, context),
                proofStepSubproof = proofStep;  ///

          context.addProofStepSubproof(proofStepSubproof);

          verified = true;
        }
      }
    } else if (this.procedureCall !== null) {
      const stated = true,
            assignments = null,
            procedureCallVerified = this.procedureCall.verify(assignments, stated, context);

      if (procedureCallVerified) {
        verified = true;
      }
    } else {
      context.debug(`Unable to verify the '${suppositionString}' supposition because it is nonsense.`);
    }

    if (verified) {
      context.debug(`...verified the '${suppositionString}' supposition.`);
    }

    return verified;
  }

  toJSON() {
    const statementJSON = statementToStatementJSON(this.statement),
          procedureCallJSON = procedureCallToProcedureCallJSON(this.procedureCall),
          statement = statementJSON,  ///
          procedureCall = procedureCallJSON,  ///
          json = {
            statement,
            procedureCall
          };

    return json;
  }

  static name = "Supposition";

  static fromJSON(json, fileContext) {
    const statement = statementFromJSON(json, fileContext),
          procedureCall = procedureCallFromJSON(json, fileContext);

    let string;

    if (statement !== null) {
      string = statement.getString();
    }

    if (procedureCall !== null) {
      string = procedureCall.getString();
    }

    const supposition = new Supposition(string, statement, procedureCall);

    return supposition;
  }

  static fromSuppositionNode(suppositionNode, fileContext) {
    const { Statement, ProcedureCall } = dom,
          statement = Statement.fromSuppositionNode(suppositionNode, fileContext),
          procedureCall = ProcedureCall.fromSuppositionNode(suppositionNode, fileContext);

    let string;

    if (statement !== null) {
      string = statement.getString();
    }

    if (procedureCall !== null) {
      string = procedureCall.getString();
    }

    const supposition = new Supposition(string, statement, procedureCall);

    return supposition
  }
});
