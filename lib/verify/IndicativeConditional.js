"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return verifyIndicativeConditional;
    }
});
var _unqualified = /*#__PURE__*/ _interopRequireDefault(require("../verify/metastatement/unqualified"));
var _query = require("../utilities/query");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var unqualifiedStatementNodesQuery = (0, _query.nodesQuery)("/indicativeConditional/unqualifiedStatement");
function verifyIndicativeConditional(indicativeConditionalNode, statementNodes, context) {
    var unqualifiedStatementNodes = unqualifiedStatementNodesQuery(indicativeConditionalNode), indicativeConditionalVerified = unqualifiedStatementNodes.every(function(unqualifiedStatementNode) {
        var unqualifiedStatementVerified = (0, _unqualified.default)(unqualifiedStatementNode, context);
        if (unqualifiedStatementVerified) {
            return true;
        }
    });
    return indicativeConditionalVerified;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92ZXJpZnkvSW5kaWNhdGl2ZUNvbmRpdGlvbmFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgdmVyaWZ5VW5xdWFsaWZpZWRTdGF0ZW1lbnQgZnJvbSBcIi4uL3ZlcmlmeS9tZXRhc3RhdGVtZW50L3VucXVhbGlmaWVkXCI7XG5cbmltcG9ydCB7IG5vZGVzUXVlcnkgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3F1ZXJ5XCI7XG5cbmNvbnN0IHVucXVhbGlmaWVkU3RhdGVtZW50Tm9kZXNRdWVyeSA9IG5vZGVzUXVlcnkoXCIvaW5kaWNhdGl2ZUNvbmRpdGlvbmFsL3VucXVhbGlmaWVkU3RhdGVtZW50XCIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2ZXJpZnlJbmRpY2F0aXZlQ29uZGl0aW9uYWwoaW5kaWNhdGl2ZUNvbmRpdGlvbmFsTm9kZSwgc3RhdGVtZW50Tm9kZXMsIGNvbnRleHQpIHtcbiAgY29uc3QgdW5xdWFsaWZpZWRTdGF0ZW1lbnROb2RlcyA9IHVucXVhbGlmaWVkU3RhdGVtZW50Tm9kZXNRdWVyeShpbmRpY2F0aXZlQ29uZGl0aW9uYWxOb2RlKSxcbiAgICAgICAgaW5kaWNhdGl2ZUNvbmRpdGlvbmFsVmVyaWZpZWQgPSB1bnF1YWxpZmllZFN0YXRlbWVudE5vZGVzLmV2ZXJ5KCh1bnF1YWxpZmllZFN0YXRlbWVudE5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCB1bnF1YWxpZmllZFN0YXRlbWVudFZlcmlmaWVkID0gdmVyaWZ5VW5xdWFsaWZpZWRTdGF0ZW1lbnQodW5xdWFsaWZpZWRTdGF0ZW1lbnROb2RlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmICh1bnF1YWxpZmllZFN0YXRlbWVudFZlcmlmaWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gIHJldHVybiBpbmRpY2F0aXZlQ29uZGl0aW9uYWxWZXJpZmllZDtcbn1cbiJdLCJuYW1lcyI6WyJ2ZXJpZnlJbmRpY2F0aXZlQ29uZGl0aW9uYWwiLCJ1bnF1YWxpZmllZFN0YXRlbWVudE5vZGVzUXVlcnkiLCJub2Rlc1F1ZXJ5IiwiaW5kaWNhdGl2ZUNvbmRpdGlvbmFsTm9kZSIsInN0YXRlbWVudE5vZGVzIiwiY29udGV4dCIsInVucXVhbGlmaWVkU3RhdGVtZW50Tm9kZXMiLCJpbmRpY2F0aXZlQ29uZGl0aW9uYWxWZXJpZmllZCIsImV2ZXJ5IiwidW5xdWFsaWZpZWRTdGF0ZW1lbnROb2RlIiwidW5xdWFsaWZpZWRTdGF0ZW1lbnRWZXJpZmllZCIsInZlcmlmeVVucXVhbGlmaWVkU3RhdGVtZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFRQTs7O2VBQXdCQTs7O2dFQU5lO3FCQUVaOzs7Ozs7QUFFM0IsSUFBTUMsaUNBQWlDQyxJQUFBQSxpQkFBVSxFQUFDO0FBRW5DLFNBQVNGLDRCQUE0QkcseUJBQXlCLEVBQUVDLGNBQWMsRUFBRUMsT0FBTyxFQUFFO0lBQ3RHLElBQU1DLDRCQUE0QkwsK0JBQStCRSw0QkFDM0RJLGdDQUFnQ0QsMEJBQTBCRSxLQUFLLENBQUMsU0FBQ0MsMEJBQTZCO1FBQzVGLElBQU1DLCtCQUErQkMsSUFBQUEsb0JBQTBCLEVBQUNGLDBCQUEwQko7UUFFMUYsSUFBSUssOEJBQThCO1lBQ2hDLE9BQU8sSUFBSTtRQUNiLENBQUM7SUFDSDtJQUVOLE9BQU9IO0FBQ1QifQ==