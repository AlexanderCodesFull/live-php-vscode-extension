import { createServer } from "http";
import {Server as SocketServer} from "socket.io";
import { randomUUID } from "crypto";
import { Utility } from "../utils/Utility";
import { ServerErrors } from "../errors/Error";
import { confApp } from "../config";


export class SocketHandler {
  
 private io:SocketServer |undefined ;
 private readonly token:string ;
 private serverPort:number;
 private socketPort:number;
 private httpServer:any | undefined;
 private baseOrigin:string;
 private activeSockets:any = {};
   
public constructor(){
  this.token = btoa(randomUUID() + Date.now().toString());
  this.io = undefined;
  this.serverPort = 5078;
  this.socketPort = this.serverPort + 1;
  this.httpServer = undefined;
  this.baseOrigin = `${confApp.baseUrl}:${this.serverPort}`;
}

private async initSocket(){
  this.serverPort = await Utility.resolveServerPort();
  this.socketPort = this.serverPort + 1;
  this.baseOrigin = `${confApp.baseUrl}:${this.serverPort}`;

  this.httpServer = createServer((_req, res)=>{
    const headers = {
                "Access-Control-Allow-Origin": [this.baseOrigin],
                "Access-Control-Max-Age": 2592000
            };
    res.writeHead(200, headers);
    res.end();
  });

  this.io = new SocketServer(this.httpServer, { 
    cors: { origin: [this.baseOrigin], credentials : true },
    connectTimeout:5000, 
  });

  this.io.on('connection', socket => {
    const hash : string = socket.handshake.auth.token;
    if(hash && hash === this.token){
      this.activeSockets[socket.id] = socket;
      setTimeout(() => {      
          for (const uid in this.activeSockets) {
            if (uid !== socket.id) {
                this.activeSockets[uid].disconnect(true);
                delete this.activeSockets[uid];
                break;
              }
            }
      }, 1500);
    } else{ 
      socket.disconnect(true); 
    }

    socket.on("disconnect",(_reason)=>{});
  });

  this.httpServer.listen(this.socketPort,() =>{ });
  this.httpServer.on("close",()=>{ this.destroyedServers();});

  return { 
    serverPort: this.serverPort, 
    socketPort: this.socketPort,
    token: this.token
  };
 }

 public sendMessage(data:string):void{
  this.io?.emit("message", data);
 }

 public async start(){
  try {
    return await this.initSocket();
  } catch (error) {
    throw new ServerErrors("Failed running server.");
  }
 }

 public destroyedServers():void{
   for (const uid in this.activeSockets) {
     this.activeSockets[uid].disconnect(true);
     delete this.activeSockets[uid];
    }
    this.httpServer.close();
    this.io?.close( (_err)=>{});
    this.httpServer = undefined;
    this.io = undefined;
 } 
}


