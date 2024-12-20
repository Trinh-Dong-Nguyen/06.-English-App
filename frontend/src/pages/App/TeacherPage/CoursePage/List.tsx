import { TextField, Flex, Tabs, Button, Text } from "@radix-ui/themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlassIcon, PlusIcon, ArrowTopRightIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router"
import PaginationSearchResult from "@/components/ui/paginationSearch"
// import { Pagination } from "@/type"
import { useEffect, useMemo, useState } from "react"
import { useCourseCategory, useCourseTeacher } from "@/features/course/hooks"
import { Course } from "@/type/course"
import { courseApi } from "@/apis"
import { toast } from "react-toastify"
import _ from "lodash"
import { useDispatch } from "react-redux"
import { useCourseSlice } from "@/features/course/store"
import LoadingScreen from "@/components/Layout/loadingScreen"
import { AnimatePresence, motion } from "framer-motion"
import { useUserSlice } from "@/features/user/store"

export default function CourseList() {
  const navigate = useNavigate()
  // const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 5 })
  // const selectPage = (page: number) => {
  //   setPagination({ ...pagination, page: page })
  // }
  const parent = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  const dispatch = useDispatch()
  const { actions: courseActions } = useCourseSlice()
  const { actions: userActions } = useUserSlice()
  const [page, setPage] = useState<number>(0)
  const [query, setQuery] = useState<string>("")
  const [currentPageOffset, setCurrentPageOffset] = useState<number>(1)
  const { data: courseList, refetch: refetchCourse, isLoading } = useCourseTeacher()
  console.log("courseList", courseList)
  useEffect(() => {
    if (isLoading) {
      dispatch(userActions.updateHanding(true))
    } else if (!isLoading) {
      dispatch(userActions.updateHanding(false))
    }
  }, [dispatch, isLoading, userActions])
  const [category, setCategory] = useState<string>("all")
  const { data: categories } = useCourseCategory()
  const [paginationDraftArr, setPaginationDraftArr] = useState<Course[]>(
    courseList?.data.filter((course) => course.state === "DRAFT") || [],
  )
  const [paginationPublishedArr, setPaginationPublishedArr] = useState<Course[]>(
    courseList?.data.filter((course) => course.state === "PUBLISHED") || [],
  )

  const currentDraftItems = useMemo(() => {
    let fakeCourseList = courseList?.data
    const endOffset = page + 5
    const orderList = _.orderBy(fakeCourseList, ["state"], ["asc"]).filter((course) => course.state === "DRAFT")
    if (fakeCourseList) {
      fakeCourseList = orderList.slice(page, endOffset)
      console.log("fakeCourseList", fakeCourseList)
      if (query !== "") {
        fakeCourseList = fakeCourseList.filter((course) => {
          const title = course.title.normalize().toLowerCase()
          const keywords = query.normalize().toLowerCase().split(" ")
          const isMatch = keywords.every((keyword) => title.includes(keyword))
          return isMatch
        })
      }
      if (category) {
        fakeCourseList = fakeCourseList.filter((course) => {
          if (category === "all") return true
          return course.categoryName === category
        })
      }
    }
    if (query !== "" || category !== "all") {
      setPaginationDraftArr(fakeCourseList || [])
    } else {
      setPaginationDraftArr(orderList || [])
    }
    return fakeCourseList
  }, [category, courseList?.data, page, query])
  console.log("currentDraftItems", currentDraftItems)
  const currentPublishedItems = useMemo(() => {
    let fakeCourseList = courseList?.data
    const endOffset = page + 5
    const orderList = _.orderBy(fakeCourseList, ["state"], ["asc"]).filter((course) => course.state === "PUBLISHED")
    if (fakeCourseList) {
      fakeCourseList = orderList.slice(page, endOffset)
      if (query !== "") {
        fakeCourseList = fakeCourseList.filter((course) => {
          const title = course.title.normalize().toLowerCase()
          const keywords = query.normalize().toLowerCase().split(" ")
          const isMatch = keywords.every((keyword) => title.includes(keyword))
          return isMatch
        })
      }
      if (category) {
        fakeCourseList = fakeCourseList.filter((course) => {
          if (category === "all") return true
          return course.categoryName === category
        })
      }
    }
    if (query !== "" || category !== "all") {
      setPaginationPublishedArr(fakeCourseList || [])
    } else {
      setPaginationPublishedArr(orderList || [])
    }
    return fakeCourseList
  }, [category, courseList?.data, page, query])
  console.log("courseList", courseList, currentDraftItems, currentPublishedItems, paginationDraftArr)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const gotoCreate = () => {
    navigate("/course/create")
  }
  return (
    <div className="flex-1 bg-white p-3">
      <AnimatePresence>{isLoading ? <LoadingScreen /> : null}</AnimatePresence>
      <div className="mb-6 grid grid-cols-12 gap-3">
        <div className="col-span-4">
          <TextField.Root onChange={(e) => setQuery(e.target.value)} placeholder="Search your courses..." size="3">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </div>
        <div className="col-span-2">
          <Flex direction="column" maxWidth="100%">
            <Select key="category" onValueChange={(value) => setCategory(value)}>
              <div className="flex w-full space-x-3">
                <SelectTrigger className="h-10 !w-full !cursor-pointer rounded-md border-[1.5px] border-slate-300 bg-white text-base !font-normal text-black">
                  <SelectValue defaultValue="all" placeholder="Chọn danh mục"></SelectValue>
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem
                  className="text-sm text-black hover:text-navTitle focus:text-navTitle"
                  key="all"
                  value="all"
                >
                  All
                </SelectItem>
                {categories &&
                  "data" in categories &&
                  Array.isArray(categories.data) &&
                  categories?.data.map((i) => (
                    <SelectItem
                      className="text-sm text-black hover:text-navTitle focus:text-navTitle"
                      key={i.id}
                      value={i.name}
                    >
                      {i.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </Flex>
        </div>
        <div className="col-span-2">
          <Button variant="solid" color="pink" size="3" radius="full" onClick={gotoCreate}>
            <PlusIcon height="16" width="16" />
            Create new
          </Button>
        </div>
      </div>
      <Tabs.Root
        onValueChange={() => {
          setCurrentPageOffset(1)
          setPage(0)
        }}
        defaultValue="DRAFT"
      >
        <Tabs.List color="pink" size="2">
          <Tabs.Trigger value="DRAFT">Drafts</Tabs.Trigger>
          <Tabs.Trigger value="PUBLISHED">Published</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="DRAFT">
          <motion.div
            variants={parent}
            initial="hidden"
            animate="visible"
            className="mt-6 flex max-w-5xl flex-col gap-5"
          >
            <AnimatePresence>
              {(currentDraftItems || []).map((course) => (
                <motion.div
                  variants={child}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  key={course.id}
                  className="flex items-center rounded-lg border border-solid border-zinc-200 p-3"
                >
                  <div>
                    <ArrowTopRightIcon height="24" width="24" color="#1d4ed8" />
                  </div>
                  <div className="flex-1 pl-3">
                    <div className="text-lg font-bold text-blue-700">{course.title}</div>
                    <div className="text-zinc-400">Finish your course</div>
                  </div>
                  <div className="flex h-full items-center">
                    <Text
                      onClick={() => {
                        dispatch(courseActions.updateSelectedCourse({ id: course.id, name: course.title }))
                        navigate(`/course/${course.id}`)
                      }}
                      className="mr-3 cursor-pointer hover:text-blue-700"
                    >
                      Continue editing
                    </Text>
                    <Button
                      onClick={async () => {
                        const deleteRes = await courseApi.DeleteCourse(course.id)
                        if (deleteRes?.message === "Success") {
                          toast.success("Delete Success")
                          refetchCourse()
                        } else {
                          toast.info(`${deleteRes?.message}`)
                        }
                      }}
                      variant="solid"
                      size="3"
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <PaginationSearchResult
              itemsPerPage={5}
              selectPage={setPage}
              totalItemsInAllPages={paginationDraftArr.length}
              isSearch={isSearch}
              currentPageNumber={currentPageOffset}
              onSearch={() => setIsSearch(false)}
              hasApi={false}
              setCurrentPageOffset={setCurrentPageOffset}
            />
          </motion.div>
        </Tabs.Content>
        <Tabs.Content value="PUBLISHED">
          <div className="mt-6 flex max-w-5xl flex-col gap-5">
            {(currentPublishedItems || []).map((course) => (
              <div key={course.id} className="flex items-center rounded-lg border border-solid border-zinc-200 p-3">
                <div>
                  <ArrowTopRightIcon height="24" width="24" color="#1d4ed8" />
                </div>
                <div className="flex-1 pl-3">
                  <div className="text-lg font-bold text-blue-700">{course.title}</div>
                  <div className="text-zinc-400">Finish your course</div>
                </div>
                <div className="flex h-full items-center">
                  <Text className="mr-3 cursor-pointer hover:text-blue-700">Continue editing</Text>
                  <Button
                    onClick={async () => {
                      const deleteRes = await courseApi.DeleteCourse(course.id)
                      console.log("deleteRes", deleteRes)
                      if (deleteRes?.message === "Success") {
                        toast.success("Delete Success")
                        refetchCourse()
                      } else {
                        toast.info(`${deleteRes?.message}`)
                      }
                    }}
                    variant="solid"
                    size="3"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            <PaginationSearchResult
              itemsPerPage={5}
              selectPage={setPage}
              totalItemsInAllPages={paginationPublishedArr.length}
              isSearch={isSearch}
              currentPageNumber={currentPageOffset}
              onSearch={() => setIsSearch(false)}
              hasApi={false}
              setCurrentPageOffset={setCurrentPageOffset}
            />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
