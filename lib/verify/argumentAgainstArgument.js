"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return verifyArgumentAgainstArgument;
    }
});
var _termAgainstConstructor = /*#__PURE__*/ _interop_require_default(require("../verifier/nodes/termAgainstConstructor"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function verifyArgumentAgainstArgument(argumentNodeA, argumentNodeB, localContext, verifyAhead) {
    var argumentVerifiedAgainstArgument;
    var nonTerminalNodeA = argumentNodeA, nonTerminalNodeB = argumentNodeB, nonTerminalNodeVerified = _termAgainstConstructor.default.verifyNonTerminalNode(nonTerminalNodeA, nonTerminalNodeB, localContext, verifyAhead);
    argumentVerifiedAgainstArgument = nonTerminalNodeVerified; ///
    return argumentVerifiedAgainstArgument;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92ZXJpZnkvYXJndW1lbnRBZ2FpbnN0QXJndW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB0ZXJtQWdhaW5zdENvbnN0cnVjdG9yTm9kZXNWZXJpZmllciBmcm9tIFwiLi4vdmVyaWZpZXIvbm9kZXMvdGVybUFnYWluc3RDb25zdHJ1Y3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2ZXJpZnlBcmd1bWVudEFnYWluc3RBcmd1bWVudChhcmd1bWVudE5vZGVBLCBhcmd1bWVudE5vZGVCLCBsb2NhbENvbnRleHQsIHZlcmlmeUFoZWFkKSB7XG4gIGxldCBhcmd1bWVudFZlcmlmaWVkQWdhaW5zdEFyZ3VtZW50O1xuXG4gIGNvbnN0IG5vblRlcm1pbmFsTm9kZUEgPSBhcmd1bWVudE5vZGVBLCAvLy9cbiAgICAgICAgbm9uVGVybWluYWxOb2RlQiA9IGFyZ3VtZW50Tm9kZUIsIC8vL1xuICAgICAgICBub25UZXJtaW5hbE5vZGVWZXJpZmllZCA9IHRlcm1BZ2FpbnN0Q29uc3RydWN0b3JOb2Rlc1ZlcmlmaWVyLnZlcmlmeU5vblRlcm1pbmFsTm9kZShub25UZXJtaW5hbE5vZGVBLCBub25UZXJtaW5hbE5vZGVCLCBsb2NhbENvbnRleHQsIHZlcmlmeUFoZWFkKTtcblxuICBhcmd1bWVudFZlcmlmaWVkQWdhaW5zdEFyZ3VtZW50ID0gbm9uVGVybWluYWxOb2RlVmVyaWZpZWQ7IC8vL1xuXG4gIHJldHVybiBhcmd1bWVudFZlcmlmaWVkQWdhaW5zdEFyZ3VtZW50O1xufVxuIl0sIm5hbWVzIjpbInZlcmlmeUFyZ3VtZW50QWdhaW5zdEFyZ3VtZW50IiwiYXJndW1lbnROb2RlQSIsImFyZ3VtZW50Tm9kZUIiLCJsb2NhbENvbnRleHQiLCJ2ZXJpZnlBaGVhZCIsImFyZ3VtZW50VmVyaWZpZWRBZ2FpbnN0QXJndW1lbnQiLCJub25UZXJtaW5hbE5vZGVBIiwibm9uVGVybWluYWxOb2RlQiIsIm5vblRlcm1pbmFsTm9kZVZlcmlmaWVkIiwidGVybUFnYWluc3RDb25zdHJ1Y3Rvck5vZGVzVmVyaWZpZXIiLCJ2ZXJpZnlOb25UZXJtaW5hbE5vZGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUlBOzs7ZUFBd0JBOzs7NkVBRndCOzs7Ozs7QUFFakMsU0FBU0EsOEJBQThCQyxhQUFhLEVBQUVDLGFBQWEsRUFBRUMsWUFBWSxFQUFFQyxXQUFXO0lBQzNHLElBQUlDO0lBRUosSUFBTUMsbUJBQW1CTCxlQUNuQk0sbUJBQW1CTCxlQUNuQk0sMEJBQTBCQywrQkFBbUMsQ0FBQ0MscUJBQXFCLENBQUNKLGtCQUFrQkMsa0JBQWtCSixjQUFjQztJQUU1SUMsa0NBQWtDRyx5QkFBeUIsR0FBRztJQUU5RCxPQUFPSDtBQUNUIn0=