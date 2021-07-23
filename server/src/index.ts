import Server from "./server";
import SocketManager from "./services/socket-manager";

class Application {
    private server: Server;
    private socketManager: SocketManager;

    private static application: Application;

    private constructor() {
        this.server = new Server();
        this.socketManager = new SocketManager(this.server.io);
    }

    public startServer(): void {
        this.socketManager.initSocket();

        this.server.app.listen(3000, (err: Error, address: string) => {
            if (err) {
                throw err;
            }

            console.log(`👉 Server started on ${address} 🚀`);
        });
    }

    public static get Instance(): Application {
        if (this.application == undefined) {
            this.application = new Application();
        }

        return this.application;
    }
}

const app = Application.Instance;
app.startServer();