import { Uri, window, workspace} from "vscode";
import { existsSync, rmSync } from "fs";
import * as portfinder from "portfinder";
import { join, normalize, resolve } from "path";
import { FileError, TerminalError } from "../errors/Error";
import { execSync } from "child_process";
import { confApp } from "../config";

export class Utility {

  public static getUserConfiguration(property:string):string | null{
    const prop = workspace.getConfiguration().get(property) as string;
    if(!prop || prop === null || prop === undefined) { return null; };
    return prop;
  }

  public static  getWorkspaceDir():string | null {
        if (!window.activeTextEditor) { return  null; };
        const documentUri = window.activeTextEditor.document.uri.toString();
        const folder = workspace.getWorkspaceFolder(Uri.parse(documentUri));
        if (!folder){ return null; };
        return resolve(normalize(folder.uri.fsPath));
  }

  public static resolveRootFilePHP(){
    const root =  Utility.getWorkspaceDir();
     if(!existsSync(join(root!,"index.php"))){
       throw new FileError("Failed. Not found index.php in workspace.");
    };
    return root;
  }

  public static async resolveServerPort():Promise<number>{
      portfinder.setBasePort(5002);
      portfinder.setHighestPort(5999);
      const port = await portfinder.getPortPromise().catch(()=>{ return null;});
      return port === null ? 5068 : port;
  }

  public static resolveSeparator(path:string){
    return path.includes("/") ? "/":"\\";
  }

  public static resolveOpenBrowser(port:number){
    const cmand = process.platform === "win32" ? "start" :"xdg-open";
    try {
      execSync(`${cmand} ${confApp.baseUrl}:${port}`);
    } catch (error) {
      throw new TerminalError("Failed execute command terminal.");
    }
  }

  public static resolveRoutesPHP(filePath:string):string | null {
    const wspaceDir = this.getWorkspaceDir();
    let phpPath :string  = "index.php";

    if(wspaceDir){
        const currDir =  wspaceDir.split(this.resolveSeparator(wspaceDir)).pop();
          if(!filePath.endsWith(".php")){ return null ;}
          const route = filePath?.substring(filePath?.indexOf(currDir!)!+ currDir!.length);
          if(route?.includes("\\")){  phpPath = route.replace(/\\/g,"/");
          }else{  phpPath = route ? route : phpPath; };
      }
      return phpPath;
  }

  public static resolveFolderExsist(){
    try {
      const pathFolder = join(Utility.getWorkspaceDir()!,".vscode");
        if(existsSync(pathFolder)){
          rmSync(pathFolder,{ recursive: true, force: true });
        }
    } catch (error) {
     console.log("Folder not updated data.", error);
    } 
  }
}