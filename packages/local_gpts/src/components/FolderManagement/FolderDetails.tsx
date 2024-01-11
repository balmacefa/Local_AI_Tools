import { Folder } from "../types";

// components/FolderManagement/FolderDetails.js
interface FolderDetailsProps {
  folder: Folder;
  onRemoveFolder: (fullPath: string) => void;
}

const FolderDetails: React.FC<FolderDetailsProps> = ({
  folder,
  onRemoveFolder,
}) => {
  return (
    <div className="w-full p-4 flex flex-col space-y-6">
      <div>
        <h3 className="font-bold ">Folder Path:</h3>
        <p className="">{folder.fullPath}</p>
      </div>

      <button
        className="p-1 bg-red-500 text-white rounded max-w-48 h-12"
        onClick={() => onRemoveFolder(folder.id)}
      >
        Remove
      </button>

      <div>
        <h3 className="font-bold ">Git Status:</h3>
        <pre>
          <code>{JSON.stringify(folder.gitDetails, null, 4)}</code>
        </pre>
      </div>

      <div>
        <h3 className="font-bold ">Directory Tree:</h3>
        <pre>
          <code>{JSON.stringify(folder.directoryTree, null, 4)}</code>
        </pre>
      </div>
      {/* Folder details and Git repo information goes here */}
    </div>
  );
};

export default FolderDetails;
