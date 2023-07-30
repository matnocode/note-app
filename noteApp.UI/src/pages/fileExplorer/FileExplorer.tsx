import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FolderItem from './components/FolderItem'
import FileItem from './components/FileItem'
import DirectoryLabel from './components/DirectoryLabel'

const FileExplorer:FC = () =>
{
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFile, setCurrentFile]:File = useState();
  //console.log(searchParams.get("path"));

  //get from api
  const data:Folder =
  {
    name:"main",
    folders:[
      {name:"currentPlan",
      folders:[
        {name:'nextCurrentPlan'},
        {name:"nextCurrentPlan1.1",
        folders:[
          {name:'nextCurrentPlan1.1.1'}
        ]}
      ]},
      {name:"currentPlan2",
      folders:[
        {name:'nextCurrentPlan2'}
      ]}
    ],
    files:[
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},
      {name:"txtFile.txt",content:"this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng,this is a very long content wow how could i write this on prompt damn i must be good at eberyrtihng"},

    ]
  }

  useEffect(() =>
  {
    setCurrentFile(data);
  }, [])

  useEffect(() =>
  {
    let path = searchParams.get('path');
    if(!path) {setCurrentFile(data); return;}
    let pathArr = path.split('/');

    let folderName = pathArr[pathArr.length - 1];

    if(folderName == "main") return;

    let cf = data;

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
      <div className="tw-mx-2 tw-mt-3 tw-gap-4 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6">
        {currentFile?.files?.map((file,i) => <FileItem key={`${file.name}-${i}`} file={file}/>)}
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
