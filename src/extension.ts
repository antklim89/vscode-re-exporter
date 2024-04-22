import * as vscode from 'vscode';
import { generateReexports, createConfigFile } from 're-exporter';


async function selectWorkSpace(): Promise<string | undefined> {
	if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1) {
		const selected = await vscode.window.showQuickPick(
			vscode.workspace.workspaceFolders?.map((i) => i.name)
		);
		return vscode.workspace.workspaceFolders.find(i => i.name === selected)?.uri.path;
	} else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length === 1) {
		return vscode.workspace.workspaceFolders[0].uri.path;
	}
}

const handleCreateConfigFile = async () => {
	const cwd = await selectWorkSpace();
	if (cwd) {
		await createConfigFile({ cwd });
	}
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-re-exporter.createConfigFile', handleCreateConfigFile)
	);
}

export function deactivate() {}
