import { appConfig } from "./config";

const image = document.createElement('img') as HTMLImageElement;
image.src = appConfig.mainImage;
image.className = "main-image";

document.body.appendChild(image);

let i = 0;

const timer = setInterval(() => {
    console.log(image.width, window.innerWidth)
    if (i <= image.width - window.innerWidth) {
        image.style.transform = `translateX(${-i}px)`;
        i++;
    }
    else {
        clearInterval(timer);
    }
}, 1);