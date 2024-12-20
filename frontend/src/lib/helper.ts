export function determineFileType(fileName: string): string {
  const fileExtension: string = fileName.split(".").pop()!.toLowerCase()

  const mapping = {
    docx: "doc",
    txt: "txt",
    png: "image",
    jpg: "image",
  }

  return mapping[fileExtension as keyof typeof mapping] || "Unknown"
}
