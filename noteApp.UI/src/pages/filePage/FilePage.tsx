import { FC, useEffect, useMemo, useState } from "react";
import DirectoryLabel from "../fileExplorer/components/DirectoryLabel";
import { File } from "../fileExplorer/FileExplorer";
import { toast } from "react-hot-toast";
import { saveFileContent } from "../../api/folder";
import { useSearchParams } from "react-router-dom";

const FilePage: FC<{ file: File }> = ({ file }) => {
  const [content, setContent] = useState("");
  const userId = useMemo(() => localStorage.getItem("userId"), [localStorage]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setContent(file.content ?? "");
  }, [file]);

  const handleSave = () => {
    toast.promise(
      saveFileContent(
        searchParams.get("path") ?? "Main",
        userId ?? "-1",
        content
      ),
      {
        success: () => {
          return "Saved!";
        },
        error: "Something went wrong!",
        loading: "Saving...",
      }
    );
  };

  return (
    <div className="tw-mx-6 tw-my-2">
      <div className="tw-p-2">
        <DirectoryLabel label={file.name} />
      </div>
      <div className="tw-min-h-[200px] tw-border tw-rounded-md tw-bg-">
        <textarea
          className="tw-w-full focus:tw-outline-none tw-p-4 tw-min-h-[200px] tw-resize-none"
          value={content}
          onChange={(val) => setContent(val.target.value)}
        />
      </div>
      <div className="tw-flex tw-justify-end tw-my-3">
        <button
          className="tw-border tw-py-1.5 tw-px-5 hover:tw-bg-blue-200 tw-bg-blue-100 disabled:tw-bg-blue-50"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FilePage;
