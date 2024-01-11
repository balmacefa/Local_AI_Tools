
export interface DirectoryTree {
    name: string;
    children?: DirectoryTree[];
}

export interface GitDetails {
    isRepo: boolean;
    branch?: string;
    recentCommits?: string[];
}

export interface Folder {
    id: string;
    fullPath: string;
    directoryTree: DirectoryTree;
    gitDetails: GitDetails;
}