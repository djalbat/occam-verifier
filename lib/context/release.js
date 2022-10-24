"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ReleaseContext;
    }
});
var _occamCustomGrammars = require("occam-custom-grammars");
var _array = require("../utilities/array");
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
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
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var florenceLexerFromCombinedCustomGrammar = _occamCustomGrammars.lexersUtilities.florenceLexerFromCombinedCustomGrammar, florenceParserFromCombinedCustomGrammar = _occamCustomGrammars.parsersUtilities.florenceParserFromCombinedCustomGrammar;
var ReleaseContext = /*#__PURE__*/ function() {
    function ReleaseContext(releaseName, fileContexts, florenceLexer, florenceParser, releaseContexts, releaseVerified, log) {
        _classCallCheck(this, ReleaseContext);
        this.releaseName = releaseName;
        this.fileContexts = fileContexts;
        this.florenceLexer = florenceLexer;
        this.florenceParser = florenceParser;
        this.releaseContexts = releaseContexts;
        this.releaseVerified = releaseVerified;
        this.log = log;
    }
    _createClass(ReleaseContext, [
        {
            key: "getReleaseName",
            value: function getReleaseName() {
                return this.releaseName;
            }
        },
        {
            key: "getFileContexts",
            value: function getFileContexts() {
                return this.fileContexts;
            }
        },
        {
            key: "getFlorenceLexer",
            value: function getFlorenceLexer() {
                return this.florenceLexer;
            }
        },
        {
            key: "getFlorenceParser",
            value: function getFlorenceParser() {
                return this.florenceParser;
            }
        },
        {
            key: "getReleaseContexts",
            value: function getReleaseContexts() {
                return this.releaseContexts;
            }
        },
        {
            key: "getLog",
            value: function getLog() {
                return this.log;
            }
        },
        {
            key: "isReleaseVerified",
            value: function isReleaseVerified() {
                return this.releaseVerified;
            }
        },
        {
            key: "getRules",
            value: function getRules() {
                var releaseNames = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                var rules = [], releaseNamesIncludesReleaseName = releaseNames.includes(this.releaseName);
                if (!releaseNamesIncludesReleaseName) {
                    releaseNames.push(this.releaseName);
                    var bubble = false;
                    this.fileContexts.forEach(function(fileContext) {
                        var fileContextRules = fileContext.getRules(bubble);
                        (0, _array.push)(rules, fileContextRules);
                    });
                    this.releaseContexts.forEach(function(releaseContext) {
                        var releaseContextRules = releaseContext.getRules(releaseNames);
                        (0, _array.push)(rules, releaseContextRules);
                    });
                }
                return rules;
            }
        },
        {
            key: "getTypes",
            value: function getTypes() {
                var releaseNames = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                var types = [], releaseNamesIncludesReleaseName = releaseNames.includes(this.releaseName);
                if (!releaseNamesIncludesReleaseName) {
                    releaseNames.push(this.releaseName);
                    var bubble = false;
                    this.fileContexts.forEach(function(fileContext) {
                        var fileContextTypes = fileContext.getTypes(bubble);
                        (0, _array.push)(types, fileContextTypes);
                    });
                    this.releaseContexts.forEach(function(releaseContext) {
                        var releaseContextTypes = releaseContext.getTypes(releaseNames);
                        (0, _array.push)(types, releaseContextTypes);
                    });
                }
                return types;
            }
        },
        {
            key: "getAxioms",
            value: function getAxioms() {
                var releaseNames = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                var axioms = [], releaseNamesIncludesReleaseName = releaseNames.includes(this.releaseName);
                if (!releaseNamesIncludesReleaseName) {
                    releaseNames.push(this.releaseName);
                    var bubble = false;
                    this.fileContexts.forEach(function(fileContext) {
                        var fileContextAxioms = fileContext.getAxioms(bubble);
                        (0, _array.push)(axioms, fileContextAxioms);
                    });
                    this.releaseContexts.forEach(function(releaseContext) {
                        var releaseContextAxioms = releaseContext.getAxioms(releaseNames);
                        (0, _array.push)(axioms, releaseContextAxioms);
                    });
                }
                return axioms;
            }
        },
        {
            key: "getCombinators",
            value: function getCombinators() {
                var releaseNames = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                var combinators = [], releaseNamesIncludesReleaseName = releaseNames.includes(this.releaseName);
                if (!releaseNamesIncludesReleaseName) {
                    releaseNames.push(this.releaseName);
                    var bubble = false;
                    this.fileContexts.forEach(function(fileContext) {
                        var fileContextCombinators = fileContext.getCombinators(bubble);
                        (0, _array.push)(combinators, fileContextCombinators);
                    });
                    this.releaseContexts.forEach(function(releaseContext) {
                        var releaseContextCombinators = releaseContext.getCombinators(releaseNames);
                        (0, _array.push)(combinators, releaseContextCombinators);
                    });
                }
                return combinators;
            }
        },
        {
            key: "getConstructors",
            value: function getConstructors() {
                var releaseNames = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                var constructors = [], releaseNamesIncludesReleaseName = releaseNames.includes(this.releaseName);
                if (!releaseNamesIncludesReleaseName) {
                    releaseNames.push(this.releaseName);
                    var bubble = false;
                    this.fileContexts.forEach(function(fileContext) {
                        var fileContextConstructors = fileContext.getConstructors(bubble);
                        (0, _array.push)(constructors, fileContextConstructors);
                    });
                    this.releaseContexts.forEach(function(releaseContext) {
                        var releaseContextConstructors = releaseContext.getConstructors(releaseNames);
                        (0, _array.push)(constructors, releaseContextConstructors);
                    });
                }
                return constructors;
            }
        },
        {
            key: "getCustomGrammar",
            value: function getCustomGrammar() {
                var name = this.releaseName, termBNF = this.getTermBNF(), statementBNF = this.getStatementBNF(), metastatementBNF = this.getMetastatementBNF(), typePattern = this.getTypePattern(), symbolPattern = this.getSymbolPattern(), operatorPattern = this.getOperatorPattern(), customGrammar = new _occamCustomGrammars.CustomGrammar(name, termBNF, statementBNF, metastatementBNF, typePattern, symbolPattern, operatorPattern);
                return customGrammar;
            }
        },
        {
            key: "addFileContext",
            value: function addFileContext(fileContext) {
                this.fileContexts.push(fileContext);
            }
        },
        {
            key: "tokenise",
            value: function tokenise(content) {
                return this.florenceLexer.tokenise(content);
            }
        },
        {
            key: "parse",
            value: function parse(tokens) {
                return this.florenceParser.parse(tokens);
            }
        },
        {
            key: "trace",
            value: function trace(message) {
                this.log.trace(message);
            }
        },
        {
            key: "debug",
            value: function debug(message) {
                this.log.debug(message);
            }
        },
        {
            key: "info",
            value: function info(message) {
                this.log.info(message);
            }
        },
        {
            key: "warning",
            value: function warning(message) {
                this.log.warning(message);
            }
        },
        {
            key: "error",
            value: function error(message) {
                this.log.error(message);
            }
        },
        {
            key: "fatal",
            value: function fatal(message) {
                this.log.fatal(message);
            }
        },
        {
            key: "initialise",
            value: function initialise(releaseContexts, dependencyReleaseContexts) {
                this.releaseContexts = releaseContexts;
                var releaseContext = this; ///
                releaseContexts = [
                    releaseContext
                ].concat(_toConsumableArray(dependencyReleaseContexts)); ///
                var customGrammars = releaseContexts.map(function(releaseContext) {
                    var customGrammar = releaseContext.getCustomGrammar();
                    return customGrammar;
                }), combinedCustomGrammar = _occamCustomGrammars.CombinedCustomGrammar.fromCustomGrammars(customGrammars);
                this.florenceLexer = florenceLexerFromCombinedCustomGrammar(combinedCustomGrammar);
                this.florenceParser = florenceParserFromCombinedCustomGrammar(combinedCustomGrammar);
            }
        }
    ], [
        {
            key: "fromReleaseNameAndLog",
            value: function fromReleaseNameAndLog(Class, releaseName, log) {
                for(var _len = arguments.length, remainingArguments = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
                    remainingArguments[_key - 3] = arguments[_key];
                }
                var fileContexts = [], florenceLexer = null, florenceParser = null, releaseContexts = [], releaseVerified = false, releaseContext = _construct(Class, [
                    releaseName,
                    fileContexts,
                    florenceLexer,
                    florenceParser,
                    releaseContexts,
                    releaseVerified,
                    log
                ].concat(_toConsumableArray(remainingArguments)));
                return releaseContext;
            }
        }
    ]);
    return ReleaseContext;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L3JlbGVhc2UuanMiLCI8PGpzeC1jb25maWctcHJhZ21hLmpzPj4iXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEN1c3RvbUdyYW1tYXIsIGxleGVyc1V0aWxpdGllcywgcGFyc2Vyc1V0aWxpdGllcywgQ29tYmluZWRDdXN0b21HcmFtbWFyIH0gZnJvbSBcIm9jY2FtLWN1c3RvbS1ncmFtbWFyc1wiO1xuXG5pbXBvcnQgeyBwdXNoIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hcnJheVwiO1xuXG5jb25zdCB7IGZsb3JlbmNlTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyIH0gPSBsZXhlcnNVdGlsaXRpZXMsXG4gICAgICB7IGZsb3JlbmNlUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9ID0gcGFyc2Vyc1V0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsZWFzZUNvbnRleHQge1xuICBjb25zdHJ1Y3RvcihyZWxlYXNlTmFtZSwgZmlsZUNvbnRleHRzLCBmbG9yZW5jZUxleGVyLCBmbG9yZW5jZVBhcnNlciwgcmVsZWFzZUNvbnRleHRzLCByZWxlYXNlVmVyaWZpZWQsIGxvZykge1xuICAgIHRoaXMucmVsZWFzZU5hbWUgPSByZWxlYXNlTmFtZTtcbiAgICB0aGlzLmZpbGVDb250ZXh0cyA9IGZpbGVDb250ZXh0cztcbiAgICB0aGlzLmZsb3JlbmNlTGV4ZXIgPSBmbG9yZW5jZUxleGVyO1xuICAgIHRoaXMuZmxvcmVuY2VQYXJzZXIgPSBmbG9yZW5jZVBhcnNlcjtcbiAgICB0aGlzLnJlbGVhc2VDb250ZXh0cyA9IHJlbGVhc2VDb250ZXh0cztcbiAgICB0aGlzLnJlbGVhc2VWZXJpZmllZCA9IHJlbGVhc2VWZXJpZmllZDtcblxuICAgIHRoaXMubG9nID0gbG9nO1xuICB9XG5cbiAgZ2V0UmVsZWFzZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVsZWFzZU5hbWU7XG4gIH1cblxuICBnZXRGaWxlQ29udGV4dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZUNvbnRleHRzO1xuICB9XG5cbiAgZ2V0RmxvcmVuY2VMZXhlcigpIHtcbiAgICByZXR1cm4gdGhpcy5mbG9yZW5jZUxleGVyO1xuICB9XG5cbiAgZ2V0RmxvcmVuY2VQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmxvcmVuY2VQYXJzZXI7XG4gIH1cblxuICBnZXRSZWxlYXNlQ29udGV4dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVsZWFzZUNvbnRleHRzO1xuICB9XG5cbiAgZ2V0TG9nKCkge1xuICAgIHJldHVybiB0aGlzLmxvZztcbiAgfVxuXG4gIGlzUmVsZWFzZVZlcmlmaWVkKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGVhc2VWZXJpZmllZDtcbiAgfVxuXG4gIGdldFJ1bGVzKHJlbGVhc2VOYW1lcyA9IFtdKSB7XG4gICAgY29uc3QgcnVsZXMgPSBbXSxcbiAgICAgICAgICByZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VOYW1lID0gcmVsZWFzZU5hbWVzLmluY2x1ZGVzKHRoaXMucmVsZWFzZU5hbWUpO1xuXG4gICAgaWYgKCFyZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VOYW1lKSB7XG4gICAgICByZWxlYXNlTmFtZXMucHVzaCh0aGlzLnJlbGVhc2VOYW1lKTtcblxuICAgICAgY29uc3QgYnViYmxlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuZmlsZUNvbnRleHRzLmZvckVhY2goKGZpbGVDb250ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVDb250ZXh0UnVsZXMgPSBmaWxlQ29udGV4dC5nZXRSdWxlcyhidWJibGUpO1xuXG4gICAgICAgIHB1c2gocnVsZXMsIGZpbGVDb250ZXh0UnVsZXMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucmVsZWFzZUNvbnRleHRzLmZvckVhY2goKHJlbGVhc2VDb250ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0UnVsZXMgPSByZWxlYXNlQ29udGV4dC5nZXRSdWxlcyhyZWxlYXNlTmFtZXMpO1xuXG4gICAgICAgIHB1c2gocnVsZXMsIHJlbGVhc2VDb250ZXh0UnVsZXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVzO1xuICB9XG5cbiAgZ2V0VHlwZXMocmVsZWFzZU5hbWVzID0gW10pIHtcbiAgICBjb25zdCB0eXBlcyA9IFtdLFxuICAgICAgICAgIHJlbGVhc2VOYW1lc0luY2x1ZGVzUmVsZWFzZU5hbWUgPSByZWxlYXNlTmFtZXMuaW5jbHVkZXModGhpcy5yZWxlYXNlTmFtZSk7XG5cbiAgICBpZiAoIXJlbGVhc2VOYW1lc0luY2x1ZGVzUmVsZWFzZU5hbWUpIHtcbiAgICAgIHJlbGVhc2VOYW1lcy5wdXNoKHRoaXMucmVsZWFzZU5hbWUpO1xuXG4gICAgICBjb25zdCBidWJibGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5maWxlQ29udGV4dHMuZm9yRWFjaCgoZmlsZUNvbnRleHQpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUNvbnRleHRUeXBlcyA9IGZpbGVDb250ZXh0LmdldFR5cGVzKGJ1YmJsZSk7XG5cbiAgICAgICAgcHVzaCh0eXBlcywgZmlsZUNvbnRleHRUeXBlcyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZWxlYXNlQ29udGV4dHMuZm9yRWFjaCgocmVsZWFzZUNvbnRleHQpID0+IHtcbiAgICAgICAgY29uc3QgcmVsZWFzZUNvbnRleHRUeXBlcyA9IHJlbGVhc2VDb250ZXh0LmdldFR5cGVzKHJlbGVhc2VOYW1lcyk7XG5cbiAgICAgICAgcHVzaCh0eXBlcywgcmVsZWFzZUNvbnRleHRUeXBlcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxuICBnZXRBeGlvbXMocmVsZWFzZU5hbWVzID0gW10pIHtcbiAgICBjb25zdCBheGlvbXMgPSBbXSxcbiAgICAgICAgICByZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VOYW1lID0gcmVsZWFzZU5hbWVzLmluY2x1ZGVzKHRoaXMucmVsZWFzZU5hbWUpO1xuXG4gICAgaWYgKCFyZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VOYW1lKSB7XG4gICAgICByZWxlYXNlTmFtZXMucHVzaCh0aGlzLnJlbGVhc2VOYW1lKTtcblxuICAgICAgY29uc3QgYnViYmxlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuZmlsZUNvbnRleHRzLmZvckVhY2goKGZpbGVDb250ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVDb250ZXh0QXhpb21zID0gZmlsZUNvbnRleHQuZ2V0QXhpb21zKGJ1YmJsZSk7XG5cbiAgICAgICAgcHVzaChheGlvbXMsIGZpbGVDb250ZXh0QXhpb21zKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlbGVhc2VDb250ZXh0cy5mb3JFYWNoKChyZWxlYXNlQ29udGV4dCkgPT4ge1xuICAgICAgICBjb25zdCByZWxlYXNlQ29udGV4dEF4aW9tcyA9IHJlbGVhc2VDb250ZXh0LmdldEF4aW9tcyhyZWxlYXNlTmFtZXMpO1xuXG4gICAgICAgIHB1c2goYXhpb21zLCByZWxlYXNlQ29udGV4dEF4aW9tcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXhpb21zO1xuICB9XG5cbiAgZ2V0Q29tYmluYXRvcnMocmVsZWFzZU5hbWVzID0gW10pIHtcbiAgICBjb25zdCBjb21iaW5hdG9ycyA9IFtdLFxuICAgICAgICAgIHJlbGVhc2VOYW1lc0luY2x1ZGVzUmVsZWFzZU5hbWUgPSByZWxlYXNlTmFtZXMuaW5jbHVkZXModGhpcy5yZWxlYXNlTmFtZSk7XG5cbiAgICBpZiAoIXJlbGVhc2VOYW1lc0luY2x1ZGVzUmVsZWFzZU5hbWUpIHtcbiAgICAgIHJlbGVhc2VOYW1lcy5wdXNoKHRoaXMucmVsZWFzZU5hbWUpO1xuXG4gICAgICBjb25zdCBidWJibGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5maWxlQ29udGV4dHMuZm9yRWFjaCgoZmlsZUNvbnRleHQpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUNvbnRleHRDb21iaW5hdG9ycyA9IGZpbGVDb250ZXh0LmdldENvbWJpbmF0b3JzKGJ1YmJsZSk7XG5cbiAgICAgICAgcHVzaChjb21iaW5hdG9ycywgZmlsZUNvbnRleHRDb21iaW5hdG9ycyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZWxlYXNlQ29udGV4dHMuZm9yRWFjaCgocmVsZWFzZUNvbnRleHQpID0+IHtcbiAgICAgICAgY29uc3QgcmVsZWFzZUNvbnRleHRDb21iaW5hdG9ycyA9IHJlbGVhc2VDb250ZXh0LmdldENvbWJpbmF0b3JzKHJlbGVhc2VOYW1lcyk7XG5cbiAgICAgICAgcHVzaChjb21iaW5hdG9ycywgcmVsZWFzZUNvbnRleHRDb21iaW5hdG9ycyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluYXRvcnM7XG4gIH1cblxuICBnZXRDb25zdHJ1Y3RvcnMocmVsZWFzZU5hbWVzID0gW10pIHtcbiAgICBjb25zdCBjb25zdHJ1Y3RvcnMgPSBbXSxcbiAgICAgICAgICByZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VOYW1lID0gcmVsZWFzZU5hbWVzLmluY2x1ZGVzKHRoaXMucmVsZWFzZU5hbWUpO1xuXG4gICAgaWYgKCFyZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VOYW1lKSB7XG4gICAgICByZWxlYXNlTmFtZXMucHVzaCh0aGlzLnJlbGVhc2VOYW1lKTtcblxuICAgICAgY29uc3QgYnViYmxlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuZmlsZUNvbnRleHRzLmZvckVhY2goKGZpbGVDb250ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVDb250ZXh0Q29uc3RydWN0b3JzID0gZmlsZUNvbnRleHQuZ2V0Q29uc3RydWN0b3JzKGJ1YmJsZSk7XG5cbiAgICAgICAgcHVzaChjb25zdHJ1Y3RvcnMsIGZpbGVDb250ZXh0Q29uc3RydWN0b3JzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlbGVhc2VDb250ZXh0cy5mb3JFYWNoKChyZWxlYXNlQ29udGV4dCkgPT4ge1xuICAgICAgICBjb25zdCByZWxlYXNlQ29udGV4dENvbnN0cnVjdG9ycyA9IHJlbGVhc2VDb250ZXh0LmdldENvbnN0cnVjdG9ycyhyZWxlYXNlTmFtZXMpO1xuXG4gICAgICAgIHB1c2goY29uc3RydWN0b3JzLCByZWxlYXNlQ29udGV4dENvbnN0cnVjdG9ycyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uc3RydWN0b3JzO1xuICB9XG5cbiAgZ2V0Q3VzdG9tR3JhbW1hcigpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5yZWxlYXNlTmFtZSwgLy8vXG4gICAgICAgICAgdGVybUJORiA9IHRoaXMuZ2V0VGVybUJORigpLFxuICAgICAgICAgIHN0YXRlbWVudEJORiA9IHRoaXMuZ2V0U3RhdGVtZW50Qk5GKCksXG4gICAgICAgICAgbWV0YXN0YXRlbWVudEJORiA9IHRoaXMuZ2V0TWV0YXN0YXRlbWVudEJORigpLFxuICAgICAgICAgIHR5cGVQYXR0ZXJuID0gdGhpcy5nZXRUeXBlUGF0dGVybigpLFxuICAgICAgICAgIHN5bWJvbFBhdHRlcm4gPSB0aGlzLmdldFN5bWJvbFBhdHRlcm4oKSxcbiAgICAgICAgICBvcGVyYXRvclBhdHRlcm4gPSB0aGlzLmdldE9wZXJhdG9yUGF0dGVybigpLFxuICAgICAgICAgIGN1c3RvbUdyYW1tYXIgPSBuZXcgQ3VzdG9tR3JhbW1hcihuYW1lLCB0ZXJtQk5GLCBzdGF0ZW1lbnRCTkYsIG1ldGFzdGF0ZW1lbnRCTkYsIHR5cGVQYXR0ZXJuLCBzeW1ib2xQYXR0ZXJuLCBvcGVyYXRvclBhdHRlcm4pO1xuXG4gICAgcmV0dXJuIGN1c3RvbUdyYW1tYXI7XG4gIH1cblxuICBhZGRGaWxlQ29udGV4dChmaWxlQ29udGV4dCkge1xuICAgIHRoaXMuZmlsZUNvbnRleHRzLnB1c2goZmlsZUNvbnRleHQpO1xuICB9XG5cbiAgdG9rZW5pc2UoY29udGVudCkgeyByZXR1cm4gdGhpcy5mbG9yZW5jZUxleGVyLnRva2VuaXNlKGNvbnRlbnQpOyB9XG5cbiAgcGFyc2UodG9rZW5zKSB7IHJldHVybiB0aGlzLmZsb3JlbmNlUGFyc2VyLnBhcnNlKHRva2Vucyk7IH1cblxuICB0cmFjZShtZXNzYWdlKSB7IHRoaXMubG9nLnRyYWNlKG1lc3NhZ2UpOyB9XG5cbiAgZGVidWcobWVzc2FnZSkgeyB0aGlzLmxvZy5kZWJ1ZyhtZXNzYWdlKTsgfVxuXG4gIGluZm8obWVzc2FnZSkgeyB0aGlzLmxvZy5pbmZvKG1lc3NhZ2UpOyB9XG5cbiAgd2FybmluZyhtZXNzYWdlKSB7IHRoaXMubG9nLndhcm5pbmcobWVzc2FnZSk7IH1cblxuICBlcnJvcihtZXNzYWdlKSB7IHRoaXMubG9nLmVycm9yKG1lc3NhZ2UpOyB9XG5cbiAgZmF0YWwobWVzc2FnZSkgeyB0aGlzLmxvZy5mYXRhbChtZXNzYWdlKTsgfVxuXG4gIGluaXRpYWxpc2UocmVsZWFzZUNvbnRleHRzLCBkZXBlbmRlbmN5UmVsZWFzZUNvbnRleHRzKSB7XG4gICAgdGhpcy5yZWxlYXNlQ29udGV4dHMgPSByZWxlYXNlQ29udGV4dHM7XG5cbiAgICBjb25zdCByZWxlYXNlQ29udGV4dCA9IHRoaXM7ICAvLy9cblxuICAgIHJlbGVhc2VDb250ZXh0cyA9IFsgcmVsZWFzZUNvbnRleHQsIC4uLmRlcGVuZGVuY3lSZWxlYXNlQ29udGV4dHMgXTsgLy8vXG5cbiAgICBjb25zdCBjdXN0b21HcmFtbWFycyA9IHJlbGVhc2VDb250ZXh0cy5tYXAoKHJlbGVhc2VDb250ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21HcmFtbWFyID0gcmVsZWFzZUNvbnRleHQuZ2V0Q3VzdG9tR3JhbW1hcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tR3JhbW1hcjtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjb21iaW5lZEN1c3RvbUdyYW1tYXIgPSBDb21iaW5lZEN1c3RvbUdyYW1tYXIuZnJvbUN1c3RvbUdyYW1tYXJzKGN1c3RvbUdyYW1tYXJzKTtcblxuICAgIHRoaXMuZmxvcmVuY2VMZXhlciA9IGZsb3JlbmNlTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKGNvbWJpbmVkQ3VzdG9tR3JhbW1hcik7XG5cbiAgICB0aGlzLmZsb3JlbmNlUGFyc2VyID0gZmxvcmVuY2VQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKGNvbWJpbmVkQ3VzdG9tR3JhbW1hcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVJlbGVhc2VOYW1lQW5kTG9nKENsYXNzLCByZWxlYXNlTmFtZSwgbG9nLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBmaWxlQ29udGV4dHMgPSBbXSxcbiAgICAgICAgICBmbG9yZW5jZUxleGVyID0gbnVsbCxcbiAgICAgICAgICBmbG9yZW5jZVBhcnNlciA9IG51bGwsXG4gICAgICAgICAgcmVsZWFzZUNvbnRleHRzID0gW10sXG4gICAgICAgICAgcmVsZWFzZVZlcmlmaWVkID0gZmFsc2UsXG4gICAgICAgICAgcmVsZWFzZUNvbnRleHQgPSBuZXcgQ2xhc3MocmVsZWFzZU5hbWUsIGZpbGVDb250ZXh0cywgZmxvcmVuY2VMZXhlciwgZmxvcmVuY2VQYXJzZXIsIHJlbGVhc2VDb250ZXh0cywgcmVsZWFzZVZlcmlmaWVkLCBsb2csIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gcmVsZWFzZUNvbnRleHQ7XG4gIH1cbn1cbiIsIlJlYWN0LmNyZWF0ZUVsZW1lbnQiXSwibmFtZXMiOlsiUmVsZWFzZUNvbnRleHQiLCJmbG9yZW5jZUxleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImxleGVyc1V0aWxpdGllcyIsImZsb3JlbmNlUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsInBhcnNlcnNVdGlsaXRpZXMiLCJyZWxlYXNlTmFtZSIsImZpbGVDb250ZXh0cyIsImZsb3JlbmNlTGV4ZXIiLCJmbG9yZW5jZVBhcnNlciIsInJlbGVhc2VDb250ZXh0cyIsInJlbGVhc2VWZXJpZmllZCIsImxvZyIsImdldFJlbGVhc2VOYW1lIiwiZ2V0RmlsZUNvbnRleHRzIiwiZ2V0RmxvcmVuY2VMZXhlciIsImdldEZsb3JlbmNlUGFyc2VyIiwiZ2V0UmVsZWFzZUNvbnRleHRzIiwiZ2V0TG9nIiwiaXNSZWxlYXNlVmVyaWZpZWQiLCJnZXRSdWxlcyIsInJlbGVhc2VOYW1lcyIsInJ1bGVzIiwicmVsZWFzZU5hbWVzSW5jbHVkZXNSZWxlYXNlTmFtZSIsImluY2x1ZGVzIiwicHVzaCIsImJ1YmJsZSIsImZvckVhY2giLCJmaWxlQ29udGV4dCIsImZpbGVDb250ZXh0UnVsZXMiLCJyZWxlYXNlQ29udGV4dCIsInJlbGVhc2VDb250ZXh0UnVsZXMiLCJnZXRUeXBlcyIsInR5cGVzIiwiZmlsZUNvbnRleHRUeXBlcyIsInJlbGVhc2VDb250ZXh0VHlwZXMiLCJnZXRBeGlvbXMiLCJheGlvbXMiLCJmaWxlQ29udGV4dEF4aW9tcyIsInJlbGVhc2VDb250ZXh0QXhpb21zIiwiZ2V0Q29tYmluYXRvcnMiLCJjb21iaW5hdG9ycyIsImZpbGVDb250ZXh0Q29tYmluYXRvcnMiLCJyZWxlYXNlQ29udGV4dENvbWJpbmF0b3JzIiwiZ2V0Q29uc3RydWN0b3JzIiwiY29uc3RydWN0b3JzIiwiZmlsZUNvbnRleHRDb25zdHJ1Y3RvcnMiLCJyZWxlYXNlQ29udGV4dENvbnN0cnVjdG9ycyIsImdldEN1c3RvbUdyYW1tYXIiLCJuYW1lIiwidGVybUJORiIsImdldFRlcm1CTkYiLCJzdGF0ZW1lbnRCTkYiLCJnZXRTdGF0ZW1lbnRCTkYiLCJtZXRhc3RhdGVtZW50Qk5GIiwiZ2V0TWV0YXN0YXRlbWVudEJORiIsInR5cGVQYXR0ZXJuIiwiZ2V0VHlwZVBhdHRlcm4iLCJzeW1ib2xQYXR0ZXJuIiwiZ2V0U3ltYm9sUGF0dGVybiIsIm9wZXJhdG9yUGF0dGVybiIsImdldE9wZXJhdG9yUGF0dGVybiIsImN1c3RvbUdyYW1tYXIiLCJDdXN0b21HcmFtbWFyIiwiYWRkRmlsZUNvbnRleHQiLCJ0b2tlbmlzZSIsImNvbnRlbnQiLCJwYXJzZSIsInRva2VucyIsInRyYWNlIiwibWVzc2FnZSIsImRlYnVnIiwiaW5mbyIsIndhcm5pbmciLCJlcnJvciIsImZhdGFsIiwiaW5pdGlhbGlzZSIsImRlcGVuZGVuY3lSZWxlYXNlQ29udGV4dHMiLCJjdXN0b21HcmFtbWFycyIsIm1hcCIsImNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIkNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImZyb21DdXN0b21HcmFtbWFycyIsImZyb21SZWxlYXNlTmFtZUFuZExvZyIsIkNsYXNzIiwicmVtYWluaW5nQXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVNxQkE7OzttQ0FQbUU7cUJBRW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVyQixJQUFNLEFBQUVDLHlDQUEyQ0Msb0NBQWUsQ0FBMURELHdDQUNGLEFBQUVFLDBDQUE0Q0MscUNBQWdCLENBQTVERDtBQUVPLElBQUEsQUFBTUgsK0JBQU47YUFBTUEsZUFDUEssV0FBVyxFQUFFQyxZQUFZLEVBQUVDLGFBQWEsRUFBRUMsY0FBYyxFQUFFQyxlQUFlLEVBQUVDLGVBQWUsRUFBRUMsR0FBRzs4QkFEeEZYO1FBRWpCLElBQUksQ0FBQ0ssV0FBVyxHQUFHQTtRQUNuQixJQUFJLENBQUNDLFlBQVksR0FBR0E7UUFDcEIsSUFBSSxDQUFDQyxhQUFhLEdBQUdBO1FBQ3JCLElBQUksQ0FBQ0MsY0FBYyxHQUFHQTtRQUN0QixJQUFJLENBQUNDLGVBQWUsR0FBR0E7UUFDdkIsSUFBSSxDQUFDQyxlQUFlLEdBQUdBO1FBRXZCLElBQUksQ0FBQ0MsR0FBRyxHQUFHQTs7aUJBVE1YOztZQVluQlksS0FBQUE7bUJBQUFBLFNBQUFBLGlCQUFpQjtnQkFDZixPQUFPLElBQUksQ0FBQ1AsV0FBVztZQUN6Qjs7O1lBRUFRLEtBQUFBO21CQUFBQSxTQUFBQSxrQkFB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