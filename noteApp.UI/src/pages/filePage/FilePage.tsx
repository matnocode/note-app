import DirectoryLabel from '../fileExplorer/components/DirectoryLabel'

const FilePage:FC<{ file:File }> = ({ file }) =>
{
  return (
    <div>
      <div className="tw-p-2">
        <DirectoryLabel label={file.name}/>
      </div>
      <div>
        {file.content}
      </div>
    </div>)
}

export default FilePage;
