import { appConfig } from "./config";
import { io } from 'socket.io-client';
import { ISocketData } from "./ISocketData";

let lastDistance = 0;

const socket = io("localhost:3000");
socket.on('connect', () => {
    console.log("Connected");
});

socket.on('DISTANCE_UPDATE', (data: ISocketData) => {
    if(data.distance > lastDistance + 2 || data.distance < lastDistance - 2){
        moveBody(data.distance);
    }
});

const image = document.createElement('img') as HTMLImageElement;
image.src = appConfig.mainImage;
image.className = "main-image";

document.body.appendChild(image);

let i = 0;

function moveBody(distance: number) {
    const moveTo = ((image.width - window.innerWidth) - distance * getPixelsPerCentimeter());

    i = image.x;
    while(i > -moveTo) {
        image.style.transform = `translateX(${i}px)`;
        i--;
    }
}

function getPixelsPerCentimeter(): number {
    return (image.width - window.innerWidth) / appConfig.totalCM;
}