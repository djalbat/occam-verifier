"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ContainedAssertion;
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
var ContainedAssertion = /*#__PURE__*/ function() {
    function ContainedAssertion(string, node, term, frame, negated, statement) {
        _class_call_check(this, ContainedAssertion);
        this.string = string;
        this.node = node;
        this.term = term;
        this.frame = frame;
        this.negated = negated;
        this.statement = statement;
    }
    _create_class(ContainedAssertion, [
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
            key: "getStatement",
            value: function getStatement() {
                return this.statement;
            }
        },
        {
            key: "verify",
            value: function verify(assignments, stated, localContext) {
                var verified = false;
                var containedAssertionString = this.string; ///
                localContext.trace("Verifying the '".concat(containedAssertionString, "' contained assertion..."));
                assignments = null; ///
                var termVerified = true, frameVerified = true, statementVerified;
                if (this.term !== null) {
                    termVerified = this.term.verify(localContext, function() {
                        var verifiedAhead = true;
                        return verifiedAhead;
                    });
                }
                if (this.frame !== null) {
                    frameVerified = this.frame.verify(localContext);
                }
                statementVerified = this.statement.verify(assignments, stated, localContext);
                if (termVerified && frameVerified && statementVerified) {
                    var verifiedWhenStated = false, verifiedWhenDerived = false;
                    if (stated) {
                        verifiedWhenStated = this.verifyWhenStated(assignments, localContext);
                    } else {
                        verifiedWhenDerived = this.verifyWhenDerived(localContext);
                    }
                    if (verifiedWhenStated || verifiedWhenDerived) {
                        verified = true;
                    }
                }
                if (verified) {
                    localContext.debug("...verified the '".concat(containedAssertionString, "' contained assertion."));
                }
                return verified;
            }
        },
        {
            key: "verifyWhenStated",
            value: function verifyWhenStated(assignments, localContext) {
                var verifiedWhenStated;
                var containedAssertionString = this.string; ///
                localContext.trace("Verifying the '".concat(containedAssertionString, "' stated contained assertion..."));
                verifiedWhenStated = true;
                if (verifiedWhenStated) {
                    localContext.debug("...verified the '".concat(containedAssertionString, "' stated contained assertion."));
                }
                return verifiedWhenStated;
            }
        },
        {
            key: "verifyWhenDerived",
            value: function verifyWhenDerived(localContext) {
                var verifiedWhenDerived = false;
                var containedAssertionString = this.string; ///
                localContext.trace("Verifying the '".concat(containedAssertionString, "' derived contained assertion..."));
                if (this.term !== null) {
                    var variable = this.term.getVariable(localContext);
                    if (variable !== null) {
                        var variableContained = this.statement.isVariableContained(variable, localContext);
                        if (!this.negated && variableContained) {
                            verifiedWhenDerived = true;
                        }
                        if (this.negated && !variableContained) {
                            verifiedWhenDerived = true;
                        }
                    }
                }
                if (this.frame !== null) {
                    var metavariable = this.frame.getVariable(localContext);
                    if (metavariable !== null) {
                        var metavariableContained = this.statement.isMetavariableContained(metavariable, localContext);
                        if (!this.negated && metavariableContained) {
                            verifiedWhenDerived = true;
                        }
                        if (this.negated && !metavariableContained) {
                            verifiedWhenDerived = true;
                        }
                    }
                }
                if (verifiedWhenDerived) {
                    localContext.debug("...verified the '".concat(containedAssertionString, "' derived contained assertion."));
                }
                return verifiedWhenDerived;
            }
        }
    ], [
        {
            key: "fromContainedAssertionNode",
            value: function fromContainedAssertionNode(containedAssertionNode, localContext) {
                var containedAssertion = null;
                if (containedAssertionNode !== null) {
                    var Term = _shim.default.Term, Frame = _shim.default.Frame, Statement = _shim.default.Statement, node = containedAssertionNode, string = localContext.nodeAsString(node), term = Term.fromContainedAssertionNode(containedAssertionNode, localContext), frame = Frame.fromContainedAssertionNode(containedAssertionNode, localContext), statement = Statement.fromContainedAssertionNode(containedAssertionNode, localContext), containedAssertionNegated = (0, _assertion.isAssertionNegated)(containedAssertionNode), negated = containedAssertionNegated; ///
                    containedAssertion = new ContainedAssertion(string, node, term, frame, negated, statement);
                }
                return containedAssertion;
            }
        }
    ]);
    return ContainedAssertion;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hc3NlcnRpb24vY29udGFpbmVkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgc2hpbSBmcm9tIFwiLi4vc2hpbVwiO1xuXG5pbXBvcnQgeyBpc0Fzc2VydGlvbk5lZ2F0ZWQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2Fzc2VydGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZWRBc3NlcnRpb24ge1xuICBjb25zdHJ1Y3RvcihzdHJpbmcsIG5vZGUsIHRlcm0sIGZyYW1lLCBuZWdhdGVkLCBzdGF0ZW1lbnQpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMudGVybSA9IHRlcm07XG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xuICAgIHRoaXMubmVnYXRlZCA9IG5lZ2F0ZWQ7XG4gICAgdGhpcy5zdGF0ZW1lbnQgPSBzdGF0ZW1lbnQ7XG4gIH1cblxuICBnZXRTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nO1xuICB9XG5cbiAgZ2V0Tm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xuICB9XG5cbiAgZ2V0VGVybSgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJtO1xuICB9XG5cbiAgZ2V0RnJhbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJhbWU7XG4gIH1cblxuICBpc05lZ2F0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubmVnYXRlZDtcbiAgfVxuXG4gIGdldFN0YXRlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZW1lbnQ7XG4gIH1cblxuICB2ZXJpZnkoYXNzaWdubWVudHMsIHN0YXRlZCwgbG9jYWxDb250ZXh0KSB7XG4gICAgbGV0IHZlcmlmaWVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjb250YWluZWRBc3NlcnRpb25TdHJpbmcgPSB0aGlzLnN0cmluZzsgLy8vXG5cbiAgICBsb2NhbENvbnRleHQudHJhY2UoYFZlcmlmeWluZyB0aGUgJyR7Y29udGFpbmVkQXNzZXJ0aW9uU3RyaW5nfScgY29udGFpbmVkIGFzc2VydGlvbi4uLmApO1xuXG4gICAgYXNzaWdubWVudHMgPSBudWxsOyAvLy9cblxuICAgIGxldCB0ZXJtVmVyaWZpZWQgPSB0cnVlLCAgLy8vXG4gICAgICAgIGZyYW1lVmVyaWZpZWQgPSB0cnVlLCAvLy9cbiAgICAgICAgc3RhdGVtZW50VmVyaWZpZWQ7XG5cbiAgICBpZiAodGhpcy50ZXJtICE9PSBudWxsKSB7XG4gICAgICB0ZXJtVmVyaWZpZWQgPSB0aGlzLnRlcm0udmVyaWZ5KGxvY2FsQ29udGV4dCwgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJpZmllZEFoZWFkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdmVyaWZpZWRBaGVhZDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZyYW1lICE9PSBudWxsKSB7XG4gICAgICBmcmFtZVZlcmlmaWVkID0gdGhpcy5mcmFtZS52ZXJpZnkobG9jYWxDb250ZXh0KTtcbiAgICB9XG5cbiAgICBzdGF0ZW1lbnRWZXJpZmllZCA9IHRoaXMuc3RhdGVtZW50LnZlcmlmeShhc3NpZ25tZW50cywgc3RhdGVkLCBsb2NhbENvbnRleHQpO1xuXG4gICAgaWYgKHRlcm1WZXJpZmllZCAmJiBmcmFtZVZlcmlmaWVkICYmIHN0YXRlbWVudFZlcmlmaWVkKSB7XG4gICAgICBsZXQgdmVyaWZpZWRXaGVuU3RhdGVkID0gZmFsc2UsXG4gICAgICAgICAgdmVyaWZpZWRXaGVuRGVyaXZlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoc3RhdGVkKSB7XG4gICAgICAgIHZlcmlmaWVkV2hlblN0YXRlZCA9IHRoaXMudmVyaWZ5V2hlblN0YXRlZChhc3NpZ25tZW50cywgbG9jYWxDb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSB0aGlzLnZlcmlmeVdoZW5EZXJpdmVkKGxvY2FsQ29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2ZXJpZmllZFdoZW5TdGF0ZWQgfHwgdmVyaWZpZWRXaGVuRGVyaXZlZCkge1xuICAgICAgICB2ZXJpZmllZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZlcmlmaWVkKSB7XG4gICAgICBsb2NhbENvbnRleHQuZGVidWcoYC4uLnZlcmlmaWVkIHRoZSAnJHtjb250YWluZWRBc3NlcnRpb25TdHJpbmd9JyBjb250YWluZWQgYXNzZXJ0aW9uLmApO1xuICAgIH1cblxuICAgIHJldHVybiB2ZXJpZmllZDtcbiAgfVxuXG4gIHZlcmlmeVdoZW5TdGF0ZWQoYXNzaWdubWVudHMsIGxvY2FsQ29udGV4dCkge1xuICAgIGxldCB2ZXJpZmllZFdoZW5TdGF0ZWQ7XG5cbiAgICBjb25zdCBjb250YWluZWRBc3NlcnRpb25TdHJpbmcgPSB0aGlzLnN0cmluZzsgLy8vXG5cbiAgICBsb2NhbENvbnRleHQudHJhY2UoYFZlcmlmeWluZyB0aGUgJyR7Y29udGFpbmVkQXNzZXJ0aW9uU3RyaW5nfScgc3RhdGVkIGNvbnRhaW5lZCBhc3NlcnRpb24uLi5gKTtcblxuICAgIHZlcmlmaWVkV2hlblN0YXRlZCA9IHRydWU7XG5cbiAgICBpZiAodmVyaWZpZWRXaGVuU3RhdGVkKSB7XG4gICAgICBsb2NhbENvbnRleHQuZGVidWcoYC4uLnZlcmlmaWVkIHRoZSAnJHtjb250YWluZWRBc3NlcnRpb25TdHJpbmd9JyBzdGF0ZWQgY29udGFpbmVkIGFzc2VydGlvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyaWZpZWRXaGVuU3RhdGVkO1xuICB9XG5cbiAgdmVyaWZ5V2hlbkRlcml2ZWQobG9jYWxDb250ZXh0KSB7XG4gICAgbGV0IHZlcmlmaWVkV2hlbkRlcml2ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGNvbnRhaW5lZEFzc2VydGlvblN0cmluZyA9IHRoaXMuc3RyaW5nOyAvLy9cblxuICAgIGxvY2FsQ29udGV4dC50cmFjZShgVmVyaWZ5aW5nIHRoZSAnJHtjb250YWluZWRBc3NlcnRpb25TdHJpbmd9JyBkZXJpdmVkIGNvbnRhaW5lZCBhc3NlcnRpb24uLi5gKTtcblxuICAgIGlmICh0aGlzLnRlcm0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlID0gdGhpcy50ZXJtLmdldFZhcmlhYmxlKGxvY2FsQ29udGV4dCk7XG5cbiAgICAgIGlmICh2YXJpYWJsZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB2YXJpYWJsZUNvbnRhaW5lZCA9IHRoaXMuc3RhdGVtZW50LmlzVmFyaWFibGVDb250YWluZWQodmFyaWFibGUsIGxvY2FsQ29udGV4dCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm5lZ2F0ZWQgJiYgdmFyaWFibGVDb250YWluZWQpIHtcbiAgICAgICAgICB2ZXJpZmllZFdoZW5EZXJpdmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5lZ2F0ZWQgJiYgIXZhcmlhYmxlQ29udGFpbmVkKSB7XG4gICAgICAgICAgdmVyaWZpZWRXaGVuRGVyaXZlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5mcmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbWV0YXZhcmlhYmxlID0gdGhpcy5mcmFtZS5nZXRWYXJpYWJsZShsb2NhbENvbnRleHQpO1xuXG4gICAgICBpZiAobWV0YXZhcmlhYmxlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZUNvbnRhaW5lZCA9IHRoaXMuc3RhdGVtZW50LmlzTWV0YXZhcmlhYmxlQ29udGFpbmVkKG1ldGF2YXJpYWJsZSwgbG9jYWxDb250ZXh0KTtcblxuICAgICAgICBpZiAoIXRoaXMubmVnYXRlZCAmJiBtZXRhdmFyaWFibGVDb250YWluZWQpIHtcbiAgICAgICAgICB2ZXJpZmllZFdoZW5EZXJpdmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5lZ2F0ZWQgJiYgIW1ldGF2YXJpYWJsZUNvbnRhaW5lZCkge1xuICAgICAgICAgIHZlcmlmaWVkV2hlbkRlcml2ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZlcmlmaWVkV2hlbkRlcml2ZWQpIHtcbiAgICAgIGxvY2FsQ29udGV4dC5kZWJ1ZyhgLi4udmVyaWZpZWQgdGhlICcke2NvbnRhaW5lZEFzc2VydGlvblN0cmluZ30nIGRlcml2ZWQgY29udGFpbmVkIGFzc2VydGlvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyaWZpZWRXaGVuRGVyaXZlZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ29udGFpbmVkQXNzZXJ0aW9uTm9kZShjb250YWluZWRBc3NlcnRpb25Ob2RlLCBsb2NhbENvbnRleHQpIHtcbiAgICBsZXQgY29udGFpbmVkQXNzZXJ0aW9uID0gbnVsbDtcblxuICAgIGlmIChjb250YWluZWRBc3NlcnRpb25Ob2RlICE9PSBudWxsKSB7XG4gICAgICBjb25zdCB7IFRlcm0sIEZyYW1lLCBTdGF0ZW1lbnQgfSA9IHNoaW0sXG4gICAgICAgICAgICBub2RlID0gY29udGFpbmVkQXNzZXJ0aW9uTm9kZSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5nID0gbG9jYWxDb250ZXh0Lm5vZGVBc1N0cmluZyhub2RlKSxcbiAgICAgICAgICAgIHRlcm0gPSBUZXJtLmZyb21Db250YWluZWRBc3NlcnRpb25Ob2RlKGNvbnRhaW5lZEFzc2VydGlvbk5vZGUsIGxvY2FsQ29udGV4dCksXG4gICAgICAgICAgICBmcmFtZSA9IEZyYW1lLmZyb21Db250YWluZWRBc3NlcnRpb25Ob2RlKGNvbnRhaW5lZEFzc2VydGlvbk5vZGUsIGxvY2FsQ29udGV4dCksXG4gICAgICAgICAgICBzdGF0ZW1lbnQgPSBTdGF0ZW1lbnQuZnJvbUNvbnRhaW5lZEFzc2VydGlvbk5vZGUoY29udGFpbmVkQXNzZXJ0aW9uTm9kZSwgbG9jYWxDb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnRhaW5lZEFzc2VydGlvbk5lZ2F0ZWQgPSBpc0Fzc2VydGlvbk5lZ2F0ZWQoY29udGFpbmVkQXNzZXJ0aW9uTm9kZSksXG4gICAgICAgICAgICBuZWdhdGVkID0gY29udGFpbmVkQXNzZXJ0aW9uTmVnYXRlZDsgIC8vL1xuXG4gICAgICBjb250YWluZWRBc3NlcnRpb24gPSBuZXcgQ29udGFpbmVkQXNzZXJ0aW9uKHN0cmluZywgbm9kZSwgdGVybSwgZnJhbWUsIG5lZ2F0ZWQsIHN0YXRlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lZEFzc2VydGlvbjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbnRhaW5lZEFzc2VydGlvbiIsInN0cmluZyIsIm5vZGUiLCJ0ZXJtIiwiZnJhbWUiLCJuZWdhdGVkIiwic3RhdGVtZW50IiwiZ2V0U3RyaW5nIiwiZ2V0Tm9kZSIsImdldFRlcm0iLCJnZXRGcmFtZSIsImlzTmVnYXRlZCIsImdldFN0YXRlbWVudCIsInZlcmlmeSIsImFzc2lnbm1lbnRzIiwic3RhdGVkIiwibG9jYWxDb250ZXh0IiwidmVyaWZpZWQiLCJjb250YWluZWRBc3NlcnRpb25TdHJpbmciLCJ0cmFjZSIsInRlcm1WZXJpZmllZCIsImZyYW1lVmVyaWZpZWQiLCJzdGF0ZW1lbnRWZXJpZmllZCIsInZlcmlmaWVkQWhlYWQiLCJ2ZXJpZmllZFdoZW5TdGF0ZWQiLCJ2ZXJpZmllZFdoZW5EZXJpdmVkIiwidmVyaWZ5V2hlblN0YXRlZCIsInZlcmlmeVdoZW5EZXJpdmVkIiwiZGVidWciLCJ2YXJpYWJsZSIsImdldFZhcmlhYmxlIiwidmFyaWFibGVDb250YWluZWQiLCJpc1ZhcmlhYmxlQ29udGFpbmVkIiwibWV0YXZhcmlhYmxlIiwibWV0YXZhcmlhYmxlQ29udGFpbmVkIiwiaXNNZXRhdmFyaWFibGVDb250YWluZWQiLCJmcm9tQ29udGFpbmVkQXNzZXJ0aW9uTm9kZSIsImNvbnRhaW5lZEFzc2VydGlvbk5vZGUiLCJjb250YWluZWRBc3NlcnRpb24iLCJUZXJtIiwic2hpbSIsIkZyYW1lIiwiU3RhdGVtZW50Iiwibm9kZUFzU3RyaW5nIiwiY29udGFpbmVkQXNzZXJ0aW9uTmVnYXRlZCIsImlzQXNzZXJ0aW9uTmVnYXRlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFNcUJBOzs7MkRBSko7eUJBRWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXBCLElBQUEsQUFBTUEsbUNBQU47YUFBTUEsbUJBQ1BDLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFFQyxTQUFTO2dDQUR0Q047UUFFakIsSUFBSSxDQUFDQyxNQUFNLEdBQUdBO1FBQ2QsSUFBSSxDQUFDQyxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxLQUFLLEdBQUdBO1FBQ2IsSUFBSSxDQUFDQyxPQUFPLEdBQUdBO1FBQ2YsSUFBSSxDQUFDQyxTQUFTLEdBQUdBOztrQkFQQU47O1lBVW5CTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLE1BQU07WUFDcEI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLElBQUk7WUFDbEI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLElBQUk7WUFDbEI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLEtBQUs7WUFDbkI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLE9BQU87WUFDckI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNOLFNBQVM7WUFDdkI7OztZQUVBTyxLQUFBQTttQkFBQUEsU0FBQUEsT0FBT0MsV0FBVyxFQUFFQyxNQUFNLEVBQUVDLFlBQVk7Z0JBQ3RDLElBQUlDLFdBQVc7Z0JBRWYsSUFBTUMsMkJBQTJCLElBQUksQ0FBQ2pCLE1B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