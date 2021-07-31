import { appConfig } from "./config";
import { io } from 'socket.io-client';
import { ISocketData } from "./ISocketData";

let lastDistance = 0;
let image: HTMLImageElement;
let container: HTMLSpanElement;
let i = 0;
let modal: HTMLDivElement;
let modalContent: HTMLDivElement;
let buttons: HTMLButtonElement[] = [];

const socket = io("localhost:3000");
socket.on('connect', () => {
    console.log("Connected");
});

socket.on('DISTANCE_UPDATE', (data: ISocketData) => {
    if (data.distance > lastDistance + 2 || data.distance < lastDistance - 2) {
        moveBody(data.distance);
    }
});

function moveBody(distance: number) {
    const moveTo = ((image.width - window.innerWidth) - distance * getPixelsPerCentimeter());

    i = getOffset(container).left;
    if (i > -moveTo) {
        while (i > -moveTo) {
            container.style.left = `${i}px`;
            i--;
        }
    }
    else if (i < -moveTo && i < 1) {
        while (i < -moveTo && i < 1) {
            container.style.left = `${i}px`;
            i++;
        }
    }

    buttons.forEach((button) => {
        if (button.hasAttribute('isPlaying') && button.getAttribute('isPlaying') == 'true') {
            const buttonOffset = getOffset(button);
            if (buttonOffset.left < 0 || buttonOffset.left > window.innerWidth) {
                button.setAttribute('isPlaying', 'false');
                hideModal();
            }
        }
    });
}

function getPixelsPerCentimeter(): number {
    return (image.width - window.innerWidth) / appConfig.totalCM;
}

function getButtonLocation(position: { x: number, y: number }): { x: number, y: number } {
    const widthDecrease = image.width / image.naturalWidth;
    const heightDecrease = image.height / image.naturalHeight;

    return {
        x: position.x * widthDecrease,
        y: position.y * heightDecrease
    };
}

function initImage(): void {
    image = document.createElement('img') as HTMLImageElement;
    image.src = appConfig.mainImage;
    image.className = "main-image";

    container.appendChild(image);
}

function initContainer(): void {
    container = document.createElement('div') as HTMLDivElement;
    container.className = 'container';

    document.body.append(container);
}

function initButtons(): void {
    appConfig.touchPoints.forEach((touchPoint) => {
        const button = document.createElement('button') as HTMLButtonElement;
        const position = getButtonLocation(touchPoint.position);
        button.style.left = `${position.x}px`;
        button.style.top = `${position.y}px`;

        // button.addEventListener('click',)
        button.onclick = () => {
            button.setAttribute('isPlaying', 'true');
            showModal(touchPoint.file);
        }

        container.appendChild(button);

        buttons.push(button);
    });
}

function initModal(): void {
    modal = document.createElement('div');
    modal.className = 'modal hide';

    modalContent = document.createElement('div');
    modal.className = 'modal-content';

    document.body.append(modal);
    modal.appendChild(modalContent);
}

function showModal(file: string): void {
    const video = document.createElement('video') as HTMLVideoElement;
    video.style.width = "100%";
    video.style.height = "100%";

    const source = document.createElement('source') as HTMLSourceElement;
    source.src = file;
    source.type = 'video/mp4';

    video.append(source);
    modalContent.appendChild(video);

    modal.className = 'modal show';
    video.play();

    modal.onclick = () => {
        hideModal();
    }
}

function hideModal(): void {
    modalContent.lastChild && modalContent.removeChild(modalContent.lastChild);
    modal.className = 'modal hide';
}

function getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

initContainer();
initImage();
initModal();

window.onload = () => {
    initButtons();
};