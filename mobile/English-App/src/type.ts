import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Course, MyCourse, GrammarModel } from "./models";
import { ScrollView } from "react-native";

export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPVerification: { username: string; isConfirmSignUp: boolean };
  ResetPassword: { username: string; confirmationCode: string };
  AuthCongrats: { isConfirmSignUp: boolean };
  Learning: undefined;
  Course: { course: MyCourse };
  Reading: { scrollRef?: React.RefObject<ScrollView>; sectionID: string };
  Grammar: {id:string};
  GrammarDetail: { id: string };
  CourseDetail: { course: Course };
  CourseHome: { course: Course };
  PayWithBank: { courseID: string; coursePrice: number };
  PayWithCard: { courseID: string ;coursePrice: number};
  Notification: undefined;
  Listening: { sectionID: any; scrollRef?: React.RefObject<ScrollView> };
  Validation: { courseBuyingId: string };
  BottomTabsNavigator: undefined;
  SectionRoot: { sectionID: string };
  Speaking: { sectionID: string };
  Writing: { sectionID: string };
};
export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SplashScreen"
>;
export type BottomTabsNavigatorRouteProp = RouteProp<
  RootStackParamList,
  "BottomTabsNavigator"
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
export type OTPVerificationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OTPVerification"
>;
export type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;
export type AuthCongratsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AuthCongrats"
>;
export type HeaderNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Notification"
>;

export type LearningScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Learning"
>;

export type GrammarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Grammar"
>;

export type GrammarDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GrammarDetail"
>;

export type CourseDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CourseDetail" | "Listening" | "Reading"
>;

export type LearningScreenRouteProp = RouteProp<RootStackParamList, "Learning">;
export type CourseScreenRouteProp = RouteProp<RootStackParamList, "Course">;
export type CourseDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "CourseDetail"
>;
export type GrammarScreenRouteProp = RouteProp<RootStackParamList, "Grammar">;
export type GrammarDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "GrammarDetail"
>;

export type PayMentScreenNavigationProp = StackNavigationProp<RootStackParamList, "PayWithBank" | "PayWithCard">;
export type PayMentScreenRouteProp = RouteProp<RootStackParamList, "PayWithBank" | "PayWithCard">;
export type CheckKeyScreenRouteProp = RouteProp<RootStackParamList, "Validation">;
export type CheckKeyScreenNavigationProp = StackNavigationProp<RootStackParamList, "Validation">;