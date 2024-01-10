// components/FolderManagement/FolderList.js

import { Folder } from "./API";

interface FolderListProps {
  folders: Folder[];
  onSelectFolder: (folderName: string) => void;
  onAddFolder: () => void; // New prop for adding a folder
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onSelectFolder,
  onAddFolder,
}) => {
  // Mock data - replace this with real data from your backend
  return (
    <div className="p-4">
      <button
        className="w-full mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={onAddFolder}
      >
        Add Folder
      </button>

      <ul className="list-disc overflow-auto">
        {folders.map((folder, index) => (
          <li
            key={index}
            className="cursor-pointer"
            onClick={() => onSelectFolder(folder.name)}
          >
            <p>{folder.name}</p>
            <p className="text-sm">{folder.fullPath}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
