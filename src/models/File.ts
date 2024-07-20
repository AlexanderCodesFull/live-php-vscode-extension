import { chmod, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join} from "path";
import { Utility } from "../utils/Utility";
import { FileError, WorkpaceError } from "../errors/Error";

interface IReg{ [ x:string ]: string };

export class FileHandler{

  private createDirectory(){
     Utility.resolveFolderExsist();
   if(!existsSync(join(Utility.getWorkspaceDir()!,".vscode"))){
      mkdirSync(join(Utility.getWorkspaceDir()!, ".vscode"));
      chmod(join(Utility.getWorkspaceDir()!,".vscode"),777,(_e)=>{});
   }
  }

  private  createFile(data:string){
    writeFileSync(join(Utility.getWorkspaceDir()!, ".vscode/router.php"), data, { flag:"w" });
  }
  
  private readFile( token:string, socketPort:number):string|null{
    const values : IReg = {"{{ port }}": String(socketPort), "{{ token }}": token};
    let fileData = readFileSync(join(__dirname, "router.php"),"utf-8");
       for (const key in values) {
        fileData = fileData.replace(new RegExp(key,"g"), values[key]);
       }   
    return fileData ? fileData: null;    
  }

  public start(token:string, socketPort:number){
    try {
      if(Utility.getWorkspaceDir() === null){  
        throw new WorkpaceError("Failed workspace directory."); 
      };
      const read = this.readFile(token, socketPort);
      if(!read || read === null){  throw new FileError ("Failed read file."); };
      this.createDirectory();
      this.createFile(read!);
    } catch (error) {
      throw new FileError("Failed running files.");
    }
  }
}