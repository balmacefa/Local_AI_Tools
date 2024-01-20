import { IpcMain } from 'electron';
import { Folder } from 'electron/common_types';
import { JsonFileManager } from "./JSON_Data";

function generateId() {
    const hrTime = process.hrtime();
    const rid = Buffer.from(hrTime).toString('base64');
    return rid;
}

// types/folderTypes.ts
const FOLDERS_KEY = "assets/configs/folders_list.json";

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

export const updateFolder = async (id: string, updatedFolderData: Folder): Promise<Folder[]> => {
    console.log('Trying to update folder with id', id);
    let folders = await getFolders();
    const folderIndex = folders.findIndex(folder => folder.id === id);
    if (folderIndex === -1) {
        throw new Error('Folder not found');
    }

    const currentFolderData = folders[folderIndex];

    // Check if the updated data is different from the current data
    const isDataChanged = JSON.stringify(currentFolderData) !== JSON.stringify({ ...currentFolderData, ...updatedFolderData });
    if (!isDataChanged) {
        console.log('No changes');
        // No change in the data, skip the file write
        return folders;
    }

    // Update the folder details
    folders[folderIndex] = { ...currentFolderData, ...updatedFolderData };

    await Json_File_Manager.writeJsonFile(folders);
    console.log('Update succeded!', id);
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

    ipcMain.handle('updateFolder', async (event, id, updatedFolderData) => {
        return await updateFolder(id, updatedFolderData);
    });
}
// See main/index.ts
// See vite-env.d.ts
// See preload/index.ts