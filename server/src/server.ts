import fastify, { FastifyInstance } from "fastify";
import { Server as SocketServer } from "socket.io";

export default class Server {
    private _app: FastifyInstance;
    private _io: SocketServer;

    public get app(): FastifyInstance {
        return this._app;
    }

    public get io(): SocketServer {
        return this._io;
    }

    constructor() {
        this._app = fastify({
            logger: false
        });

        this._io = new SocketServer(this._app.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
    }

    private config(): void {
        this.app.register(require('middie')).then(() => {
            (this.app as any).use(require('cors'));
            (this.app as any).use(require('helmet'));

            console.log("👉 Middleware Added.")
        });
    }
}