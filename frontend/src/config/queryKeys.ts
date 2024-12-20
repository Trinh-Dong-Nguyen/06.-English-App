export const queryKeys = {
  auth: ["auth"],
  me: {
    gen: (accessToken: string) => ["me", accessToken],
  },
  courseCategory: {
    gen: (categoryId?: string) => ["category", categoryId],
  },
  course: {
    gen: (page: number, take: number, sort: string, sortBy: string, search?: string, categoryId?: string) => [
      "course",
      page,
      take,
      sort,
      sortBy,
      search,
      categoryId,
    ],
  },
  detailCourse: {
    gen: (id: string) => ["detailCourse", id],
  },
  grammar: {
    gen: () => ["grammar"],
  },
  lessonByCourse: {
    gen: (courseId: string) => ["lessonByCourse", courseId],
  },
  sectionByLesson: {
    gen: (lessonId: string) => ["sectionByLesson", lessonId],
  },
  sectionById: {
    gen: (id: string) => ["sectionById", id],
  },
  lessonById: {
    gen: (lessonId: string) => ["lessonById", lessonId],
  },
  grammarByLessonId: {
    gen: (lessonId: string) => ["grammarByLessonId", lessonId],
  },
  vocabByLessonId: {
    gen: (lessonId: string) => ["vocabByLessonId", lessonId],
  },
}
