"use strict";

import StatementForMetavariableSubstitution from "./substitution/statementForMetavariable";

import { prune, compare, rightDifference } from "./utilities/array";

export default class Substitutions {
  constructor(array, savedArray) {
    this.array = array;
    this.savedArray = savedArray;
  }

  getArray() {
    return this.array;
  }

  getSavedArray() {
    return this.savedArray;
  }

  hasChanged() {
    const compares = compare(this.array, this.savedArray),
          changed = !compares;  ///

    return changed;
  }

  findSubstitution(callback) { return this.array.find(callback); }

  someSubstitution(callback) { return this.array.some(callback); }

  everySubstitution(callback) { return this.array.every(callback); }

  addSubstitution(substitution, localContextA, localContextB) {
    this.array.push(substitution);

    const substitutionNode = substitution.getNode(),
          substitutionString = substitution.asString(localContextA, localContextB);

    localContextB.trace(`Added the '${substitutionString}' substitution.`, substitutionNode);
  }

  removeSubstitution(substitution, localContextA, localContextB) {
    const substitutionA = substitution; ///

    prune(this.array, (substitution) => {
      const substitutionB = substitution; ///

      if (substitutionA !== substitutionB) {
        return true;
      }
    });

    const substitutionNode = substitution.getNode(),
          substitutionString = substitution.asString(localContextA, localContextB);

    localContextB.trace(`Removed the '${substitutionString}' substitution.`, substitutionNode);
  }

  unifyAgainstEquivalences(equivalences, localContextA, localContextB) {
    const unifiedAgainstEquivalences = this.everySubstitution((substitution) => {
      const substitutions = this, ///
            substitutionUnifiedAgainstEquivalence = substitution.unifyAgainstEquivalences(equivalences, substitutions, localContextA, localContextB);

      if (substitutionUnifiedAgainstEquivalence) {
        return true;
      }
    });

    return unifiedAgainstEquivalences;
  }

  snapshot() {
    this.savedArray = [
      ...this.array
    ];
  }

  rollback(localContextA, localContextB) {
    const array = [
      ...this.array
    ];

    rightDifference(this.savedArray, array);

    array.forEach((substitution) => {
      this.removeSubstitution(substitution, localContextA, localContextB);
    });

    this.array = [
      ...this.savedArray
    ];

    this.savedArray = null;
  }

  continue() {
    this.savedArray = null;
  }

  transform() {
    ///
  }

  toJSON(tokens) {
    const json = this.array.map((substitution) => {
      const substitutionJSON = substitution.toJSON(tokens);

      return substitutionJSON;
    });

    return json;
  }

  static fromNothing() {
    const array = [],
          savedArray = null,
          substitutions = new Substitutions(array, savedArray);

    return substitutions;
  }

  static fromJSONAndFileContext(json, fileContext) {
    const substitutionsJSON = json, ///
          array = substitutionsJSON.map((substitutionJSON) => {
            const json = substitutionJSON,  ///
                  statementForMetavariableSubstitution = StatementForMetavariableSubstitution.fromJSONAndFileContext(json, fileContext),
                  substitution = statementForMetavariableSubstitution;  ///

            return substitution;
          }),
          savedArray = null,
          substitutions = new Substitutions(array, savedArray);

    return substitutions;
  }
}
