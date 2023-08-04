import { FC, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Folder } from "../FileExplorer";
import Modal from "../../../common/Modal";
import { deleteFolder } from "../../../api/folder";
import toast from "react-hot-toast";

const FolderItem: FC<{ folder: Folder; refetch: () => void }> = ({
  folder,
  refetch,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = useMemo(() => localStorage.getItem("userId"), [localStorage]);
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = () => {
    let path = searchParams.get("path");
    if (path) navigate(`?path=${path}/${folder.name}`);
    else navigate(`?path=${folder.name}`);
  };

  const handleDeleteClick = () => {
    toast.promise(
      deleteFolder(
        `${searchParams.get("path")}/${folder.name}`,
        userId ?? "-1"
      ),
      {
        error: (res) => {
          return "Something went wrong! " + res;
        },
        loading: "Deleting ⌛...",
        success: () => {
          refetch();
          return "Deleted!";
        },
      }
    );
  };

  return (
    <>
      <div className="tw-shadow tw-mx-2 hover:tw-bg-slate-200 hover:tw-cursor-pointer tw-bg-slate-50">
        <div className="tw-grid tw-grid-cols-[1fr,4fr,50px] tw-p-2">
          <div className="tw-w-[50px]" onClick={handleOnClick}>
            <img src="https://cdn-icons-png.flaticon.com/512/5994/5994710.png" />
          </div>
          <div className="tw-flex tw-items-center" onClick={handleOnClick}>
            {folder.name}
          </div>
          <button
            className="tw-bg-red-200 hover:tw-bg-red-500 tw-text-white tw-font-bold tw-px-2 tw-rounded-lg"
            onClick={() => setShowModal(true)}
          >
            X
          </button>
        </div>
        <hr />
      </div>
      {showModal && (
        <Modal
          handleCloseClick={() => setShowModal(false)}
          handleConfirmClick={() => handleDeleteClick()}
          title={
            <div className="tw-text-md">
              Are you sure you want to delete folder
              <span className="tw-font-bold"> {folder.name}</span>
            </div>
          }
          confirmText="Yes"
          size="lg"
        />
      )}
    </>
  );
};

export default FolderItem;
