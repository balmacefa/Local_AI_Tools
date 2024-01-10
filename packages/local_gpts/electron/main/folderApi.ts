// electron/main/folderApi.ts

import { PromiseResolve } from '@balmacefa/function_tool_kit';
import { Err, Ok } from 'ts-results';
import { Folder, initDb } from './database';
import { Electron_Error } from './types';

export const getFolders = async (): Promise<Folder[]> => {
    const db = await initDb();
    const folders = await db.all<Folder[]>('SELECT * FROM folders');
    return folders;
};

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
