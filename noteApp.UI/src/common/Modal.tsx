import { FC } from "react";
import React from "react";
import classNames from "classnames";

type Size = "sm" | "lg";

interface Props extends React.PropsWithChildren {
  title: React.ReactNode | string;
  handleCloseClick: () => void;
  handleConfirmClick?: () => void;
  confirmText?: string;
  size?: Size;
}

const Modal: FC<Props> = ({
  title,
  confirmText,
  size,
  handleCloseClick,
  handleConfirmClick,
  children,
}) => {
  //   const ref = useOutsideClick(() => handleCloseClick());

  return (
    <div className="tw-fixed tw-inset-0 tw-z-10 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
      <div
        // ref={ref}
        className={classNames(
          "tw-bg-white tw-max-w-md tw-mx-auto tw-rounded-md tw-overflow-hidden tw-shadow-lg tw-p-6 tw-relative, tw-w-fit"
        )}
      >
        <div className="tw-p-3 tw-border-b tw-border-gray-300 tw-flex tw-gap-4">
          <div
            className={classNames(
              typeof title === "string" && "tw-text-xl tw-font-bold"
            )}
          >
            {title}
          </div>
        </div>
        {children && (
          <div className="tw-modal-body tw-p-3">
            <p>{children}</p>
          </div>
        )}
        <div className="tw-p-3 tw-border-gray-300 tw-flex tw-justify-end">
          <div className="tw-flex tw-gap-4">
            {confirmText && (
              <button
                className="tw-bg-blue-400 hover:tw-bg-blue-500 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded-lg"
                onClick={() => {
                  handleConfirmClick?.();
                }}
              >
                {confirmText}
              </button>
            )}
            <button
              className="tw-bg-red-400 hover:tw-bg-red-500 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded-lg"
              onClick={() => handleCloseClick()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClick = (event: any) => {
      callback();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};

export default Modal;
