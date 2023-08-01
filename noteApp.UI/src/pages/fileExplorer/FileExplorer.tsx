import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FolderItem from "./components/FolderItem";
import FileItem from "./components/FileItem";
import DirectoryLabel from "./components/DirectoryLabel";
import FilePage from "../filePage/FilePage";
import { useQuery } from "react-query";
import { addFolder, getFolder } from "../../api/folder";
import { toast } from "react-hot-toast";

const FileExplorer: FC = () => {
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState<any>();
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
  const [newFolderName, setNewFolderName] = useState<string | undefined>(
    undefined
  );

  const path = useMemo(() => searchParams.get("path"), [searchParams]);
  const userId = useMemo(
    () => sessionStorage.getItem("userId"),
    [sessionStorage]
  );

  const { data, refetch } = useQuery(
    "getFolder",
    () => getFolder(path ?? "", userId ?? ""),
    { enabled: !!userId }
  );

  useEffect(() => {
    setCurrentFolder(data);
  }, [data]);

  useEffect(() => {
    if (!path) {
      setCurrentFile(undefined);
      setCurrentFolder(data);
      return;
    }
    let pathArr = path.split("/");

    let folderName = pathArr[pathArr.length - 1];
    let isFile = folderName?.split(".").length > 1;

    if (pathArr.length == 1 && isFile) {
      setCurrentFile(data?.files?.find((x) => x.name == folderName));
      return;
    }

    let cf = data;

    for (let i = 0; i < pathArr.length; i++) {
      const fn = pathArr[i];

      let temp = cf?.folders?.find((x) => x.name == fn);
      if (!temp) return;

      cf = temp;
    }

    if (isFile) setCurrentFile(cf?.files?.find((x) => x.name == folderName));
    else setCurrentFolder(cf);
  }, [searchParams]);

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

  //comes here like this files?path="folder1/folder1.1/folder1.1.1"
  //then interate through and get matched last folder name folder item

  return (
    <div className="tw-bg-white tw-pb-3">
      {currentFile == undefined ? (
        <>
          <div className="tw-p-2">
            <DirectoryLabel label={currentFolder?.name ?? ""} />
          </div>
          <div className="tw-mx-2 tw-flex tw-flex-row tw-gap-3">
            <div className="">
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
              {errors && errors.folderRequired && (
                <div className="tw-text-xs tw-text-red-500 tw-p-x-2">
                  {errors.folderRequired}
                </div>
              )}
            </div>
            <button
              className="tw-border tw-px-4 hover:tw-bg-blue-200 tw-bg-blue-100 disabled:tw-bg-blue-50"
              onClick={handleAddFolderCommand}
            >
              Create folder
            </button>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-3">
            {currentFolder?.folders?.map((folder, i) => (
              <FolderItem key={`${folder.name}-${i}`} folder={folder} />
            ))}
          </div>
          <div className="tw-mx-2 tw-mt-3 tw-gap-4 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6">
            {currentFolder?.files?.map((file, i) => (
              <FileItem key={`${file.name}-${i}`} file={file} />
            ))}
          </div>
        </>
      ) : (
        <FilePage file={currentFile} />
      )}
    </div>
  );
};

export default FileExplorer;

//will always have atleast 1 folder: main
export interface Folder {
  id?: number;
  name: string;
  dateCreated?: string;
  dateModified?: string;
  folders?: Folder[];
  files?: File[];
}

export interface File {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  name: string;
  content?: string;
}
