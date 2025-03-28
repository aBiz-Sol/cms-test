import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Icon } from "@iconify/react";
import "./portalLayout.scss";
import routes from "../../component/config/routes";
import Header from "../../component/HeaderMain";

type PortalLayoutProps = {
  children: React.ReactNode;
};

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const pathsToHideLayout = [
    routes.home,
    routes.auth.signup,
    routes.auth.login,
    routes.auth.otpVerification,
    routes.auth.resetPassword,
    routes.auth.forgotPassword,
    routes.cartPage,
    routes.productDetails(pathSegments[2], pathSegments[3]),
    routes.organizationProducts,
    // routes.studentPortal.updatePassword,
    // routes.studentPortal.editProfile,
    routes.studentPortal.notification,
    routes.studentPortal.siteBuilder,
    routes.studentPortal.appearance,
    routes.studentPortal.orderComplete,
    routes.studentPortal.flashcard.viewAnalytics,
    routes.studentPortal.quiz.viewAnalytics,
    routes.studentPortal.flashcard.startFlashCardAttempt(
      pathSegments[pathSegments.length - 1]
    ),
    routes.studentPortal.quiz.startQuizAttempt(
      pathSegments[pathSegments.length - 1]
    ),

    routes.studentPortal.flashcard.flashCardById(`${pathSegments[3]}`),
    routes.studentPortal.quiz.quizzById(`${pathSegments[3]}`),
    routes.studentPortal.courses.flashcardAttemptAsLesson(
      `${pathSegments[3]}`,
      `${pathSegments[6]}`
    ),
    routes.studentPortal.courses.quizAttemptAsLesson(
      `${pathSegments[3]}`,
      `${pathSegments[6]}`
    ),
    routes.studentPortal.courses.simulationAsLesson(`${pathSegments[3]}`),
    routes.studentPortal.courses.endResult(pathSegments[3], pathSegments[6]),
    routes.studentPortal.courses.coursePlayer(pathSegments[3]),
    routes.studentPortal.courses.notesAndHighlights(pathSegments[3]),
  ];

  const hideHeaderForPaths = [
    routes.auth.signup,
    routes.auth.login,
    routes.auth.otpVerification,
    routes.studentPortal.flashcard.startFlashCardAttempt,
    routes.studentPortal.quiz.startQuizAttempt,
    routes.auth.resetPassword,
    routes.auth.forgotPassword,
    routes.studentPortal.flashcard.endResultLayout,
    routes.studentPortal.flashcard.flashCardById(`${pathSegments[3]}`),
    routes.studentPortal.quiz.quizzById(`${pathSegments[3]}`),
    routes.studentPortal.courses.flashcardAttemptAsLesson(
      `${pathSegments[3]}`,
      `${pathSegments[6]}`
    ),
    routes.studentPortal.courses.quizAttemptAsLesson(
      `${pathSegments[3]}`,
      `${pathSegments[6]}`
    ),
    routes.studentPortal.courses.endResult(pathSegments[3], pathSegments[6]),
    routes.studentPortal.courses.coursePlayer(pathSegments[3]),
    routes.studentPortal.courses.simulationAsLesson(`${pathSegments[3]}`),
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="portal-layout">
      {hideHeaderForPaths.includes(location.pathname) &&
      !location.pathname?.includes("view-analytics") &&
      !location.pathname?.includes("start-attempt") ? (
        <> </>
      ) : (
        <Header />
      )}

      {pathsToHideLayout?.includes(location.pathname) ? (
        <>{children}</>
      ) : (
        <div className="d-flex main-layout">
          <div
            className={`d-flex sidebar ${isSidebarOpen ? "open" : "closed"}`}
          >
            <Icon
              icon={`${
                isSidebarOpen
                  ? "ri:arrow-left-double-fill"
                  : "ri:arrow-right-double-fill"
              }`}
              height="24"
              className={`toogle-btn ${isSidebarOpen ? "right" : "left"}`}
              onClick={toggleSidebar}
            />
          </div>
          <div
            className={`d-flex sidebar-content ${
              isSidebarOpen ? "open" : "closed"
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalLayout;

