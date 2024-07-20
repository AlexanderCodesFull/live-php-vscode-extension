import { execSync } from "child_process";
import { normalize, resolve } from "path";
import { Terminal, window } from "vscode";
import { TerminalError } from "../errors/Error";


export class TerminalHandler{
  private terminal:Terminal|undefined;
  private phpExe : string | null;

  public constructor(){
    this.terminal = undefined;
    this.phpExe = null;
  }

  private create(portServer:number):void {
       const command = `${process.platform === "win32" ? "where" : "which"} php`;
       const result = execSync(command).toString();
             this.phpExe = resolve(normalize(result.trim()));     
      const args = ['-H'];
      args.push('-S', `localhost:${portServer}`, '.vscode/router.php');
  
     this.terminal =  window.createTerminal({
        name:`live-php [ : ${portServer} ]`,
        isTransient : false,
        shellArgs : args,
        shellPath: this.phpExe,
      });
       
      this.terminal.hide();
  }

  public async start(portServer:number):Promise<void>{
    try {
     await this.create(portServer);
    } catch (error) {
      throw new TerminalError("Failed running terminal.");
    }
  }

  public async terminalProcId():Promise<number|undefined>{
    return await this.terminal?.processId;
  }

  public destroyed():void{
    this.terminal?.dispose();
    this.phpExe = null; 
  } 
}