"use strict";

const { Dependency } = require("occam-file-system"),
      { verifyRelease, releaseContextUtilities } = require("../../lib/index");  ///

const { trimTrailingSlash } = require("../utilities/string"),
      { releaseContextFromDependency } = require("../utilities/releaseContext");

const { createReleaseContext, initialiseReleaseContext } = releaseContextUtilities;

function verifyAction(argument, log) {
  const name = trimTrailingSlash(argument), ///
        context = {},
        dependency = Dependency.fromName(name),
        dependentNames = [],
        releaseContextMap = {};

  Object.assign(context, {
    log,
    releaseContextMap,
    releaseContextFromDependency
  });

  createReleaseContext(dependency, dependentNames, context, (error) => {
    if (error) {
      log.error(error);

      return;
    }

    const releaseName = name, ///
          dependentName = releaseName,  ///
          releaseContext = releaseContextMap[releaseName],
          verified = releaseContext.isVerified();

    initialiseReleaseContext(dependency, dependentName, verified, context, (error) => {
      if (error) {
        log.error(error);

        return;
      }

      delete context.releaseContextMap;
      delete context.releaseContextFromDependency;

      verifyRelease(releaseName, releaseContextMap);
    });
  });
}

module.exports = verifyAction;
