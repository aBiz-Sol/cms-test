const routes = {
  home: "/",
  errorPage: "/404",

  about: "/about",
  contactUs: "/contact-us",
  organizationProducts: "/our-products",

  productDetails: (product: string, slug: string) => `/products-details/${product}/${slug}`,
  cartPage: "/cart-page",
  quizResult: "/quiz-result",
  privacyPolicy: "/privacy-policy",
  termsOfServices: "/terms-of-services",

  auth: {
    login: "/login",
    signup: "/register",
    forgotPassword: "/forget-password",
    otpVerification: "/otp-verification",
    resetPassword: "/reset-password"
  },

  studentPortal: {
    dashboard: "/student/dashboard",
    myProducts: "/student/my-products",
    activeProducts: "/student/active-products",
    completedProducts: "/student/completed-products",
    settings: "/student/settings",
    notes: "/student/notes",

    notification: "/student/notification",
    siteBuilder: "/student/site-builder",
    appearance: "/student/appearance",
    orderComplete: "/student/order-complete",
    viewAnalytics: "/student/view-analytics",

    notePages: {
      createPage: "/student/notes/create",
      updatePage: "/student/notes/page/update",
      updateCollection: "/student/notes/collection/update-collection"
    },

    flashcard: {
      startFlashCardAttempt: (externalId: string) => `/student/flashcard/start-attempt/${externalId}`,
      endResultLayout: (slug: string) =>
        `/student/flashcard/${slug}/end-result`,
      flashCardById: (id: string) => `/student/flashcard/${id}`,
      viewAnalytics: "/student/flashcard/view-analytics"
    },

    quiz: {
      startQuizAttempt: (externalId: string) => `/student/quiz/start-attempt/${externalId}`,
      quizzById: (id: string) => `/student/quiz/${id}`,
      viewAnalytics: "/student/quiz/view-analytics"
    },

    courses: {
      dashboard: (id: string) => `/student/course/${id}/dashboard`,
      curriculum: (id: string) => `/student/course/${id}/curriculum`,
      coursePlayer: (id: string) =>
        `/student/course/${id}/curriculum/course-player`,
      lessonPlan: (id: string) => `/student/course/${id}/lesson-plan`,
      lessonPlanPreview: (id: string) =>
        `/student/course/${id}/lesson-plan/preview`,
      notesAndHighlights: (id: string) => `/student/course/${id}/notes-listing`,

      flashcardAttemptAsLesson: (id: string, slug: string) =>
        `/student/course/${id}/curriculum/flashcard/${slug}`,
      quizAttemptAsLesson: (id: string, slug: string) =>
        `/student/course/${id}/curriculum/quiz/${slug}`,
      endResult: (id: string, slug: string) =>
        `/student/course/${id}/curriculum/flashcard/${slug}/end-result`,
      simulationAsLesson: (id: string) =>
        `/student/course/${id}/curriculum/simulation-set`,
      pdfAsLesson: (id: string) => `/course/${id}/curriculum/pdf`
    }
  },
  //Course Sidebar routes
  slug: ":slug",
  courseDashboard: "course-dashboard",
  curriculum: "",
  coursePlayer: "course-player",
  notesAndHighlights: "notes-highlights",
  mockExam: "mock-exam",
  flashCard: "flashCards",
  questionBank: "question-bank",
  quizId: "quiz/:id",
  flashcardId: "flashcard/:id",
  // startFlashcard: 'start-attempt',
  examPlan: "exam-plan",
  startQuiz: "startQuiz",
  //dummy Routes
  jobs: "/jobs",
  teams: "/teams",
  blogs: "/blogs/*",
  careers: "careers",
  projects: "projects",
  employees: "/employees",
  techstacks: "/techstacks",
  jobCreate: "/jobs/create",
  jobEdit: "/jobs/edit/:id",
  departments: "departments",
  teamsCreate: "/teams/create",
  blogsCreate: "/blogs/create",
  designations: "/designations",
  projectsCreate: "/projects/create",
  viewProjects: "/projects/view/:id",
  editProjects: "/projects/edit/:id",
  employeesCreate: "/employees/create",
  employeesEdit: "/employees/edit/:id",
  employeesView: "/employees/view/:id",
  teamView: "/teams/view/:id",
  teamEdit: "/teams/edit/:id",
  teamCreate: "/teams/create",
  edittechstack: "/techstacks/edit/:id",
  techstacksCreate: "/techstacks/create",
  departmentsCreate: "/departments/create",
  editdepartments: "/departments/edit/:id",
  editdesignation: "/designations/edit/:id",
  designationsCreate: "/designations/create",
  createServices: "/services/create",
  editServices: "/services/edit/:id",
  services: "services",

  endResultLayout: "/flashcard/end-result"
}

export default routes
