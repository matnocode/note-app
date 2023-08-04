import { FC, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { File } from "../FileExplorer";
import Modal from "../../../common/Modal";
import { deleteFile } from "../../../api/folder";
import { toast } from "react-hot-toast";

const FileItem: FC<{ file: File; refetch: () => void }> = ({
  file,
  refetch,
}) => {
  // const fileInfo = getFileInfo(file.name);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const userId = useMemo(() => localStorage.getItem("userId"), [localStorage]);
  const navigate = useNavigate();

  //from api will content if only its a txt file

  const handleOnClick = () => {
    let path = searchParams.get("path");
    if (path) navigate(`?path=${path}/${file.name}`);
    else navigate(`?path=${file.name}`);
  };

  const deleteFileConfirm = () => {
    toast.promise(
      deleteFile(`${searchParams.get("path")}/${file.name}`, userId ?? "-1"),
      {
        error: (res) => {
          return "Something went wrong! " + res;
        },
        loading: "Deleting ⌛...",
        success: () => {
          refetch();
          setShowModal(false);
          return "Deleted!";
        },
      }
    );
  };

  return (
    <>
      <div className="tw-border">
        <div className="tw-flex tw-justify-between tw-mx-2 tw-shadow">
          <div className="tw-text-lg tw-text-center">{file.name}</div>
          <button
            className="tw-bg-red-200 hover:tw-bg-red-500 tw-text-white tw-font-bold tw-px-2 tw-rounded-lg"
            onClick={() => setShowModal(true)}
          >
            X
          </button>
        </div>
        <div
          className="hover:tw-opacity-75 hover:tw-cursor-pointer tw-min-h-[75%]"
          onClick={handleOnClick}
        >
          {file.content?.substring(0, 97)}...
        </div>
      </div>
      {showModal && (
        <Modal
          handleCloseClick={() => setShowModal(false)}
          handleConfirmClick={() => deleteFileConfirm()}
          title={
            <div className="tw-text-md">
              Are you sure you want to delete file
              <span className="tw-font-bold"> {file.name}</span>
            </div>
          }
          confirmText="Yes"
          size="lg"
        />
      )}
    </>
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
