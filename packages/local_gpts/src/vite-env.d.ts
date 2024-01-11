/// <reference types="vite/client" />

interface ElectronAPI {
  getFolders: () => Promise<any[]>;
  addFolder: (folder: any) => Promise<any>;
  removeFolder: (id: string) => Promise<void>;
  getFolderDetails: (id: string) => Promise<any>;
  selectFolder: () => Promise<any>;
}


interface Window {
  electronAPI: ElectronAPI;
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
