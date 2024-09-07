"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return verifyContainedAssertion;
    }
});
var _metaLevel = /*#__PURE__*/ _interop_require_default(require("../../verifier/metaLevel"));
var _verify = require("../../utilities/verify");
var _query = require("../../utilities/query");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var termNodeQuery = (0, _query.nodeQuery)("/statement/term!"), statementTermNodesQuery = (0, _query.nodesQuery)("/statement/metaArgument/statement//term");
function verifyContainedAssertion(containedAssertionNode, assignments, derived, localContext) {
    var containedAssertionVerified;
    var containedAssertionString = localContext.nodeAsString(containedAssertionNode);
    localContext.trace("Verifying the '".concat(containedAssertionString, "' contained assertion..."), containedAssertionNode);
    var verifyContainedAssertionFunctions = [
        verifyDerivedContainedAssertion,
        verifyStatedContainedAssertion
    ];
    containedAssertionVerified = verifyContainedAssertionFunctions.some(function(verifyContainedAssertionFunction) {
        var containedAssertionVerified = verifyContainedAssertionFunction(containedAssertionNode, assignments, derived, localContext);
        if (containedAssertionVerified) {
            return true;
        }
    });
    if (containedAssertionVerified) {
        localContext.debug("...verified the '".concat(containedAssertionString, "' contained assertion."), containedAssertionNode);
    }
    return containedAssertionVerified;
}
function verifyDerivedContainedAssertion(containedAssertionNode, assignments, derived, localContext) {
    var derivedContainedAssertionVerified = false;
    if (derived) {
        var containedAssertionString = localContext.nodeAsString(containedAssertionNode);
        localContext.trace("Verifying the '".concat(containedAssertionString, "' derived contained assertion..."), containedAssertionNode);
        var assertionNegated = (0, _verify.isAssertionNegated)(containedAssertionNode), termNode = termNodeQuery(containedAssertionNode), negated = assertionNegated, statementTermNodes = statementTermNodesQuery(containedAssertionNode), termNodeMatchesMetaArgumentVariableNode = statementTermNodes.some(function(statementTermNode) {
            var termNodeMatchesMetaArgumentVariableNode = termNode.match(statementTermNode);
            if (termNodeMatchesMetaArgumentVariableNode) {
                return true;
            }
        });
        if (!negated) {
            if (termNodeMatchesMetaArgumentVariableNode) {
                derivedContainedAssertionVerified = true;
            }
        }
        if (negated) {
            if (!termNodeMatchesMetaArgumentVariableNode) {
                derivedContainedAssertionVerified = true;
            }
        }
        if (derivedContainedAssertionVerified) {
            localContext.debug("...verified the '".concat(containedAssertionString, "' derived contained assertion."), containedAssertionNode);
        }
    }
    return derivedContainedAssertionVerified;
}
function verifyStatedContainedAssertion(containedAssertionNode, assignments, derived, localContext) {
    var statedContainedAssertionVerified = false;
    if (!derived) {
        var containedAssertionString = localContext.nodeAsString(containedAssertionNode);
        localContext.debug("The '".concat(containedAssertionString, "' stated contained assertion cannot be verified."), containedAssertionNode);
        var verified = _metaLevel.default.verify(containedAssertionNode, localContext);
        statedContainedAssertionVerified = verified; ///
        if (statedContainedAssertionVerified) {
            localContext.debug("...verified the '".concat(containedAssertionString, "' stated contained assertion."), containedAssertionNode);
        }
    }
    return statedContainedAssertionVerified;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92ZXJpZnkvYXNzZXJ0aW9uL2NvbnRhaW5lZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG1ldGFMZXZlbFZlcmlmaWVyIGZyb20gXCIuLi8uLi92ZXJpZmllci9tZXRhTGV2ZWxcIjtcblxuaW1wb3J0IHsgaXNBc3NlcnRpb25OZWdhdGVkIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy92ZXJpZnlcIjtcbmltcG9ydCB7IG5vZGVRdWVyeSwgbm9kZXNRdWVyeSB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcXVlcnlcIjtcblxuY29uc3QgdGVybU5vZGVRdWVyeSA9IG5vZGVRdWVyeShcIi9zdGF0ZW1lbnQvdGVybSFcIiksXG4gICAgICBzdGF0ZW1lbnRUZXJtTm9kZXNRdWVyeSA9IG5vZGVzUXVlcnkoXCIvc3RhdGVtZW50L21ldGFBcmd1bWVudC9zdGF0ZW1lbnQvL3Rlcm1cIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeUNvbnRhaW5lZEFzc2VydGlvbihjb250YWluZWRBc3NlcnRpb25Ob2RlLCBhc3NpZ25tZW50cywgZGVyaXZlZCwgbG9jYWxDb250ZXh0KSB7XG4gIGxldCBjb250YWluZWRBc3NlcnRpb25WZXJpZmllZDtcblxuICBjb25zdCBjb250YWluZWRBc3NlcnRpb25TdHJpbmcgPSBsb2NhbENvbnRleHQubm9kZUFzU3RyaW5nKGNvbnRhaW5lZEFzc2VydGlvbk5vZGUpO1xuXG4gIGxvY2FsQ29udGV4dC50cmFjZShgVmVyaWZ5aW5nIHRoZSAnJHtjb250YWluZWRBc3NlcnRpb25TdHJpbmd9JyBjb250YWluZWQgYXNzZXJ0aW9uLi4uYCwgY29udGFpbmVkQXNzZXJ0aW9uTm9kZSk7XG5cbiAgY29uc3QgdmVyaWZ5Q29udGFpbmVkQXNzZXJ0aW9uRnVuY3Rpb25zID0gW1xuICAgIHZlcmlmeURlcml2ZWRDb250YWluZWRBc3NlcnRpb24sXG4gICAgdmVyaWZ5U3RhdGVkQ29udGFpbmVkQXNzZXJ0aW9uXG4gIF07XG5cbiAgY29udGFpbmVkQXNzZXJ0aW9uVmVyaWZpZWQgPSB2ZXJpZnlDb250YWluZWRBc3NlcnRpb25GdW5jdGlvbnMuc29tZSgodmVyaWZ5Q29udGFpbmVkQXNzZXJ0aW9uRnVuY3Rpb24pID0+IHtcbiAgICBjb25zdCBjb250YWluZWRBc3NlcnRpb25WZXJpZmllZCA9IHZlcmlmeUNvbnRhaW5lZEFzc2VydGlvbkZ1bmN0aW9uKGNvbnRhaW5lZEFzc2VydGlvbk5vZGUsIGFzc2lnbm1lbnRzLCBkZXJpdmVkLCBsb2NhbENvbnRleHQpO1xuXG4gICAgaWYgKGNvbnRhaW5lZEFzc2VydGlvblZlcmlmaWVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChjb250YWluZWRBc3NlcnRpb25WZXJpZmllZCkge1xuICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgLi4udmVyaWZpZWQgdGhlICcke2NvbnRhaW5lZEFzc2VydGlvblN0cmluZ30nIGNvbnRhaW5lZCBhc3NlcnRpb24uYCwgY29udGFpbmVkQXNzZXJ0aW9uTm9kZSk7XG4gIH1cblxuICByZXR1cm4gY29udGFpbmVkQXNzZXJ0aW9uVmVyaWZpZWQ7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeURlcml2ZWRDb250YWluZWRBc3NlcnRpb24oY29udGFpbmVkQXNzZXJ0aW9uTm9kZSwgYXNzaWdubWVudHMsIGRlcml2ZWQsIGxvY2FsQ29udGV4dCkge1xuICBsZXQgZGVyaXZlZENvbnRhaW5lZEFzc2VydGlvblZlcmlmaWVkID0gZmFsc2U7XG5cbiAgaWYgKGRlcml2ZWQpIHtcbiAgICBjb25zdCBjb250YWluZWRBc3NlcnRpb25TdHJpbmcgPSBsb2NhbENvbnRleHQubm9kZUFzU3RyaW5nKGNvbnRhaW5lZEFzc2VydGlvbk5vZGUpO1xuXG4gICAgbG9jYWxDb250ZXh0LnRyYWNlKGBWZXJpZnlpbmcgdGhlICcke2NvbnRhaW5lZEFzc2VydGlvblN0cmluZ30nIGRlcml2ZWQgY29udGFpbmVkIGFzc2VydGlvbi4uLmAsIGNvbnRhaW5lZEFzc2VydGlvbk5vZGUpO1xuXG4gICAgY29uc3QgYXNzZXJ0aW9uTmVnYXRlZCA9IGlzQXNzZXJ0aW9uTmVnYXRlZChjb250YWluZWRBc3NlcnRpb25Ob2RlKSxcbiAgICAgICAgICB0ZXJtTm9kZSA9IHRlcm1Ob2RlUXVlcnkoY29udGFpbmVkQXNzZXJ0aW9uTm9kZSksXG4gICAgICAgICAgbmVnYXRlZCA9IGFzc2VydGlvbk5lZ2F0ZWQsIC8vL1xuICAgICAgICAgIHN0YXRlbWVudFRlcm1Ob2RlcyA9IHN0YXRlbWVudFRlcm1Ob2Rlc1F1ZXJ5KGNvbnRhaW5lZEFzc2VydGlvbk5vZGUpLFxuICAgICAgICAgIHRlcm1Ob2RlTWF0Y2hlc01ldGFBcmd1bWVudFZhcmlhYmxlTm9kZSA9IHN0YXRlbWVudFRlcm1Ob2Rlcy5zb21lKChzdGF0ZW1lbnRUZXJtTm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVybU5vZGVNYXRjaGVzTWV0YUFyZ3VtZW50VmFyaWFibGVOb2RlID0gdGVybU5vZGUubWF0Y2goc3RhdGVtZW50VGVybU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAodGVybU5vZGVNYXRjaGVzTWV0YUFyZ3VtZW50VmFyaWFibGVOb2RlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKCFuZWdhdGVkKSB7XG4gICAgICBpZiAodGVybU5vZGVNYXRjaGVzTWV0YUFyZ3VtZW50VmFyaWFibGVOb2RlKSB7XG4gICAgICAgIGRlcml2ZWRDb250YWluZWRBc3NlcnRpb25WZXJpZmllZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5lZ2F0ZWQpIHtcbiAgICAgIGlmICghdGVybU5vZGVNYXRjaGVzTWV0YUFyZ3VtZW50VmFyaWFibGVOb2RlKSB7XG4gICAgICAgIGRlcml2ZWRDb250YWluZWRBc3NlcnRpb25WZXJpZmllZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlcml2ZWRDb250YWluZWRBc3NlcnRpb25WZXJpZmllZCkge1xuICAgICAgbG9jYWxDb250ZXh0LmRlYnVnKGAuLi52ZXJpZmllZCB0aGUgJyR7Y29udGFpbmVkQXNzZXJ0aW9uU3RyaW5nfScgZGVyaXZlZCBjb250YWluZWQgYXNzZXJ0aW9uLmAsIGNvbnRhaW5lZEFzc2VydGlvbk5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZXJpdmVkQ29udGFpbmVkQXNzZXJ0aW9uVmVyaWZpZWQ7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeVN0YXRlZENvbnRhaW5lZEFzc2VydGlvbihjb250YWluZWRBc3NlcnRpb25Ob2RlLCBhc3NpZ25tZW50cywgZGVyaXZlZCwgbG9jYWxDb250ZXh0KSB7XG4gIGxldCBzdGF0ZWRDb250YWluZWRBc3NlcnRpb25WZXJpZmllZCA9IGZhbHNlO1xuXG4gIGlmICghZGVyaXZlZCkge1xuICAgIGNvbnN0IGNvbnRhaW5lZEFzc2VydGlvblN0cmluZyA9IGxvY2FsQ29udGV4dC5ub2RlQXNTdHJpbmcoY29udGFpbmVkQXNzZXJ0aW9uTm9kZSk7XG5cbiAgICBsb2NhbENvbnRleHQuZGVidWcoYFRoZSAnJHtjb250YWluZWRBc3NlcnRpb25TdHJpbmd9JyBzdGF0ZWQgY29udGFpbmVkIGFzc2VydGlvbiBjYW5ub3QgYmUgdmVyaWZpZWQuYCwgY29udGFpbmVkQXNzZXJ0aW9uTm9kZSk7XG5cbiAgICBjb25zdCB2ZXJpZmllZCA9IG1ldGFMZXZlbFZlcmlmaWVyLnZlcmlmeShjb250YWluZWRBc3NlcnRpb25Ob2RlLCBsb2NhbENvbnRleHQpO1xuXG4gICAgc3RhdGVkQ29udGFpbmVkQXNzZXJ0aW9uVmVyaWZpZWQgPSB2ZXJpZmllZDsgLy8vXG5cbiAgICBpZiAoc3RhdGVkQ29udGFpbmVkQXNzZXJ0aW9uVmVyaWZpZWQpIHtcbiAgICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgLi4udmVyaWZpZWQgdGhlICcke2NvbnRhaW5lZEFzc2VydGlvblN0cmluZ30nIHN0YXRlZCBjb250YWluZWQgYXNzZXJ0aW9uLmAsIGNvbnRhaW5lZEFzc2VydGlvbk5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdGF0ZWRDb250YWluZWRBc3NlcnRpb25WZXJpZmllZDtcbn1cbiJdLCJuYW1lcyI6WyJ2ZXJpZnlDb250YWluZWRBc3NlcnRpb24iLCJ0ZXJtTm9kZVF1ZXJ5Iiwibm9kZVF1ZXJ5Iiwic3RhdGVtZW50VGVybU5vZGVzUXVlcnkiLCJub2Rlc1F1ZXJ5IiwiY29udGFpbmVkQXNzZXJ0aW9uTm9kZSIsImFzc2lnbm1lbnRzIiwiZGVyaXZlZCIsImxvY2FsQ29udGV4dCIsImNvbnRhaW5lZEFzc2VydGlvblZlcmlmaWVkIiwiY29udGFpbmVkQXNzZXJ0aW9uU3RyaW5nIiwibm9kZUFzU3RyaW5nIiwidHJhY2UiLCJ2ZXJpZnlDb250YWluZWRBc3NlcnRpb25GdW5jdGlvbnMiLCJ2ZXJpZnlEZXJpdmVkQ29udGFpbmVkQXNzZXJ0aW9uIiwidmVyaWZ5U3RhdGVkQ29udGFpbmVkQXNzZXJ0aW9uIiwic29tZSIsInZlcmlmeUNvbnRhaW5lZEFzc2VydGlvbkZ1bmN0aW9uIiwiZGVidWciLCJkZXJpdmVkQ29udGFpbmVkQXNzZXJ0aW9uVmVyaWZpZWQiLCJhc3NlcnRpb25OZWdhdGVkIiwiaXNBc3NlcnRpb25OZWdhdGVkIiwidGVybU5vZGUiLCJuZWdhdGVkIiwic3RhdGVtZW50VGVybU5vZGVzIiwidGVybU5vZGVNYXRjaGVzTWV0YUFyZ3VtZW50VmFyaWFibGVOb2RlIiwic3RhdGVtZW50VGVybU5vZGUiLCJtYXRjaCIsInN0YXRlZENvbnRhaW5lZEFzc2VydGlvblZlcmlmaWVkIiwidmVyaWZpZWQiLCJtZXRhTGV2ZWxWZXJpZmllciIsInZlcmlmeSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBVUE7OztlQUF3QkE7OztnRUFSTTtzQkFFSztxQkFDRzs7Ozs7O0FBRXRDLElBQU1DLGdCQUFnQkMsSUFBQUEsZ0JBQVMsRUFBQyxxQkFDMUJDLDBCQUEwQkMsSUFBQUEsaUJBQVUsRUFBQztBQUU1QixTQUFTSix5QkFBeUJLLHNCQUFzQixFQUFFQyxXQUFXLEVBQUVDLE9BQU8sRUFBRUMsWUFBWTtJQUN6RyxJQUFJQztJQUVKLElBQU1DLDJCQUEyQkYsYUFBYUcsWUFBWSxDQUFDTjtJQUUzREcsYUFBYUksS0FBSyxDQUFDLEFBQUMsa0JBQTBDLE9BQXpCRiwwQkFBeUIsNkJBQTJCTDtJQUV6RixJQUFNUSxvQ0FBb0M7UUFDeENDO1FBQ0FDO0tBQ0Q7SUFFRE4sNkJBQTZCSSxrQ0FBa0NHLElBQUksQ0FBQyxTQUFDQztRQUNuRSxJQUFNUiw2QkFBNkJRLGlDQUFpQ1osd0JBQXdCQyxhQUFhQyxTQUFTQztRQUVsSCxJQUFJQyw0QkFBNEI7WUFDOUIsT0FBTztRQUNUO0lBQ0Y7SUFFQSxJQUFJQSw0QkFBNEI7UUFDOUJELGFBQWFVLEtBQUssQ0FBQyxBQUFDLG9CQUE0QyxPQUF6QlIsMEJBQXlCLDJCQUF5Qkw7SUFDM0Y7SUFFQSxPQUFPSTtBQUNUO0FBRUEsU0FBU0ssZ0NBQWdDVCxzQkFBc0IsRUFBRUMsV0FBVyxFQUFFQyxPQUFPLEVBQUVDLFlBQVk7SUFDakcsSUFBSVcsb0NBQW9DO0lBRXhDLElBQUlaLFNBQVM7UUFDWCxJQUFNRywyQkFBMkJGLGFBQWFHLFlBQVksQ0FBQ047UUFFM0RHLGFBQWFJLEtBQUssQ0FBQyxBQUFDLGtCQUEwQyxPQUF6QkYsMEJBQXlCLHFDQUFtQ0w7UUFFakcsSUFBTWUsbUJBQW1CQyxJQUFBQSwwQkFBa0IsRUFBQ2hCLHlCQUN0Q2lCLFdBQVdyQixjQUFjSSx5QkFDekJrQixVQUFVSCxrQkFDVkkscUJBQXFCckIsd0JBQXdCRSx5QkFDN0NvQiwwQ0FBMENELG1CQUFtQlIsSUFBSSxDQUFDLFNBQUNVO1lBQ2pFLElBQU1ELDBDQUEwQ0gsU0FBU0ssS0FBSyxDQUFDRDtZQUUvRCxJQUFJRCx5Q0FBeUM7Z0JBQzNDLE9BQU87WUFDVDtRQUNGO1FBRU4sSUFBSSxDQUFDRixTQUFTO1lBQ1osSUFBSUUseUNBQXlDO2dCQUMzQ04sb0NBQW9DO1lBQ3RDO1FBQ0Y7UUFFQSxJQUFJSSxTQUFTO1lBQ1gsSUFBSSxDQUFDRSx5Q0FBeUM7Z0JBQzVDTixvQ0FBb0M7WUFDdEM7UUFDRjtRQUVBLElBQUlBLG1DQUFtQztZQUNyQ1gsYUFBYVUsS0FBSyxDQUFDLEFBQUMsb0JBQTRDLE9BQXpCUiwwQkFBeUIsbUNBQWlDTDtRQUNuRztJQUNGO0lBRUEsT0FBT2M7QUFDVDtBQUVBLFNBQVNKLCtCQUErQlYsc0JBQXNCLEVBQUVDLFdBQVcsRUFBRUMsT0FBTyxFQUFFQyxZQUFZO0lBQ2hHLElBQUlvQixtQ0FBbUM7SUFFdkMsSUFBSSxDQUFDckIsU0FBUztRQUNaLElBQU1HLDJCQUEyQkYsYUFBYUcsWUFBWSxDQUFDTjtRQUUzREcsYUFBYVUsS0FBSyxDQUFDLEFBQUMsUUFBZ0MsT0FBekJSLDBCQUF5QixxREFBbURMO1FBRXZHLElBQU13QixXQUFXQyxrQkFBaUIsQ0FBQ0MsTUFBTSxDQUFDMUIsd0JBQXdCRztRQUVsRW9CLG1DQUFtQ0MsVUFBVSxHQUFHO1FBRWhELElBQUlELGtDQUFrQztZQUNwQ3BCLGFBQWFVLEtBQUssQ0FBQyxBQUFDLG9CQUE0QyxPQUF6QlIsMEJBQXlCLGtDQUFnQ0w7UUFDbEc7SUFDRjtJQUVBLE9BQU91QjtBQUNUIn0=