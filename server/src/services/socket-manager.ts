import { Server, Socket } from "socket.io";
import { SocketEvents } from "../constants/socket-events";
import { ISocketData } from "../interfaces/ISocketData";

export default class SocketManager {
    private socket: Socket | undefined = undefined;

    constructor(private io: Server) { }

    public initSocket(): void {
        this.io.on("connection", this.onUserConnected.bind(this));
        console.log("👉 Socket Initialized.");
    }

    private onUserConnected(socket: Socket): void {
        this.socket = socket;
    }

    public sendData(data: ISocketData): void {
        this.socket && this.socket.emit(SocketEvents.DISTANCE_UPDATE, data);
    }
}