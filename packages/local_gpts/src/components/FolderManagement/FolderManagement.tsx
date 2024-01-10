// components/FolderManagement/FolderManagement.js

import React, { useEffect, useState } from "react";
import { Folder, getFolderDetails, getFolders, removeFolder } from "./API";
import FolderDetails from "./FolderDetails";
import FolderList from "./FolderList";

const FolderManagement: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderDetails, setFolderDetails] = useState<Folder | null>(null);

  useEffect(() => {
    getFolders().then(setFolders);
  }, []);

  const handleFolderSelect = async (folderName: string) => {
    console.log(folderName);
    const folder_details = await getFolderDetails(folderName);
    setFolderDetails(folder_details);
  };
  const handleAddFolder = async () => {
    // TODO show electro select folder and them save to sqlite
  };
  const handleRemoveFolder = async (folderName: string) => {
    // TODO remove folder and them save to sqlite
    const folder_details = await removeFolder(folderName);
    setFolders(folder_details);
    setFolderDetails(null);
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
