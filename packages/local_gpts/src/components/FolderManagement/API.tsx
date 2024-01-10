// types/folderTypes.ts

import { Folder } from "../types";

let dummyFolders: Folder[] = [
  {
    name: "Project Alpha",
    fullPath: "/user/projects/project-alpha",
    directoryTree: {
      name: "project-alpha",
      children: [
        { name: "src", children: [{ name: "index.js" }, { name: "App.js" }] },
        { name: "public", children: [{ name: "index.html" }] },
        { name: ".gitignore" },
      ],
    },
    gitDetails: {
      isRepo: true,
      branch: "main",
      recentCommits: ["Initial commit", "Add README"],
    },
  },
  {
    name: "Project Beta",
    fullPath: "/user/projects/project-beta",
    directoryTree: {
      name: "project-beta",
      children: [
        { name: "src", children: [{ name: "main.py" }] },
        { name: "requirements.txt" },
      ],
    },
    gitDetails: {
      isRepo: false,
    },
  },
  // ... more folders
];

export const getFolders = (): Promise<Folder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyFolders), 500);
  });
};

export const getFolderDetails = (folderName: string): Promise<Folder> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const folder = dummyFolders.find((f) => f.name === folderName);
      folder ? resolve(folder) : reject(new Error("Folder not found"));
    }, 500);
  });
};

export const addFolder = (newFolder: Folder): Promise<Folder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyFolders = [...dummyFolders, newFolder];
      resolve(dummyFolders);
    }, 500);
  });
};

export const removeFolder = (folderName: string): Promise<Folder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyFolders = dummyFolders.filter(
        (folder) => folder.name !== folderName
      );
      resolve(dummyFolders);
    }, 500);
  });
};
