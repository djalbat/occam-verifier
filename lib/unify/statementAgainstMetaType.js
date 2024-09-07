"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return unifyStatementAgainstMetaType;
    }
});
var _shim = /*#__PURE__*/ _interop_require_default(require("../shim"));
var _query = require("../utilities/query");
var _metaTypeNames = require("../metaTypeNames");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var metaTypeTerminalNodeQuery = (0, _query.nodeQuery)("/metaType/@meta-type!");
function unifyStatementAgainstMetaType(statementNodeA, metaTypeNodeB, localContext, unifyAhead) {
    var statementVerifiedAgainstMetaType = false;
    var metaTypeNode = metaTypeNodeB, metaTypeTerminalNode = metaTypeTerminalNodeQuery(metaTypeNode), content = metaTypeTerminalNode.getContent();
    if (content === _metaTypeNames.STATEMENT_META_TYPE_NAME) {
        var unifiedAhead = false;
        var verifyStatement = _shim.default.verifyStatement, derived = false, assignments = [], statementNode = statementNodeA, statementVerified = verifyStatement(statementNode, assignments, derived, localContext);
        if (statementVerified) {
            unifiedAhead = unifyAhead();
        }
        statementVerifiedAgainstMetaType = unifiedAhead; ///
    }
    return statementVerifiedAgainstMetaType;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bmlmeS9zdGF0ZW1lbnRBZ2FpbnN0TWV0YVR5cGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBzaGltIGZyb20gXCIuLi9zaGltXCI7XG5cbmltcG9ydCB7IG5vZGVRdWVyeSB9IGZyb20gXCIuLi91dGlsaXRpZXMvcXVlcnlcIjtcbmltcG9ydCB7IFNUQVRFTUVOVF9NRVRBX1RZUEVfTkFNRSB9IGZyb20gXCIuLi9tZXRhVHlwZU5hbWVzXCI7XG5cbmNvbnN0IG1ldGFUeXBlVGVybWluYWxOb2RlUXVlcnkgPSBub2RlUXVlcnkoXCIvbWV0YVR5cGUvQG1ldGEtdHlwZSFcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuaWZ5U3RhdGVtZW50QWdhaW5zdE1ldGFUeXBlKHN0YXRlbWVudE5vZGVBLCBtZXRhVHlwZU5vZGVCLCBsb2NhbENvbnRleHQsIHVuaWZ5QWhlYWQpIHtcbiAgbGV0IHN0YXRlbWVudFZlcmlmaWVkQWdhaW5zdE1ldGFUeXBlID0gZmFsc2U7XG5cbiAgY29uc3QgbWV0YVR5cGVOb2RlID0gbWV0YVR5cGVOb2RlQiwgLy8vXG4gICAgICAgIG1ldGFUeXBlVGVybWluYWxOb2RlID0gbWV0YVR5cGVUZXJtaW5hbE5vZGVRdWVyeShtZXRhVHlwZU5vZGUpLFxuICAgICAgICBjb250ZW50ID0gbWV0YVR5cGVUZXJtaW5hbE5vZGUuZ2V0Q29udGVudCgpO1xuXG4gIGlmIChjb250ZW50ID09PSBTVEFURU1FTlRfTUVUQV9UWVBFX05BTUUpIHtcbiAgICBsZXQgdW5pZmllZEFoZWFkID0gZmFsc2U7XG5cbiAgICBjb25zdCB7IHZlcmlmeVN0YXRlbWVudCB9ID0gc2hpbSxcbiAgICAgICAgICBkZXJpdmVkID0gZmFsc2UsXG4gICAgICAgICAgYXNzaWdubWVudHMgPSBbXSxcbiAgICAgICAgICBzdGF0ZW1lbnROb2RlID0gc3RhdGVtZW50Tm9kZUEsIC8vL1xuICAgICAgICAgIHN0YXRlbWVudFZlcmlmaWVkID0gdmVyaWZ5U3RhdGVtZW50KHN0YXRlbWVudE5vZGUsIGFzc2lnbm1lbnRzLCBkZXJpdmVkLCBsb2NhbENvbnRleHQpO1xuXG4gICAgaWYgKHN0YXRlbWVudFZlcmlmaWVkKSB7XG4gICAgICB1bmlmaWVkQWhlYWQgPSB1bmlmeUFoZWFkKCk7XG4gICAgfVxuXG4gICAgc3RhdGVtZW50VmVyaWZpZWRBZ2FpbnN0TWV0YVR5cGUgPSB1bmlmaWVkQWhlYWQ7IC8vL1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlbWVudFZlcmlmaWVkQWdhaW5zdE1ldGFUeXBlO1xufVxuIl0sIm5hbWVzIjpbInVuaWZ5U3RhdGVtZW50QWdhaW5zdE1ldGFUeXBlIiwibWV0YVR5cGVUZXJtaW5hbE5vZGVRdWVyeSIsIm5vZGVRdWVyeSIsInN0YXRlbWVudE5vZGVBIiwibWV0YVR5cGVOb2RlQiIsImxvY2FsQ29udGV4dCIsInVuaWZ5QWhlYWQiLCJzdGF0ZW1lbnRWZXJpZmllZEFnYWluc3RNZXRhVHlwZSIsIm1ldGFUeXBlTm9kZSIsIm1ldGFUeXBlVGVybWluYWxOb2RlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJTVEFURU1FTlRfTUVUQV9UWVBFX05BTUUiLCJ1bmlmaWVkQWhlYWQiLCJ2ZXJpZnlTdGF0ZW1lbnQiLCJzaGltIiwiZGVyaXZlZCIsImFzc2lnbm1lbnRzIiwic3RhdGVtZW50Tm9kZSIsInN0YXRlbWVudFZlcmlmaWVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFTQTs7O2VBQXdCQTs7OzJEQVBQO3FCQUVTOzZCQUNlOzs7Ozs7QUFFekMsSUFBTUMsNEJBQTRCQyxJQUFBQSxnQkFBUyxFQUFDO0FBRTdCLFNBQVNGLDhCQUE4QkcsY0FBYyxFQUFFQyxhQUFhLEVBQUVDLFlBQVksRUFBRUMsVUFBVTtJQUMzRyxJQUFJQyxtQ0FBbUM7SUFFdkMsSUFBTUMsZUFBZUosZUFDZkssdUJBQXVCUiwwQkFBMEJPLGVBQ2pERSxVQUFVRCxxQkFBcUJFLFVBQVU7SUFFL0MsSUFBSUQsWUFBWUUsdUNBQXdCLEVBQUU7UUFDeEMsSUFBSUMsZUFBZTtRQUVuQixJQUFNLEFBQUVDLGtCQUFvQkMsYUFBSSxDQUF4QkQsaUJBQ0ZFLFVBQVUsT0FDVkMsY0FBYyxFQUFFLEVBQ2hCQyxnQkFBZ0JmLGdCQUNoQmdCLG9CQUFvQkwsZ0JBQWdCSSxlQUFlRCxhQUFhRCxTQUFTWDtRQUUvRSxJQUFJYyxtQkFBbUI7WUFDckJOLGVBQWVQO1FBQ2pCO1FBRUFDLG1DQUFtQ00sY0FBYyxHQUFHO0lBQ3REO0lBRUEsT0FBT047QUFDVCJ9