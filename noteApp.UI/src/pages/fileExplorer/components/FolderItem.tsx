import { FC } from "react";
import { Folder } from "../FileExplorer";
import { useNavigate, useSearchParams } from "react-router-dom";

const FolderItem: FC<{ folder: Folder }> = ({ folder }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOnClick = () => {
    let path = searchParams.get("path");
    if (path) navigate(`?path=${path}/${folder.name}`);
    else navigate(`?path=${folder.name}`);
  };

  return (
    <div
      className="tw-shadow tw-mx-2 hover:tw-bg-slate-200 hover:tw-cursor-pointer tw-bg-slate-50"
      onClick={handleOnClick}
    >
      <div className="tw-grid tw-grid-cols-[1fr,2fr,1fr] tw-p-2">
        <div className="tw-w-[50px]">
          <img src="https://cdn-icons-png.flaticon.com/512/5994/5994710.png" />
        </div>
        <div className="tw-flex tw-items-center">{folder.name}</div>
      </div>
      <hr />
    </div>
  );
};

export default FolderItem;
