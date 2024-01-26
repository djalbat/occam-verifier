"use strict";

const { Entries } = require("occam-entities"),
      { ReleaseContext } = require("../../lib/index"), ///
      { fileSystemUtilities : occamFileSystemUtilities } = require("occam-file-system"),
      { pathUtilities, fileSystemUtilities : necessaryFileSystemUtilities } = require("necessary");

const { loadProject } = occamFileSystemUtilities,
      { concatenatePaths } = pathUtilities,
      { readFile, isEntryFile, checkEntryExists } = necessaryFileSystemUtilities;

function releaseContextFromDependency(dependency, context, callback) {
  const projectsDirectoryPath = process.cwd(), ///
        dependencyName = dependency.getName(),
        entryPath = concatenatePaths(projectsDirectoryPath, dependencyName),
        entryExists = checkEntryExists(entryPath);

  if (!entryExists) {
    const error = null,
          releaseContext = null;

    callback(error, releaseContext);

    return;
  }

  let releaseContext = null;

  try {
    const entryFile = isEntryFile(entryPath);

    if (entryFile) {
      const filePath = entryPath, ///
            content = readFile(filePath),
            jsonString = content, ///
            json = JSON.parse(jsonString);

      releaseContext = releaseContextFromJSON(json, context);
    } else {
      const projectName = dependencyName, ///
            project = loadProject(projectName, projectsDirectoryPath);

      if (project !== null) {
        releaseContext = releaseContextFromProject(project, context);
      }
    }
  } catch (error) {
    callback(error, releaseContext);

    return;
  }

  const error = null;

  callback(error, releaseContext);
}

module.exports = {
  releaseContextFromDependency
};

function releaseContextFromJSON(json, context) {
  const { log } = context,
        { name } = json;

  ({ context } = json);

  let { entries } = json;

  json = entries; ///

  entries = Entries.fromJSON(json);

  json = context; ///

  const releaseContext = ReleaseContext.fromLogJSONNameAndEntries(log, json, name, entries);

  return releaseContext;
}

function releaseContextFromProject(project, context) {
  const { log } = context,
        json = null,
        name = project.getName(),
        entries = project.getEntries(),
        releaseContext = ReleaseContext.fromLogJSONNameAndEntries(log, json, name, entries);

  return releaseContext;
}
