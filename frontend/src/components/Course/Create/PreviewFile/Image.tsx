const PreviewFileImage = (file: File) => {
  const url = URL.createObjectURL(file)

  return <img src={url} className="h-full w-full rounded object-cover" alt="" />
}

export default PreviewFileImage
