const electron = require("electron");
const { app, BrowserWindow } = electron;

function createWindow() {
  const win = new BrowserWindow({
    frame: false,
    titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      contextIsolation: true,
    },
    fullscreen: true,
  });

  win.loadURL("http://localhost:8080");
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("ready", createWindow);
