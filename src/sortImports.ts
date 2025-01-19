interface ImportStatement {
  fullStatement: string;
  moduleName: string;
  rootPath: string;
  isRelative: boolean;
  category: number;
}

export function sortImportStatements(importStatements: string[]): string[] {
  const parseImport = (statement: string): ImportStatement | null => {
    const match = statement.match(/^import\s+(?:(?:\{[^}]*\}|\*\s+as\s+[^,\s]+|\w+(?:\s+as\s+\w+)?)?(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+[^,\s]+))?)\s+from\s+['"]([^'"]+)['"];?\s*$/);
    if (!match) {return null;}
    
    const moduleName = match[1];
    const paths = moduleName.split('/');
    const rootPath = paths[0];

    const getCategory = (moduleName: string, rootPath: string): number => {
      // PropTypes
      if (moduleName === 'prop-types') {return 0;}

      // React and related packages
      if (moduleName.startsWith('react') || moduleName.includes('react-')) {return 1;}

      // Third-party libraries (including scoped packages)
      if (!moduleName.startsWith('.') && (
          !moduleName.includes('/') || 
          moduleName.startsWith('@'))) {return 2;}

      // Internal modules categorized by root path
      if (moduleName.includes('/')) {
        // Components
        if (rootPath === 'components') {return 3;}
        
        // Selectors
        if (rootPath === 'selectors') {return 4;}
        
        // Reducers
        if (rootPath === 'reducers') {return 5;}
        
        // Utils
        if (rootPath === 'utilities') {return 6;}
        
        // Hooks
        if (rootPath === 'hooks') {return 7;}
      }

      // Relative imports
      if (moduleName.startsWith('.')) {return 8;}

      // Styles
      if (moduleName.match(/\.(css|scss|sass|less|styl)$/)) {return 9;}

      return 10;
    };

    return {
      fullStatement: statement,
      moduleName,
      rootPath,
      isRelative: moduleName.startsWith('.'),
      category: getCategory(moduleName, rootPath)
    };
  };

  // Parse and filter valid import statements
  const imports: ImportStatement[] = importStatements
    .map(stmt => parseImport(stmt))
    .filter((imp): imp is ImportStatement => imp !== null);

  // Sort imports
  const sortedImports = imports.sort((a, b) => {
    // First sort by category
    if (a.category !== b.category) {
      return a.category - b.category;
    }

    // Within the same category, sort by root path
    if (a.rootPath !== b.rootPath) {
      return a.rootPath.localeCompare(b.rootPath);
    }

    // Finally sort by full module name
    return a.moduleName.localeCompare(b.moduleName);
  });

  // Group imports by category and root path
  const result: string[] = [];
  let currentCategory = -1;
  let currentRootPath = '';

  sortedImports.forEach((importStatement, index) => {
    const nextImport = sortedImports[index + 1];
    
    // Add newline between different categories
    if (currentCategory !== -1 && currentCategory !== importStatement.category) {
      result.push('');
    }
    // Add newline between different root paths within same category
    // (except for third-party libraries which should be grouped together)
    else if (currentRootPath && 
             importStatement.category !== 2 && 
             currentCategory === importStatement.category && 
             currentRootPath !== importStatement.rootPath) {
      result.push('');
    }

    result.push(importStatement.fullStatement);
    
    currentCategory = importStatement.category;
    currentRootPath = importStatement.rootPath;
  });

  return result;
}