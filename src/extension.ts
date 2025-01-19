import * as vscode from "vscode";
import { sortImportStatements } from "./sortImports";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "import-sorter.sortImports",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const text = document.getText();

        // Extract all imports
        const importLines = text
          .split("\n")
          .filter((line) => line.startsWith("import"));

        if (importLines.length > 0) {
          // Sort the imports
          const sortedImports = sortImportStatements(importLines);

          // Replace the old imports with the sorted ones
          editor.edit((editBuilder) => {
            // Find the range of import statements
            const firstImportIndex = text.indexOf(importLines[0]);
            const lastImportIndex =
              text.indexOf(importLines[importLines.length - 1]) +
              importLines[importLines.length - 1].length;

            // Create a range for the import statements
            const importRange = new vscode.Range(
              document.positionAt(firstImportIndex),
              document.positionAt(lastImportIndex)
            );

            // Replace imports
            editBuilder.replace(importRange, sortedImports.join("\n"));
          });

          vscode.window.showInformationMessage("Imports sorted successfully!");
        } else {
          vscode.window.showWarningMessage("No imports found to sort.");
        }
      } else {
        vscode.window.showErrorMessage("No active editor found.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
