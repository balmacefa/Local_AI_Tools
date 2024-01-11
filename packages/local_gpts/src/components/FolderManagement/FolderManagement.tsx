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
    try {
      const selectedFolderPath = await window.electronAPI.selectFolder();

      if (selectedFolderPath) {
        // Assuming you have a method to add a folder to your database
        // For example, something like this:
        const pathParts = selectedFolderPath.path.split(/[/\\]/); // Split on both forward and backward slashes
        const folderName = pathParts[pathParts.length - 1];

        await window.electronAPI.addFolder({
          name: folderName, // You might want to extract the name from the path
          fullPath: selectedFolderPath,
          directoryTree: {}, // Populate this based on your requirements
          gitDetails: {}, // Populate this based on your requirements
        });

        // Refresh the folder list after adding the new folder
        const updatedFolders = await window.electronAPI.getFolders();
        setFolders(updatedFolders);
      }
    } catch (err) {
      console.error("Failed to add folder:", err);
    }
  };

  const handleRemoveFolder = async (folderName: string) => {
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
