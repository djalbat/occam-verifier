"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return verifyTermAgainstType;
    }
});
var _array = require("../utilities/array");
function verifyTermAgainstType(termNode, typeNode, localContext, verifyAhead, verifyTerm) {
    var termVerifiedAgainstType;
    var terms = [], termVerified = verifyTerm(termNode, terms, localContext, function() {
        var verifiedAhead = false;
        var firstTerm = (0, _array.first)(terms), term = firstTerm, termType = term.getType(), type = localContext.findTypeByTypeNode(typeNode), termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);
        if (termTypeEqualToOrSubTypeOfType) {
            verifiedAhead = verifyAhead();
        }
        return verifiedAhead;
    });
    termVerifiedAgainstType = termVerified; ///
    return termVerifiedAgainstType;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92ZXJpZnkvdGVybUFnYWluc3RUeXBlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXJyYXlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5VGVybUFnYWluc3RUeXBlKHRlcm1Ob2RlLCB0eXBlTm9kZSwgbG9jYWxDb250ZXh0LCB2ZXJpZnlBaGVhZCwgdmVyaWZ5VGVybSkge1xuICBsZXQgdGVybVZlcmlmaWVkQWdhaW5zdFR5cGU7XG5cbiAgY29uc3QgdGVybXMgPSBbXSxcbiAgICAgICAgdGVybVZlcmlmaWVkID0gdmVyaWZ5VGVybSh0ZXJtTm9kZSwgdGVybXMsIGxvY2FsQ29udGV4dCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2ZXJpZmllZEFoZWFkID0gZmFsc2U7XG5cbiAgICAgICAgICBjb25zdCBmaXJzdFRlcm0gPSBmaXJzdCh0ZXJtcyksXG4gICAgICAgICAgICAgICAgdGVybSA9IGZpcnN0VGVybSwgLy8vXG4gICAgICAgICAgICAgICAgdGVybVR5cGUgPSB0ZXJtLmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICB0eXBlID0gbG9jYWxDb250ZXh0LmZpbmRUeXBlQnlUeXBlTm9kZSh0eXBlTm9kZSksXG4gICAgICAgICAgICAgICAgdGVybVR5cGVFcXVhbFRvT3JTdWJUeXBlT2ZUeXBlID0gdGVybVR5cGUuaXNFcXVhbFRvT3JTdWJUeXBlT2YodHlwZSk7XG5cbiAgICAgICAgICBpZiAodGVybVR5cGVFcXVhbFRvT3JTdWJUeXBlT2ZUeXBlKSB7XG4gICAgICAgICAgICB2ZXJpZmllZEFoZWFkID0gdmVyaWZ5QWhlYWQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdmVyaWZpZWRBaGVhZDtcbiAgICAgICAgfSk7XG5cbiAgdGVybVZlcmlmaWVkQWdhaW5zdFR5cGUgPSB0ZXJtVmVyaWZpZWQ7IC8vL1xuXG4gIHJldHVybiB0ZXJtVmVyaWZpZWRBZ2FpbnN0VHlwZTtcbn1cbiJdLCJuYW1lcyI6WyJ2ZXJpZnlUZXJtQWdhaW5zdFR5cGUiLCJ0ZXJtTm9kZSIsInR5cGVOb2RlIiwibG9jYWxDb250ZXh0IiwidmVyaWZ5QWhlYWQiLCJ2ZXJpZnlUZXJtIiwidGVybVZlcmlmaWVkQWdhaW5zdFR5cGUiLCJ0ZXJtcyIsInRlcm1WZXJpZmllZCIsInZlcmlmaWVkQWhlYWQiLCJmaXJzdFRlcm0iLCJmaXJzdCIsInRlcm0iLCJ0ZXJtVHlwZSIsImdldFR5cGUiLCJ0eXBlIiwiZmluZFR5cGVCeVR5cGVOb2RlIiwidGVybVR5cGVFcXVhbFRvT3JTdWJUeXBlT2ZUeXBlIiwiaXNFcXVhbFRvT3JTdWJUeXBlT2YiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUlBOzs7ZUFBd0JBOzs7cUJBRkY7QUFFUCxTQUFTQSxzQkFBc0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxZQUFZLEVBQUVDLFdBQVcsRUFBRUMsVUFBVTtJQUNyRyxJQUFJQztJQUVKLElBQU1DLFFBQVEsRUFBRSxFQUNWQyxlQUFlSCxXQUFXSixVQUFVTSxPQUFPSixjQUFjO1FBQ3ZELElBQUlNLGdCQUFnQjtRQUVwQixJQUFNQyxZQUFZQyxJQUFBQSxZQUFLLEVBQUNKLFFBQ2xCSyxPQUFPRixXQUNQRyxXQUFXRCxLQUFLRSxPQUFPLElBQ3ZCQyxPQUFPWixhQUFhYSxrQkFBa0IsQ0FBQ2QsV0FDdkNlLGlDQUFpQ0osU0FBU0ssb0JBQW9CLENBQUNIO1FBRXJFLElBQUlFLGdDQUFnQztZQUNsQ1IsZ0JBQWdCTDtRQUNsQjtRQUVBLE9BQU9LO0lBQ1Q7SUFFTkgsMEJBQTBCRSxjQUFjLEdBQUc7SUFFM0MsT0FBT0Y7QUFDVCJ9