"use strict";

const { arrayUtilities } = require("necessary"),
      { ReleaseContext } = require("../../lib/index"),
      { fileSystemUtilities } = require("occam-file-system");

const { log } = require("../utilities/logging"),
      { PERIOD } = require("../constants");

const { first } = arrayUtilities,
      { loadRelease } = fileSystemUtilities;

function createReleaseContext(name, releaseContextMap, dependentNames = []) {
  let releaseContext = releaseContextMap[name] || null;

  if (releaseContext !== null) {
    return;
  }

  const topmostDirectoryName = name, ///
        projectsDirectoryPath = PERIOD,
        release = loadRelease(topmostDirectoryName, projectsDirectoryPath);

  if (release === null) {
    log.error(`The '${name}' package cannot be loaded.`);
  } else {
    const releaseContext = ReleaseContext.fromLogAndRelease(log, release);

    createDependencyReleaseContexts(releaseContext, releaseContextMap, dependentNames);

    releaseContextMap[name] = releaseContext;
  }
}

function createDependencyReleaseContexts(releaseContext, releaseContextMap, dependentNames = []) {
  const name = releaseContext.getName(),
        version = releaseContext.getVersion(),
        dependencies = releaseContext.getDependencies(),
        dependencyNames = dependencies.reduceDependency((dependencyNames, dependency) => {
          const dependencyName = dependency.getName(),
                dependencyMatchesVersion = dependency.matchVersion(version);

          if (dependencyMatchesVersion) {
            dependencyNames.push(dependencyName);
          } else {
            releaseContext.error(`The '${dependencyName}' dependency's  does to mat.`)
          }

          return dependencyNames;
        }, []);

  dependentNames = [ ...dependentNames, name ];  ///

  dependencyNames.forEach((dependencyName) => {
    const cyclicDependencyExists = checkCyclicDependencyExists(dependencyName, dependentNames, releaseContext);

    if (cyclicDependencyExists) {
      return;
    }

    const name = dependencyName; ///

    createReleaseContext(name, releaseContextMap, dependentNames);
  });
}

module.exports = {
  createReleaseContext
};

function checkCyclicDependencyExists(dependencyName, dependentNames, releaseContext) {
  const dependentNamesIncludesDependencyName = dependentNames.includes(dependencyName),
        cyclicDependencyExists = dependentNamesIncludesDependencyName;  ///

  if (cyclicDependencyExists) {
    const firstDependentName = first(dependentNames),
          dependencyNames = dependentNames.concat(firstDependentName),
          dependencyNamesString = dependencyNames.join(`' -> '`);

    releaseContext.error(`There is a cyclic dependency: '${dependencyNamesString}'.`);
  }

  return cyclicDependencyExists;
}
