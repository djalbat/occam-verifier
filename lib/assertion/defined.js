"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return DefinedAssertion;
    }
});
var _shim = /*#__PURE__*/ _interop_require_default(require("../shim"));
var _assertion = require("../utilities/assertion");
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
var DefinedAssertion = /*#__PURE__*/ function() {
    function DefinedAssertion(string, node, term, frame, negated) {
        _class_call_check(this, DefinedAssertion);
        this.string = string;
        this.node = node;
        this.term = term;
        this.frame = frame;
        this.negated = negated;
    }
    _create_class(DefinedAssertion, [
        {
            key: "getString",
            value: function getString() {
                return this.string;
            }
        },
        {
            key: "getNode",
            value: function getNode() {
                return this.node;
            }
        },
        {
            key: "getTerm",
            value: function getTerm() {
                return this.term;
            }
        },
        {
            key: "getFrame",
            value: function getFrame() {
                return this.frame;
            }
        },
        {
            key: "isNegated",
            value: function isNegated() {
                return this.negated;
            }
        },
        {
            key: "verify",
            value: function verify(assignments, stated, localContext) {
                var verified = false;
                var definedAssertionString = this.string; ///
                localContext.trace("Verifying the '".concat(definedAssertionString, "' defined assertion..."));
                assignments = null; ///
                var termVerified = true, frameVerified = true; ///
                if (this.term !== null) {
                    termVerified = this.term.verify(localContext, function() {
                        var verifiedAhead = true;
                        return verifiedAhead;
                    });
                }
                if (this.frame !== null) {
                    frameVerified = this.frame.verify(localContext);
                }
                if (termVerified && frameVerified) {
                    var verifiedWhenStated = false, verifiedWhenDerived = false;
                    if (stated) {
                        verifiedWhenStated = this.verifyWhenStated(localContext);
                    } else {
                        verifiedWhenDerived = this.verifyWhenDerived(localContext);
                    }
                    if (verifiedWhenStated || verifiedWhenDerived) {
                        verified = true;
                    }
                }
                if (verified) {
                    localContext.debug("...verified the '".concat(definedAssertionString, "' defined assertion."));
                }
                return verified;
            }
        },
        {
            key: "verifyWhenStated",
            value: function verifyWhenStated(localContext) {
                var verifiedWhenStated;
                var definedAssertionString = this.string; ///
                localContext.trace("Verifying the '".concat(definedAssertionString, "' stated defined assertion..."));
                verifiedWhenStated = true;
                if (verifiedWhenStated) {
                    localContext.debug("...verified the '".concat(definedAssertionString, "' stated defined assertion."));
                }
                return verifiedWhenStated;
            }
        },
        {
            key: "verifyWhenDerived",
            value: function verifyWhenDerived(localContext) {
                var verifiedWhenDerived = false;
                var definedAssertionString = this.string; ///
                localContext.trace("Verifying the '".concat(definedAssertionString, "' derived defined assertion..."));
                if (this.term !== null) {
                    var Variable = _shim.default.Variable, termNode = this.term.getNode(), variable = Variable.fromTermNode(termNode, localContext), variableDefined = localContext.isVariableDefined(variable);
                    if (!this.negated && variableDefined) {
                        verifiedWhenDerived = true;
                    }
                    if (this.negated && !variableDefined) {
                        verifiedWhenDerived = true;
                    }
                }
                if (this.frame !== null) {
                    debugger;
                    var Metavariable = _shim.default.Metavariable, frameNode = this.frame.getNode(), metavariable = Metavariable.fromTermNode(frameNode, localContext), metavariableDefined = localContext.isMetametavariableDefined(metavariable);
                    if (!this.negated && metavariableDefined) {
                        verifiedWhenDerived = true;
                    }
                    if (this.negated && !metavariableDefined) {
                        verifiedWhenDerived = true;
                    }
                }
                if (verifiedWhenDerived) {
                    localContext.debug("...verified the '".concat(definedAssertionString, "' derived defined assertion."));
                }
                return verifiedWhenDerived;
            }
        }
    ], [
        {
            key: "fromDefinedAssertionNode",
            value: function fromDefinedAssertionNode(definedAssertionNode, localContext) {
                var definedAssertion = null;
                if (definedAssertionNode !== null) {
                    var Term = _shim.default.Term, Frame = _shim.default.Frame, node = definedAssertionNode, string = localContext.nodeAsString(node), term = Term.fromDefinedAssertionNode(definedAssertionNode, localContext), frame = Frame.fromDefinedAssertionNode(definedAssertionNode, localContext), definedAssertionNegated = (0, _assertion.isAssertionNegated)(definedAssertionNode), negated = definedAssertionNegated; ///
                    definedAssertion = new DefinedAssertion(string, node, term, frame, negated);
                }
                return definedAssertion;
            }
        }
    ]);
    return DefinedAssertion;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hc3NlcnRpb24vZGVmaW5lZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHNoaW0gZnJvbSBcIi4uL3NoaW1cIjtcblxuaW1wb3J0IHsgaXNBc3NlcnRpb25OZWdhdGVkIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hc3NlcnRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmaW5lZEFzc2VydGlvbiB7XG4gIGNvbnN0cnVjdG9yKHN0cmluZywgbm9kZSwgdGVybSwgZnJhbWUsIG5lZ2F0ZWQpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMudGVybSA9IHRlcm07XG4gICAgdGhpcy5mcmFtZT0gZnJhbWU7XG4gICAgdGhpcy5uZWdhdGVkID0gbmVnYXRlZDtcbiAgfVxuXG4gIGdldFN0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmc7XG4gIH1cblxuICBnZXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGU7XG4gIH1cblxuICBnZXRUZXJtKCkge1xuICAgIHJldHVybiB0aGlzLnRlcm07XG4gIH1cblxuICBnZXRGcmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZTtcbiAgfVxuXG4gIGlzTmVnYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5uZWdhdGVkO1xuICB9XG5cbiAgdmVyaWZ5KGFzc2lnbm1lbnRzLCBzdGF0ZWQsIGxvY2FsQ29udGV4dCkge1xuICAgIGxldCB2ZXJpZmllZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGVmaW5lZEFzc2VydGlvblN0cmluZyA9IHRoaXMuc3RyaW5nOyAvLy9cblxuICAgIGxvY2FsQ29udGV4dC50cmFjZShgVmVyaWZ5aW5nIHRoZSAnJHtkZWZpbmVkQXNzZXJ0aW9uU3RyaW5nfScgZGVmaW5lZCBhc3NlcnRpb24uLi5gKTtcblxuICAgIGFzc2lnbm1lbnRzID0gbnVsbDsgLy8vXG5cbiAgICBsZXQgdGVybVZlcmlmaWVkID0gdHJ1ZSwgIC8vL1xuICAgICAgICBmcmFtZVZlcmlmaWVkID0gdHJ1ZTsgLy8vXG5cbiAgICBpZiAodGhpcy50ZXJtICE9PSBudWxsKSB7XG4gICAgICB0ZXJtVmVyaWZpZWQgPSB0aGlzLnRlcm0udmVyaWZ5KGxvY2FsQ29udGV4dCwgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJpZmllZEFoZWFkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdmVyaWZpZWRBaGVhZDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZyYW1lIT09IG51bGwpIHtcbiAgICAgIGZyYW1lVmVyaWZpZWQgPSB0aGlzLmZyYW1lLnZlcmlmeShsb2NhbENvbnRleHQpO1xuICAgIH1cblxuICAgIGlmICh0ZXJtVmVyaWZpZWQgJiYgZnJhbWVWZXJpZmllZCkge1xuICAgICAgbGV0IHZlcmlmaWVkV2hlblN0YXRlZCA9IGZhbHNlLFxuICAgICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSBmYWxzZTtcblxuICAgICAgaWYgKHN0YXRlZCkge1xuICAgICAgICB2ZXJpZmllZFdoZW5TdGF0ZWQgPSB0aGlzLnZlcmlmeVdoZW5TdGF0ZWQobG9jYWxDb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSB0aGlzLnZlcmlmeVdoZW5EZXJpdmVkKGxvY2FsQ29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2ZXJpZmllZFdoZW5TdGF0ZWQgfHwgdmVyaWZpZWRXaGVuRGVyaXZlZCkge1xuICAgICAgICB2ZXJpZmllZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZlcmlmaWVkKSB7XG4gICAgICBsb2NhbENvbnRleHQuZGVidWcoYC4uLnZlcmlmaWVkIHRoZSAnJHtkZWZpbmVkQXNzZXJ0aW9uU3RyaW5nfScgZGVmaW5lZCBhc3NlcnRpb24uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcmlmaWVkO1xuICB9XG5cbiAgdmVyaWZ5V2hlblN0YXRlZChsb2NhbENvbnRleHQpIHtcbiAgICBsZXQgdmVyaWZpZWRXaGVuU3RhdGVkO1xuXG4gICAgY29uc3QgZGVmaW5lZEFzc2VydGlvblN0cmluZyA9IHRoaXMuc3RyaW5nOyAvLy9cblxuICAgIGxvY2FsQ29udGV4dC50cmFjZShgVmVyaWZ5aW5nIHRoZSAnJHtkZWZpbmVkQXNzZXJ0aW9uU3RyaW5nfScgc3RhdGVkIGRlZmluZWQgYXNzZXJ0aW9uLi4uYCk7XG5cbiAgICB2ZXJpZmllZFdoZW5TdGF0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHZlcmlmaWVkV2hlblN0YXRlZCkge1xuICAgICAgbG9jYWxDb250ZXh0LmRlYnVnKGAuLi52ZXJpZmllZCB0aGUgJyR7ZGVmaW5lZEFzc2VydGlvblN0cmluZ30nIHN0YXRlZCBkZWZpbmVkIGFzc2VydGlvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyaWZpZWRXaGVuU3RhdGVkO1xuICB9XG5cbiAgdmVyaWZ5V2hlbkRlcml2ZWQobG9jYWxDb250ZXh0KSB7XG4gICAgbGV0IHZlcmlmaWVkV2hlbkRlcml2ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRlZmluZWRBc3NlcnRpb25TdHJpbmcgPSB0aGlzLnN0cmluZzsgLy8vXG5cbiAgICBsb2NhbENvbnRleHQudHJhY2UoYFZlcmlmeWluZyB0aGUgJyR7ZGVmaW5lZEFzc2VydGlvblN0cmluZ30nIGRlcml2ZWQgZGVmaW5lZCBhc3NlcnRpb24uLi5gKTtcblxuICAgIGlmICh0aGlzLnRlcm0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgVmFyaWFibGUgfSA9IHNoaW0sXG4gICAgICAgICAgICB0ZXJtTm9kZSA9IHRoaXMudGVybS5nZXROb2RlKCksXG4gICAgICAgICAgICB2YXJpYWJsZSA9IFZhcmlhYmxlLmZyb21UZXJtTm9kZSh0ZXJtTm9kZSwgbG9jYWxDb250ZXh0KSxcbiAgICAgICAgICAgIHZhcmlhYmxlRGVmaW5lZCA9IGxvY2FsQ29udGV4dC5pc1ZhcmlhYmxlRGVmaW5lZCh2YXJpYWJsZSk7XG5cbiAgICAgIGlmICghdGhpcy5uZWdhdGVkICYmIHZhcmlhYmxlRGVmaW5lZCkge1xuICAgICAgICB2ZXJpZmllZFdoZW5EZXJpdmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubmVnYXRlZCAmJiAhdmFyaWFibGVEZWZpbmVkKSB7XG4gICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmZyYW1lIT09IG51bGwpIHtcbiAgICAgIGRlYnVnZ2VyXG5cbiAgICAgIGNvbnN0IHsgTWV0YXZhcmlhYmxlIH0gPSBzaGltLFxuICAgICAgICAgICAgZnJhbWVOb2RlID0gdGhpcy5mcmFtZS5nZXROb2RlKCksXG4gICAgICAgICAgICBtZXRhdmFyaWFibGUgPSBNZXRhdmFyaWFibGUuZnJvbVRlcm1Ob2RlKGZyYW1lTm9kZSwgbG9jYWxDb250ZXh0KSxcbiAgICAgICAgICAgIG1ldGF2YXJpYWJsZURlZmluZWQgPSBsb2NhbENvbnRleHQuaXNNZXRhbWV0YXZhcmlhYmxlRGVmaW5lZChtZXRhdmFyaWFibGUpO1xuXG4gICAgICBpZiAoIXRoaXMubmVnYXRlZCAmJiBtZXRhdmFyaWFibGVEZWZpbmVkKSB7XG4gICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5uZWdhdGVkICYmICFtZXRhdmFyaWFibGVEZWZpbmVkKSB7XG4gICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2ZXJpZmllZFdoZW5EZXJpdmVkKSB7XG4gICAgICBsb2NhbENvbnRleHQuZGVidWcoYC4uLnZlcmlmaWVkIHRoZSAnJHtkZWZpbmVkQXNzZXJ0aW9uU3RyaW5nfScgZGVyaXZlZCBkZWZpbmVkIGFzc2VydGlvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyaWZpZWRXaGVuRGVyaXZlZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRGVmaW5lZEFzc2VydGlvbk5vZGUoZGVmaW5lZEFzc2VydGlvbk5vZGUsIGxvY2FsQ29udGV4dCkge1xuICAgIGxldCBkZWZpbmVkQXNzZXJ0aW9uID0gbnVsbDtcblxuICAgIGlmIChkZWZpbmVkQXNzZXJ0aW9uTm9kZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBUZXJtLCBGcmFtZSB9ID0gc2hpbSxcbiAgICAgICAgICAgIG5vZGUgPSBkZWZpbmVkQXNzZXJ0aW9uTm9kZSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5nID0gbG9jYWxDb250ZXh0Lm5vZGVBc1N0cmluZyhub2RlKSxcbiAgICAgICAgICAgIHRlcm0gPSBUZXJtLmZyb21EZWZpbmVkQXNzZXJ0aW9uTm9kZShkZWZpbmVkQXNzZXJ0aW9uTm9kZSwgbG9jYWxDb250ZXh0KSxcbiAgICAgICAgICAgIGZyYW1lID0gRnJhbWUuZnJvbURlZmluZWRBc3NlcnRpb25Ob2RlKGRlZmluZWRBc3NlcnRpb25Ob2RlLCBsb2NhbENvbnRleHQpLFxuICAgICAgICAgICAgZGVmaW5lZEFzc2VydGlvbk5lZ2F0ZWQgPSBpc0Fzc2VydGlvbk5lZ2F0ZWQoZGVmaW5lZEFzc2VydGlvbk5vZGUpLFxuICAgICAgICAgICAgbmVnYXRlZCA9IGRlZmluZWRBc3NlcnRpb25OZWdhdGVkOyAgLy8vXG5cbiAgICAgIGRlZmluZWRBc3NlcnRpb24gPSBuZXcgRGVmaW5lZEFzc2VydGlvbihzdHJpbmcsIG5vZGUsIHRlcm0sIGZyYW1lLCBuZWdhdGVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmaW5lZEFzc2VydGlvbjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkRlZmluZWRBc3NlcnRpb24iLCJzdHJpbmciLCJub2RlIiwidGVybSIsImZyYW1lIiwibmVnYXRlZCIsImdldFN0cmluZyIsImdldE5vZGUiLCJnZXRUZXJtIiwiZ2V0RnJhbWUiLCJpc05lZ2F0ZWQiLCJ2ZXJpZnkiLCJhc3NpZ25tZW50cyIsInN0YXRlZCIsImxvY2FsQ29udGV4dCIsInZlcmlmaWVkIiwiZGVmaW5lZEFzc2VydGlvblN0cmluZyIsInRyYWNlIiwidGVybVZlcmlmaWVkIiwiZnJhbWVWZXJpZmllZCIsInZlcmlmaWVkQWhlYWQiLCJ2ZXJpZmllZFdoZW5TdGF0ZWQiLCJ2ZXJpZmllZFdoZW5EZXJpdmVkIiwidmVyaWZ5V2hlblN0YXRlZCIsInZlcmlmeVdoZW5EZXJpdmVkIiwiZGVidWciLCJWYXJpYWJsZSIsInNoaW0iLCJ0ZXJtTm9kZSIsInZhcmlhYmxlIiwiZnJvbVRlcm1Ob2RlIiwidmFyaWFibGVEZWZpbmVkIiwiaXNWYXJpYWJsZURlZmluZWQiLCJNZXRhdmFyaWFibGUiLCJmcmFtZU5vZGUiLCJtZXRhdmFyaWFibGUiLCJtZXRhdmFyaWFibGVEZWZpbmVkIiwiaXNNZXRhbWV0YXZhcmlhYmxlRGVmaW5lZCIsImZyb21EZWZpbmVkQXNzZXJ0aW9uTm9kZSIsImRlZmluZWRBc3NlcnRpb25Ob2RlIiwiZGVmaW5lZEFzc2VydGlvbiIsIlRlcm0iLCJGcmFtZSIsIm5vZGVBc1N0cmluZyIsImRlZmluZWRBc3NlcnRpb25OZWdhdGVkIiwiaXNBc3NlcnRpb25OZWdhdGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQU1xQkE7OzsyREFKSjt5QkFFa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFcEIsSUFBQSxBQUFNQSxpQ0FBTjthQUFNQSxpQkFDUEMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxPQUFPO2dDQUQzQkw7UUFFakIsSUFBSSxDQUFDQyxNQUFNLEdBQUdBO1FBQ2QsSUFBSSxDQUFDQyxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxLQUFLLEdBQUVBO1FBQ1osSUFBSSxDQUFDQyxPQUFPLEdBQUdBOztrQkFORUw7O1lBU25CTSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJ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