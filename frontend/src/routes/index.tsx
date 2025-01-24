import LoginRegisterLayout from "@/components/Layout/LoginRegisterLayout/LoginRegisterLayout"
import EmptyLayout from "@/components/Layout/EmptyLayout/EmptyLayout"
import PrivacyPolicyPage from "@/pages/LandingPage/PrivacyPage/PrivacyPage"
import TermsOfServicePage from "@/pages/LandingPage/TermsOfServicePage/TermsOfServicePage"
import { routes, studentRoutes, teacherRoutes } from "@/config/routes"
import DoTestLayout from "@/components/Layout/Student/DoTestLayout/DoTestLayout"
import { Fragment } from "react/jsx-runtime"
import HomePage from "@/pages/LandingPage/Home"
import LoginPage from "@/pages/AuthPage/LoginPage/LoginPage"
import RegisterPage from "@/pages/AuthPage/RegisterPage/RegisterPage"
import WritingTestPage from "@/pages/App/StudentPage/TestPage/WritingTestPage/WritingTestPage"
import SpeakingTestPage from "@/pages/App/StudentPage/TestPage/SpeakingTestPage/SpeakingTestPage"
import ListeningTestPage from "@/pages/App/StudentPage/TestPage/ListeningTestPage/ListeningTestPage"
import MyCoursePage from "@/pages/App/TeacherPage/CoursePage/MyCoursePage"
import ReadingPage from "@/pages/App/StudentPage/TestPage/ReadingTestPage/ReadingPage"
import { MyLessonPage } from "@/pages/App/TeacherPage/LessonPage/MyLessonPage"
import { CreateVocab } from "@/pages/App/TeacherPage/LessonPage/CreateVocab"
import { CreateGrammar } from "@/pages/App/TeacherPage/LessonPage/CreateGrammar"
import { CreateWriting } from "@/pages/App/TeacherPage/LessonPage/CreateWriting"
import CourseList from "@/pages/App/TeacherPage/CoursePage/List"
import CourseCreate from "@/pages/App/TeacherPage/CoursePage/Add"
import CourseAddLessons from "@/pages/App/TeacherPage/CoursePage/Add/Lessons"
import CoursePreview from "@/pages/App/TeacherPage/CoursePage/Preview"
import CourseAddReadingSection from "@/pages/App/TeacherPage/CoursePage/Add/ReadingSection"
import CourseAddWritingSection from "@/pages/App/TeacherPage/CoursePage/Add/WritingSection"
import CourseAddListeningSection from "@/pages/App/TeacherPage/CoursePage/Add/ListeningSection"
import TeacherLayout from "@/components/Layout/Teacher"
import { SectionComp } from "@/pages/App/TeacherPage/CoursePage/Add/section"
import { Section } from "@/pages/App/TeacherPage/LessonPage/Section"
import StudentHomePage from "@/pages/App/StudentPage/HomePage/StudentHomePage"
import { CoursePreviewPage } from "@/pages/App/StudentPage/CoursePreviewPage/CoursePreviewPage"
import DefaultLayout from "@/pages/App/StudentPage/Layouts/DefaultLayout"
import StudentMyCoursePage from "@/pages/App/StudentPage/MyCoursePage/StudentMyCoursePage"
import BuyCoursePage from "@/pages/App/StudentPage/BuyCoursePage/BuyCoursePage"
const publicRoutes = [
  {
    path: routes.LandingPage,
    layout: EmptyLayout,
    component: <HomePage></HomePage>,
  },
  {
    path: routes.Login,
    component: <LoginPage></LoginPage>,
    layout: LoginRegisterLayout,
  },
  {
    path: routes.Register,
    component: <RegisterPage></RegisterPage>,
    layout: LoginRegisterLayout,
  },
  {
    path: routes.PrivacyPolicy,
    component: <PrivacyPolicyPage></PrivacyPolicyPage>,
  },
  {
    path: routes.TermsOfService,
    component: <TermsOfServicePage></TermsOfServicePage>,
  },
]
const protectedRoutes = [
  {
    path: studentRoutes.Home,
    layout: DefaultLayout,
    component: <StudentHomePage></StudentHomePage>,
  },
  {
    path: studentRoutes.MyCourse,
    layout: DefaultLayout,
    component: <StudentMyCoursePage></StudentMyCoursePage>,
  },
  {
    path: studentRoutes.BuyCourse,
    layout: DefaultLayout,
    component: <BuyCoursePage></BuyCoursePage>,
  },
  {
    path: studentRoutes.DoTestWriting,
    layout: Fragment,
    component: <WritingTestPage></WritingTestPage>,
  },
  {
    path: studentRoutes.DoTestSpeaking,
    layout: Fragment,
    component: <SpeakingTestPage></SpeakingTestPage>,
  },
  {
    path: studentRoutes.DoTestListening,
    component: <ListeningTestPage></ListeningTestPage>,
    layout: DoTestLayout,
  },
  {
    path: studentRoutes.DoTestReading,
    component: <ReadingPage></ReadingPage>,
    layout: DoTestLayout,
  },
  {
    path: studentRoutes.CousePreview,
    component: <CoursePreviewPage></CoursePreviewPage>,
    layout: Fragment,
  },
  {
    path: teacherRoutes.Course.Base,
    component: <CourseList></CourseList>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.Create,
    component: <CourseCreate></CourseCreate>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.Lesson,
    component: <CourseAddLessons></CourseAddLessons>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.Preview,
    component: <CoursePreview></CoursePreview>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Section.Create,
    component: <SectionComp></SectionComp>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.ReadingSection,
    component: <CourseAddReadingSection></CourseAddReadingSection>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.WritingSection,
    component: <CourseAddWritingSection></CourseAddWritingSection>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.ListeningSection,
    component: <CourseAddListeningSection></CourseAddListeningSection>,
    layout: TeacherLayout,
  },
  {
    path: teacherRoutes.Course.Detail,
    component: <MyCoursePage></MyCoursePage>,
    layout: Fragment,
  },
  {
    path: teacherRoutes.Course.Edit,
    component: <MyCoursePage></MyCoursePage>,
    layout: Fragment,
  },
  {
    path: teacherRoutes.Lesson.Base,
    component: <MyLessonPage courseId={undefined}></MyLessonPage>,
    layout: DoTestLayout,
  },
  {
    path: teacherRoutes.Lesson.CreateVocab,
    component: <CreateVocab></CreateVocab>,
    layout: DoTestLayout,
  },
  {
    path: teacherRoutes.Lesson.CreateGrammar,
    component: <CreateGrammar></CreateGrammar>,
    layout: DoTestLayout,
  },
  {
    path: teacherRoutes.Section.CreateWriting,
    component: <CreateWriting></CreateWriting>,
    layout: DoTestLayout,
  },
  {
    path: teacherRoutes.Section.Base,
    component: <Section></Section>,
    layout: Fragment,
  },
]
export { publicRoutes, protectedRoutes }
