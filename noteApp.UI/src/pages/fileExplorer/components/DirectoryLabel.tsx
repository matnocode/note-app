import { FC } from "react";

const DirectoryLabel: FC<{ label: string }> = ({ label }) => {
  return (
    <h1 className="tw-text-2xl tw-font-serif tw-text-center tw-border tw-shadow tw-mx-auto tw-py-2 hover:tw-bg-slate-50 hover:tw-cursor-pointer">
      {label}
    </h1>
  );
};

export default DirectoryLabel;
