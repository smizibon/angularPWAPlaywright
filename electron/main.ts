import { app, BrowserWindow } from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  const devUrl = process.env.ANGULAR_DEV_SERVER_URL;

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (devUrl) {
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the Angular build output.
    // When running locally (not packaged), this resolves to: dist/demo-chat-app/browser/index.html
    // When packaged via electron-builder, the same relative path exists inside the app bundle.
    const indexPath = path.join(__dirname, '../dist/demo-chat-app/browser/index.html');
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});