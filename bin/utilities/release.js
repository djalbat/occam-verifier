"use strict";

const { Query } = require("occam-dom"),
      { filePathUtilities } = require("occam-open-cli"),
      { fileSystemUtilities } = require("necessary"),
      { MetaJSONLexer, MetaJSONParser } = require("occam-grammars");

const { isFilePathFlorenceFilePath } = filePathUtilities,
      { readFile, isEntryFile, readDirectory, isEntryDirectory, checkFileExists } = fileSystemUtilities;

const metaJSONLexer = MetaJSONLexer.fromNothing(),
      metaJSONParser = MetaJSONParser.fromNothing(),
      dependencyNonTerminalNodeQuery = Query.fromExpression("//dependencies/dependency/@string-literal!");

function filePathsFromReleaseName(releaseName) {
  const directoryName = releaseName,  ///
        filePaths = readFilePaths(directoryName, (filePath) => {
          const filePathFlorenceFilePath = isFilePathFlorenceFilePath(filePath);

          if (filePathFlorenceFilePath) {
            return true;
          }
        });

  return filePaths;
}

function dependencyReleaseNamesFromReleaseName(releaseName) {
  let dependencyReleaseNames = [];

  const directoryName = releaseName,  ///
        metaJSONFilePath = `${directoryName}/meta.json`,
        metaJSONFileExists = checkFileExists(metaJSONFilePath);

  if (metaJSONFileExists) {
    const metaJSONFileContent = readFile(metaJSONFilePath),
          content = metaJSONFileContent,  ///
          tokens = metaJSONLexer.tokenise(content),
          node = metaJSONParser.parse(tokens),
          dependencyNonTerminalNodes = dependencyNonTerminalNodeQuery.execute(node);

    dependencyReleaseNames = dependencyNonTerminalNodes.map((dependencyNonTerminalNode) => {
      const dependencyNonTerminalNodeContent = dependencyNonTerminalNode.getContent(),
            dependencyReleaseName = trimDoubleQuotes(dependencyNonTerminalNodeContent); ///

      return dependencyReleaseName;
    });
  }

  return dependencyReleaseNames;
}

module.exports = {
  filePathsFromReleaseName,
  dependencyReleaseNamesFromReleaseName
};

function readFilePaths(directoryPath, test, filePaths = []) {
  const subEntryNames = readDirectory(directoryPath);

  subEntryNames.forEach((subEntryName) => {
    const subEntryNameHiddenName = isNameHiddenName(subEntryName);

    if (!subEntryNameHiddenName) {
      const subEntryPath = `${directoryPath}/${subEntryName}`,
            subEntryFile = isEntryFile(subEntryPath),
            subEntryDirectory = isEntryDirectory(subEntryPath);

      if (subEntryFile) {
        const filePath = subEntryPath,  ///
              pass = test(filePath);

        if (pass) {
          filePaths.push(filePath);
        }
      }

      if (subEntryDirectory) {
        const subDirectoryPath = subEntryPath;  ///

        readFilePaths(subDirectoryPath, test, filePaths);
      }
    }
  });

  return filePaths;
}

function isNameHiddenName(name) {
  const nameHiddenName = /^\..+/.test(name);

  return nameHiddenName;
}

function trimDoubleQuotes(content) { return content.replace(/(^"|"$)/g, ""); } ///