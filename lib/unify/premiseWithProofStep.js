"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return unifyPremiseWithProofStep;
    }
});
var _unify = require("../utilities/unify");
function unifyPremiseWithProofStep(premiseA, proofStepB, substitutions, localContextA, localContextB) {
    var premiseUnified = false;
    var premiseAStatementNode = premiseA.getStatementNode();
    if (premiseAStatementNode !== null) {
        var proofStepBSubproofNode = proofStepB.getSubproofNode(), proofStepBStatementNode = proofStepB.getStatementNode(), subproofNodeB = proofStepBSubproofNode, statementNodeB = proofStepBStatementNode, statementNodeA = premiseAStatementNode, statementStringA = localContextA.nodeAsString(statementNodeA);
        substitutions.snapshot();
        if (subproofNodeB !== null) {
            var subproofStringB = (0, _unify.subproofNodeAsSubproofString)(subproofNodeB, localContextB);
            localContextB.trace("Unifying the '".concat(subproofStringB, "' subproof with the premise's '").concat(statementStringA, "' statement..."), subproofNodeB);
            var subproofUnified = premiseA.unifySubproof(subproofNodeB, substitutions, localContextA, localContextB);
            if (subproofUnified) {
                localContextB.debug("...unified the '".concat(subproofStringB, "' subproof with the premise's '").concat(statementStringA, "' statement."), subproofNodeB);
                premiseUnified = true;
            }
        }
        if (statementNodeB !== null) {
            var statementStringB = localContextB.nodeAsString(statementNodeB);
            localContextB.trace("Unifying the '".concat(statementStringB, "' statement with the premise's '").concat(statementStringA, "' statement..."), statementNodeB);
            var statementUnified = premiseA.unifyStatement(statementNodeB, substitutions, localContextA, localContextB);
            if (statementUnified) {
                localContextB.debug("...unified the '".concat(statementStringB, "' statement with the premise's '").concat(statementStringA, "' statement."), statementNodeB);
                premiseUnified = true;
            }
        }
        premiseUnified ? substitutions.continue() : substitutions.rollback(localContextA, localContextB);
    }
    return premiseUnified;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bmlmeS9wcmVtaXNlV2l0aFByb29mU3RlcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc3VicHJvb2ZOb2RlQXNTdWJwcm9vZlN0cmluZyB9IGZyb20gXCIuLi91dGlsaXRpZXMvdW5pZnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pZnlQcmVtaXNlV2l0aFByb29mU3RlcChwcmVtaXNlQSwgcHJvb2ZTdGVwQiwgc3Vic3RpdHV0aW9ucywgbG9jYWxDb250ZXh0QSwgbG9jYWxDb250ZXh0Qikge1xuICBsZXQgcHJlbWlzZVVuaWZpZWQgPSBmYWxzZTtcblxuICBjb25zdCBwcmVtaXNlQVN0YXRlbWVudE5vZGUgPSBwcmVtaXNlQS5nZXRTdGF0ZW1lbnROb2RlKCk7XG5cbiAgaWYgKHByZW1pc2VBU3RhdGVtZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHByb29mU3RlcEJTdWJwcm9vZk5vZGUgPSBwcm9vZlN0ZXBCLmdldFN1YnByb29mTm9kZSgpLFxuICAgICAgICAgIHByb29mU3RlcEJTdGF0ZW1lbnROb2RlID0gcHJvb2ZTdGVwQi5nZXRTdGF0ZW1lbnROb2RlKCksXG4gICAgICAgICAgc3VicHJvb2ZOb2RlQiA9IHByb29mU3RlcEJTdWJwcm9vZk5vZGUsIC8vL1xuICAgICAgICAgIHN0YXRlbWVudE5vZGVCID0gcHJvb2ZTdGVwQlN0YXRlbWVudE5vZGUsIC8vL1xuICAgICAgICAgIHN0YXRlbWVudE5vZGVBID0gcHJlbWlzZUFTdGF0ZW1lbnROb2RlLCAvLy9cbiAgICAgICAgICBzdGF0ZW1lbnRTdHJpbmdBID0gbG9jYWxDb250ZXh0QS5ub2RlQXNTdHJpbmcoc3RhdGVtZW50Tm9kZUEpXG5cbiAgICBzdWJzdGl0dXRpb25zLnNuYXBzaG90KCk7XG5cbiAgICBpZiAoc3VicHJvb2ZOb2RlQiAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3VicHJvb2ZTdHJpbmdCID0gc3VicHJvb2ZOb2RlQXNTdWJwcm9vZlN0cmluZyhzdWJwcm9vZk5vZGVCLCBsb2NhbENvbnRleHRCKTtcblxuICAgICAgbG9jYWxDb250ZXh0Qi50cmFjZShgVW5pZnlpbmcgdGhlICcke3N1YnByb29mU3RyaW5nQn0nIHN1YnByb29mIHdpdGggdGhlIHByZW1pc2UncyAnJHtzdGF0ZW1lbnRTdHJpbmdBfScgc3RhdGVtZW50Li4uYCwgc3VicHJvb2ZOb2RlQik7XG5cbiAgICAgIGNvbnN0IHN1YnByb29mVW5pZmllZCA9IHByZW1pc2VBLnVuaWZ5U3VicHJvb2Yoc3VicHJvb2ZOb2RlQiwgc3Vic3RpdHV0aW9ucywgbG9jYWxDb250ZXh0QSwgbG9jYWxDb250ZXh0Qik7XG5cbiAgICAgIGlmIChzdWJwcm9vZlVuaWZpZWQpIHtcbiAgICAgICAgbG9jYWxDb250ZXh0Qi5kZWJ1ZyhgLi4udW5pZmllZCB0aGUgJyR7c3VicHJvb2ZTdHJpbmdCfScgc3VicHJvb2Ygd2l0aCB0aGUgcHJlbWlzZSdzICcke3N0YXRlbWVudFN0cmluZ0F9JyBzdGF0ZW1lbnQuYCwgc3VicHJvb2ZOb2RlQik7XG5cbiAgICAgICAgcHJlbWlzZVVuaWZpZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGF0ZW1lbnROb2RlQiAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3RhdGVtZW50U3RyaW5nQiA9IGxvY2FsQ29udGV4dEIubm9kZUFzU3RyaW5nKHN0YXRlbWVudE5vZGVCKTtcblxuICAgICAgbG9jYWxDb250ZXh0Qi50cmFjZShgVW5pZnlpbmcgdGhlICcke3N0YXRlbWVudFN0cmluZ0J9JyBzdGF0ZW1lbnQgd2l0aCB0aGUgcHJlbWlzZSdzICcke3N0YXRlbWVudFN0cmluZ0F9JyBzdGF0ZW1lbnQuLi5gLCBzdGF0ZW1lbnROb2RlQik7XG5cbiAgICAgIGNvbnN0IHN0YXRlbWVudFVuaWZpZWQgPSBwcmVtaXNlQS51bmlmeVN0YXRlbWVudChzdGF0ZW1lbnROb2RlQiwgc3Vic3RpdHV0aW9ucywgbG9jYWxDb250ZXh0QSwgbG9jYWxDb250ZXh0Qik7XG5cbiAgICAgIGlmIChzdGF0ZW1lbnRVbmlmaWVkKSB7XG4gICAgICAgIGxvY2FsQ29udGV4dEIuZGVidWcoYC4uLnVuaWZpZWQgdGhlICcke3N0YXRlbWVudFN0cmluZ0J9JyBzdGF0ZW1lbnQgd2l0aCB0aGUgcHJlbWlzZSdzICcke3N0YXRlbWVudFN0cmluZ0F9JyBzdGF0ZW1lbnQuYCwgc3RhdGVtZW50Tm9kZUIpO1xuXG4gICAgICAgIHByZW1pc2VVbmlmaWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVtaXNlVW5pZmllZCA/XG4gICAgICBzdWJzdGl0dXRpb25zLmNvbnRpbnVlKCkgOlxuICAgICAgICBzdWJzdGl0dXRpb25zLnJvbGxiYWNrKGxvY2FsQ29udGV4dEEsIGxvY2FsQ29udGV4dEIpO1xuICB9XG5cbiAgcmV0dXJuIHByZW1pc2VVbmlmaWVkO1xufVxuIl0sIm5hbWVzIjpbInVuaWZ5UHJlbWlzZVdpdGhQcm9vZlN0ZXAiLCJwcmVtaXNlQSIsInByb29mU3RlcEIiLCJzdWJzdGl0dXRpb25zIiwibG9jYWxDb250ZXh0QSIsImxvY2FsQ29udGV4dEIiLCJwcmVtaXNlVW5pZmllZCIsInByZW1pc2VBU3RhdGVtZW50Tm9kZSIsImdldFN0YXRlbWVudE5vZGUiLCJwcm9vZlN0ZXBCU3VicHJvb2ZOb2RlIiwiZ2V0U3VicHJvb2ZOb2RlIiwicHJvb2ZTdGVwQlN0YXRlbWVudE5vZGUiLCJzdWJwcm9vZk5vZGVCIiwic3RhdGVtZW50Tm9kZUIiLCJzdGF0ZW1lbnROb2RlQSIsInN0YXRlbWVudFN0cmluZ0EiLCJub2RlQXNTdHJpbmciLCJzbmFwc2hvdCIsInN1YnByb29mU3RyaW5nQiIsInN1YnByb29mTm9kZUFzU3VicHJvb2ZTdHJpbmciLCJ0cmFjZSIsInN1YnByb29mVW5pZmllZCIsInVuaWZ5U3VicHJvb2YiLCJkZWJ1ZyIsInN0YXRlbWVudFN0cmluZ0IiLCJzdGF0ZW1lbnRVbmlmaWVkIiwidW5pZnlTdGF0ZW1lbnQiLCJjb250aW51ZSIsInJvbGxiYWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFJQTs7O2VBQXdCQTs7O3FCQUZxQjtBQUU5QixTQUFTQSwwQkFBMEJDLFFBQVEsRUFBRUMsVUFBVSxFQUFFQyxhQUFhLEVBQUVDLGFBQWEsRUFBRUMsYUFBYTtJQUNqSCxJQUFJQyxpQkFBaUI7SUFFckIsSUFBTUMsd0JBQXdCTixTQUFTTyxnQkFBZ0I7SUFFdkQsSUFBSUQsMEJBQTBCLE1BQU07UUFDbEMsSUFBTUUseUJBQXlCUCxXQUFXUSxlQUFlLElBQ25EQywwQkFBMEJULFdBQVdNLGdCQUFnQixJQUNyREksZ0JBQWdCSCx3QkFDaEJJLGlCQUFpQkYseUJBQ2pCRyxpQkFBaUJQLHVCQUNqQlEsbUJBQW1CWCxjQUFjWSxZQUFZLENBQUNGO1FBRXBEWCxjQUFjYyxRQUFRO1FBRXRCLElBQUlMLGtCQUFrQixNQUFNO1lBQzFCLElBQU1NLGtCQUFrQkMsSUFBQUEsbUNBQTRCLEVBQUNQLGVBQWVQO1lBRXBFQSxjQUFjZSxLQUFLLENBQUMsQUFBQyxpQkFBaUVMLE9BQWpERyxpQkFBZ0IsbUNBQWtELE9BQWpCSCxrQkFBaUIsbUJBQWlCSDtZQUV4SCxJQUFNUyxrQkFBa0JwQixTQUFTcUIsYUFBYSxDQUFDVixlQUFlVCxlQUFlQyxlQUFlQztZQUU1RixJQUFJZ0IsaUJBQWlCO2dCQUNuQmhCLGNBQWNrQixLQUFLLENBQUMsQUFBQyxtQkFBbUVSLE9BQWpERyxpQkFBZ0IsbUNBQWtELE9BQWpCSCxrQkFBaUIsaUJBQWVIO2dCQUV4SE4saUJBQWlCO1lBQ25CO1FBQ0Y7UUFFQSxJQUFJTyxtQkFBbUIsTUFBTTtZQUMzQixJQUFNVyxtQkFBbUJuQixjQUFjVyxZQUFZLENBQUNIO1lBRXBEUixjQUFjZSxLQUFLLENBQUMsQUFBQyxpQkFBbUVMLE9BQW5EUyxrQkFBaUIsb0NBQW1ELE9BQWpCVCxrQkFBaUIsbUJBQWlCRjtZQUUxSCxJQUFNWSxtQkFBbUJ4QixTQUFTeUIsY0FBYyxDQUFDYixnQkFBZ0JWLGVBQWVDLGVBQWVDO1lBRS9GLElBQUlvQixrQkFBa0I7Z0JBQ3BCcEIsY0FBY2tCLEtBQUssQ0FBQyxBQUFDLG1CQUFxRVIsT0FBbkRTLGtCQUFpQixvQ0FBbUQsT0FBakJULGtCQUFpQixpQkFBZUY7Z0JBRTFIUCxpQkFBaUI7WUFDbkI7UUFDRjtRQUVBQSxpQkFDRUgsY0FBY3dCLFFBQVEsS0FDcEJ4QixjQUFjeUIsUUFBUSxDQUFDeEIsZUFBZUM7SUFDNUM7SUFFQSxPQUFPQztBQUNUIn0=