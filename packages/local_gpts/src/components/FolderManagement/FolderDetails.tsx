import React, { useEffect, useState } from "react";
import { Folder } from "../../common_types";
import { TS_AnalizerRenderResults } from "./TS_AnalizerRenderResults";

// components/FolderManagement/FolderDetails.js
interface FolderDetailsProps {
  _folder: Folder;
  onRemoveFolder: (fullPath: string) => void;
}

const FolderDetails: React.FC<FolderDetailsProps> = ({
  _folder,
  onRemoveFolder,
}) => {
  // State to hold the selected tsconfig.json file, if applicable
  const [folder, setFolder] = useState(_folder);
  const [directoryType, _setDirectoryType] = useState<"Normal" | "TypeScript">(
    folder.directoryType
  );

  const handleTsConfigChange = async () => {
    try {
      const selectedTsConfigPath = await window.electronAPI.selectTsConfig();

      if (selectedTsConfigPath) {
        setFolder({
          ...folder,
          pathTsConfig: selectedTsConfigPath,
        });
      }
    } catch (err) {
      console.error("Failed to add folder:", err);
    }
  };

  const handleDirectoryTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFolder({
      ...folder,
      directoryType: event.target.value as "Normal" | "TypeScript",
    });
  };

  // Effect to call updateFolder whenever the folder state changes
  useEffect(() => {
    const updateFolderDetails = async () => {
      try {
        // Call the updateFolder method from your Electron API
        await window.electronAPI.updateFolder(folder.id, folder);
      } catch (err) {
        console.error("Failed to update folder:", err);
      }
    };

    // Call the function to update the folder details
    updateFolderDetails();
  }, [folder]); // Only re-run the effect if the folder state changes

  return (
    <div className="w-full p-4 flex flex-col space-y-6">
      <div>
        <h3 className="font-bold">Folder Path:</h3>
        <p>{folder.fullPath}</p>
      </div>

      <button
        className="p-1 bg-red-500 text-white rounded max-w-48 h-12"
        onClick={() => onRemoveFolder(folder.id)}
      >
        Remove
      </button>

      <div>
        <h3 className="font-bold">Directory Type:</h3>

        <p>{folder.directoryType}</p>

        <label htmlFor="directoryTypeSelector" className="font-bold">
          Directory Type:
        </label>
        <select
          id="directoryTypeSelector"
          value={directoryType}
          onChange={handleDirectoryTypeChange}
          className="p-2 rounded border"
          aria-label="Select Directory Type" // Providing an accessible name
        >
          <option value="Normal">Normal</option>
          <option value="TypeScript">TypeScript</option>
        </select>

        {folder.directoryType === "TypeScript" && (
          <div>
            <button
              className="w-full mb-4 p-2 bg-blue-500 text-white rounded"
              onClick={handleTsConfigChange}
            >
              Select TS Config
            </button>
            <h4 className="font-bold">TS Config:</h4>

            <p>Selected Config: {folder.pathTsConfig}</p>
          </div>
        )}

        {folder.directoryType === "TypeScript" &&
          folder.pathTsConfig.length > 0 && (
            <>
              <TS_AnalizerRenderResults folder={folder} />
            </>
          )}
      </div>
      {/* Other Folder details and information goes here */}
    </div>
  );
};

export default FolderDetails;
