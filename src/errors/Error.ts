import { window } from "vscode";

class FileError extends Error {
  constructor(message:string){
    super(message);
  }
}

export class ServerErrors extends Error {
  constructor(message:string){
    super(message);
  }
}

class TerminalError extends Error {
  constructor(message:string){
    super(message);
  }
}

class WorkpaceError extends Error {
  constructor(message:string){
    super(message);
  }
}


class ErrorHandler {

  public static TypeError (error:any){
    if(
      error instanceof FileError || 
      error instanceof ServerErrors || 
      error instanceof TerminalError || 
      error instanceof WorkpaceError
    ){
     window.showErrorMessage(error.message);
    }
  }

}

export { FileError, WorkpaceError, TerminalError, ErrorHandler }; 