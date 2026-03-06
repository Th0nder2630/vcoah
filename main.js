const { app, BrowserWindow, ipcMain, screen, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let overlayWin, dashboardWin, tray;

function createOverlay() {
  overlayWin = new BrowserWindow({
    width: 320,
    height: 520,
    x: 20,
    y: 60,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focusable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  overlayWin.setAlwaysOnTop(true, 'screen-saver');
  overlayWin.setVisibleOnAllWorkspaces(true);
  overlayWin.setIgnoreMouseEvents(true, { forward: true });
  overlayWin.loadFile('src/overlay.html');
}

function createDashboard() {
  dashboardWin = new BrowserWindow({
    width: 900,
    height: 640,
    minWidth: 800,
    minHeight: 580,
    frame: false,
    transparent: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0a0c12',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  dashboardWin.loadFile('src/dashboard.html');
  dashboardWin.on('close', (e) => {
    e.preventDefault();
    dashboardWin.hide();
  });
}

app.whenReady().then(() => {
  createOverlay();
  createDashboard();

  // Tray icon
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  tray.setToolTip('VCOACH - Valorant Coach');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Dashboard', click: () => dashboardWin.show() },
    { label: 'Toggle Overlay', click: () => {
      if (overlayWin.isVisible()) overlayWin.hide(); else overlayWin.show();
    }},
    { type: 'separator' },
    { label: 'Quit', click: () => { app.exit(0); } }
  ]));
  tray.on('click', () => dashboardWin.show());
});

// IPC
ipcMain.on('overlay-update', (e, data) => {
  overlayWin?.webContents.send('update', data);
});

ipcMain.on('close-dashboard', () => dashboardWin.hide());
ipcMain.on('minimize-dashboard', () => dashboardWin.minimize());
ipcMain.on('toggle-overlay', (e, visible) => {
  if (visible) overlayWin.show(); else overlayWin.hide();
});
ipcMain.on('set-overlay-pos', (e, pos) => {
  overlayWin?.setPosition(pos.x, pos.y);
});
ipcMain.on('set-overlay-opacity', (e, val) => {
  overlayWin?.setOpacity(val);
});
ipcMain.on('set-clickthrough', (e, val) => {
  overlayWin?.setIgnoreMouseEvents(val, { forward: true });
});

app.on('window-all-closed', () => {});
