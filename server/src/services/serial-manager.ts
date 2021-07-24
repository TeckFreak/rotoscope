import SocketManager from "./socket-manager";
import SerialPort from "serialport";
import { ISocketData } from "../interfaces/ISocketData";

export class SerialManager {
    private serial?: SerialPort;
    private parser?: SerialPort.parsers.Readline;

    constructor(private socket: SocketManager) {
    }

    public initSerial(): void {
        this.serial = new SerialPort("/dev/ttyS0", {
            baudRate: 9600,
            dataBits: 8,
            parity: "none",
            stopBits: 1,
        }, (error: Error | null | undefined) => {
            if(error) {
                console.error('🔴', error);
            }
        });

        this.parser = new SerialPort.parsers.Readline({
            delimiter: "\r\n",
            encoding: "utf8"
        });

        this.serial.pipe(this.parser);

        this.serial.on("open", this.onSerialOpen.bind(this));
    }

    private async onSerialOpen() {
        this.parser!.on('data', this.onParserDataReceived.bind(this));

        await new Promise(done => setTimeout(done, 1000));

        console.log("👉 Board Connected");
    }

    private onParserDataReceived(data: any) {
        console.log(data);

        this.socket.sendData({ distance: data } as ISocketData);
    }
}