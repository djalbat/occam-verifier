"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return unifyConsequentAgainstStatement;
    }
});
var _local = /*#__PURE__*/ _interop_require_default(require("../context/local"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function unifyConsequentAgainstStatement(consequentA, statementNodeB, substitutions, fileContextA, localContextB) {
    var consequentUnified = false;
    var consequentAStatementNode = consequentA.getStatementNode();
    if (consequentAStatementNode !== null) {
        var localContextA = _local.default.fromFileContext(fileContextA), statementNodeA = consequentAStatementNode, statementStringA = localContextA.nodeAsString(statementNodeA), statementStringB = localContextB.nodeAsString(statementNodeB);
        substitutions.snapshot();
        localContextB.trace("Unifying the '".concat(statementStringB, "' statement against the consequent's '").concat(statementStringA, "' statement..."), statementNodeB);
        var statementUnified = consequentA.unifyStatement(statementNodeB, substitutions, localContextA, localContextB);
        consequentUnified = statementUnified; ///
        consequentUnified ? substitutions.continue() : substitutions.rollback(localContextA, localContextB);
        if (consequentUnified) {
            localContextB.debug("...unified the '".concat(statementStringB, "' statement against the consequent's '").concat(statementStringA, "' statement."), statementNodeB);
        }
    }
    return consequentUnified;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bmlmeS9jb25zZXF1ZW50QWdhaW5zdFN0YXRlbWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IExvY2FsQ29udGV4dCBmcm9tIFwiLi4vY29udGV4dC9sb2NhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmlmeUNvbnNlcXVlbnRBZ2FpbnN0U3RhdGVtZW50KGNvbnNlcXVlbnRBLCBzdGF0ZW1lbnROb2RlQiwgc3Vic3RpdHV0aW9ucywgZmlsZUNvbnRleHRBLCBsb2NhbENvbnRleHRCKSB7XG4gIGxldCBjb25zZXF1ZW50VW5pZmllZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGNvbnNlcXVlbnRBU3RhdGVtZW50Tm9kZSA9IGNvbnNlcXVlbnRBLmdldFN0YXRlbWVudE5vZGUoKTtcblxuICBpZiAoY29uc2VxdWVudEFTdGF0ZW1lbnROb2RlICE9PSBudWxsKSB7XG4gICAgY29uc3QgbG9jYWxDb250ZXh0QSA9IExvY2FsQ29udGV4dC5mcm9tRmlsZUNvbnRleHQoZmlsZUNvbnRleHRBKSxcbiAgICAgICAgICBzdGF0ZW1lbnROb2RlQSA9IGNvbnNlcXVlbnRBU3RhdGVtZW50Tm9kZSwgIC8vL1xuICAgICAgICAgIHN0YXRlbWVudFN0cmluZ0EgPSBsb2NhbENvbnRleHRBLm5vZGVBc1N0cmluZyhzdGF0ZW1lbnROb2RlQSksXG4gICAgICAgICAgc3RhdGVtZW50U3RyaW5nQiA9IGxvY2FsQ29udGV4dEIubm9kZUFzU3RyaW5nKHN0YXRlbWVudE5vZGVCKTtcblxuICAgIHN1YnN0aXR1dGlvbnMuc25hcHNob3QoKTtcblxuICAgIGxvY2FsQ29udGV4dEIudHJhY2UoYFVuaWZ5aW5nIHRoZSAnJHtzdGF0ZW1lbnRTdHJpbmdCfScgc3RhdGVtZW50IGFnYWluc3QgdGhlIGNvbnNlcXVlbnQncyAnJHtzdGF0ZW1lbnRTdHJpbmdBfScgc3RhdGVtZW50Li4uYCwgc3RhdGVtZW50Tm9kZUIpO1xuXG4gICAgY29uc3Qgc3RhdGVtZW50VW5pZmllZCA9IGNvbnNlcXVlbnRBLnVuaWZ5U3RhdGVtZW50KHN0YXRlbWVudE5vZGVCLCBzdWJzdGl0dXRpb25zLCBsb2NhbENvbnRleHRBLCBsb2NhbENvbnRleHRCKTtcblxuICAgIGNvbnNlcXVlbnRVbmlmaWVkID0gc3RhdGVtZW50VW5pZmllZDsgLy8vXG5cbiAgICBjb25zZXF1ZW50VW5pZmllZCA/XG4gICAgICBzdWJzdGl0dXRpb25zLmNvbnRpbnVlKCkgOlxuICAgICAgICBzdWJzdGl0dXRpb25zLnJvbGxiYWNrKGxvY2FsQ29udGV4dEEsIGxvY2FsQ29udGV4dEIpO1xuXG4gICAgaWYgKGNvbnNlcXVlbnRVbmlmaWVkKSB7XG4gICAgICBsb2NhbENvbnRleHRCLmRlYnVnKGAuLi51bmlmaWVkIHRoZSAnJHtzdGF0ZW1lbnRTdHJpbmdCfScgc3RhdGVtZW50IGFnYWluc3QgdGhlIGNvbnNlcXVlbnQncyAnJHtzdGF0ZW1lbnRTdHJpbmdBfScgc3RhdGVtZW50LmAsIHN0YXRlbWVudE5vZGVCKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uc2VxdWVudFVuaWZpZWQ7XG59XG4iXSwibmFtZXMiOlsidW5pZnlDb25zZXF1ZW50QWdhaW5zdFN0YXRlbWVudCIsImNvbnNlcXVlbnRBIiwic3RhdGVtZW50Tm9kZUIiLCJzdWJzdGl0dXRpb25zIiwiZmlsZUNvbnRleHRBIiwibG9jYWxDb250ZXh0QiIsImNvbnNlcXVlbnRVbmlmaWVkIiwiY29uc2VxdWVudEFTdGF0ZW1lbnROb2RlIiwiZ2V0U3RhdGVtZW50Tm9kZSIsImxvY2FsQ29udGV4dEEiLCJMb2NhbENvbnRleHQiLCJmcm9tRmlsZUNvbnRleHQiLCJzdGF0ZW1lbnROb2RlQSIsInN0YXRlbWVudFN0cmluZ0EiLCJub2RlQXNTdHJpbmciLCJzdGF0ZW1lbnRTdHJpbmdCIiwic25hcHNob3QiLCJ0cmFjZSIsInN0YXRlbWVudFVuaWZpZWQiLCJ1bmlmeVN0YXRlbWVudCIsImNvbnRpbnVlIiwicm9sbGJhY2siLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBSUE7OztlQUF3QkE7Ozs0REFGQzs7Ozs7O0FBRVYsU0FBU0EsZ0NBQWdDQyxXQUFXLEVBQUVDLGNBQWMsRUFBRUMsYUFBYSxFQUFFQyxZQUFZLEVBQUVDLGFBQWE7SUFDN0gsSUFBSUMsb0JBQW9CO0lBRXhCLElBQU1DLDJCQUEyQk4sWUFBWU8sZ0JBQWdCO0lBRTdELElBQUlELDZCQUE2QixNQUFNO1FBQ3JDLElBQU1FLGdCQUFnQkMsY0FBWSxDQUFDQyxlQUFlLENBQUNQLGVBQzdDUSxpQkFBaUJMLDBCQUNqQk0sbUJBQW1CSixjQUFjSyxZQUFZLENBQUNGLGlCQUM5Q0csbUJBQW1CVixjQUFjUyxZQUFZLENBQUNaO1FBRXBEQyxjQUFjYSxRQUFRO1FBRXRCWCxjQUFjWSxLQUFLLENBQUMsQUFBQyxpQkFBeUVKLE9BQXpERSxrQkFBaUIsMENBQXlELE9BQWpCRixrQkFBaUIsbUJBQWlCWDtRQUVoSSxJQUFNZ0IsbUJBQW1CakIsWUFBWWtCLGNBQWMsQ0FBQ2pCLGdCQUFnQkMsZUFBZU0sZUFBZUo7UUFFbEdDLG9CQUFvQlksa0JBQWtCLEdBQUc7UUFFekNaLG9CQUNFSCxjQUFjaUIsUUFBUSxLQUNwQmpCLGNBQWNrQixRQUFRLENBQUNaLGVBQWVKO1FBRTFDLElBQUlDLG1CQUFtQjtZQUNyQkQsY0FBY2lCLEtBQUssQ0FBQyxBQUFDLG1CQUEyRVQsT0FBekRFLGtCQUFpQiwwQ0FBeUQsT0FBakJGLGtCQUFpQixpQkFBZVg7UUFDbEk7SUFDRjtJQUVBLE9BQU9JO0FBQ1QifQ==