import { IpcMain } from 'electron';
import { Folder } from 'electron/common_types';
import { JsonFileManager } from "./JSON_Data";

function generateId() {
    const hrTime = process.hrtime();
    const rid = Buffer.from(hrTime).toString('base64');
    return rid;
}

// types/folderTypes.ts
const FOLDERS_KEY = "assets/configs/folders.json";

const Json_File_Manager = new JsonFileManager(FOLDERS_KEY);


export const getFolders = async (): Promise<Folder[]> => {
    return await Json_File_Manager.readJsonFile() as Folder[];
};

export const getFolderDetails = async (id: string): Promise<Folder> => {
    const folder = (await getFolders()).find((f) => f.id === id);


    // get git data


    return folder as Folder;
};

export const addFolder = async (newFolder: Folder): Promise<Folder[]> => {
    newFolder.id = generateId();
    let folders = (await getFolders());
    folders = [...folders, newFolder];

    await Json_File_Manager.writeJsonFile(folders);
    return folders;
};

export const removeFolder = async (id: string): Promise<Folder[]> => {
    let folders = (await getFolders());
    folders = folders.filter(
        (folder) => folder.id !== id
    );
    await Json_File_Manager.writeJsonFile(folders);
    return folders;
};



export const Setup_ipc_main__folders = (ipcMain: IpcMain) => {

    // Set up IPC handlers for folder operations
    ipcMain.handle('getFolders', async () => {
        return await getFolders();
    });

    ipcMain.handle('addFolder', async (event, folder) => {
        return await addFolder(folder);
    });

    ipcMain.handle('removeFolder', async (event, id) => {
        return await removeFolder(id);
    });

    ipcMain.handle('getFolderDetails', async (event, id) => {
        return await getFolderDetails(id);
    });
}

// See vite-env.d.ts
// See preload/index.ts