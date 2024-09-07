"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return verifyJudgement;
    }
});
var _judgement = /*#__PURE__*/ _interop_require_default(require("../judgement"));
var _frame = /*#__PURE__*/ _interop_require_default(require("../verify/frame"));
var _frame1 = /*#__PURE__*/ _interop_require_default(require("../metaType/frame"));
var _judgement1 = /*#__PURE__*/ _interop_require_default(require("../assignment/judgement"));
var _array = require("../utilities/array");
var _query = require("../utilities/query");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var frameNodeQuery = (0, _query.nodeQuery)("/judgement/frame!"), metavariableNodeQuery = (0, _query.nodeQuery)("/judgement/metavariable!");
function verifyJudgement(judgementNode, assignments, derived, localContext) {
    var judgementVerified;
    var judgementString = localContext.nodeAsString(judgementNode);
    localContext.trace("Verifying the '".concat(judgementString, "' judgement..."), judgementNode);
    var verifyJudgementFunctions = [
        verifyDerivedJudgement,
        verifyStatedJudgement
    ];
    judgementVerified = verifyJudgementFunctions.some(function(verifyJudgementFunction) {
        var judgementVerified = verifyJudgementFunction(judgementNode, assignments, derived, localContext);
        if (judgementVerified) {
            return true;
        }
    });
    if (judgementVerified) {
        localContext.debug("...verified the '".concat(judgementString, "' judgement."), judgementNode);
    }
    return judgementVerified;
}
function verifyDerivedJudgement(judgementNode, assignments, derived, localContext) {
    var derivedJudgementVerified = false;
    if (derived) {
        var judgementString = localContext.nodeAsString(judgementNode);
        localContext.trace("Verifying the '".concat(judgementString, "' derived judgement..."), judgementNode);
        var metavariableNode = metavariableNodeQuery(judgementNode), metavariableVerified = verifyMetavariable(metavariableNode, localContext);
        if (metavariableVerified) {
            var judgement = localContext.findJudgementByMetavariableNode(metavariableNode);
            if (judgement !== null) {
                var frames = [], frameNode = frameNodeQuery(judgementNode), frameVerified = (0, _frame.default)(frameNode, frames, assignments, derived, localContext);
                if (frameVerified) {
                    var firstFrame = (0, _array.first)(frames), frame = firstFrame, frameSingular = frame.isSingular();
                    if (frameSingular) {
                        var declaration = frame.getDeclaration(), metavariableNode1 = declaration.getMetavariableNode(), metaLemma = localContext.findMetaLemmaByMetavariableNode(metavariableNode1), metatheorem = localContext.findMetatheoremByMetavariableNode(metavariableNode1), metaLemmaMetatheorem = metaLemma || metatheorem; ///
                        if (metaLemmaMetatheorem !== null) {
                            var declarationMatchesMetaLemmaMetatheorem = declaration.matchMetaLemmaOrMetaTheorem(metaLemmaMetatheorem), judgementMatchesMetaLemmaMetatheorem = judgement.matchMetaLemmaOrMetaTheorem(metaLemmaMetatheorem);
                            derivedJudgementVerified = declarationMatchesMetaLemmaMetatheorem && judgementMatchesMetaLemmaMetatheorem;
                        } else {
                            var metavariableString = localContext.nodeAsString(metavariableNode1);
                            localContext.debug("There are no meta-lemmas or metatheorems corresponding to the '".concat(metavariableString, "' metavariable."), judgementNode);
                        }
                    } else {
                        var frameString = localContext.nodeAsString(frameNode);
                        localContext.debug("The '".concat(frameString, "' is not singular."), judgementNode);
                    }
                }
            } else {
                var metavariableString1 = localContext.nodeAsString(metavariableNode);
                localContext.debug("There is no judgement present for the '".concat(metavariableString1, "' metavariable."), judgementNode);
            }
        }
        if (derivedJudgementVerified) {
            localContext.debug("...verified the '".concat(judgementString, "' derived judgement."), judgementNode);
        }
    }
    return derivedJudgementVerified;
}
function verifyStatedJudgement(judgementNode, assignments, derived, localContext) {
    var statedJudgementVerified = false;
    if (!derived) {
        var judgementString = localContext.nodeAsString(judgementNode);
        localContext.trace("Verifying the '".concat(judgementString, "' stated judgement..."), judgementNode);
        var metavariableNode = metavariableNodeQuery(judgementNode), metavariableVerified = verifyMetavariable(metavariableNode, localContext);
        if (metavariableVerified) {
            var frames = [], frameNode = frameNodeQuery(judgementNode), frameVerified = (0, _frame.default)(frameNode, frames, assignments, derived, localContext);
            if (frameVerified) {
                var firstFrame = (0, _array.first)(frames), frame = firstFrame, judgement = _judgement.default.fromJudgementNodeFrameAndMetavariableNode(judgementNode, frame, metavariableNode), judgementAssignment = _judgement1.default.fromJudgement(judgement), assignment = judgementAssignment;
                assignments.push(assignment);
                statedJudgementVerified = true;
            }
        }
        if (statedJudgementVerified) {
            localContext.debug("...verified the '".concat(judgementString, "' stated judgement."), judgementNode);
        }
    }
    return statedJudgementVerified;
}
function verifyMetavariable(metavariableNode, localContext) {
    var metavariableVerified = false;
    var metavariableString = localContext.nodeAsString(metavariableNode);
    localContext.trace("Verifying the '".concat(metavariableString, "' metavariable..."), metavariableNode);
    var metavariable = localContext.findMetavariableByMetavariableNode(metavariableNode);
    if (metavariable !== null) {
        var metaType = metavariable.getMetaType();
        if (metaType === _frame1.default) {
            metavariableVerified = true;
        } else {
            var frameMetaTypeName = _frame1.default.getName(), metaTypeString = metaType.asString();
            localContext.debug("The '".concat(metavariableString, "' metavariable's meta-type is '").concat(metaTypeString, "' when it should be '").concat(frameMetaTypeName, "'."), metavariableNode);
        }
    } else {
        localContext.debug("The '".concat(metavariableString, "' metavariable is not present'."), metavariableNode);
    }
    if (metavariableVerified) {
        localContext.debug("...verified the '".concat(metavariableString, "' metavariable."), metavariableNode);
    }
    return metavariableVerified;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92ZXJpZnkvanVkZ2VtZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgSnVkZ2VtZW50IGZyb20gXCIuLi9qdWRnZW1lbnRcIjtcbmltcG9ydCB2ZXJpZnlGcmFtZSBmcm9tIFwiLi4vdmVyaWZ5L2ZyYW1lXCI7XG5pbXBvcnQgZnJhbWVNZXRhVHlwZSBmcm9tIFwiLi4vbWV0YVR5cGUvZnJhbWVcIjtcbmltcG9ydCBKdWRnZW1lbnRBc3NpZ25tZW50IGZyb20gXCIuLi9hc3NpZ25tZW50L2p1ZGdlbWVudFwiO1xuXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXJyYXlcIjtcbmltcG9ydCB7IG5vZGVRdWVyeSB9IGZyb20gXCIuLi91dGlsaXRpZXMvcXVlcnlcIjtcblxuY29uc3QgZnJhbWVOb2RlUXVlcnkgPSBub2RlUXVlcnkoXCIvanVkZ2VtZW50L2ZyYW1lIVwiKSxcbiAgICAgIG1ldGF2YXJpYWJsZU5vZGVRdWVyeSA9IG5vZGVRdWVyeShcIi9qdWRnZW1lbnQvbWV0YXZhcmlhYmxlIVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5SnVkZ2VtZW50KGp1ZGdlbWVudE5vZGUsIGFzc2lnbm1lbnRzLCBkZXJpdmVkLCBsb2NhbENvbnRleHQpIHtcbiAgbGV0IGp1ZGdlbWVudFZlcmlmaWVkO1xuXG4gIGNvbnN0IGp1ZGdlbWVudFN0cmluZyA9IGxvY2FsQ29udGV4dC5ub2RlQXNTdHJpbmcoanVkZ2VtZW50Tm9kZSk7XG5cbiAgbG9jYWxDb250ZXh0LnRyYWNlKGBWZXJpZnlpbmcgdGhlICcke2p1ZGdlbWVudFN0cmluZ30nIGp1ZGdlbWVudC4uLmAsIGp1ZGdlbWVudE5vZGUpO1xuXG4gIGNvbnN0IHZlcmlmeUp1ZGdlbWVudEZ1bmN0aW9ucyA9IFtcbiAgICB2ZXJpZnlEZXJpdmVkSnVkZ2VtZW50LFxuICAgIHZlcmlmeVN0YXRlZEp1ZGdlbWVudFxuICBdO1xuXG4gIGp1ZGdlbWVudFZlcmlmaWVkID0gdmVyaWZ5SnVkZ2VtZW50RnVuY3Rpb25zLnNvbWUoKHZlcmlmeUp1ZGdlbWVudEZ1bmN0aW9uKSA9PiB7XG4gICAgY29uc3QganVkZ2VtZW50VmVyaWZpZWQgPSB2ZXJpZnlKdWRnZW1lbnRGdW5jdGlvbihqdWRnZW1lbnROb2RlLCBhc3NpZ25tZW50cywgZGVyaXZlZCwgbG9jYWxDb250ZXh0KTtcblxuICAgIGlmIChqdWRnZW1lbnRWZXJpZmllZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAoanVkZ2VtZW50VmVyaWZpZWQpIHtcbiAgICBsb2NhbENvbnRleHQuZGVidWcoYC4uLnZlcmlmaWVkIHRoZSAnJHtqdWRnZW1lbnRTdHJpbmd9JyBqdWRnZW1lbnQuYCwganVkZ2VtZW50Tm9kZSk7XG4gIH1cblxuICByZXR1cm4ganVkZ2VtZW50VmVyaWZpZWQ7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeURlcml2ZWRKdWRnZW1lbnQoanVkZ2VtZW50Tm9kZSwgYXNzaWdubWVudHMsIGRlcml2ZWQsIGxvY2FsQ29udGV4dCkge1xuICBsZXQgZGVyaXZlZEp1ZGdlbWVudFZlcmlmaWVkID0gZmFsc2U7XG5cbiAgaWYgKGRlcml2ZWQpIHtcbiAgICBjb25zdCBqdWRnZW1lbnRTdHJpbmcgPSBsb2NhbENvbnRleHQubm9kZUFzU3RyaW5nKGp1ZGdlbWVudE5vZGUpO1xuXG4gICAgbG9jYWxDb250ZXh0LnRyYWNlKGBWZXJpZnlpbmcgdGhlICcke2p1ZGdlbWVudFN0cmluZ30nIGRlcml2ZWQganVkZ2VtZW50Li4uYCwganVkZ2VtZW50Tm9kZSk7XG5cbiAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlID0gbWV0YXZhcmlhYmxlTm9kZVF1ZXJ5KGp1ZGdlbWVudE5vZGUpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZVZlcmlmaWVkID0gdmVyaWZ5TWV0YXZhcmlhYmxlKG1ldGF2YXJpYWJsZU5vZGUsIGxvY2FsQ29udGV4dCk7XG5cbiAgICBpZiAobWV0YXZhcmlhYmxlVmVyaWZpZWQpIHtcbiAgICAgIGNvbnN0IGp1ZGdlbWVudCA9IGxvY2FsQ29udGV4dC5maW5kSnVkZ2VtZW50QnlNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICBpZiAoanVkZ2VtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lcyA9IFtdLFxuICAgICAgICAgICAgICBmcmFtZU5vZGUgPSBmcmFtZU5vZGVRdWVyeShqdWRnZW1lbnROb2RlKSxcbiAgICAgICAgICAgICAgZnJhbWVWZXJpZmllZCA9IHZlcmlmeUZyYW1lKGZyYW1lTm9kZSwgZnJhbWVzLCBhc3NpZ25tZW50cywgZGVyaXZlZCwgbG9jYWxDb250ZXh0KTtcblxuICAgICAgICBpZiAoZnJhbWVWZXJpZmllZCkge1xuICAgICAgICAgIGNvbnN0IGZpcnN0RnJhbWUgPSBmaXJzdChmcmFtZXMpLFxuICAgICAgICAgICAgICAgIGZyYW1lID0gZmlyc3RGcmFtZSwgLy8vXG4gICAgICAgICAgICAgICAgZnJhbWVTaW5ndWxhciA9IGZyYW1lLmlzU2luZ3VsYXIoKTtcblxuICAgICAgICAgIGlmIChmcmFtZVNpbmd1bGFyKSB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IGZyYW1lLmdldERlY2xhcmF0aW9uKCksXG4gICAgICAgICAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gZGVjbGFyYXRpb24uZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgICAgICAgICAgbWV0YUxlbW1hID0gbG9jYWxDb250ZXh0LmZpbmRNZXRhTGVtbWFCeU1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSksXG4gICAgICAgICAgICAgICAgICBtZXRhdGhlb3JlbSA9IGxvY2FsQ29udGV4dC5maW5kTWV0YXRoZW9yZW1CeU1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSksXG4gICAgICAgICAgICAgICAgICBtZXRhTGVtbWFNZXRhdGhlb3JlbSA9IChtZXRhTGVtbWEgfHwgbWV0YXRoZW9yZW0pOyAgLy8vXG5cbiAgICAgICAgICAgIGlmIChtZXRhTGVtbWFNZXRhdGhlb3JlbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvbk1hdGNoZXNNZXRhTGVtbWFNZXRhdGhlb3JlbSA9IGRlY2xhcmF0aW9uLm1hdGNoTWV0YUxlbW1hT3JNZXRhVGhlb3JlbShtZXRhTGVtbWFNZXRhdGhlb3JlbSksXG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlbWVudE1hdGNoZXNNZXRhTGVtbWFNZXRhdGhlb3JlbSA9IGp1ZGdlbWVudC5tYXRjaE1ldGFMZW1tYU9yTWV0YVRoZW9yZW0obWV0YUxlbW1hTWV0YXRoZW9yZW0pO1xuXG4gICAgICAgICAgICAgIGRlcml2ZWRKdWRnZW1lbnRWZXJpZmllZCA9IChkZWNsYXJhdGlvbk1hdGNoZXNNZXRhTGVtbWFNZXRhdGhlb3JlbSAmJiBqdWRnZW1lbnRNYXRjaGVzTWV0YUxlbW1hTWV0YXRoZW9yZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlU3RyaW5nID0gbG9jYWxDb250ZXh0Lm5vZGVBc1N0cmluZyhtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgICBsb2NhbENvbnRleHQuZGVidWcoYFRoZXJlIGFyZSBubyBtZXRhLWxlbW1hcyBvciBtZXRhdGhlb3JlbXMgY29ycmVzcG9uZGluZyB0byB0aGUgJyR7bWV0YXZhcmlhYmxlU3RyaW5nfScgbWV0YXZhcmlhYmxlLmAsIGp1ZGdlbWVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZVN0cmluZyA9IGxvY2FsQ29udGV4dC5ub2RlQXNTdHJpbmcoZnJhbWVOb2RlKTtcblxuICAgICAgICAgICAgbG9jYWxDb250ZXh0LmRlYnVnKGBUaGUgJyR7ZnJhbWVTdHJpbmd9JyBpcyBub3Qgc2luZ3VsYXIuYCwganVkZ2VtZW50Tm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVTdHJpbmcgPSBsb2NhbENvbnRleHQubm9kZUFzU3RyaW5nKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgVGhlcmUgaXMgbm8ganVkZ2VtZW50IHByZXNlbnQgZm9yIHRoZSAnJHttZXRhdmFyaWFibGVTdHJpbmd9JyBtZXRhdmFyaWFibGUuYCwganVkZ2VtZW50Tm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlcml2ZWRKdWRnZW1lbnRWZXJpZmllZCkge1xuICAgICAgbG9jYWxDb250ZXh0LmRlYnVnKGAuLi52ZXJpZmllZCB0aGUgJyR7anVkZ2VtZW50U3RyaW5nfScgZGVyaXZlZCBqdWRnZW1lbnQuYCwganVkZ2VtZW50Tm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlcml2ZWRKdWRnZW1lbnRWZXJpZmllZDtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5U3RhdGVkSnVkZ2VtZW50KGp1ZGdlbWVudE5vZGUsIGFzc2lnbm1lbnRzLCBkZXJpdmVkLCBsb2NhbENvbnRleHQpIHtcbiAgbGV0IHN0YXRlZEp1ZGdlbWVudFZlcmlmaWVkID0gZmFsc2U7XG5cbiAgaWYgKCFkZXJpdmVkKSB7XG4gICAgY29uc3QganVkZ2VtZW50U3RyaW5nID0gbG9jYWxDb250ZXh0Lm5vZGVBc1N0cmluZyhqdWRnZW1lbnROb2RlKTtcblxuICAgIGxvY2FsQ29udGV4dC50cmFjZShgVmVyaWZ5aW5nIHRoZSAnJHtqdWRnZW1lbnRTdHJpbmd9JyBzdGF0ZWQganVkZ2VtZW50Li4uYCwganVkZ2VtZW50Tm9kZSk7XG5cbiAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlID0gbWV0YXZhcmlhYmxlTm9kZVF1ZXJ5KGp1ZGdlbWVudE5vZGUpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZVZlcmlmaWVkID0gdmVyaWZ5TWV0YXZhcmlhYmxlKG1ldGF2YXJpYWJsZU5vZGUsIGxvY2FsQ29udGV4dCk7XG5cbiAgICBpZiAobWV0YXZhcmlhYmxlVmVyaWZpZWQpIHtcbiAgICAgIGNvbnN0IGZyYW1lcyA9IFtdLFxuICAgICAgICAgICAgZnJhbWVOb2RlID0gZnJhbWVOb2RlUXVlcnkoanVkZ2VtZW50Tm9kZSksXG4gICAgICAgICAgICBmcmFtZVZlcmlmaWVkID0gdmVyaWZ5RnJhbWUoZnJhbWVOb2RlLCBmcmFtZXMsIGFzc2lnbm1lbnRzLCBkZXJpdmVkLCBsb2NhbENvbnRleHQpO1xuXG4gICAgICBpZiAoZnJhbWVWZXJpZmllZCkge1xuICAgICAgICBjb25zdCBmaXJzdEZyYW1lID0gZmlyc3QoZnJhbWVzKSxcbiAgICAgICAgICAgICAgZnJhbWUgPSBmaXJzdEZyYW1lLCAvLy9cbiAgICAgICAgICAgICAganVkZ2VtZW50ID0gSnVkZ2VtZW50LmZyb21KdWRnZW1lbnROb2RlRnJhbWVBbmRNZXRhdmFyaWFibGVOb2RlKGp1ZGdlbWVudE5vZGUsIGZyYW1lLCBtZXRhdmFyaWFibGVOb2RlKSxcbiAgICAgICAgICAgICAganVkZ2VtZW50QXNzaWdubWVudCA9IEp1ZGdlbWVudEFzc2lnbm1lbnQuZnJvbUp1ZGdlbWVudChqdWRnZW1lbnQpLFxuICAgICAgICAgICAgICBhc3NpZ25tZW50ID0ganVkZ2VtZW50QXNzaWdubWVudDtcblxuICAgICAgICBhc3NpZ25tZW50cy5wdXNoKGFzc2lnbm1lbnQpO1xuXG4gICAgICAgIHN0YXRlZEp1ZGdlbWVudFZlcmlmaWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhdGVkSnVkZ2VtZW50VmVyaWZpZWQpIHtcbiAgICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgLi4udmVyaWZpZWQgdGhlICcke2p1ZGdlbWVudFN0cmluZ30nIHN0YXRlZCBqdWRnZW1lbnQuYCwganVkZ2VtZW50Tm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0YXRlZEp1ZGdlbWVudFZlcmlmaWVkO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlNZXRhdmFyaWFibGUobWV0YXZhcmlhYmxlTm9kZSwgbG9jYWxDb250ZXh0KSB7XG4gIGxldCBtZXRhdmFyaWFibGVWZXJpZmllZCA9IGZhbHNlO1xuXG4gIGNvbnN0IG1ldGF2YXJpYWJsZVN0cmluZyA9IGxvY2FsQ29udGV4dC5ub2RlQXNTdHJpbmcobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgbG9jYWxDb250ZXh0LnRyYWNlKGBWZXJpZnlpbmcgdGhlICcke21ldGF2YXJpYWJsZVN0cmluZ30nIG1ldGF2YXJpYWJsZS4uLmAsIG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gIGNvbnN0IG1ldGF2YXJpYWJsZSA9IGxvY2FsQ29udGV4dC5maW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gIGlmIChtZXRhdmFyaWFibGUgIT09IG51bGwpIHtcbiAgICBjb25zdCBtZXRhVHlwZSA9IG1ldGF2YXJpYWJsZS5nZXRNZXRhVHlwZSgpO1xuXG4gICAgaWYgKG1ldGFUeXBlID09PSBmcmFtZU1ldGFUeXBlKSB7XG4gICAgICBtZXRhdmFyaWFibGVWZXJpZmllZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZyYW1lTWV0YVR5cGVOYW1lID0gZnJhbWVNZXRhVHlwZS5nZXROYW1lKCksXG4gICAgICAgICAgICBtZXRhVHlwZVN0cmluZyA9IG1ldGFUeXBlLmFzU3RyaW5nKCk7XG5cbiAgICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgVGhlICcke21ldGF2YXJpYWJsZVN0cmluZ30nIG1ldGF2YXJpYWJsZSdzIG1ldGEtdHlwZSBpcyAnJHttZXRhVHlwZVN0cmluZ30nIHdoZW4gaXQgc2hvdWxkIGJlICcke2ZyYW1lTWV0YVR5cGVOYW1lfScuYCwgbWV0YXZhcmlhYmxlTm9kZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgVGhlICcke21ldGF2YXJpYWJsZVN0cmluZ30nIG1ldGF2YXJpYWJsZSBpcyBub3QgcHJlc2VudCcuYCwgbWV0YXZhcmlhYmxlTm9kZSk7XG4gIH1cblxuICBpZiAobWV0YXZhcmlhYmxlVmVyaWZpZWQpIHtcbiAgICBsb2NhbENvbnRleHQuZGVidWcoYC4uLnZlcmlmaWVkIHRoZSAnJHttZXRhdmFyaWFibGVTdHJpbmd9JyBtZXRhdmFyaWFibGUuYCwgbWV0YXZhcmlhYmxlTm9kZSk7XG4gIH1cblxuICByZXR1cm4gbWV0YXZhcmlhYmxlVmVyaWZpZWQ7XG59XG4iXSwibmFtZXMiOlsidmVyaWZ5SnVkZ2VtZW50IiwiZnJhbWVOb2RlUXVlcnkiLCJub2RlUXVlcnkiLCJtZXRhdmFyaWFibGVOb2RlUXVlcnkiLCJqdWRnZW1lbnROb2RlIiwiYXNzaWdubWVudHMiLCJkZXJpdmVkIiwibG9jYWxDb250ZXh0IiwianVkZ2VtZW50VmVyaWZpZWQiLCJqdWRnZW1lbnRTdHJpbmciLCJub2RlQXNTdHJpbmciLCJ0cmFjZSIsInZlcmlmeUp1ZGdlbWVudEZ1bmN0aW9ucyIsInZlcmlmeURlcml2ZWRKdWRnZW1lbnQiLCJ2ZXJpZnlTdGF0ZWRKdWRnZW1lbnQiLCJzb21lIiwidmVyaWZ5SnVkZ2VtZW50RnVuY3Rpb24iLCJkZWJ1ZyIsImRlcml2ZWRKdWRnZW1lbnRWZXJpZmllZCIsIm1ldGF2YXJpYWJsZU5vZGUiLCJtZXRhdmFyaWFibGVWZXJpZmllZCIsInZlcmlmeU1ldGF2YXJpYWJsZSIsImp1ZGdlbWVudCIsImZpbmRKdWRnZW1lbnRCeU1ldGF2YXJpYWJsZU5vZGUiLCJmcmFtZXMiLCJmcmFtZU5vZGUiLCJmcmFtZVZlcmlmaWVkIiwidmVyaWZ5RnJhbWUiLCJmaXJzdEZyYW1lIiwiZmlyc3QiLCJmcmFtZSIsImZyYW1lU2luZ3VsYXIiLCJpc1Npbmd1bGFyIiwiZGVjbGFyYXRpb24iLCJnZXREZWNsYXJhdGlvbiIsImdldE1ldGF2YXJpYWJsZU5vZGUiLCJtZXRhTGVtbWEiLCJmaW5kTWV0YUxlbW1hQnlNZXRhdmFyaWFibGVOb2RlIiwibWV0YXRoZW9yZW0iLCJmaW5kTWV0YXRoZW9yZW1CeU1ldGF2YXJpYWJsZU5vZGUiLCJtZXRhTGVtbWFNZXRhdGhlb3JlbSIsImRlY2xhcmF0aW9uTWF0Y2hlc01ldGFMZW1tYU1ldGF0aGVvcmVtIiwibWF0Y2hNZXRhTGVtbWFPck1ldGFUaGVvcmVtIiwianVkZ2VtZW50TWF0Y2hlc01ldGFMZW1tYU1ldGF0aGVvcmVtIiwibWV0YXZhcmlhYmxlU3RyaW5nIiwiZnJhbWVTdHJpbmciLCJzdGF0ZWRKdWRnZW1lbnRWZXJpZmllZCIsIkp1ZGdlbWVudCIsImZyb21KdWRnZW1lbnROb2RlRnJhbWVBbmRNZXRhdmFyaWFibGVOb2RlIiwianVkZ2VtZW50QXNzaWdubWVudCIsIkp1ZGdlbWVudEFzc2lnbm1lbnQiLCJmcm9tSnVkZ2VtZW50IiwiYXNzaWdubWVudCIsInB1c2giLCJtZXRhdmFyaWFibGUiLCJmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlIiwibWV0YVR5cGUiLCJnZXRNZXRhVHlwZSIsImZyYW1lTWV0YVR5cGUiLCJmcmFtZU1ldGFUeXBlTmFtZSIsImdldE5hbWUiLCJtZXRhVHlwZVN0cmluZyIsImFzU3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFhQTs7O2VBQXdCQTs7O2dFQVhGOzREQUNFOzZEQUNFO2lFQUNNO3FCQUVWO3FCQUNJOzs7Ozs7QUFFMUIsSUFBTUMsaUJBQWlCQyxJQUFBQSxnQkFBUyxFQUFDLHNCQUMzQkMsd0JBQXdCRCxJQUFBQSxnQkFBUyxFQUFDO0FBRXpCLFNBQVNGLGdCQUFnQkksYUFBYSxFQUFFQyxXQUFXLEVBQUVDLE9BQU8sRUFBRUMsWUFBWTtJQUN2RixJQUFJQztJQUVKLElBQU1DLGtCQUFrQkYsYUFBYUcsWUFBWSxDQUFDTjtJQUVsREcsYUFBYUksS0FBSyxDQUFDLEFBQUMsa0JBQWlDLE9BQWhCRixpQkFBZ0IsbUJBQWlCTDtJQUV0RSxJQUFNUSwyQkFBMkI7UUFDL0JDO1FBQ0FD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