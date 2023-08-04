import { FC } from "react";
import { File } from "../FileExplorer";
import { useNavigate, useSearchParams } from "react-router-dom";

const FileItem: FC<{ file: File }> = ({ file }) => {
  // const fileInfo = getFileInfo(file.name);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //from api will content if only its a txt file

  const handleOnClick = () => {
    let path = searchParams.get("path");
    if (path) navigate(`?path=${path}/${file.name}`);
    else navigate(`?path=${file.name}`);
  };

  return (
    <div
      onClick={handleOnClick}
      className="tw-border hover:tw-bg-slate-50 hover:tw-cursor-pointer"
    >
      <div className="tw-text-lg tw-text-center">{file.name}</div>
      <div className="tw-shadow">{file.content?.substring(0, 97)}...</div>
    </div>
  );
};

export default FileItem;

// const getFileInfo = (fileName: string) => {
//   if (!fileName) return;
//   let tmp = fileName.split(".");
//   if (tmp.length <= 1) return { name: tmp, fileType: "file" };

//   return {
//     name: tmp[0],
//     extention: tmp[1],
//     fileType: tmp[1] == "txt" ? "textFile" : "file",
//   } as FileInfo;
// };

// interface FileInfo {
//   name: string;
//   extention?: string;
//   fileType: FileType;
// }

// type FileType = "textFile" | "file";
