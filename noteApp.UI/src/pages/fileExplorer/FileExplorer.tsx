import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FolderItem from './components/FolderItem'
import DirectoryLabel from './components/DirectoryLabel'

const FileExplorer:FC = () =>
{
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFile, setCurrentFile]:File = useState();
  //console.log(searchParams.get("path"));

  //get from api
  const mockData:Folder =
  {
    name:"main",
    folders:[{name:"currentPlan"}],
    items:[{name:"txtFile.txt"}]
  }

  useEffect(() =>
  {
    setCurrentFile(mockData);
  }, [])

  useEffect(() =>
  {
    let path = searchParams.get('path');
    if(!path) return;
    let pathArr = path.split('/');

    let folderName = pathArr[pathArr.length - 1];

    if(folderName == "main") return;

    let cf = mockData;

    for (let i = 0; i < pathArr.length; i++) {
      const fn = pathArr[i];

      let temp = cf.folders?.find(x=>x.name == fn);
      if(!temp) return;
      cf = temp;
    }

    setCurrentFile(cf);

  }, [searchParams])


  //comes here like this files?path="folder1/folder1.1/folder1.1.1"
  //then interate through and get matched last folder name folder item

  return (
    <div className="tw-bg-white tw-pb-3">
      <div className="tw-p-2">
        <DirectoryLabel label={currentFile?.name}/>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-3">
        {currentFile?.folders?.map((folder,i) => <FolderItem key={`${folder.name}-${i}`} folder={folder}/>)}
      </div>
    </div>
  )
}

export default FileExplorer;


//will always have atleast 1 folder: main
export interface Folder
{
    id?:number
    name:string;
    dateCreated?:string;
    dateModified?:string;
    folders?:Folder[];
    items?:Item[];
}

export interface Item
{
  id?:number;
  dateCreated?:string;
  dateModified?:string;
  name:string;
  content?:string
}
