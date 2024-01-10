// electron/main/folderApi.ts
import type { IpcMain } from 'electron';
import ts_results from 'ts-results';
import { Folder, initDb } from './database';
import { Electron_Error } from './types';

const { Err, Ok } = ts_results;
export type PromiseResolve<R, E> = Promise<ts_results.Result<R, E>>;

export const getFolders = async (): Promise<Folder[]> => {
    console.log('getFolders --------------------')
    const db = await initDb();
    const folders = await db.all<Folder[]>('SELECT * FROM folders');
    return folders;
};

export type Type_getFolders = typeof getFolders;

export const addFolder = async (folder: Omit<Folder, 'id'>): PromiseResolve<number, Electron_Error> => {
    const db = await initDb();
    const result = await db.run(
        'INSERT INTO folders (name, fullPath, directoryTree, gitDetails) VALUES (?, ?, ?, ?)',
        [folder.name, folder.fullPath, JSON.stringify(folder.directoryTree), JSON.stringify(folder.gitDetails)]
    );
    if (typeof result.lastID === 'number') {
        return Ok(result.lastID);
    }
    return Err(new Electron_Error('Failed to add folder', { folder }));
};

export const removeFolder = async (id: number): PromiseResolve<boolean, Electron_Error> => {

    try {
        const db = await initDb();
        await db.run('DELETE FROM folders WHERE id = ?', id);
        return Ok(true);
    } catch (error) {
        const errorMessage = `${error}`;
        return Err(new Electron_Error(errorMessage, { error }));
    }

};

export const getFolderDetails = async (id: number): PromiseResolve<Folder, Electron_Error> => {
    const db = await initDb();
    const folder = await db.get<Folder>('SELECT * FROM folders WHERE id = ?', id);
    if (folder) {
        return Ok(folder);
    }
    return Err(new Electron_Error('Failed to get folder', { id }));
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