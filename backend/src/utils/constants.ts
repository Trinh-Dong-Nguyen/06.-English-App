export const END_POINTS = {
  BASE: '/api',
  AUTH: {
    BASE: '/auth',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    SIGN_OUT: '/sign-out',
    FORGOT_PASSWORD: '/forgot-password',
    OAUTH2_CREATE: '/oauth2-create',
    CALL_BACK: '/callback',
    CONFIRM_FORGOT_PASSWORD: '/confirm-forgot-password',
    CONFIRM_SIGN_UP: '/confirm-sign-up',
    RESEND_CONFIRMATION_CODE: '/resend-confirmation-code',
    REFRESH_TOKEN: '/refresh-token',
  },
  USER: {
    BASE: '/user',
    ME: '/me',
    CREATE: '/create',
  },
  FILE: {
    BASE: '/file',
    UPLOAD: '/presigned-url',
    DOWNLOAD: '/download/:key',
    DELETE: '/delete/:key',
  },
  COURSE: {
    BASE: '/course',
    GET_ALL_COURSES: '/get-all-courses',
    GET_RECOMMENDATION_COURSES: '/get-all-recomendation-courses',
    GET_MY_COURSE_BY_TEACHER: '/teacher/my-course',
    GET_MY_COURSE_BY_STUDENT: '/student/my-course/',
    GET_DETAIL: '/detail/:id',
    CREATE: '',
    UPDATE: '/update-one/:id',
    DELETE: '/delete-one/:id',
  },
  COURSE_BUYING: {
    BASE: '/course-buying',
    CREATE: '',
    CREATE_PAY_ORDER_URL: '/create-pay-order-url',
    VALIDATE_PAY_ORDER: '/validate-pay-order',
    VNPAY_IPN: '/vnpay-ipn',
    CHECK_KEY: '/check-key',
    TRACKING_LESSON_CONTENT: '/tracking-lesson-content',
  },
  COURSE_OWNING: {
    BASE: '/course-owning',
    ACTIVE_COURSE: '/active-course',
    TRACKING_LESSON_CONTENT: '/tracking-lesson-content',
  },
  COURSE_CATEGORY: {
    BASE: '/course-category',
    CREATE: '',
    LIST: '',
    UPDATE: '',
  },
  LESSON: {
    BASE: '/lesson',
    CREATE_GRAMMAR: '/grammar',
    CREATE_VOCABULARY: '/vocabulary',
    GET_ALL_LESSONS_BY_COURSE: '/get-all-lessons-by-course/:courseId',
    GET_ALL_GRAMMAR_BY_LESSON: '/get-all-grammar-by-lesson/:lessonId',
    GET_ALL_VOCABULARY_BY_LESSON: '/get-all-vocabulary-by-lesson/:lessonId',
    CREATE_NORMAL: '/normal',
    ADD_GRAMMAR_TO_LESSON: '/add-grammar-to-lesson/:lessonId',
    ADD_VOCABULARY_TO_LESSON: '/add-vocabulary-to-lesson/:lessonId',
    GET_ONE: '/get-one/:id',
    LIST: '',
    UPDATE: '',
    DELETE: '',
  },
  DISCOUNT: {
    BASE: '/discount',
    CREATE: '',
    GET_ALL_DISCOUNTS_BY_OWNER: '/get-all-discounts-by-owner',
    UPDATE: ':id',
    GET_ALL_DISCOUNTS_BY_COURSE: '/get-all-discounts-by-course/:courseId',
    DISABLE_DISCOUNT: '/disable-discount/:id',
  },
  GRAMMAR: {
    BASE: '/grammar',
    CREATE: '',
    LIST: '',
    UPDATE: '',
    DELETE: '',
  },
  QUESTION: {
    BASE: '/question',
    CREATE: '',
    FIND_BY_SECTION: '',
    PUT: '',
    DELETE: ':id',
  },
  QUESTION_GROUP: {
    BASE: '/question-group',
    CREATE: '',
    GET_BY_SECTION: '/:sectionId',
    UPDATE: '',
    DELETE: ':id',
  },
  SECTION: {
    BASE: '/section',
    GET_ALL_SECTION_BY_LESSON: '/get-all-section-by-lesson/:lessonId',
    CREATE: '',
    LIST: '',
    UPDATE: '/update-one/:id',
    DELETE: '/delete-one/:id',
  },
  STUDENT_ANSWER: {
    SUBMIT_ANSWER: '/submit-answer',
    BASE: '/student-answer',
    GET_SOLUTION: '/get-solution',
    GET_HISTORY_RESULT: '/get-history-result',
    REDO_SECTION: '/redo-section',
  },
};
export const DOCUMENTATION = {
  TITLE: 'ENGDIGO API',
  DESCRIPTION: 'IT SHOULD BE CLEAR TO YOU',
  VERSION: '1.0',
  PREFIX: 'api',
  TAGS: {
    AUTH: 'AUTH',
    USER: 'USER',
    FILE: 'FILE',
    COURSE: 'COURSE',
    DISCOUNT: 'DISCOUNT',
    COURSE_BUYING: 'COURSE_BUYING',
    COURSE_OWNING: 'COURSE_OWNING',
    COURSE_CATEGORY: 'COURSE_CATEGORY',
    LESSON: 'LESSON',
    GRAMMAR: 'GRAMMAR',
    SECTION: 'SECTION',
    QUESTION: 'QUESTION',
    QUESTION_GROUP: 'QUESTION_GROUP',
    STUDENT_ANSWER: 'STUDENT_ANSWER',
  },
};
export const TIMEOUT = 20000;
export const AUTH_FLOW = 'ADMIN_USER_PASSWORD_AUTH';

export enum STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum DEGREE {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTOR = 'DOCTOR',
  UNKNOWN = 'UNKNOWN',
}

export enum GENDER {
  MALE,
  FEMALE,
  UNKNOWN,
}

export enum PAYMENT_METHOD {
  QR_CODE = 'QR_CODE',
  E_WALLET = 'E_WALLET',
}

export enum QUESTION_TYPE {
  SPEAKING_QUESTION = 'SPEAKING_QUESTION',
  WRITING_QUESTION = 'WRITING_QUESTION',
  COMBO_BOX = 'COMBO_BOX',
  BLANK = 'BLANK',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export enum QUESTION_GROUP_TYPE {
  COMBO_BOX = 'COMBO_BOX',
  BLANK = 'BLANK',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export enum SECTION_TYPE {
  ROOT = 'ROOT',
  READING = 'READING',
  LISTENING = 'LISTENING',
  VOCABULARY = 'VOCABULARY',
}

export enum USER_ROLES {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export enum TYPES {
  LISTENING = 'LISTENING',
  READING = 'READING',
  WRITING = 'WRITING',
  SPEAKING = 'SPEAKING',
  GRAMMAR = 'GRAMMAR',
  VOCABULARY = 'VOCABULARY',
}

export enum MEDIAS {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export enum STATE {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  BLOCKED = 'BLOCKED',
  PUBLISHED = 'PUBLISHED',
}

export enum SECTION_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum WORD_TYPE {
  NOUN = 'NOUN',
  VERB = 'VERB',
  ADJECTIVE = 'ADJECTIVE',
  ADVERB = 'ADVERB',
  PRONOUN = 'PRONOUN',
  PREPOSITION = 'PREPOSITION',
  CONJUNCTION = 'CONJUNCTION',
  INTERJECTION = 'INTERJECTION',
}

export const INJECTION_DEPS = {
  DISCOUNT_PACKAGE: 'DISCOUNT_PACKAGE',
  PUB_SUB_SERVICE: 'PUB_SUB_SERVICE',
};
export const COURSE_THUMBNAIL_IMAGE = '';
