import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FolderItem from './components/FolderItem'
import FileItem from './components/FileItem'
import DirectoryLabel from './components/DirectoryLabel'
import FilePage from '../filePage/FilePage'

const FileExplorer:FC = () =>
{
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFolder, setCurrentFolder]:Folder = useState();
  const [currentFile, setCurrentFile]:File = useState(undefined);
  //console.log(searchParams.get("path"));

  //get from api
  const data:Folder =
  {
    name:"main",
    folders:[
      {name:"currentPlan",
      folders:[
        {name:'nextCurrentPlan'},
        {name:"nextCurrentPlan11",
        folders:[
          {name:'nextCurrentPlan111'}
        ]}
      ]},
      {name:"currentPlan2",
      folders:[
        {name:'nextCurrentPlan2'}
      ]}
    ],
    files:[
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile1.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile2.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile3.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile4.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile5.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile6.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile7.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},

    ]
  }

  useEffect(() =>
  {
    setCurrentFolder(data);
  }, [])

  useEffect(() =>
  {
    let path = searchParams.get('path');
    if(!path)
    {
      setCurrentFile(undefined);
      setCurrentFolder(data);
      return;}
    let pathArr = path.split('/');

    let folderName = pathArr[pathArr.length - 1];
    let isFile = folderName?.split(".").length > 1;

    if(pathArr.length == 1 && isFile)
    {
      setCurrentFile(data.files?.find(x => x.name == folderName));
      return;
    }

    let cf = data;

    for (let i = 0; i < pathArr.length; i++) {
      const fn = pathArr[i];

      let temp = cf.folders?.find(x=>x.name == fn);
      if(!temp) return;

      cf = temp;
    }

    if(isFile)
      setCurrentFile(cf.files?.find(x => x.name == folderName))
    else
      setCurrentFolder(cf);

  }, [searchParams])


  //comes here like this files?path="folder1/folder1.1/folder1.1.1"
  //then interate through and get matched last folder name folder item

  return (
    <div className="tw-bg-white tw-pb-3"> { currentFile == undefined ?
      <>
        <div className="tw-p-2">
          <DirectoryLabel label={currentFolder?.name}/>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-3">
            {currentFolder?.folders?.map((folder,i) => <FolderItem key={`${folder.name}-${i}`} folder={folder}/>)}
          </div>
          <div className="tw-mx-2 tw-mt-3 tw-gap-4 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6">
            {currentFolder?.files?.map((file,i) => <FileItem key={`${file.name}-${i}`} file={file}/>)}
            </div>
      </> : <FilePage file={currentFile} />}
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
    files?:File[];
}

export interface File
{
  id?:number;
  dateCreated?:string;
  dateModified?:string;
  name:string;
  content?:string
}
