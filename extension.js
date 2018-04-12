// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const poorsql = require('poor-mans-t-sql-formatter');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const formatter = new Formatter();

    let disposable = vscode.commands.registerCommand('extension.poorsql', function () {
        formatter.format();
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;

class Formatter {
    constructor() {
        this.formats = {
            indent: '\t',
            expandCommaList: true,
            trailingCommas: false,
            spaceAfterExpandedComma: true,
            expandBooleanExpressions: true,
            expandCaseStatements: true,
            breakJoinOnSections: true,
            uppercaseKeywords: true
        };
    }

    format() {
        const { window } = vscode;
        const editor = window.activeTextEditor;

        if (!editor) {
            return;
        }
        const { document } = editor;
        const { text } = poorsql.formatSql(document.getText(), this.formats);

        editor.edit(editBuilder => {
            editBuilder.delete(new vscode.Range(0, 0, document.lineCount, 0));
            editBuilder.insert(new vscode.Position(0, 0), text);
        });
    }

    dispose() {
        // If there are disposables dispose of them here
        //this._statusBarItem.dispose();
    }
}
