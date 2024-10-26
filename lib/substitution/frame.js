"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return FrameSubstitution;
    }
});
var _shim = /*#__PURE__*/ _interop_require_default(require("../shim"));
var _substitution = /*#__PURE__*/ _interop_require_default(require("../substitution"));
var _frame = /*#__PURE__*/ _interop_require_default(require("../nodeAndTokens/substitution/frame"));
var _query = require("../utilities/query");
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
var frameNodeQuery = (0, _query.nodeQuery)("/frameSubstitution/frame[0]"), metavariableNodeQuery = (0, _query.nodeQuery)("/frameSubstitution/frame[1]/metavariable!"), frameSubstitutionNodeQuery = (0, _query.nodeQuery)("/statement/frameSubstitution");
var FrameSubstitution = /*#__PURE__*/ function(Substitution) {
    _inherits(FrameSubstitution, Substitution);
    function FrameSubstitution(string, node, tokens, frame, metavariable) {
        _class_call_check(this, FrameSubstitution);
        var _this;
        _this = _call_super(this, FrameSubstitution, [
            string,
            node,
            tokens
        ]);
        _this.frame = frame;
        _this.metavariable = metavariable;
        return _this;
    }
    _create_class(FrameSubstitution, [
        {
            key: "getFrame",
            value: function getFrame() {
                return this.frame;
            }
        },
        {
            key: "getMetavariable",
            value: function getMetavariable() {
                return this.metavariable;
            }
        },
        {
            key: "getMetavariableName",
            value: function getMetavariableName() {
                var metavariableName = this.metavariable.getName();
                return metavariableName;
            }
        },
        {
            key: "getSubstitutionString",
            value: function getSubstitutionString() {
                var frameString = this.frame.getString(), metavariableString = this.metavariable.getString(), substitutionString = "[".concat(frameString, " for [").concat(metavariableString, "]]");
                return substitutionString;
            }
        },
        {
            key: "isEqualTo",
            value: function isEqualTo(substitution) {
                var equalTo = false;
                var frameNode = substitution.getFrameNode(), metavariableName = substitution.getMetavariableName();
                if (frameNode !== null && metavariableName !== null) {
                    var frameNodeMatches = this.matchFrameNode(frameNode), metavariableNameMatches = this.matchMetavariableName(metavariableName);
                    equalTo = frameNodeMatches && metavariableNameMatches;
                }
                return equalTo;
            }
        },
        {
            key: "matchFrameNode",
            value: function matchFrameNode(frameNode) {
                return this.frame.matchFrameNode(frameNode);
            }
        },
        {
            key: "matchMetavariableNode",
            value: function matchMetavariableNode(metavariableNode) {
                return this.metavariable.matchMetavariableNode(metavariableNode);
            }
        },
        {
            key: "matchMetavariableName",
            value: function matchMetavariableName(metavariableName) {
                var metavariableNameMatches;
                var generalMetavariableName = metavariableName; ///
                metavariableName = this.metavariable.getName();
                var specificMetavariableName = metavariableName; ///
                metavariableNameMatches = generalMetavariableName === specificMetavariableName;
                return metavariableNameMatches;
            }
        },
        {
            key: "matchMetavariableNameAndSubstitutionNode",
            value: function matchMetavariableNameAndSubstitutionNode(metavariableName, substitutionNode) {
                var metavariableNameMatches = this.matchMetavariableName(metavariableName), substitutionNodeMatches = this.matchSubstitutionNode(substitutionNode), metavariableNameAndSubstitutionNodeMatches = metavariableNameMatches && substitutionNodeMatches;
                return metavariableNameAndSubstitutionNodeMatches;
            }
        }
    ], [
        {
            key: "fromStatementNode",
            value: function fromStatementNode(statementNode, context) {
                var frameSubstitution = null;
                var frameSubstitutionNode = frameSubstitutionNodeQuery(statementNode);
                if (frameSubstitutionNode !== null) {
                    var frameNode = frameNodeQuery(frameSubstitutionNode), metavariableNode = metavariableNodeQuery(frameSubstitutionNode);
                    if (frameNode !== null && metavariableNode !== null) {
                        var Frame = _shim.default.Frame, Metavariable = _shim.default.Metavariable, frame = Frame.fromFrameNode(frameNode, context), metavariable = Metavariable.fromMetavariableNode(metavariableNode, context), node = frameSubstitutionNode, tokens = context.nodeAsTokens(node), string = stringFromFrameAndMetavariable(frame, metavariable);
                        frameSubstitution = new FrameSubstitution(string, node, tokens, frame, metavariable);
                    }
                }
                return frameSubstitution;
            }
        },
        {
            key: "fromFrameAndMetavariable",
            value: function fromFrameAndMetavariable(frame, metavariable, context) {
                var string = stringFromFrameAndMetavariable(frame, metavariable), frameSubstitutionNodeAndTokens = _frame.default.fromString(string, context), node = frameSubstitutionNodeAndTokens.getNode(), tokens = frameSubstitutionNodeAndTokens.getTokens(), frameSubstitution = new FrameSubstitution(string, node, tokens, frame, metavariable);
                return frameSubstitution;
            }
        }
    ]);
    return FrameSubstitution;
}(_substitution.default);
function stringFromFrameAndMetavariable(frame, metavariable) {
    var frameString = frame.getString(), metavariableString = metavariable.getString(), string = "[".concat(frameString, " for [").concat(metavariableString, "]]");
    return string;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWJzdGl0dXRpb24vZnJhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBzaGltIGZyb20gXCIuLi9zaGltXCI7XG5pbXBvcnQgU3Vic3RpdHV0aW9uIGZyb20gXCIuLi9zdWJzdGl0dXRpb25cIjtcbmltcG9ydCBGcmFtZVN1YnN0aXR1dGlvbk5vZGVBbmRUb2tlbnMgZnJvbSBcIi4uL25vZGVBbmRUb2tlbnMvc3Vic3RpdHV0aW9uL2ZyYW1lXCI7XG5cbmltcG9ydCB7IG5vZGVRdWVyeSB9IGZyb20gXCIuLi91dGlsaXRpZXMvcXVlcnlcIjtcblxuY29uc3QgZnJhbWVOb2RlUXVlcnkgPSBub2RlUXVlcnkoXCIvZnJhbWVTdWJzdGl0dXRpb24vZnJhbWVbMF1cIiksXG4gICAgICBtZXRhdmFyaWFibGVOb2RlUXVlcnkgPSBub2RlUXVlcnkoXCIvZnJhbWVTdWJzdGl0dXRpb24vZnJhbWVbMV0vbWV0YXZhcmlhYmxlIVwiKSxcbiAgICAgIGZyYW1lU3Vic3RpdHV0aW9uTm9kZVF1ZXJ5ID0gbm9kZVF1ZXJ5KFwiL3N0YXRlbWVudC9mcmFtZVN1YnN0aXR1dGlvblwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVTdWJzdGl0dXRpb24gZXh0ZW5kcyBTdWJzdGl0dXRpb24ge1xuICBjb25zdHJ1Y3RvcihzdHJpbmcsIG5vZGUsIHRva2VucywgZnJhbWUsIG1ldGF2YXJpYWJsZSkge1xuICAgIHN1cGVyKHN0cmluZywgbm9kZSwgdG9rZW5zKTtcblxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcbiAgICB0aGlzLm1ldGF2YXJpYWJsZSA9IG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGdldEZyYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmZyYW1lO1xuICB9XG5cbiAgZ2V0TWV0YXZhcmlhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLm1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGdldE1ldGF2YXJpYWJsZU5hbWUoKSB7XG4gICAgY29uc3QgbWV0YXZhcmlhYmxlTmFtZSA9IHRoaXMubWV0YXZhcmlhYmxlLmdldE5hbWUoKTtcblxuICAgIHJldHVybiBtZXRhdmFyaWFibGVOYW1lO1xuICB9XG5cbiAgZ2V0U3Vic3RpdHV0aW9uU3RyaW5nKCkge1xuICAgIGNvbnN0IGZyYW1lU3RyaW5nID0gdGhpcy5mcmFtZS5nZXRTdHJpbmcoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVTdHJpbmcgPSB0aGlzLm1ldGF2YXJpYWJsZS5nZXRTdHJpbmcoKSxcbiAgICAgICAgICBzdWJzdGl0dXRpb25TdHJpbmcgPSBgWyR7ZnJhbWVTdHJpbmd9IGZvciBbJHttZXRhdmFyaWFibGVTdHJpbmd9XV1gO1xuXG4gICAgcmV0dXJuIHN1YnN0aXR1dGlvblN0cmluZztcbiAgfVxuXG4gIGlzRXF1YWxUbyhzdWJzdGl0dXRpb24pIHtcbiAgICBsZXQgZXF1YWxUbyA9IGZhbHNlO1xuXG4gICAgY29uc3QgZnJhbWVOb2RlID0gc3Vic3RpdHV0aW9uLmdldEZyYW1lTm9kZSgpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5hbWUgPSBzdWJzdGl0dXRpb24uZ2V0TWV0YXZhcmlhYmxlTmFtZSgpO1xuXG4gICAgaWYgKChmcmFtZU5vZGUgIT09IG51bGwpICYmIChtZXRhdmFyaWFibGVOYW1lICE9PSBudWxsKSkge1xuICAgICAgY29uc3QgZnJhbWVOb2RlTWF0Y2hlcyA9IHRoaXMubWF0Y2hGcmFtZU5vZGUoZnJhbWVOb2RlKSxcbiAgICAgICAgICAgIG1ldGF2YXJpYWJsZU5hbWVNYXRjaGVzID0gdGhpcy5tYXRjaE1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSk7XG5cbiAgICAgIGVxdWFsVG8gPSAoZnJhbWVOb2RlTWF0Y2hlcyAmJiBtZXRhdmFyaWFibGVOYW1lTWF0Y2hlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVxdWFsVG87XG4gIH1cblxuICBtYXRjaEZyYW1lTm9kZShmcmFtZU5vZGUpIHsgcmV0dXJuIHRoaXMuZnJhbWUubWF0Y2hGcmFtZU5vZGUoZnJhbWVOb2RlKTsgfVxuXG4gIG1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKSB7IHJldHVybiB0aGlzLm1ldGF2YXJpYWJsZS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7IH1cblxuICBtYXRjaE1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSkge1xuICAgIGxldCBtZXRhdmFyaWFibGVOYW1lTWF0Y2hlcztcblxuICAgIGNvbnN0IGdlbmVyYWxNZXRhdmFyaWFibGVOYW1lID0gbWV0YXZhcmlhYmxlTmFtZTsgLy8vXG5cbiAgICBtZXRhdmFyaWFibGVOYW1lID0gdGhpcy5tZXRhdmFyaWFibGUuZ2V0TmFtZSgpO1xuXG4gICAgY29uc3Qgc3BlY2lmaWNNZXRhdmFyaWFibGVOYW1lID0gbWV0YXZhcmlhYmxlTmFtZTsgLy8vXG5cbiAgICBtZXRhdmFyaWFibGVOYW1lTWF0Y2hlcyA9IChnZW5lcmFsTWV0YXZhcmlhYmxlTmFtZSA9PT0gc3BlY2lmaWNNZXRhdmFyaWFibGVOYW1lKTtcblxuICAgIHJldHVybiBtZXRhdmFyaWFibGVOYW1lTWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoTWV0YXZhcmlhYmxlTmFtZUFuZFN1YnN0aXR1dGlvbk5vZGUobWV0YXZhcmlhYmxlTmFtZSwgc3Vic3RpdHV0aW9uTm9kZSkge1xuICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5hbWVNYXRjaGVzID0gdGhpcy5tYXRjaE1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSksXG4gICAgICAgICAgc3Vic3RpdHV0aW9uTm9kZU1hdGNoZXMgPSB0aGlzLm1hdGNoU3Vic3RpdHV0aW9uTm9kZShzdWJzdGl0dXRpb25Ob2RlKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOYW1lQW5kU3Vic3RpdHV0aW9uTm9kZU1hdGNoZXMgPSAobWV0YXZhcmlhYmxlTmFtZU1hdGNoZXMgJiYgc3Vic3RpdHV0aW9uTm9kZU1hdGNoZXMpO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZU5hbWVBbmRTdWJzdGl0dXRpb25Ob2RlTWF0Y2hlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3RhdGVtZW50Tm9kZShzdGF0ZW1lbnROb2RlLCBjb250ZXh0KSB7XG4gICAgbGV0IGZyYW1lU3Vic3RpdHV0aW9uID0gbnVsbDtcblxuICAgIGNvbnN0IGZyYW1lU3Vic3RpdHV0aW9uTm9kZSA9IGZyYW1lU3Vic3RpdHV0aW9uTm9kZVF1ZXJ5KHN0YXRlbWVudE5vZGUpO1xuXG4gICAgaWYgKGZyYW1lU3Vic3RpdHV0aW9uTm9kZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZnJhbWVOb2RlID0gZnJhbWVOb2RlUXVlcnkoZnJhbWVTdWJzdGl0dXRpb25Ob2RlKSxcbiAgICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSBtZXRhdmFyaWFibGVOb2RlUXVlcnkoZnJhbWVTdWJzdGl0dXRpb25Ob2RlKTtcblxuICAgICAgaWYgKChmcmFtZU5vZGUgIT09IG51bGwpICYmIChtZXRhdmFyaWFibGVOb2RlICE9PSBudWxsKSkge1xuICAgICAgICBjb25zdCB7IEZyYW1lLCBNZXRhdmFyaWFibGUgfSA9IHNoaW0sXG4gICAgICAgICAgICAgIGZyYW1lID0gRnJhbWUuZnJvbUZyYW1lTm9kZShmcmFtZU5vZGUsIGNvbnRleHQpLFxuICAgICAgICAgICAgICBtZXRhdmFyaWFibGUgPSBNZXRhdmFyaWFibGUuZnJvbU1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSwgY29udGV4dCksXG4gICAgICAgICAgICAgIG5vZGUgPSBmcmFtZVN1YnN0aXR1dGlvbk5vZGUsICAvLy9cbiAgICAgICAgICAgICAgdG9rZW5zID0gY29udGV4dC5ub2RlQXNUb2tlbnMobm9kZSksXG4gICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZ0Zyb21GcmFtZUFuZE1ldGF2YXJpYWJsZShmcmFtZSwgbWV0YXZhcmlhYmxlKTtcblxuICAgICAgICBmcmFtZVN1YnN0aXR1dGlvbiA9IG5ldyBGcmFtZVN1YnN0aXR1dGlvbihzdHJpbmcsIG5vZGUsIHRva2VucywgZnJhbWUsIG1ldGF2YXJpYWJsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZyYW1lU3Vic3RpdHV0aW9uO1xuICB9XG5cbiAgc3RhdGljIGZyb21GcmFtZUFuZE1ldGF2YXJpYWJsZShmcmFtZSwgbWV0YXZhcmlhYmxlLCBjb250ZXh0KSB7XG4gICAgY29uc3Qgc3RyaW5nID0gc3RyaW5nRnJvbUZyYW1lQW5kTWV0YXZhcmlhYmxlKGZyYW1lLCBtZXRhdmFyaWFibGUpLFxuICAgICAgICAgIGZyYW1lU3Vic3RpdHV0aW9uTm9kZUFuZFRva2VucyA9IEZyYW1lU3Vic3RpdHV0aW9uTm9kZUFuZFRva2Vucy5mcm9tU3RyaW5nKHN0cmluZywgY29udGV4dCksXG4gICAgICAgICAgbm9kZSA9IGZyYW1lU3Vic3RpdHV0aW9uTm9kZUFuZFRva2Vucy5nZXROb2RlKCksXG4gICAgICAgICAgdG9rZW5zID0gZnJhbWVTdWJzdGl0dXRpb25Ob2RlQW5kVG9rZW5zLmdldFRva2VucygpLFxuICAgICAgICAgIGZyYW1lU3Vic3RpdHV0aW9uID0gbmV3IEZyYW1lU3Vic3RpdHV0aW9uKHN0cmluZywgbm9kZSwgdG9rZW5zLCBmcmFtZSwgbWV0YXZhcmlhYmxlKTtcblxuICAgIHJldHVybiBmcmFtZVN1YnN0aXR1dGlvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpbmdGcm9tRnJhbWVBbmRNZXRhdmFyaWFibGUoZnJhbWUsIG1ldGF2YXJpYWJsZSkge1xuICBjb25zdCBmcmFtZVN0cmluZyA9IGZyYW1lLmdldFN0cmluZygpLFxuICAgICAgICBtZXRhdmFyaWFibGVTdHJpbmcgPSBtZXRhdmFyaWFibGUuZ2V0U3RyaW5nKCksXG4gICAgICAgIHN0cmluZyA9IGBbJHtmcmFtZVN0cmluZ30gZm9yIFske21ldGF2YXJpYWJsZVN0cmluZ31dXWA7XG5cbiAgcmV0dXJuIHN0cmluZztcbn1cbiJdLCJuYW1lcyI6WyJGcmFtZVN1YnN0aXR1dGlvbiIsImZyYW1lTm9kZVF1ZXJ5Iiwibm9kZVF1ZXJ5IiwibWV0YXZhcmlhYmxlTm9kZVF1ZXJ5IiwiZnJhbWVTdWJzdGl0dXRpb25Ob2RlUXVlcnkiLCJzdHJpbmciLCJub2RlIiwidG9rZW5zIiwiZnJhbWUiLCJtZXRhdmFyaWFibGUiLCJnZXRGcmFtZSIsImdldE1ldGF2YXJpYWJsZSIsImdldE1ldGF2YXJpYWJsZU5hbWUiLCJtZXRhdmFyaWFibGVOYW1lIiwiZ2V0TmFtZSIsImdldFN1YnN0aXR1dGlvblN0cmluZyIsImZyYW1lU3RyaW5nIiwiZ2V0U3RyaW5nIiwibWV0YXZhcmlhYmxlU3RyaW5nIiwic3Vic3RpdHV0aW9uU3RyaW5nIiwiaXNFcXVhbFRvIiwic3Vic3RpdHV0aW9uIiwiZXF1YWxUbyIsImZyYW1lTm9kZSIsImdldEZyYW1lTm9kZSIsImZyYW1lTm9kZU1hdGNoZXMiLCJtYXRjaEZyYW1lTm9kZSIsIm1ldGF2YXJpYWJsZU5hbWVNYXRjaGVzIiwibWF0Y2hNZXRhdmFyaWFibGVOYW1lIiwibWF0Y2hNZXRhdmFyaWFibGVOb2RlIiwibWV0YXZhcmlhYmxlTm9kZSIsImdlbmVyYWxNZXRhdmFyaWFibGVOYW1lIiwic3BlY2lmaWNNZXRhdmFyaWFibGVOYW1lIiwibWF0Y2hNZXRhdmFyaWFibGVOYW1lQW5kU3Vic3RpdHV0aW9uTm9kZSIsInN1YnN0aXR1dGlvbk5vZGUiLCJzdWJzdGl0dXRpb25Ob2RlTWF0Y2hlcyIsIm1hdGNoU3Vic3RpdHV0aW9uTm9kZSIsIm1ldGF2YXJpYWJsZU5hbWVBbmRTdWJzdGl0dXRpb25Ob2RlTWF0Y2hlcyIsImZyb21TdGF0ZW1lbnROb2RlIiwic3RhdGVtZW50Tm9kZSIsImNvbnRleHQiLCJmcmFtZVN1YnN0aXR1dGlvbiIsImZyYW1lU3Vic3RpdHV0aW9uTm9kZSIsIkZyYW1lIiwic2hpbSIsIk1ldGF2YXJpYWJsZSIsImZyb21GcmFtZU5vZGUiLCJmcm9tTWV0YXZhcmlhYmxlTm9kZSIsIm5vZGVBc1Rva2VucyIsInN0cmluZ0Zyb21GcmFtZUFuZE1ldGF2YXJpYWJsZSIsImZyb21GcmFtZUFuZE1ldGF2YXJpYWJsZSIsImZyYW1lU3Vic3RpdHV0aW9uTm9kZUFuZFRva2VucyIsIkZyYW1lU3Vic3RpdHV0aW9uTm9kZUFuZFRva2VucyIsImZyb21TdHJpbmciLCJnZXROb2RlIiwiZ2V0VG9rZW5zIiwiU3Vic3RpdHV0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVlxQkE7OzsyREFWSjttRUFDUTs0REFDa0I7cUJBRWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTFCLElBQU1DLGlCQUFpQkMsSUFBQUEsZ0JBQVMsRUFBQyxnQ0FDM0JDLHdCQUF3QkQsSUFBQUEsZ0JBQVMsRUFBQyw4Q0FDbENFLDZCQUE2QkYsSUFBQUEsZ0JBQVMsRUFBQztBQUU5QixJQUFBLEFBQU1GLGtDQUFOO2NBQU1BO2FBQUFBLGtCQUNQSyxNQUFNLEVBQUVDLElBQUksRUFBRUMsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFlBQVk7Z0NBRGxDVDs7Z0JBRWpCLGtCQUZpQkE7WUFFWEs7WUFBUUM7WUFBTUM7O1FBRXBCLE1BQUtDLEtBQUssR0FBR0E7UUFDYixNQUFLQyxZQUFZLEdBQUdBOzs7a0JBTEhUOztZQVFuQlUsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDRixLQUFLO1lBQ25COzs7WUFFQUcsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDRixZQUFZO1lBQzFCOzs7WUFFQUcsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLG1CQUFtQixJQUFJLENBQUNKLFlBQVksQ0FBQ0ssT0FBTztnQkFFbEQsT0FBT0Q7WUFDVDs7O1lBRUFFLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNQyxjQUFjLElBQUksQ0FBQ1IsS0FBSyxDQUFDUyxTQUFTLElB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