// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { test } from 'react-webview-extension-web';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	test();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-webview-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('react-webview-extension.webview', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from react-webview-extension!');
		const panel = vscode.window.createWebviewPanel(
			'catCoding', // 只供内部使用，这个 webview 的标识
			'Cat Coding', // 给用户显示的面板标题
			vscode.ViewColumn.One, // 给新的 webview 面板一个编辑器视图
			{
				enableScripts: true
			} // Webview 选项。我们稍后会用上
		);
		panel.webview.html = getWebviewContent();
		panel.webview.onDidReceiveMessage(() => {
			console.log('listem message');
		})
		//  focus 到对应的 tab
		// panel.reveal()

		panel.onDidChangeViewState(() => {
			console.log('可见性改变了');

		})
		panel.onDidDispose(() => {
			console.log('dispost')
		}, null, context.subscriptions)
	});

	context.subscriptions.push(disposable);
}

const getWebviewContent = () => {
	return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
            123213
        </body>
        </html>
    `;
}

// This method is called when your extension is deactivated
export function deactivate() { }
