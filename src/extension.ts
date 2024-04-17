import * as vscode from 'vscode';
import { generateReexports, createConfigFile } from 're-exporter';


const handleCreateConfigFile = async () => {
	if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1) {
		const selected = await vscode.window.showQuickPick(
			vscode.workspace.workspaceFolders?.map((i) => i.name),
		);
		const cwd = vscode.workspace.workspaceFolders.find(i => i.name === selected)?.uri.path;
		if (cwd) {
			await createConfigFile(cwd);
		}
	} else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length === 1) {
		const cwd = vscode.workspace.workspaceFolders[0].uri.path;
		await createConfigFile(cwd);
	}
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-re-exporter.createConfigFile', handleCreateConfigFile)
	);
}

export function deactivate() {}
