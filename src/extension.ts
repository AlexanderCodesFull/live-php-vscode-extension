import *  as vscode from 'vscode';
import { MainApp } from './Main';

const app = new MainApp();

export function activate(context: vscode.ExtensionContext) {
	
	const start = vscode.commands.registerCommand('live-php.start', async () => {
		await app.start();
	});
	const stop = vscode.commands.registerCommand('live-php.stop', () => {
		app.destroy();
	});
	context.subscriptions.push(start,stop);
}

export function deactivate() { app.destroy(); };