import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import "./header.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

//custom imports

import { Toast } from "@trycourier/react-toast";
import { Inbox } from "@trycourier/react-inbox";
import { Tooltip } from "react-tooltip";
import UserDropDown from "./userDropDown/userDropdown";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "../../redux/localStorageReadWrite/readWrite";
import CustomDropdown from "../CustomDropDown/customDropdown";
import {
  getCartDetials,
  getCartItemsCount,
} from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { getUserDetails } from "../../redux/slices/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../customHooks/useTypedSelector";
import { appDirection, appTheme } from "../../redux/slices/globalSlice";
import routes from "../config/routes";
import { fetchOrganizationByUrl } from "../../redux/slices/organiztionSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const baseURL = window.location.hostname;
  const user =
    useAppSelector((state: any) => state?.authSlice?.user) ||
    readFromLocalStorage("user");

  const portalsData = readFromLocalStorage("portals");
  const portals = Array.isArray(portalsData) ? portalsData : [];
  const orgImage = useAppSelector((state: any) => state.organization?.orgImage);
  const theme = useAppSelector((state: RootState) => state.globalSlice.theme);
  const cartDetails = useAppSelector((state: any) => state?.cart?.cartItems);
  const navMenuOptions = [
    { name: "Home", path: "/" },
    { name: "About", path: "about" },
    { name: "Contact Us", path: "contact-us" },
    { name: "Products", path: routes.organizationProducts },
  ];
  const languages = ["ENG", "UR", "Ar"];

  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const selectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    const isRTL = lang === "Ar" || lang === "UR";
    writeToLocalStorage("dir", isRTL);
    dispatch(appDirection(isRTL));
    setIsOpen(false);
  };

  function updateFaviconAndTitle(name: string, favIcon: string) {
    document.title = name || "Student Portal";

    const faviconUrl = favIcon;
    let faviconElement = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement;
    if (!faviconElement) {
      faviconElement = document.createElement("link");
      faviconElement.rel = "icon";
      document.head.appendChild(faviconElement);
    }
    faviconElement.href = faviconUrl;
  }

  useEffect(() => {
    if (user) {
      dispatch(getUserDetails());
    }
    const fetchOrganization = async () => {
      if (baseURL === "localhost") {
        dispatch(fetchOrganizationByUrl("walls.urqa.com")).then(
          (response: any) => {
            const orgData = response?.payload?.[0];
            updateFaviconAndTitle(orgData?.name, orgData?.imageUrl);
          }
        );
      } else {
        dispatch(fetchOrganizationByUrl(baseURL)).then((response: any) => {
          const orgData = response?.payload?.[0];
          updateFaviconAndTitle(orgData?.name, orgData?.imageUrl);
        });
      }
    };
    fetchOrganization();
  }, [baseURL]);

  const handleGetStartedItemClick = (item: string) => {
    switch (item) {
      case "Sign Up":
        navigate(routes.auth.signup);
        break;
      case "Login":
        navigate(routes.auth.login);
        break;
      case "Settings":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  const getStartedMenuOptions = [
    { key: "Sign Up", label: "Sign Up" },
    { key: "Login", label: "Login" },
  ];

  //added for cart
  const handleCart = async () => {
    navigate(routes.cartPage);
  };
  const handlelogo = async () => {
    navigate(routes.home);
  };
  const handleMyLearnings = () => {
    if (user) {
      navigate(routes.studentPortal.dashboard);
    } else {
      navigate(routes.auth.login);
    }
  };
  const toogleTheme = () => {
    dispatch(appTheme(theme === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (user) {
      dispatch(getCartDetials());
    }
  }, [user]);

  const cartItem = useAppSelector(getCartItemsCount);
  const numberOfProductsInCart = cartItem;
  /* eslint-disable */
  return (
    <div id="portal-layout">
      <div id="portal-main-header">
        <div style={{ height: "10vh" }}>
          <div className="header d-flex align-center justify-space-between">
            <div
              className="logo"
              data-tooltip-id="portal-header-logo"
              data-tooltip-content={"Home"}
            >
              <img
                src={orgImage}
                alt="Organization Logo"
                onClick={handlelogo}
              />
            </div>
            {!location.pathname.includes("student") && (
              <div className="d-flex header-nav-bar t2">
                {navMenuOptions.map((option) => (
                  <span
                    className="nav-option"
                    onClick={() => navigate(option.path)}
                  >
                    {option.name}
                  </span>
                ))}
              </div>
            )}
            <div className="d-flex gap-100">
              {user &&
                portals.includes("STUDENT") &&
                location.pathname !== routes.studentPortal.dashboard && (
                  <span
                    className="d-flex align-center pointer t2 my-learnings"
                    onClick={handleMyLearnings}
                    data-tooltip-id="header-dashboard"
                    data-tooltip-content="Dashboard"
                  >
                    My Learnings
                  </span>
                )}

              <div className="icons-dropdown d-flex align-center gap-20 ">
                {user && (
                  <div
                    className="notification-bell"
                    data-tooltip-id="header-notifications"
                    data-tooltip-content="Notifications"
                  >
                    <Toast />
                    <Inbox />
                  </div>
                )}

                <span
                  className="icon d-flex align-center justify-center"
                  data-tooltip-id="header-cart"
                  data-tooltip-content="Cart"
                >
                  <Badge
                    count={
                      user
                        ? cartDetails?.cartItemDetails?.length
                        : numberOfProductsInCart
                    }
                    overflowCount={99}
                  >
                    <Icon
                      icon="mdi:cart"
                      className="icon-wrapper"
                      height="25"
                      cursor={"pointer"}
                      onClick={handleCart}
                    />
                  </Badge>
                </span>

                {!user && (
                  <>
                    <span
                      className="icon d-flex align-center justify-center"
                      onClick={toogleTheme}
                    >
                      <Icon
                        icon={`${
                          theme === "light"
                            ? "material-symbols-light:dark-mode"
                            : "ph:sun-bold"
                        }`}
                        className="icon-wrapper"
                        height="24"
                        color="black"
                        cursor={"pointer"}
                      />
                    </span>
                    <CustomDropdown
                      header={
                        <div
                          className="language-menu d-flex align-center justify-center pointer gap-5"
                          onClick={toggleMenu}
                        >
                          <Icon icon="codicon:globe" height="24" />
                          {selectedLanguage}
                          <Icon
                            icon={`mdi:chevron-${isOpen ? "up" : "down"}`}
                            height="20"
                          />
                        </div>
                      }
                      menuClassName="menu-options"
                      options={languages.map((lang) => (
                        <div key={lang} onClick={() => selectLanguage(lang)}>
                          {lang}
                        </div>
                      ))}
                    />
                  </>
                )}

                {!user ? (
                  <>
                    <CustomDropdown
                      header={"Get Started"}
                      options={getStartedMenuOptions.map((item) => (
                        <div
                          key={item.key}
                          onClick={() => handleGetStartedItemClick(item.key)}
                        >
                          {item.label}
                        </div>
                      ))}
                      headerClassName="get-started-header"
                      menuClassName="menu-options"
                    />
                  </>
                ) : (
                  <div
                    className="profile"
                    data-tooltip-id="header-profile"
                    data-tooltip-content="My Profile"
                  >
                    <div className="profile-info">
                      <strong>
                        {user
                          ? `${user?.firstName} ${user?.lastName}`
                          : "invalid name"}
                      </strong>
                      <UserDropDown />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Tooltip id="portal-header-logo" />
        <Tooltip id="header-dashboard" />
        <Tooltip id="header-cart" />
        <Tooltip id="header-notifications" />
        <Tooltip id="header-profile" />
      </div>
    </div>
  );
  /* eslint-enable */
};

export default Header;
