# Live PHP extension for VS Code

Live PHP is an extension that helps you automatically refresh UI or designs in PHP projects, which are not included by default. Additionally, it allows you to manage routes without having to manually type them into the browser, with simple configuration in your VS Code. [tutorial](https://youtube.com/qr).

## Features

- Hot Reload for the UI being developed with PHP.
- Default handling of routes without manual browser input.
- Supports PHP, JavaScript (js), TypeScript (ts), CSS, and HTML files by default.
- Folder naming configuration for routes.
- Terminal configuration for visibility.
- Cleaning up created files.

## Requirements

Before installing the extension, ensure that the following are installed on your operating system:

- Node.js
- PHP or XAMPP
- Updated browser (Chrome, Brave, Firefox, or Microsoft Edge).

To verify installation, execute the following commands in your PowerShell or integrated terminal of VS Code:

```
node -v   // for Node.js
php -v   // for PHP
```

Make necessary configurations to ensure proper functionality in your VS Code. Visit official pages or tutorials if you encounter any issues.

## Installation

- Open Visual Studio Code.
- Go to the Extensions view (Ctrl+Shift+X).
- Search for "Live PHP".
- Click on "Install".

## Usage

Once you've verified the requirements and installed the extension, you can do the following or [View the full tutorial]().

- File index.php - Before running any command you must create a file at the root of your project.

- Start - Go to your VS Code command palette, search for or execute Start Live PHP this will open the browser on an available port on your computer.

- Stop - Go to your VS Code command palette, search for or execute Stop Live PHP or open your terminal where running then close the Live PHP (PHP) terminal.

- Change the name of the folder route handler for the browser - Go to your VS Code settings open json and write live-php.folderRouteWtach change its default value to custom name, then it will automatically change the watcher.

- Browser Refresh - To refresh just save the file or change the file with the command `Ctrl + S` on Windows or `Cmd + S` on Mac, then it will automatically refresh the browser.

## Configuration

You can configure the following:

```bash
  {
    "live-php.showTerminal": "off",  //  "on"
    "live-php.folderRouteWatch": "pages"  // "custom-name"
  }
```

The showTerminal setting allows you to open the integrated terminal of VS Code when executing the start of the extension, it may be necessary to see what PHP is doing.

The folderRouteWatch (folder) setting is very important because it will handle routes in the browser. Any file within pages or custom name configuration will be considered a route.

The folder "pages" or "custom-name" can be within other folders or files no matter only that folder will be observed as routes.

## Suggestions and Issues

It is suggested to finish your project by running a PHP server (Apache or Nginx) or any commonly used server, this is to ensure there are no issues (always good).

It is suggested to stop the extension and execute the start live-php again if you want to view the terminal.

If you encounter any issues or have any suggestions to improve the extension, please open an issue in the repository.

## Donations

If you find this extension useful and wish to support its development, consider making a donation:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Donate-yellow.svg)](https://buymeacoffee.com/tunombre)

## License

This project is licensed under the [MIT Licence](https://opensource.org/licenses/MIT).

---

Created by [Alex Mamani Cll](https://).
