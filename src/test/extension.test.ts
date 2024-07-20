import * as assert from 'assert';
import * as vscode from 'vscode';
import { Utility } from '../utils/Utility';

suite('Live PHP extension test', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('resolve path php', () => {
		const path = Utility.resolveRoutesPHP("/index.php");
		assert.strictEqual(path, "/index.php");
	});
});
