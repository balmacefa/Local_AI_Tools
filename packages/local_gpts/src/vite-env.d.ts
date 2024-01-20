/// <reference types="vite/client" />

interface ElectronAPI {
  getFolders: () => Promise<any[]>;
  addFolder: (folder: any) => Promise<any>;
  removeFolder: (id: string) => Promise<any>;
  getFolderDetails: (id: string) => Promise<any>;
  selectFolder: () => Promise<any>;
  selectTsConfig: () => Promise<any>;
  updateFolder: (id: string, folder: any) => Promise<any>;
}


interface Window {
  electronAPI: ElectronAPI;
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
