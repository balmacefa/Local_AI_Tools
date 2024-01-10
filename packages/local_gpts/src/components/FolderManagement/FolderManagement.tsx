// components/FolderManagement/FolderManagement.js

import React, { useEffect, useState } from "react";
import { Folder } from "../types";
import FolderDetails from "./FolderDetails";
import FolderList from "./FolderList";

const FolderManagement: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderDetails, setFolderDetails] = useState<Folder | null>(null);

  useEffect(() => {
    window.electronAPI
      .getFolders()
      .then((fetchedFolders: React.SetStateAction<Folder[]>) => {
        setFolders(fetchedFolders);
      })
      .catch((err: any) => console.error("Failed to fetch folders:", err));
  }, []);

  const handleFolderSelect = async (folderName: string) => {
    console.log(folderName);
    const folder_details: Folder = await window.electronAPI.getFolderDetails(
      folderName
    );
    setFolderDetails(folder_details);
  };
  const handleAddFolder = async () => {
    // TODO show electro select folder and them save to sqlite
  };
  const handleRemoveFolder = async (folderName: string) => {
    // TODO remove folder and them save to sqlite
    await window.electronAPI.removeFolder(folderName);
    setFolderDetails(null);
    // reload
    window.electronAPI
      .getFolders()
      .then((fetchedFolders: React.SetStateAction<Folder[]>) => {
        setFolders(fetchedFolders);
      })
      .catch((err: any) => console.error("Failed to fetch folders:", err));
  };

  return (
    <>
      <div className="flex flex-row h-screen">
        {/* Sidebar: flex-column, flex-shrink-0, and padding utilities */}
        <div className="flex flex-col flex-shrink-0  bg-slate-100">
          <FolderList
            folders={folders}
            onSelectFolder={handleFolderSelect}
            onAddFolder={handleAddFolder}
          />
        </div>
        <div className="flex flex-col md:flex-row flex-grow overflow-auto">
          {folderDetails && (
            <FolderDetails
              folder={folderDetails}
              onRemoveFolder={handleRemoveFolder}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FolderManagement;
