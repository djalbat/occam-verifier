"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Derivation;
    }
});
var _proofStep = /*#__PURE__*/ _interop_require_default(require("./proofStep"));
var _array = require("./utilities/array");
var _query = require("./utilities/query");
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
var proofStepNodesQuery = (0, _query.nodesQuery)("/derivation/proofStep|lastProofStep");
var Derivation = /*#__PURE__*/ function() {
    function Derivation(proofSteps) {
        _class_call_check(this, Derivation);
        this.proofSteps = proofSteps;
    }
    _create_class(Derivation, [
        {
            key: "getProofSteps",
            value: function getProofSteps() {
                return this.proofSteps;
            }
        },
        {
            key: "getLastProofStep",
            value: function getLastProofStep() {
                var lastProofStep = (0, _array.last)(this.proofSteps);
                return lastProofStep;
            }
        },
        {
            key: "verify",
            value: function verify(substitutions, localContext) {
                var verified;
                verified = this.proofSteps.every(function(proofStep) {
                    var proofStepVerified = proofStep.verify(substitutions, localContext);
                    if (proofStepVerified) {
                        return true;
                    }
                });
                return verified;
            }
        }
    ], [
        {
            key: "fromDerivationNode",
            value: function fromDerivationNode(derivationNode, fileContext) {
                var proofStepNodes = proofStepNodesQuery(derivationNode), proofSteps = proofStepNodes.map(function(proofStepNode) {
                    var proofStep = _proofStep.default.fromProofStepNode(proofStepNode, fileContext);
                    return proofStep;
                }), derivation = new Derivation(proofSteps);
                return derivation;
            }
        }
    ]);
    return Derivation;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXJpdmF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgUHJvb2ZTdGVwIGZyb20gXCIuL3Byb29mU3RlcFwiO1xuXG5pbXBvcnQgeyBsYXN0IH0gZnJvbSBcIi4vdXRpbGl0aWVzL2FycmF5XCI7XG5pbXBvcnQgeyBub2Rlc1F1ZXJ5IH0gZnJvbSBcIi4vdXRpbGl0aWVzL3F1ZXJ5XCI7XG5cbmNvbnN0IHByb29mU3RlcE5vZGVzUXVlcnkgPSBub2Rlc1F1ZXJ5KFwiL2Rlcml2YXRpb24vcHJvb2ZTdGVwfGxhc3RQcm9vZlN0ZXBcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcml2YXRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcm9vZlN0ZXBzKSB7XG4gICAgdGhpcy5wcm9vZlN0ZXBzID0gcHJvb2ZTdGVwcztcbiAgfVxuXG4gIGdldFByb29mU3RlcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvb2ZTdGVwcztcbiAgfVxuXG4gIGdldExhc3RQcm9vZlN0ZXAoKSB7XG4gICAgY29uc3QgbGFzdFByb29mU3RlcCA9IGxhc3QodGhpcy5wcm9vZlN0ZXBzKTtcblxuICAgIHJldHVybiBsYXN0UHJvb2ZTdGVwO1xuICB9XG5cbiAgdmVyaWZ5KHN1YnN0aXR1dGlvbnMsIGxvY2FsQ29udGV4dCkge1xuICAgIGxldCB2ZXJpZmllZDtcblxuICAgIHZlcmlmaWVkID0gdGhpcy5wcm9vZlN0ZXBzLmV2ZXJ5KChwcm9vZlN0ZXApID0+IHsgLy8vXG4gICAgICBjb25zdCBwcm9vZlN0ZXBWZXJpZmllZCA9IHByb29mU3RlcC52ZXJpZnkoc3Vic3RpdHV0aW9ucywgbG9jYWxDb250ZXh0KTtcblxuICAgICAgaWYgKHByb29mU3RlcFZlcmlmaWVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZlcmlmaWVkO1xuICB9XG5cbiAgc3RhdGljIGZyb21EZXJpdmF0aW9uTm9kZShkZXJpdmF0aW9uTm9kZSwgZmlsZUNvbnRleHQpIHtcbiAgICBjb25zdCBwcm9vZlN0ZXBOb2RlcyA9IHByb29mU3RlcE5vZGVzUXVlcnkoZGVyaXZhdGlvbk5vZGUpLFxuICAgICAgICAgIHByb29mU3RlcHMgPSBwcm9vZlN0ZXBOb2Rlcy5tYXAoKHByb29mU3RlcE5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb29mU3RlcCA9IFByb29mU3RlcC5mcm9tUHJvb2ZTdGVwTm9kZShwcm9vZlN0ZXBOb2RlLCBmaWxlQ29udGV4dCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9vZlN0ZXA7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgZGVyaXZhdGlvbiA9IG5ldyBEZXJpdmF0aW9uKHByb29mU3RlcHMpO1xuXG4gICAgcmV0dXJuIGRlcml2YXRpb247XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJEZXJpdmF0aW9uIiwicHJvb2ZTdGVwTm9kZXNRdWVyeSIsIm5vZGVzUXVlcnkiLCJwcm9vZlN0ZXBzIiwiZ2V0UHJvb2ZTdGVwcyIsImdldExhc3RQcm9vZlN0ZXAiLCJsYXN0UHJvb2ZTdGVwIiwibGFzdCIsInZlcmlmeSIsInN1YnN0aXR1dGlvbnMiLCJsb2NhbENvbnRleHQiLCJ2ZXJpZmllZCIsImV2ZXJ5IiwicHJvb2ZTdGVwIiwicHJvb2ZTdGVwVmVyaWZpZWQiLCJmcm9tRGVyaXZhdGlvbk5vZGUiLCJkZXJpdmF0aW9uTm9kZSIsImZpbGVDb250ZXh0IiwicHJvb2ZTdGVwTm9kZXMiLCJtYXAiLCJwcm9vZlN0ZXBOb2RlIiwiUHJvb2ZTdGVwIiwiZnJvbVByb29mU3RlcE5vZGUiLCJkZXJpdmF0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVNxQkE7OztnRUFQQztxQkFFRDtxQkFDTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUzQixJQUFNQyxzQkFBc0JDLElBQUFBLGlCQUFVLEVBQUM7QUFFeEIsSUFBQSxBQUFNRiwyQkFBTjthQUFNQSxXQUNQRyxVQUFVO2dDQURISDtRQUVqQixJQUFJLENBQUNHLFVBQVUsR0FBR0E7O2tCQUZESDs7WUFLbkJJLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0QsVUFBVTtZQUN4Qjs7O1lBRUFFLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNQyxnQkFBZ0JDLElBQUFBLFdBQUksRUFBQyxJQUFJLENBQUNKLFVBQVU7Z0JBRTFDLE9BQU9HO1lBQ1Q7OztZQUVBRSxLQUFBQTttQkFBQUEsU0FBQUEsT0FBT0MsYUFBYSxFQUFFQyxZQUFZO2dCQUNoQyxJQUFJQztnQkFFSkEsV0FBVyxJQUFJLENBQUNSLFVBQVUsQ0FBQ1MsS0FBSyxDQUFDLFNBQUNDO29CQUNoQyxJQUFNQyxvQkFBb0JELFVBQVVMLE1BQU0sQ0FBQ0MsZUFBZUM7b0JBRTFELElBQUlJLG1CQUFtQjt3QkFDckIsT0FBTztvQkFDVDtnQkFDRjtnQkFFQSxPQUFPSDtZQUNUOzs7O1lBRU9JLEtBQUFBO21CQUFQLFNBQU9BLG1CQUFtQkMsY0FBYyxFQUFFQyxXQUFXO2dCQUNuRCxJQUFNQyxpQkFBaUJqQixvQkFBb0JlLGlCQUNyQ2IsYUFBYWUsZUFBZUMsR0FBRyxDQUFDLFNBQUNDO29CQUMvQixJQUFNUCxZQUFZUSxrQkFBUyxDQUFDQyxpQkFBaUIsQ0FBQ0YsZUFBZUg7b0JBRTdELE9BQU9KO2dCQUNULElBQ0FVLGFBQWEsSUFwQ0Z2QixXQW9DaUJHO2dCQUVsQyxPQUFPb0I7WUFDVDs7O1dBdkNtQnZCIn0=