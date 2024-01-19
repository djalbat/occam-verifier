"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Collection;
    }
});
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var Collection = /*#__PURE__*/ function() {
    function Collection(terms) {
        _class_call_check(this, Collection);
        this.terms = terms;
    }
    _create_class(Collection, [
        {
            key: "getTerms",
            value: function getTerms() {
                return this.terms;
            }
        },
        {
            key: "setTerms",
            value: function setTerms(terms) {
                this.terms = terms;
            }
        },
        {
            key: "addTerm",
            value: function addTerm(term) {
                this.terms.push(term);
            }
        },
        {
            key: "getType",
            value: function getType() {
                var type = this.terms.reduce(function(type, term) {
                    var termType = term.getType();
                    if (type === null) {
                        type = termType; ///
                    } else {
                        var termTypeSubTypeOfType = termType.isSubTypeOf(type);
                        if (termTypeSubTypeOfType) {
                            type = termType; ///
                        }
                    }
                    return type;
                }, null);
                return type;
            }
        },
        {
            key: "matchType",
            value: function matchType(type) {
                var typeA = type; ///
                type = this.getType();
                var typeB = type; ///
                var typeMatches = typeA === typeB; ///
                return typeMatches;
            }
        },
        {
            key: "matchTerm",
            value: function matchTerm(term) {
                var termA = term, termMatches = this.terms.some(function(term) {
                    var termB = term, termAMatchesTermB = termA.match(termB);
                    if (termAMatchesTermB) {
                        return true;
                    }
                });
                return termMatches;
            }
        },
        {
            key: "matchTerms",
            value: function matchTerms(terms) {
                var _this = this;
                var termsMatch = terms.every(function(term) {
                    var termMatches = _this.matchTerm(term);
                    if (termMatches) {
                        return true;
                    }
                });
                return termsMatch;
            }
        }
    ], [
        {
            key: "fromEquality",
            value: function fromEquality(equality) {
                var leftTerm = equality.getLeftTerm(), rightTerm = equality.getRightTerm(), terms = [
                    leftTerm,
                    rightTerm
                ], collection = new Collection(terms);
                return collection;
            }
        },
        {
            key: "fromCollections",
            value: function fromCollections(collectionA, collectionB) {
                var collectionATerms = collectionA.getTerms(), collectionBTerms = collectionB.getTerms(), terms = _to_consumable_array(collectionATerms).concat(_to_consumable_array(collectionBTerms)), collection = new Collection(terms);
                return collection;
            }
        }
    ]);
    return Collection;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IodGVybXMpIHtcbiAgICB0aGlzLnRlcm1zID0gdGVybXM7XG4gIH1cblxuICBnZXRUZXJtcygpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJtcztcbiAgfVxuXG4gIHNldFRlcm1zKHRlcm1zKSB7XG4gICAgdGhpcy50ZXJtcyA9IHRlcm1zO1xuICB9XG5cbiAgYWRkVGVybSh0ZXJtKSB7XG4gICAgdGhpcy50ZXJtcy5wdXNoKHRlcm0pO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50ZXJtcy5yZWR1Y2UoKHR5cGUsIHRlcm0pID0+IHtcbiAgICAgIGNvbnN0IHRlcm1UeXBlID0gdGVybS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICAgIHR5cGUgPSB0ZXJtVHlwZTsgIC8vL1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdGVybVR5cGVTdWJUeXBlT2ZUeXBlID0gdGVybVR5cGUuaXNTdWJUeXBlT2YodHlwZSk7XG5cbiAgICAgICAgaWYgKHRlcm1UeXBlU3ViVHlwZU9mVHlwZSkge1xuICAgICAgICAgIHR5cGUgPSB0ZXJtVHlwZTsgIC8vL1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBtYXRjaFR5cGUodHlwZSkge1xuICAgIGNvbnN0IHR5cGVBID0gdHlwZTsgLy8vXG5cbiAgICB0eXBlID0gdGhpcy5nZXRUeXBlKCk7XG5cbiAgICBjb25zdCB0eXBlQiA9IHR5cGU7IC8vL1xuXG4gICAgY29uc3QgdHlwZU1hdGNoZXMgPSAodHlwZUEgPT09IHR5cGVCKTsgIC8vL1xuXG4gICAgcmV0dXJuIHR5cGVNYXRjaGVzO1xuICB9XG5cbiAgbWF0Y2hUZXJtKHRlcm0pIHtcbiAgICBjb25zdCB0ZXJtQSA9IHRlcm0sIC8vL1xuICAgICAgICAgIHRlcm1NYXRjaGVzID0gdGhpcy50ZXJtcy5zb21lKCh0ZXJtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXJtQiA9IHRlcm0sIC8vL1xuICAgICAgICAgICAgICAgICAgdGVybUFNYXRjaGVzVGVybUIgPSB0ZXJtQS5tYXRjaCh0ZXJtQik7XG5cbiAgICAgICAgICAgIGlmICh0ZXJtQU1hdGNoZXNUZXJtQikge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiB0ZXJtTWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoVGVybXModGVybXMpIHtcbiAgICBjb25zdCB0ZXJtc01hdGNoID0gdGVybXMuZXZlcnkoKHRlcm0pID0+IHtcbiAgICAgIGNvbnN0IHRlcm1NYXRjaGVzID0gdGhpcy5tYXRjaFRlcm0odGVybSk7XG5cbiAgICAgIGlmICh0ZXJtTWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHRlcm1zTWF0Y2g7XG4gIH1cblxuICBzdGF0aWMgZnJvbUVxdWFsaXR5KGVxdWFsaXR5KSB7XG4gICAgY29uc3QgbGVmdFRlcm0gPSBlcXVhbGl0eS5nZXRMZWZ0VGVybSgpLFxuICAgICAgICAgIHJpZ2h0VGVybSA9IGVxdWFsaXR5LmdldFJpZ2h0VGVybSgpLFxuICAgICAgICAgIHRlcm1zID0gW1xuICAgICAgICAgICAgbGVmdFRlcm0sXG4gICAgICAgICAgICByaWdodFRlcm1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbih0ZXJtcyk7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ29sbGVjdGlvbnMoY29sbGVjdGlvbkEsIGNvbGxlY3Rpb25CKSB7XG4gICAgY29uc3QgY29sbGVjdGlvbkFUZXJtcyA9IGNvbGxlY3Rpb25BLmdldFRlcm1zKCksXG4gICAgICAgICAgY29sbGVjdGlvbkJUZXJtcyA9IGNvbGxlY3Rpb25CLmdldFRlcm1zKCksXG4gICAgICAgICAgdGVybXMgPSBbXG4gICAgICAgICAgICAuLi5jb2xsZWN0aW9uQVRlcm1zLFxuICAgICAgICAgICAgLi4uY29sbGVjdGlvbkJUZXJtc1xuICAgICAgICAgIF0sXG4gICAgICAgICAgY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uKHRlcm1zKTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG59XG4iXSwibmFtZXMiOlsiQ29sbGVjdGlvbiIsInRlcm1zIiwiZ2V0VGVybXMiLCJzZXRUZXJtcyIsImFkZFRlcm0iLCJ0ZXJtIiwicHVzaCIsImdldFR5cGUiLCJ0eXBlIiwicmVkdWNlIiwidGVybVR5cGUiLCJ0ZXJtVHlwZVN1YlR5cGVPZlR5cGUiLCJpc1N1YlR5cGVPZiIsIm1hdGNoVHlwZSIsInR5cGVBIiwidHlwZUIiLCJ0eXBlTWF0Y2hlcyIsIm1hdGNoVGVybSIsInRlcm1BIiwidGVybU1hdGNoZXMiLCJzb21lIiwidGVybUIiLCJ0ZXJtQU1hdGNoZXNUZXJtQiIsIm1hdGNoIiwibWF0Y2hUZXJtcyIsInRlcm1zTWF0Y2giLCJldmVyeSIsImZyb21FcXVhbGl0eSIsImVxdWFsaXR5IiwibGVmdFRlcm0iLCJnZXRMZWZ0VGVybSIsInJpZ2h0VGVybSIsImdldFJpZ2h0VGVybSIsImNvbGxlY3Rpb24iLCJmcm9tQ29sbGVjdGlvbnMiLCJjb2xsZWN0aW9uQSIsImNvbGxlY3Rpb25CIiwiY29sbGVjdGlvbkFUZXJtcyIsImNvbGxlY3Rpb25CVGVybXMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBRXFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTixJQUFBLEFBQU1BLDJC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