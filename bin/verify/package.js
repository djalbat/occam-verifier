"use strict";

const { loggingUtilities } = require("necessary");

const verifyFiles = require("../verify/files");

const { log } = loggingUtilities;

function verifyPackage(packageName, packageContextMap, packageContexts = []) {
  const packageContext = packageContextMap[packageName];

  let packageVerified = packageContext.isPackageVerified();

  if (!packageVerified) {
    log.debug(`Verifying the '${packageName}' package...`);

    const dependencyPackageNames = packageContext.getDependencyPackageNames(),
          dependencyPackagesVVerified = dependencyPackageNames.every((dependencyPackageName) => {
            const packageName = dependencyPackageName,  ///
                  packageVerified = verifyPackage(packageName, packageContextMap, packageContexts);

            if (packageVerified) {
              return true;
            }
          });

    if (dependencyPackagesVVerified) {
      const packageNames = dependencyPackageNames,  ///
            packageContexts = packageNames.map((packageName) => {
              const packageContext = packageContextMap[packageName];

              return packageContext;
            });

      const dependencyPackageContexts = retrieveDependencyPackageContexts(dependencyPackageNames, packageContextMap);

      packageContext.initialise(packageContexts, dependencyPackageContexts);

      const filesVerified = verifyFiles(packageContext);

      packageVerified = filesVerified;  ///

      if (packageVerified) {
        packageContexts.push(packageContext);

        log.info(`Verified the '${packageName}' package.`);
      }
    }
  }

  return packageVerified;
}

module.exports = verifyPackage;

function retrieveDependencyPackageContexts(dependencyPackageNames, packageContextMap, dependencyPackageContexts = []) {
  dependencyPackageNames.forEach((dependencyPackageName) => {
    const dependencyPackageContext = packageContextMap[dependencyPackageName],
          dependencyPackageContextsIncludesDependencyPackageContext = dependencyPackageContexts.includes(dependencyPackageContext);

    if (!dependencyPackageContextsIncludesDependencyPackageContext) {
      const packageContext = dependencyPackageContext,  ///
            dependencyPackageNames = packageContext.getDependencyPackageNames();

      retrieveDependencyPackageContexts(dependencyPackageNames, packageContextMap, dependencyPackageContexts);

      dependencyPackageContexts.push(dependencyPackageContext);
    }
  });

  return dependencyPackageContexts;
}
