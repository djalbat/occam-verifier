"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return MetaEquality;
    }
});
var _context = /*#__PURE__*/ _interop_require_default(require("./metaType/context"));
var _metastatement = /*#__PURE__*/ _interop_require_default(require("./verifier/node/metastatement"));
var _query = require("./utilities/query");
var _array = require("./utilities/array");
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var contextNodeQuery = (0, _query.nodeQuery)("/metastatement/context!"), metaVariableNodeQuery = (0, _query.nodeQuery)("/metastatement/metavariable!");
var MetaEquality = /*#__PURE__*/ function() {
    function MetaEquality(node, metaType) {
        _class_call_check(this, MetaEquality);
        this.node = node;
        this.metaType = metaType;
    }
    _create_class(MetaEquality, [
        {
            key: "getNode",
            value: function getNode() {
                return this.node;
            }
        },
        {
            key: "getMetaType",
            value: function getMetaType() {
                return this.metaType;
            }
        }
    ], [
        {
            key: "fromLeftMetastatementNodeRightMetastatementNodeAndMetaEqualityNode",
            value: function fromLeftMetastatementNodeRightMetastatementNodeAndMetaEqualityNode(leftMetastatementNode, rightMetastatementNode, metaEqualityNode, localMetaContext) {
                var metaEquality = null;
                var metaTypes = [], leftMetastatementVerifiedAsMetavariableOrContext = verifyMetastatementAsMetavariableOrContext(leftMetastatementNode, metaTypes, localMetaContext), rightMetastatementVerifiedAsMetavariableOrContext = verifyMetastatementAsMetavariableOrContext(rightMetastatementNode, metaTypes, localMetaContext);
                if (leftMetastatementVerifiedAsMetavariableOrContext && rightMetastatementVerifiedAsMetavariableOrContext) {
                    var firstMetaType = (0, _array.first)(metaTypes), secondMetaType = (0, _array.second)(metaTypes);
                    if (firstMetaType === secondMetaType) {
                        var metaType = firstMetaType, node = metaEqualityNode; ///
                        metaEquality = new MetaEquality(node, metaType);
                    }
                }
                return metaEquality;
            }
        }
    ]);
    return MetaEquality;
}();
function verifyMetastatementAsMetavariableOrContext(metastatementNode, metaTypes, localMetaContext) {
    var metastatementVerifiedAsMetavariableOrContext = false;
    var verifyMetastatement = _metastatement.default.verifyMetastatement, derived = false, assignments = [], metastatementVerified = verifyMetastatement(metastatementNode, assignments, derived, localMetaContext, function() {
        var verifiedAhead = true;
        return verifiedAhead;
    });
    if (metastatementVerified) {
        var contextNode = contextNodeQuery(metastatementNode), metavariableNode = metaVariableNodeQuery(metastatementNode);
        if (false) {
        ///
        } else if (contextNode !== null) {
            var metaType = _context.default; ///
            metaTypes.push(metaType);
            metastatementVerifiedAsMetavariableOrContext = true;
        } else if (metavariableNode !== null) {
            var metavariable = localMetaContext.findMetavariableByMetavariableNode(metavariableNode, localMetaContext), metaType1 = metavariable.getMetaType();
            metaTypes.push(metaType1);
            metastatementVerifiedAsMetavariableOrContext = true;
        }
    }
    return metastatementVerifiedAsMetavariableOrContext;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRhRXF1YWxpdHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjb250ZXh0TWV0YVR5cGUgZnJvbSBcIi4vbWV0YVR5cGUvY29udGV4dFwiO1xuaW1wb3J0IG1ldGFzdGF0ZW1lbnROb2RlVmVyaWZpZXIgZnJvbSBcIi4vdmVyaWZpZXIvbm9kZS9tZXRhc3RhdGVtZW50XCI7XG5cbmltcG9ydCB7IG5vZGVRdWVyeSB9IGZyb20gXCIuL3V0aWxpdGllcy9xdWVyeVwiO1xuaW1wb3J0IHsgZmlyc3QsIHNlY29uZCB9ICBmcm9tIFwiLi91dGlsaXRpZXMvYXJyYXlcIjtcblxuY29uc3QgY29udGV4dE5vZGVRdWVyeSA9IG5vZGVRdWVyeShcIi9tZXRhc3RhdGVtZW50L2NvbnRleHQhXCIpLFxuICAgICAgbWV0YVZhcmlhYmxlTm9kZVF1ZXJ5ID0gbm9kZVF1ZXJ5KFwiL21ldGFzdGF0ZW1lbnQvbWV0YXZhcmlhYmxlIVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0YUVxdWFsaXR5IHtcbiAgY29uc3RydWN0b3Iobm9kZSwgbWV0YVR5cGUpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMubWV0YVR5cGUgPSBtZXRhVHlwZTtcbiAgfVxuXG4gIGdldE5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgfVxuXG4gIGdldE1ldGFUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLm1ldGFUeXBlO1xuICB9XG5cbiAgc3RhdGljIGZyb21MZWZ0TWV0YXN0YXRlbWVudE5vZGVSaWdodE1ldGFzdGF0ZW1lbnROb2RlQW5kTWV0YUVxdWFsaXR5Tm9kZShsZWZ0TWV0YXN0YXRlbWVudE5vZGUsIHJpZ2h0TWV0YXN0YXRlbWVudE5vZGUsIG1ldGFFcXVhbGl0eU5vZGUsIGxvY2FsTWV0YUNvbnRleHQpIHtcbiAgICBsZXQgbWV0YUVxdWFsaXR5ID0gbnVsbDtcblxuICAgIGNvbnN0IG1ldGFUeXBlcyA9IFtdLFxuICAgICAgICAgIGxlZnRNZXRhc3RhdGVtZW50VmVyaWZpZWRBc01ldGF2YXJpYWJsZU9yQ29udGV4dCA9IHZlcmlmeU1ldGFzdGF0ZW1lbnRBc01ldGF2YXJpYWJsZU9yQ29udGV4dChsZWZ0TWV0YXN0YXRlbWVudE5vZGUsIG1ldGFUeXBlcywgbG9jYWxNZXRhQ29udGV4dCksXG4gICAgICAgICAgcmlnaHRNZXRhc3RhdGVtZW50VmVyaWZpZWRBc01ldGF2YXJpYWJsZU9yQ29udGV4dCA9IHZlcmlmeU1ldGFzdGF0ZW1lbnRBc01ldGF2YXJpYWJsZU9yQ29udGV4dChyaWdodE1ldGFzdGF0ZW1lbnROb2RlLCBtZXRhVHlwZXMsIGxvY2FsTWV0YUNvbnRleHQpO1xuXG4gICAgaWYgKGxlZnRNZXRhc3RhdGVtZW50VmVyaWZpZWRBc01ldGF2YXJpYWJsZU9yQ29udGV4dCAmJiByaWdodE1ldGFzdGF0ZW1lbnRWZXJpZmllZEFzTWV0YXZhcmlhYmxlT3JDb250ZXh0KSB7XG4gICAgICBjb25zdCBmaXJzdE1ldGFUeXBlID0gZmlyc3QobWV0YVR5cGVzKSxcbiAgICAgICAgICAgIHNlY29uZE1ldGFUeXBlID0gc2Vjb25kKG1ldGFUeXBlcyk7XG5cbiAgICAgIGlmIChmaXJzdE1ldGFUeXBlID09PSBzZWNvbmRNZXRhVHlwZSkge1xuICAgICAgICBjb25zdCBtZXRhVHlwZSA9IGZpcnN0TWV0YVR5cGUsIC8vL1xuICAgICAgICAgICAgICBub2RlID0gbWV0YUVxdWFsaXR5Tm9kZTsgIC8vL1xuXG4gICAgICAgIG1ldGFFcXVhbGl0eSA9IG5ldyBNZXRhRXF1YWxpdHkobm9kZSwgbWV0YVR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXRhRXF1YWxpdHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmVyaWZ5TWV0YXN0YXRlbWVudEFzTWV0YXZhcmlhYmxlT3JDb250ZXh0KG1ldGFzdGF0ZW1lbnROb2RlLCBtZXRhVHlwZXMsIGxvY2FsTWV0YUNvbnRleHQpIHtcbiAgbGV0IG1ldGFzdGF0ZW1lbnRWZXJpZmllZEFzTWV0YXZhcmlhYmxlT3JDb250ZXh0ID0gZmFsc2U7XG5cbiAgY29uc3QgeyB2ZXJpZnlNZXRhc3RhdGVtZW50IH0gPSBtZXRhc3RhdGVtZW50Tm9kZVZlcmlmaWVyLFxuICAgICAgICBkZXJpdmVkID0gZmFsc2UsICAvLy9cbiAgICAgICAgYXNzaWdubWVudHMgPSBbXSxcbiAgICAgICAgbWV0YXN0YXRlbWVudFZlcmlmaWVkID0gdmVyaWZ5TWV0YXN0YXRlbWVudChtZXRhc3RhdGVtZW50Tm9kZSwgYXNzaWdubWVudHMsIGRlcml2ZWQsIGxvY2FsTWV0YUNvbnRleHQsICgpID0+IHtcbiAgICAgICAgICBjb25zdCB2ZXJpZmllZEFoZWFkID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiB2ZXJpZmllZEFoZWFkO1xuICAgICAgICB9KTtcblxuICBpZiAobWV0YXN0YXRlbWVudFZlcmlmaWVkKSB7XG4gICAgY29uc3QgY29udGV4dE5vZGUgPSBjb250ZXh0Tm9kZVF1ZXJ5KG1ldGFzdGF0ZW1lbnROb2RlKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gbWV0YVZhcmlhYmxlTm9kZVF1ZXJ5KG1ldGFzdGF0ZW1lbnROb2RlKTtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmIChjb250ZXh0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbWV0YVR5cGUgPSBjb250ZXh0TWV0YVR5cGU7IC8vL1xuXG4gICAgICBtZXRhVHlwZXMucHVzaChtZXRhVHlwZSk7XG5cbiAgICAgIG1ldGFzdGF0ZW1lbnRWZXJpZmllZEFzTWV0YXZhcmlhYmxlT3JDb250ZXh0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKG1ldGF2YXJpYWJsZU5vZGUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZSA9IGxvY2FsTWV0YUNvbnRleHQuZmluZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlLCBsb2NhbE1ldGFDb250ZXh0KSxcbiAgICAgICAgICAgIG1ldGFUeXBlID0gbWV0YXZhcmlhYmxlLmdldE1ldGFUeXBlKCk7XG5cbiAgICAgIG1ldGFUeXBlcy5wdXNoKG1ldGFUeXBlKTtcblxuICAgICAgbWV0YXN0YXRlbWVudFZlcmlmaWVkQXNNZXRhdmFyaWFibGVPckNvbnRleHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZXRhc3RhdGVtZW50VmVyaWZpZWRBc01ldGF2YXJpYWJsZU9yQ29udGV4dDtcbn1cbiJdLCJuYW1lcyI6WyJNZXRhRXF1YWxpdHkiLCJjb250ZXh0Tm9kZVF1ZXJ5Iiwibm9kZVF1ZXJ5IiwibWV0YVZhcmlhYmxlTm9kZVF1ZXJ5Iiwibm9kZSIsIm1ldGFUeXBlIiwiZ2V0Tm9kZSIsImdldE1ldGFUeXBlIiwiZnJvbUxlZnRNZXRhc3RhdGVtZW50Tm9kZVJpZ2h0TWV0YXN0YXRlbWVudE5vZGVBbmRNZXRhRXF1YWxpdHlOb2RlIiwibGVmdE1ldGFzdGF0ZW1lbnROb2RlIiwicmlnaHRNZXRhc3RhdGVtZW50Tm9kZSIsIm1ldGFFcXVhbGl0eU5vZGUiLCJsb2NhbE1ldGFDb250ZXh0IiwibWV0YUVxdWFsaXR5IiwibWV0YVR5cGVzIiwibGVmdE1ldGFzdGF0ZW1lbnRWZXJpZmllZEFzTWV0YXZhcmlhYmxlT3JDb250ZXh0IiwidmVyaWZ5TWV0YXN0YXRlbWVudEFzTWV0YXZhcmlhYmxlT3JDb250ZXh0IiwicmlnaHRNZXRhc3RhdGVtZW50VmVyaWZpZWRBc01ldGF2YXJpYWJsZU9yQ29udGV4dCIsImZpcnN0TWV0YVR5cGUiLCJmaXJzdCIsInNlY29uZE1ldGFUeXBlIiwic2Vjb25kIiwibWV0YXN0YXRlbWVudE5vZGUiLCJtZXRhc3RhdGVtZW50VmVyaWZpZWRBc01ldGF2YXJpYWJsZU9yQ29udGV4dCIsInZlcmlmeU1ldGFzdGF0ZW1lbnQiLCJtZXRhc3RhdGVtZW50Tm9kZVZlcmlmaWVyIiwiZGVyaXZlZCIsImFzc2lnbm1lbnRzIiwibWV0YXN0YXRlbWVudFZlcmlmaWVkIiwidmVyaWZpZWRBaGVhZCIsImNvbnRleHROb2RlIiwibWV0YXZhcmlhYmxlTm9kZSIsImNvbnRleHRNZXRhVHlwZSIsInB1c2giLCJtZXRhdmFyaWFibGUiLCJmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVdxQkE7Ozs4REFUTztvRUFDVTtxQkFFWjtxQkFDSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQixJQUFNQyxtQkFBbUJDLElBQUFBLGdCQUFTLEVBQUMsNEJBQzdCQyx3QkFBd0JELElBQUFBLGdCQUFTLEVBQUM7QUFFekIsSUFBQSxBQUFNRiw2QkFBRCxBQUFMO2FBQU1BLGFBQ1BJLElBQUksRUFBRUMsUUFBUTtnQ0FEUEw7UUFFakIsSUFBSSxDQUFDSSxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxRQUFRLEdBQUdBOztrQkFIQ0w7O1lBTW5CTSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNGLElBQUk7WUFDbEI7OztZQUVBRyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNGLFFBQVE7WUFDdEI7Ozs7WUFFT0csS0FBQUE7bUJBQVAsU0FBT0EsbUVBQW1FQyxxQkFBcUIsRUFBRUMsc0JBQXNCLEVBQUVDLGdCQUFnQixFQUFFQyxnQkFBZ0I7Z0JBQ3pKLElBQUlDLGVBQWU7Z0JBRW5CLElBQU1DLFlBQVksRUFBRSxFQUNkQyxtREFBbURDLDJDQUEyQ1AsdUJBQXVCSyxXQUFXRixtQkFDaElLLG9EQUFvREQsMkNBQTJDTix3QkFBd0JJLFdBQVdGO2dCQUV4SSxJQUFJRyxvREFBb0RFLG1EQUFtRDtvQkFDekcsSUFBTUMsZ0JBQWdCQyxJQUFBQSxZQUFLLEVBQUNMLFlBQ3RCTSxpQkFBaUJDLElBQUFBLGFBQU0sRUFBQ1A7b0JBRTlCLElBQUlJLGtCQUFrQkUsZ0JBQWdCO3dCQUNwQyxJQUFNZixXQUFXYSxlQUNYZCxPQUFPTyxrQkFBbUIsR0FBRzt3QkFFbkNFLGVBQWUsSUE3QkZiLGFBNkJtQkksTUFBTUM7b0JBQ3hDO2dCQUNGO2dCQUVBLE9BQU9RO1lBQ1Q7OztXQWxDbUJiOztBQXFDckIsU0FBU2dCLDJDQUEyQ00saUJBQWlCLEVBQUVSLFNBQVMsRUFBRUYsZ0JBQWdCO0lBQ2hHLElBQUlXLCtDQUErQztJQUVuRCxJQUFNLEFBQUVDLHNCQUF3QkMsc0JBQXlCLENBQWpERCxxQkFDRkUsVUFBVSxPQUNWQyxjQUFjLEVBQUUsRUFDaEJDLHdCQUF3Qkosb0JBQW9CRixtQkFBbUJLLGFBQWFELFNBQVNkLGtCQUFrQjtRQUNyRyxJQUFNaUIsZ0JBQWdCO1FBRXRCLE9BQU9BO0lBQ1Q7SUFFTixJQUFJRCx1QkFBdUI7UUFDekIsSUFBTUUsY0FBYzdCLGlCQUFpQnFCLG9CQUMvQlMsbUJBQW1CNUIsc0JBQXNCbUI7UUFFL0MsSUFBSSxPQUFPO1FBQ1QsR0FBRztRQUNMLE9BQU8sSUFBSVEsZ0JBQWdCLE1BQU07WUFDL0IsSUFBTXpCLFdBQVcyQixnQkFBZSxFQUFFLEdBQUc7WUFFckNsQixVQUFVbUIsSUFBSSxDQUFDNUI7WUFFZmtCLCtDQUErQztRQUNqRCxPQUFPLElBQUlRLHFCQUFxQixNQUFNO1lBQ3BDLElBQU1HLGVBQWV0QixpQkFBaUJ1QixrQ0FBa0MsQ0FBQ0osa0JBQWtCbkIsbUJBQ3JGUCxZQUFXNkIsYUFBYTNCLFdBQVc7WUFFekNPLFVBQVVtQixJQUFJLENBQUM1QjtZQUVma0IsK0NBQStDO1FBQ2pEO0lBQ0Y7SUFFQSxPQUFPQTtBQUNUIn0=