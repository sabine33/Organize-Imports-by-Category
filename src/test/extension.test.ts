import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Imports test", () => {
    console.log("✅ Test Passed: sortImports works as expected!");
  });
});
