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
            fs.access(this.filePath, fs.constants.F_OK)
                .then(() => {
                    // File exists, do nothing
                })
                .catch((err) => {
                    if (err.code === 'ENOENT') {
                        // File doesn't exist, create it
                        fs.writeFile(this.filePath, '{}', 'utf8')
                            .then(() => {
                                console.log(`JSON file  created`);
                            })
                            .catch((err) => {
                                console.error('Error creating JSON file:', err);
                            });
                    } else {
                        console.error('Error accessing file:', err);
                    }
                });


            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading JSON file:', err);
            return {};
        }
    }

    async writeJsonFile(jsonData: JsonData): Promise<void> {
        try {
            const data = JSON.stringify(jsonData, null, 2);
            await fs.writeFile(this.filePath, data, 'utf8');
        } catch (err) {
            console.error('Error writing JSON file:', err);
        }
    }
}
