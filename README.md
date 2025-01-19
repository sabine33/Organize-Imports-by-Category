# Organize imports by category

A Visual Studio Code extension that helps organize import statements in JavaScript and TypeScript files based on path and category. This extension provides a structured way to sort and group your imports, making your code more readable and maintainable.

## Features

- Automatically organizes import statements based on predefined categories
- Groups imports by their root paths
- Maintains consistent spacing between different import groups
- Supports both JavaScript and TypeScript files
- Maintains proper sorting of relative imports
- Preserves import styles and comments

### Sorting Order

The extension organizes imports in the following order:

1. Core Imports
   - PropTypes
   - React and React-related packages

2. Third-party Libraries
   - Node modules
   - Scoped packages (@vendor/package)

3. Internal Modules (grouped by root path)
   - Components
   - Selectors
   - Reducers
   - Utilities
   - Hooks

4. Relative Imports (sorted by depth)
   - ../../path/to/module
   - ../path/to/module
   - ./path/to/module

5. Style Imports
   - CSS/SCSS/LESS modules

### Example

Before:
```javascript
import styles from './styles.css';
import { helper } from '../utils/helper';
import { Button } from '@material-ui/core';
import React from 'react';
import CommonDialog from 'components/common/Dialog/CommonDialog';
import { useWorkflow } from 'hooks/workflow/useWorkflow';
```

After:
```javascript
import React from 'react';

import { Button } from '@material-ui/core';

import CommonDialog from 'components/common/Dialog/CommonDialog';

import { useWorkflow } from 'hooks/workflow/useWorkflow';

import { helper } from '../utils/helper';
import styles from './styles.css';
```

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS) to open the Quick Open dialog
3. Type `ext install organize-imports-by-category`
4. Click Install

## Usage

1. Open a JavaScript or TypeScript file
2. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Type "Organize imports by category" and select the command

Alternatively, you can:
- Right-click in the editor and select "Organize imports by category" from the context menu
- Set up a keyboard shortcut for the command `imports-organizer.organizeImports`

## Requirements

- Visual Studio Code version 1.96.0 or higher
- JavaScript or TypeScript files

## Extension Settings

This extension currently has no configurable settings. Future versions may include customization options for:
- Custom import categories
- Sorting order preferences
- Spacing between groups
- File type associations

## Known Issues

None at the moment. Please report any issues you find on our GitHub repository.

## Release Notes

### 0.0.1

Initial release of Imports Organizer:
- Basic import organization functionality
- Support for JS and TS files
- Category-based sorting
- Root path grouping

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).

## Support

If you encounter any problems or have suggestions, please file an issue on the [GitHub repository](https://github.com/sabine33/Organize-Imports-by-Category).

---

**Enjoy!**