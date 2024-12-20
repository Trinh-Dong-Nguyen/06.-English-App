import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Text, TextField, Button } from "@radix-ui/themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUploading from "react-images-uploading"
import { UploadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router"
import { useEffect, useMemo, useState } from "react"
import { ImageType } from "react-images-uploading/dist/typings"
import { useCourseCategory } from "@/features/course/hooks"
import generateFroalaConfig from "@/config/froala.config"
import FroalaEditorComponent from "@/components/Layout/Components/ui/FroalaEditorComponent"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { courseApi, fileApi } from "@/apis"
import { toast } from "react-toastify"
import LoadingScreen from "@/components/Layout/loadingScreen"

const formSchema = z.object({
  title: z.string().min(1, "Vui lòng điền vào chỗ trống"),
  price: z.number().min(1, "Vui lòng điền vào chỗ trống"),
  description: z.string().min(1, "Vui lòng điền vào chỗ trống"),
})

type CreateCourseDTO = z.infer<typeof formSchema>

export default function CourseCreate() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [images, setImages] = useState<Array<ImageType>>([])
  const [imageUrl, setImageUrl] = useState<string>("")
  console.log("images", images)
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const { data: categoryData } = useCourseCategory()
  console.log("categoryData", categoryData)
  const onChange = async (imageList: Array<ImageType>) => {
    const contentType = imageList[0].file?.type || "image/jpeg"
    console.log("contentType", imageList[0].file?.type)
    const getPreUrl = await fileApi.getPresignedUrl(contentType, "png")
    console.log("getPreUrl", getPreUrl)
    if (getPreUrl?.data.preSignedUrl && imageList[0].file) {
      const uploadFile = await fileApi.uploadFile(getPreUrl?.data.preSignedUrl, imageList[0].file)
      setImages(imageList)
      console.log("uploadFile", uploadFile)
      setImageUrl(getPreUrl?.data.key)
    }
  }

  function goBack() {
    navigate(-1)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCourseDTO>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: undefined,
      description: "",
    },
  })

  useEffect(() => {
    if (description) {
      setValue("description", description)
    }
  }, [description, setValue])

  const CreateCourse = useMutation({
    mutationFn: courseApi.CreateCourse,
    onSuccess: (Res) => {
      if (Res?.message === "Course created") {
        toast.success(`${Res.message}`)
        queryClient.invalidateQueries({ queryKey: ["courseByTeacher"] })
        navigate("/course")
      } else {
        toast.error(`Error ${Res?.statusCode}: ${Res?.message}`)
      }
    },
    onError: () => {
      toast.error("Something error")
    },
  })

  function onSubmit(values: CreateCourseDTO) {
    console.log("onSubmit", values)
    const data = {
      title: values.title,
      price: values.price,
      description: values.description,
      state: "DRAFT",
      categoryId: category,
      thumbnail_image: imageUrl,
    }
    CreateCourse.mutate(data)
  }

  return (
    <div className="p-3">
      {CreateCourse.isPending ? <LoadingScreen message="Đang tạo khóa học..." /> : null}
      <div className="mb-8 text-2xl font-semibold text-blue-700">Course information</div>
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div>
            <label>
              <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root type="text" {...register("title")} placeholder="Enter your course title" size="3" />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </label>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6">
              <label>
                <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
                  Price
                </Text>
                <TextField.Root
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Enter price"
                  size="3"
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              </label>
              <label>
                <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
                  Category
                </Text>
                <div className="flex w-full flex-col">
                  <Select key="category" onValueChange={(value) => setCategory(value)}>
                    <div className="flex w-full space-x-3">
                      <SelectTrigger className="h-10 !w-full !cursor-pointer rounded-md border-[1.5px] border-slate-300 bg-white text-base !font-normal text-black">
                        <SelectValue placeholder="Chọn danh mục"></SelectValue>
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      {categoryData &&
                        "data" in categoryData &&
                        Array.isArray(categoryData.data) &&
                        categoryData?.data.map((i) => (
                          <SelectItem
                            className="text-sm text-black hover:text-navTitle focus:text-navTitle"
                            key={i.id}
                            value={i.id}
                          >
                            {i.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
              Description
            </Text>
            <FroalaEditorComponent
              tag="textarea"
              config={froalaConfig}
              model={description}
              onModelChange={(e: string) => setDescription(e)}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
        </div>
        <div className="flex h-full flex-col">
          {/* <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
            Upload
          </Text>
          <div className="flex flex-1 flex-col items-center justify-center rounded-md border-2 border-dashed border-zinc-400 transition hover:border-blue-700 cursor-pointer hover:bg-blue-50">
            <UploadIcon height={48} width={48} color="#1d4ed8" />
            <Text className="mt-3 text-2xl text-blue-700">Upload</Text>
          </div> */}
          <div className="shadow-around h-full w-full rounded-xl bg-white pb-8">
            <p className="mb-2 text-base font-bold tracking-wide text-zinc-700">Thumbnail</p>
            <ImageUploading multiple={false} value={images} onChange={onChange} dataURLKey="data_url">
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                // onImageUpdate,
                // onImageRemove,
                // isDragging,
                dragProps,
              }) => (
                <div className="h-full w-full justify-center">
                  {imageList.length === 0 ? (
                    <div
                      onClick={onImageUpload}
                      {...dragProps}
                      className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[--primary-color] bg-orange-50 hover:bg-orange-200/30"
                    >
                      <div className="flex h-full flex-col items-center justify-center">
                        <UploadIcon height={48} width={48} color="#1d4ed8" />
                        <p className="font-light text-black/40">Drag & drop or choose from file</p>
                      </div>
                    </div>
                  ) : (
                    imageList.map((image, index) => (
                      <>
                        <div
                          key={index}
                          className="flex max-h-[705px] w-full items-start justify-center overflow-hidden rounded-xl border-black p-5"
                        >
                          <img className="h-full w-full rounded-lg object-contain" src={image["data_url"]} alt="" />
                        </div>
                        <div className="flex w-full justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              console.log("onImageRemoveAll", onImageRemoveAll)
                              onImageRemoveAll()
                              setImages([])
                            }}
                            className="mb-5 rounded-xl border bg-red-600 px-10 py-2 font-extralight text-white hover:bg-red-800 hover:text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    ))
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <div className="text-right">
          <Button variant="outline" size="3" onClick={goBack}>
            Cancel
          </Button>
        </div>
        <div>
          <Button variant="solid" size="3" className="cursor-pointer" type="submit">
            Save & Continue{" "}
          </Button>
        </div>
      </form>
    </div>
  )
}
