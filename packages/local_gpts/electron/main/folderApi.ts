import { IpcMain } from "electron";
import { JsonFileManager } from "./JSON_Data";

function generateId() {
    const hrTime = process.hrtime();
    const rid = Buffer.from(hrTime).toString('base64');
    return rid;
}

export interface Folder {
    id?: string; // auto-generated
    fullPath: string;
    directoryTree: string; // JSON string
    gitDetails: string; // JSON string
}


// types/folderTypes.ts
const FOLDERS_KEY = "assets/configs/folders.json";

const Json_File_Manager = new JsonFileManager(FOLDERS_KEY);


export const getFolders = async (): Promise<Folder[]> => {
    return await Json_File_Manager.readJsonFile() as Folder[];
};

export const getFolderDetails = async (id: string): Promise<Folder> => {
    const folder = (await getFolders()).find((f) => f.id === id);
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



export const Setup_ipc_main = (ipcMain: IpcMain) => {

    // Set up IPC handlers for folder operations
    ipcMain.handle('get-folders', async () => {
        return await getFolders();
    });

    ipcMain.handle('add-folder', async (event, folder) => {
        return await addFolder(folder);
    });

    ipcMain.handle('remove-folder', async (event, id) => {
        return await removeFolder(id);
    });

    ipcMain.handle('get-folder-details', async (event, id) => {
        return await getFolderDetails(id);
    });
}