import { Folder } from "../pages/fileExplorer/FileExplorer";
import { url } from "./user";

export const getFolder = (path?: string, userId?: string) => {
  return fetch(
    url + `api/folder/getFolder?path=${path ?? "Main"}&userId=${userId}`
  )
    .then((res) => res.json())
    .then((data) => data as Folder);
};

export const addFolder = (path: string, userId: string, folderName: string) => {
  return fetch(
    url +
      `api/folder/addFolder?path=${
        path ?? "Main"
      }&userId=${userId}&folderName=${folderName}`
  );
};
