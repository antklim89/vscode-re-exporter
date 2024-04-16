import * as vscode from 'vscode';
import { generateReexports } from 're-exporter';


export function activate(context: vscode.ExtensionContext) {
	
	console.log('== \n generateReexports', generateReexports);

	let disposable = vscode.commands.registerCommand('vscode-re-exporter.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-re-exporter!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
