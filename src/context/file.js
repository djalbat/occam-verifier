"use strict";

import { rewriteNodes } from "occam-grammar-utilities";

import { push } from "../utilities/array";

export default class FileContext {
  constructor(tokens, node, rules, types, axioms, variables, combinators, constructors, packageContext) {
    this.tokens = tokens;
    this.node = node;
    this.rules = rules;
    this.types = types;
    this.axioms = axioms;
    this.variables = variables;
    this.combinators = combinators;
    this.constructors = constructors;
    this.packageContext = packageContext;
  }

  getTokens() {
    return this.tokens;
  }

  getNode() {
    return this.node;
  }

  getRules(bubble = true) {
    const rules = [
      ...this.rules
    ];

    if (bubble) {
      const packageContextRules = this.packageContext.getRules();

      push(rules, packageContextRules);
    }

    return rules;
  }

  getTypes(bubble = true) {
    const types = [
      ...this.types
    ];

    if (bubble) {
      const packageContextTypes = this.packageContext.getTypes();

      push(types, packageContextTypes);
    }

    return types;
  }

  getAxioms(bubble = true) {
    const axioms = [
      ...this.axioms
    ];

    if (bubble) {
      const packageContextAxioms = this.packageContext.getAxioms();

      push(axioms, packageContextAxioms);
    }

    return axioms;
  }

  getLabels() {
    const axioms = this.getAxioms(),
          labels = axioms.reduce((labels, axiom) => {
            const axiomLabels = axiom.getLabels();

            push(labels, axiomLabels);

            return labels;
          }, []);

    return labels;
  }

  getVariables() {
    return this.variables;
  }

  getCombinators(bubble = true) {
    const combinators = [
      ...this.combinators
    ];

    if (bubble) {
      const packageContextCombinators = this.packageContext.getCombinators();

      push(combinators, packageContextCombinators);
    }

    return combinators;
  }

  getConstructors(bubble = true) {
    const constructors = [
      ...this.constructors
    ];

    if (bubble) {
      const packageContextConstructors = this.packageContext.getConstructors();

      push(constructors, packageContextConstructors);
    }

    return constructors;
  }

  getPackageContext() {
    return this.packageContext;
  }

  getMetaAssertions() {
    const metaAssertions = [];

    return metaAssertions;
  }

  findTypeByTypeName(typeName) {
    const types = this.getTypes(),
          type = types.find((type) => {
            const matches = type.matchTypeName(typeName);

            if (matches) {
              return true;
            }
          }) || null;

    return type;
  }

  findRuleByReferenceName(referenceName) {
    const label = referenceName,  ///
          rules = this.getRules(),
          rule = rules.find((rule) => {
            const ruleLabels = rule.getLabels(),
                  ruleLabelsIncludesLabel = ruleLabels.includes(label);

            if (ruleLabelsIncludesLabel) {
              return true;
            }
          }) || null;

    return rule;
  }

  findAxiomByReferenceName(referenceName) {
    const label = referenceName,  ///
          axioms = this.getAxioms(),
          axiom = axioms.find((axiom) => {
            const axiomLabels = axiom.getLabels(),
                  axiomLabelsIncludesLabel = axiomLabels.includes(label);

            if (axiomLabelsIncludesLabel) {
              return true;
            }
          }) || null;

    return axiom;
  }

  findVariableByVariableName(variableName) {
    const name = variableName,  ///
          variable = this.variables.find((variable) => {
            const matches = variable.matchName(name);

            if (matches) {
              return true;
            }
          }) || null;

    return variable;
  }

  isDerived() {
    const derived = false;

    return derived;
  }

  isLabelPresent(label) {
    const labels = this.getLabels(),
          labelsIncludesLabel = labels.includes(label),
          labelPresent = labelsIncludesLabel; ///

    return labelPresent;
  }

  matchMetaAssertion(metaAssertion) {
    const metaAssertionMatches = false;

    return metaAssertionMatches;
  }

  isTypePresentByTypeName(typeName) {
    const type = this.findTypeByTypeName(typeName),
          typePresent = (type !== null);

    return typePresent;
  }

  isVariablePresentByVariableName(variableName) {
    const variable = this.findVariableByVariableName(variableName),
          variablePresent = (variable !== null);

    return variablePresent;
  }

  addType(type) {
    this.types.push(type);
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  addAxiom(axiom) {
    this.axioms.push(axiom);
  }

  addVariable(variable) {
    this.variables.push(variable);
  }

  addCombinator(combinator) {
    this.combinators.push(combinator);
  }

  addConstructor(constructor) {
    this.constructors.push(constructor);
  }

  trace(message) { this.packageContext.trace(message); }

  debug(message) { this.packageContext.debug(message); }

  info(message) { this.packageContext.info(message); }

  warning(message) { this.packageContext.warning(message); }

  error(message) { this.packageContext.error(message); }

  fatal(message) { this.packageContext.fatal(message); }

  static fromPackageContextAndFilePath(packageContext, filePath) {
    const fileContent = packageContext.getFileContent(filePath),
          content = fileContent,  ///
          tokens = packageContext.tokenise(content),
          node = packageContext.parse(tokens);

    rewriteNodes(node);

    const rules = [],
          types = [],
          axioms = [],
          variables = [],
          combinators = [],
          constructors = [],
          fileContext = new FileContext(tokens, node, rules, types, axioms, variables, combinators, constructors, packageContext);

    return fileContext;
  }
}
