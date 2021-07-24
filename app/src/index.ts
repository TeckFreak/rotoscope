import { appConfig } from "./config";
import { Socket, io } from 'socket.io-client';
import { ISocketData } from "./ISocketData";

const socket = io("localhost:3000");
socket.on('connect', () => {
    console.log("Connected");
});

socket.on('DISTANCE_UPDATE', (data: ISocketData) => {
    moveBody(data.distance);
});

const image = document.createElement('img') as HTMLImageElement;
image.src = appConfig.mainImage;
image.className = "main-image";

document.body.appendChild(image);

let i = 0;

// const timer = setInterval(() => {
//     console.log(image.width, window.innerWidth)
//     if (i <= image.width - window.innerWidth) {
//         image.style.transform = `translateX(${-i}px)`;
//         i++;
//     }
//     else {
//         clearInterval(timer);
//     }
// }, 1);

function moveBody(distance: number) {
    const moveTo = distance * getPixelsPerCentimeter();

    if(-moveTo < image.x) {
        i = image.x;
        const timer = setInterval(() => {
            if (i > -moveTo) {
                image.style.transform = `translateX(${-i}px)`;
                i -= getPixelsPerCentimeter();
            }
            else {
                clearInterval(timer);
            }
        }, 1);
    }
    else {
        i = image.x;
        const timer = setInterval(() => {
            if (i <= -moveTo) {
                image.style.transform = `translateX(${-i}px)`;
                i += getPixelsPerCentimeter();
            }
            else {
                clearInterval(timer);
            }
        }, 1);
    }
}

function getPixelsPerCentimeter(): number {
    return image.width / appConfig.totalCM;
}