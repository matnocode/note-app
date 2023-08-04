import { FC, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { addFile, addFolder } from "../../../api/folder";
import { useSearchParams } from "react-router-dom";

type CreateFileType = "txt";

interface Props {
  refetch: () => void;
}

const FolderControls: FC<Props> = ({ refetch }) => {
  const [newFolderName, setNewFolderName] = useState<string | undefined>(
    undefined
  );
  const [newFileName, setNewFileName] = useState<string | undefined>(undefined);
  const [selectedFileType, setSelectedFileType] =
    useState<CreateFileType>("txt");
  const [searchParams] = useSearchParams();
  const userId = useMemo(() => localStorage.getItem("userId"), [localStorage]);
  const [errors, setErrors] = useState<any>();

  const handleAddFolderCommand = () => {
    if (!newFolderName) {
      setErrors({ folderRequired: "folder name is required!" });
      return;
    }

    toast.promise(
      addFolder(
        searchParams.get("path") ?? "Main",
        userId ?? "-1",
        newFolderName ?? ""
      ),
      {
        success: () => {
          refetch();
          setNewFolderName(undefined);
          return "Created new Folder!";
        },
        error: "Something went wrong!",
        loading: "Creating Folder",
      }
    );
  };

  const handleAddFileCommand = () => {
    if (!newFileName) {
      setErrors({ fileRequired: "file name is required!" });
      return;
    }

    let fileName = newFileName;

    if (selectedFileType == "txt") fileName += ".txt";

    toast.promise(
      addFile(searchParams.get("path") ?? "Main", userId ?? "-1", fileName),
      {
        success: () => {
          refetch();
          setNewFileName(undefined);
          return "Created new File!";
        },
        error: "Something went wrong!",
        loading: "Creating File",
      }
    );
  };

  return (
    <div className=" tw-mx-3 tw-mb-7 tw-mt-1 tw-flex tw-flex-col tw-items-end tw-gap-3">
      <div className="tw-grid tw-grid-cols-[1fr,1fr,130px] tw-gap-3">
        {errors?.folderRequired ? (
          <div className="tw-text-xs tw-text-red-500 tw-p-x-2">
            {errors.folderRequired}
          </div>
        ) : (
          <div></div>
        )}

        <input
          value={newFolderName}
          onChange={(val) => {
            setErrors(undefined);
            setNewFolderName(val.target.value);
          }}
          type="text"
          className="tw-bg-red-100 focus:tw-outline-none tw-p-1 tw-shadow"
          placeholder="new folder name"
        />

        <button
          className="tw-border tw-px-4 hover:tw-bg-blue-200 tw-bg-blue-100 disabled:tw-bg-blue-50"
          onClick={handleAddFolderCommand}
        >
          Create folder
        </button>
      </div>
      <div className="tw-grid tw-grid-cols-[1fr,1fr,1fr,130px] tw-gap-3">
        {errors?.fileRequired ? (
          <div className="tw-text-xs tw-text-red-500 tw-p-x-2">
            {errors.fileRequired}
          </div>
        ) : (
          <div />
        )}
        <select
          onChange={(v) =>
            setSelectedFileType(v.target.value as CreateFileType)
          }
          value={selectedFileType}
        >
          <option value="txt">Text File</option>
        </select>
        <input
          value={newFileName}
          onChange={(val) => {
            setErrors(undefined);
            setNewFileName(val.target.value);
          }}
          type="text"
          className="tw-bg-red-100 focus:tw-outline-none tw-p-1 tw-shadow"
          placeholder="new file name"
        />

        <button
          className="tw-border tw-px-4 hover:tw-bg-blue-200 tw-bg-blue-100 disabled:tw-bg-blue-50"
          onClick={handleAddFileCommand}
        >
          Create file
        </button>
      </div>
    </div>
  );
};

export default FolderControls;
