import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import DirectoryLabel from "./components/DirectoryLabel";
import FileItem from "./components/FileItem";
import FilePage from "../filePage/FilePage";
import FolderControls from "./components/FolderControls";
import FolderItem from "./components/FolderItem";
import { getFolder } from "../../api/folder";
import { useQuery } from "react-query";

const FileExplorer: FC = () => {
  const [searchParams] = useSearchParams();
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [currentFile, setCurrentFile] = useState<File>();

  const location = useLocation();
  const path = useMemo(() => searchParams.get("path"), [searchParams]);
  const userId = useMemo(() => localStorage.getItem("userId"), [localStorage]);

  const { data, refetch } = useQuery(
    "getFolder",
    () => getFolder(path ?? "", userId ?? ""),
    { enabled: !!userId }
  );

  useEffect(() => {
    setCurrentFolder(data);
  }, [data]);

  useEffect(() => {
    setCurrentFile(undefined);

    if (!data) return;
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
      if (!temp) continue;

      cf = temp;
    }
    if (isFile) setCurrentFile(cf?.files?.find((x) => x.name == folderName));
    else setCurrentFolder(cf);
  }, [location.search, data]);

  if (!data) return <>unauthorized</>;

  return (
    <div className="tw-bg-white tw-pb-3">
      {currentFile === undefined ? (
        <>
          <div className="tw-p-2">
            <DirectoryLabel label={currentFolder?.name ?? ""} />
          </div>
          <FolderControls refetch={() => refetch()} />
          <div className="tw-flex tw-flex-col tw-gap-3">
            {currentFolder?.folders?.map((folder, i) => (
              <FolderItem
                key={`${folder.name}-${i}`}
                folder={folder}
                refetch={() => refetch()}
              />
            ))}
          </div>
          <div className="tw-mx-2 tw-mt-3 tw-gap-4 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6">
            {currentFolder?.files?.map((file, i) => (
              <FileItem
                key={`${file.name}-${i}`}
                file={file}
                refetch={() => refetch()}
              />
            ))}
          </div>
        </>
      ) : (
        <FilePage file={currentFile} refetch={() => refetch()} />
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
