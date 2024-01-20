import { promises as fs } from 'fs';

interface JsonData {
    [key: string]: any;
}

export class JsonFileManager {
    private filePath: string;

    constructor(fileName: string) {
        this.filePath = fileName;
    }

    async readJsonFile(): Promise<JsonData> {
        try {

            // this.filePath = join(this.filePath, directory_name);


            // Check if the file exists, create an empty file if not
            await this.ensureFileExists(); // Ensure the file exists before reading

            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading JSON file:', err);
            return {};
        }
    }

    async writeJsonFile(jsonData: JsonData): Promise<void> {
        try {
            await this.ensureFileExists(); // Ensure the file exists before reading

            const data = JSON.stringify(jsonData, null, 2);
            await fs.writeFile(this.filePath, data, 'utf8');
        } catch (err) {
            console.error('Error writing JSON file:', err);
        }
    }


    async ensureFileExists(): Promise<void> {
        try {
            await fs.access(this.filePath, fs.constants.F_OK);
            // File exists, do nothing
        } catch (err) {
            const nodeError = err as NodeJS.ErrnoException; // Type assertion
            if (nodeError.code === 'ENOENT') {
                // File doesn't exist, create it
                await fs.writeFile(this.filePath, '[]', 'utf8');
            } else {
                // If it's not a 'file doesn't exist' error, rethrow it
                throw err;
            }
        }
    }
}
