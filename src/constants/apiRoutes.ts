const IPS_ROUTES = {
  STUDENT_SIGN_UP: "user/student",
  STUDENT_SIGN_IN: "/identity/sign-in",
  STUDENT_OTP: "auth/otp/verify",
  STUDENT_RESEND_OTP: "auth/otp/resend",
  STUDENT_RESET_PSWD: "identity/set-password",
  STUDENT_FORGET_PSWD: "user/student/forgot-password",
  STUDENT_UPDATE_PSWD: "user/student/update-password",
  STUDENT_UPDATE_PROFILE: "user/student/profile",
  STUDENT_GET_USER: "user/student/",
  STUDENT_GET_USER_DETAILS: "identity/user-details"
}
const COURSE_HUB_ROUTES = {
  GET_ALL_ORG_COURSES: "course/public",
  GET_UNENROLLED_COURSES_ORG: "student-course/not-registered",
  GET_COURSE_DETAIL_BY_ID: (courseId: string) => `/course/${courseId}/details`,

  STUDENT_ENROLL_COURSE: "student-course/enroll",
  STUDENT_GET_ENROLLED_COURSES: "student-course/enrolled",
  STUDENT_GET_COURSE_LESSON_TIMELINE: "",
  STUDENT_GET_COURSE_CURRICULUM: (courseId: number) =>
    `student-course/curriculum/${courseId}`,
  STUDENT_GET_COURSE_PLAYER_CURRICULUM: (courseId: string, sectionIds: any) =>
    `student-course/course-player/${courseId}?sectionId=${sectionIds}&order=createdAt:ASC&relations=commentSettings`,
  STUDENT_CHANGE_SECTION_ORDER: "student-course/sections-order",
  STUDENT_PREVIEW_COURSE_PLAN: "student-course-plan/draft",
  STUDENT_CREATE_COURSE_PLAN: "student-course-plan/",
  STUDENT_GET_COURSE_PLAN_LESSONS: (courseId: string) =>
    `student-course-plan/lessons/${courseId}`,
  STUDENT_GET_COURSE_PLAN_PREVIEW: (courseId: string) =>
    `student-course-plan/preview/${courseId}`,
  STUDENT_GET_PLANNED_HOURS: (coursePlanId: string) =>
    `student-course-plan/${coursePlanId}`,
  STUDENT_DELETE_COURSE_PLAN: (studentCoursePlanId: string) =>
    `student-course-plan/${studentCoursePlanId}`,
  STUDENT_UPDATE_COURSE_PLAN: (studentCoursePlanId: string) =>
    `student-course-plan/${studentCoursePlanId}`,

  // start lesson progress for student ,end , mark as completed
  START_STUDENT_LESSON_PROGRESS: "/student-course-progress/",
  // Get lessons progress
  LIST_STUDENT_LESSON_PROGRESS: (args: any) =>
    `/student-course-progress/?studentId=${args.studentId}&courseId=${args.courseId}&allData=true`,

  //Student Course Dashboard
  STUDENT_COURSE_DASHBOARD: (courseId: number) =>
    `/student-course-progress/dashboard/${courseId}`,

  //Student Dashboard APIs
  GET_PRODUCTS_OVERVIEW: `course/student/dashbaord-overview`,
  GET_PRODUCTS_PERFORMANCE: 'course/student/yearly-performance',

  //Comments 
  CREATE_LESSON_COMMENT: 'comment/',
  UPDATE_LESSON_COMMENT: (lessonId:string)=>`comment/${lessonId}`,
  DELETE_LESSON_COMMENT: (lessonId:string)=>`comment/${lessonId}`,
  GET_LESSON_FILTERED_USERS:(courseId:string,searchValue:string)=> `student-course/tag/${courseId}?searchValue=${searchValue}`,
  GET_LESSON_COMMENTS_LIST:(lessonId:string) =>`comment/lesson/${lessonId}`,
  GET_PARENT_COMMENT_REPLIES:(lessonId:string,parentCommentId:any)=>`comment/lesson/${lessonId}?parentId=${parentCommentId}`,
  VOTE_COMMENT: '/comment-vote/',
  PIN_COMMENT:'/pin-comment',
  
  //old .... Course APIs
  GET_ALL_SECTION_BY_COURSE_ID: (courseId: number) =>
    `section/tiles/${courseId}`,

  GET_COURSE_BY_SLUG: (courseSlug: string) =>
    `course/?slug=${courseSlug}`,
}
const QUIZ_ROUTES = {
  GET_ORG_QUIZZES: "quiz/public",
  STUDENT_ENROLL_QUIZ: "studentQuiz",
  STUDENT_GET_ENROLLED_QUIZ: "studentQuiz/enrolled",
  GET_QUIZ_BY_ID: (quizId: any, productId: string) => `studentQuiz/quiz/${quizId}?productId=${productId}`,
  ATTEMPT_QUESTION: (stdQuizId: any) => `studentQuiz/attempt/${stdQuizId}`,
  BOOKMARK_QUESTION: (stdQuizId: any) => `studentQuiz/bookmark/${stdQuizId}`,
  QUIZ_FILTERED_QUESTIONS: (quizId: any, productId: string) =>
    `studentQuiz/quiz/${quizId}/filtered?productId=${productId}`,
  GET_NOT_REGISTERED_QUIZZES: "studentQuiz/not-registered/",
  STUDENT_QUIZ_DETAILS_WITH_LAST_ATTEMPT: (quizId: string) =>
    `quiz/details/${quizId}`,
  STUDENT_QUIZ_START_ATTEMPT: "studentQuiz/start-quiz/",
  STUDENT_QUIZ_END_ATTEMPT: "studentQuiz/end-quiz/",
  GET_QUIZ_OVERVIEW: (quizId: number) =>
    `quiz-attempt-history/overview/${quizId}`,
  GET_QUIZ_STATISTICS: (quizId: number) =>
    `quiz-attempt-history/statistics/${quizId}`,
  CREATE_LESSON_QUIZ_ENROLLMENT: `studentQuiz/enrolment/quiz`,
  GET_QUIZ_DETAIL_BY_ID: (quizExternalId: string) =>
    `quiz/${quizExternalId}/details`,
  GET_QUIZ_DETAIL_BY_SLUG: (slug: string) =>
    `quiz/?slug=${slug}`
}
const FLASHCARD_ROUTES = {
  STUDENT_ENROLL_DECK: "student-card/enrolment",
  STUDENT_GET_ENROLLED_DECK: "deck/student",
  STUDENT_ENROLLED_DECK_WITH_FLASHCARD: (deckUUID: string, productId: string) =>
    `deck/student/${deckUUID}?productId=${productId}`,
  STUDENT_ENROLLED_DECK_FILTERED_FLASHCARD: (deckUUID: any, productId: string) =>
    `student-card/deck/${deckUUID}/filtered-stats?productId=${productId}`,
  STUDENT_ATTEMPT_DECK_CARD: (cardUUId: any) =>
    `student-card/attempted/card/${cardUUId}`,
  STUDENT_BOOKMARK_DECK_CARD: (cardUUId: any) =>
    `student-card/bookmarked/card/${cardUUId}`,
  STUDENT_MEMORIZED_DECK_CARD: (cardUUId: any) =>
    `student-card/memorized/card/${cardUUId}`,
  STUDENT_FEEDBACK_DECK: "student-card/deck/student-feedback",
  STUDENT_CREATE_FLASHCARD: "deck-card/student",

  GET_ALL_DECKS_ORG: "deck/public/", //List by Master
  GET_UNENROLLED_DECKS_ORG: "student-card/not-registered-decks/",
  STUDENT_START_DECK_ATTEMPT: "student-deck-attempt-history/start-deck",
  STUDENT_END_DECK_ATTEMPT: "student-deck-attempt-history/end-deck",
  //Analytics APIs

  GET_DECK_OVERVIEW: (deckId: number) =>
    `student-deck-attempt-history/overview/${deckId}`,
  GET_DECK_ATTEMPTS_DETAIL: (deckId: number) =>
    `student-deck-attempt-history/statistics/${deckId}`,
  STUDENT_ATTEMPT_CARDS: (attemptId: string) =>
    `student-deck-attempt-history/${attemptId}`,
  STUDENT_DECK_DETAILS_WITH_LAST_ATTEMPT: (deckId: string) =>
    `deck/details/${deckId}`,
  STUDENT_DECK_LATEST_ATTEMPT: (studentDeckCardId: string) =>
    `student-deck-attempt-history/result/${studentDeckCardId}`,
  CREATE_LESSON_DECK_ENROLLMENT: `student-card/enrolment/lesson`,
  GET_DECK_DETAIL_BY_ID: (deckUUId: string) => `deck/${deckUUId}/details`,
  GET_DECK_DETAIL_BY_SLUG: (slug: string) => `deck/public/?slug=${slug}`
}

const SIMULATION_ROUTES = {
  CREATE_LESSON_ENROLLMENT_SIMULTAION: "student-simulation/enrolment/lesson",
  GET_SIMULATION_SET_DETAILS: (setId: string) =>
    `simulation-set/student/details/${setId}`,
  GET_ATTEMPTED_SIMULATIONS: "student-simulation-attempt/recent-attempt",
  START_SIMULATION_ATTEMPT: "student-simulation-attempt/start-attempt",
  SUBMIT_SIMULATION: (simulationId: string) =>
    `student-attempt-history/${simulationId}`
}

const NOTES_ROUTES = {
  CREATE_NOTE: "note/",
  SINGLE_NOTE_ENDPOINT: (noteId: string) => `note/${noteId}`, // same route for get , update and delete Single note
  GET_ALL_NOTES: (lessonId: string) => `note/lesson/${lessonId}`,
  GET_ALL_NOTES_PLUGIN: (lessonId: string) => `note/plugin/lesson/${lessonId}`,

  GET_ALL_TAGS: `tag/check-tag-availability`,
  CREATE_TAG: `tag/`,
  CREATE_PAGE: `page/`,
  GET_ALL_PAGES: `page/`,
  DELETE_PAGE: `page/`,
  CREATE_BLOCK: "block/",
  DELETE_BLOCK: `block/`,
  UPDATE_BLOCK: `block/`,
  CREATE_COLLECTION: `collection/`,
  GET_ALL_COLLECTIONS: `collection/`,
  GET_COLLECTIONS: `collection/page/`,
  BULK_LINKING: `collection-page/bulk-linking/`,
  DELETE_COLLECTION: `collection/`,
  DE_LINK_PAGE: `collection-page/de-link`,
  CREATE_NOTE_AS_CANVAS: "canva",
  UPDATE_NOTE_AS_CANVAS: (externalId: string) => `canva/${externalId}`,
  GET_PDF_ANNOTATIONS: (lessonId: string) =>
    `canva/?lessonId=${lessonId}&type=ANNOTATION`,

  // HTML HIGHLIGHT NOTES
  CREATE_HTML_NOTES: "html-highlight/",
  GET_ALL_HTML_NOTES: "html-highlight/",
  GET_HTML_NOTES_BY_ID: "html-highlight/",
  UPDATE_HTML_NOTES_BY_ID: (externalId: string) =>
    `html-highlight/${externalId}`
}
const MICRO_COMMS_ROUTES = {
  getFileUrls: "upload/file"
}
const CART_ROUTES = {
  proceedToCheckOut: `/payment/cart/session`,
  addProductToCart: `cart/add-products`,
  addBulkProductToCart: `cart/bulk-add-products`,
  deleteCartProduct: (productId: string) => `cart-item/${productId}`,
  getcartDetails: `cart/details`,
  updateCartItem: (productId: string) => `${productId}`,
  emptyCart: (cartId: string) => `cart/remove-cart-items/${cartId}`,
  paymentReceipt: (sessionId: string) => `${sessionId}`,
  paymentHistory: `/order`
}
const ORG_ROUTES = {
  GET_ORGANIZATION_BY_ID: (organizationId:string)=>`organization/${organizationId}` ,
  GET_ORGANIZATION_BY_URL:  (orgUrl:string)=>`organization/?url=${orgUrl}`,
  
  //Rate & Review
  CREATE_PRODUCT_REVIEW:'product-rating/',
  GET_PRODUCT_REIVIEW: (sourceId:string, userId:string )=>`product-rating/?sourceId=${sourceId}&userId=${userId}`,
  UPDATE_PRODUCT_REVIEW: (reviewId:string )=>`product-rating/${reviewId}`,
}
export {
  IPS_ROUTES,
  COURSE_HUB_ROUTES,
  FLASHCARD_ROUTES,
  QUIZ_ROUTES,
  MICRO_COMMS_ROUTES,
  SIMULATION_ROUTES,
  NOTES_ROUTES,
  CART_ROUTES,
  ORG_ROUTES
}
