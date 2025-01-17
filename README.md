# Occam Verify-CLI

[Occam](https://github.com/djalbat/occam)'s verifier.

*This readme file is mostly for developers. For instructions tailored to end users, see the following:*

https://openmathematics.org

### Contents

- [Installation](#installation)
- [Usage](#usage)
- [Building](#building)
- [License](#license)
- [Contact](#contact)

## Installation

If you would like to contribute or would simply like to have a look at the code, you can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/occam-verify-cli.git

...and then install the dependencies with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install

## Usage

These are the commands and options:

```
  verify [<options>] [<command>] [<argument>]

Commands:

  help                                            Show this help

  version                                         Show the version

Options:

  --help|-h                                       Show this help

  --version|-v                                    Show the version

  --tail|-t                                       Sets the size of the tail of the log messages. The default is ten. 

  --follow|-f                                     Show the log messages immediately instead of tailing them. The default is false.
```

## Building

Automation is thanks to [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## License

Copyright 2016-2023 James Smith

Licensed under the Apache License, Version 2.0 and Anti-996 License (collectively the "License"); you may not use this software except in compliance with the License and subject to the terms laid out after this notice. A copy of the License can be found at the following URL:

https://github.com/djalbat/occam-verify-cli/blob/master/license.txt

Unless required by applicable law or agreed to in writing, software distributed under the Licenses is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Licenses for the specific language governing permissions and limitations under the Licenses.

### Terms

* This is **not** free software.
* It can be used *only for personal use and if not for profit*, otherwise you must contact the author.
* You cannot re-use the source code for any reason, even if only for personal use and if not for profit; or even if you have paid to use it otherwise.

## Contact

* james.smith@djalbat.com

