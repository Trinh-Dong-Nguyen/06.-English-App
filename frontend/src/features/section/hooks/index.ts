import { grammarApi, sectionApi } from "@/apis"
import { queryKeys } from "@/config"
import { useQuery } from "@tanstack/react-query"

export const useGrammar = () =>
  useQuery({
    queryKey: queryKeys.grammar.gen(),
    queryFn: () => grammarApi.getAllGrammar(),
    refetchOnMount: "always",
  })

export const useSectionByLesson = (lessonId: string) =>
  useQuery({
    queryKey: queryKeys.sectionByLesson.gen(lessonId),
    queryFn: () => sectionApi.GetSectionByLesson(lessonId),
    refetchOnMount: "always",
  })

export const useSectionById = (id: string) =>
  useQuery({
    queryKey: queryKeys.sectionById.gen(id),
    queryFn: () => sectionApi.GetSectionById(id),
    refetchOnMount: "always",
  })
