
export interface DirectoryTree {
    name: string;
    children?: DirectoryTree[];
}

export interface GitDetails {
    isRepo: boolean;
    branch?: string;
    recentCommits?: string[];
}

export interface BaseFolder {
    id: string; // auto-generated
    fullPath: string;
    directoryType: 'Normal' | 'TypeScript'; // JSON string
    enableGitTools: boolean;
    pathTsConfig: string;
}



export type Folder = BaseFolder;
