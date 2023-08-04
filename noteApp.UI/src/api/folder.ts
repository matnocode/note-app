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

export const addFile = (path: string, userId: string, fileName: string) => {
  return fetch(
    url +
      `api/folder/addFile?path=${
        path ?? "Main"
      }&userId=${userId}&fileName=${fileName}`
  );
};

export const saveFileContent = (
  path: string,
  userId: string,
  content: string
) => {
  return fetch(url + `api/folder/saveFileContent`, {
    method: "PUT",
    body: JSON.stringify({ path, userId, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
