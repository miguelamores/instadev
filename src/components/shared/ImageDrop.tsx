import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

const ImageDrop = () => {
  const [file, setFile] = useState<File[]>()
  const [fileUrl, setFileUrl] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles[0])
      setFile(acceptedFiles)
      const objUrl = URL.createObjectURL(acceptedFiles[0])
      console.log(objUrl)
      setFileUrl(objUrl)
    },
    [file]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileUrl} alt='image' className='' />
          </div>
          <p className=''>Click or drag photo to replace</p>
        </>
      ) : (
        <div className=''>
          <img
            src='/assets/icons/file-upload.svg'
            width={96}
            height={77}
            alt='file upload'
          />
          <h3 className='mb-2 mt-6'>Drag photo here</h3>
          <p className='mb-6'>SVG, PNG, JPG</p>

          <Button type='button' className='shad-button_dark_4'>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}

export default ImageDrop
