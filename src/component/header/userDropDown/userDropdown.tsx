import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./userDropdown.scss";
import { logoutUser } from "../../../redux/slices/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../customHooks/useTypedSelector";
import { Icon } from "@iconify/react";
import { appDirection, appTheme } from "../../../redux/slices/globalSlice";
// import displayMode from "../../../assests/icons/diplayMode.svg";
// import passwordIcon from "../../../assests/icons/password.svg";
// import switchIcon from "../../../assests/icons/switchRole.svg";

import { readFromLocalStorage } from "../../../redux/localStorageReadWrite/readWrite";
import { toast } from "react-toastify";
import { GetInitials } from "../../../helpers/GetInitials";
import routes from "../../config/routes";
import {
  DisplaySettings,
  Password,
  SwitchAccessShortcut,
} from "@mui/icons-material";

const UserDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user =
    useAppSelector((state: any) => state?.authSlice?.user) ||
    readFromLocalStorage("user");

  const token = readFromLocalStorage("token");
  const orgId = readFromLocalStorage("OrgId");
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDisplayOpen, setIsDisplayOpen] = useState("");
  const [showSubopt, setShowSubOptions] = useState(false);

  const portalsData = readFromLocalStorage("portalsData")
    ? readFromLocalStorage("portalsData")
    : [];

  const toggleMenu = (e?: any) => {
    if (profileRef.current && profileRef.current.contains(e?.target)) {
      setIsMenuOpen((prevState) => !prevState);
      setIsDisplayOpen("");
      setShowSubOptions(false);
    } else {
      setIsMenuOpen(false);
      setIsDisplayOpen("");
      setShowSubOptions(false);
    }
  };

  const toggleDisplay = (value: any) => {
    if (value === "Profile Settings") {
      navigate("/profile-Settings");
      setIsMenuOpen(false);
    } else {
      setIsDisplayOpen(value);
      setShowSubOptions(value !== "");
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  const handleCloseModal = (e?: any) => {
    if (
      modalRef.current &&
      !(modalRef.current as any).contains(e?.target) &&
      !(profileRef.current as any).contains(e?.target)
    ) {
      setIsMenuOpen(false);
      setIsDisplayOpen("");
      setShowSubOptions(false);
    }
  };

  const [data, setData] = useState([
    {
      key: "displayMode",
      name: "Display Mode",
      tabs: [
        { name: "Dark Mode", icon: "ph:moon-light" },
        { name: "Light Mode", icon: "ph:sun-light" },
      ],
      svg: DisplaySettings,
    },
    {
      key: "language",
      name: "Language",
      icon: "ph:globe-light",
      tabs: [
        { name: "English", icon: "ri:english-input" },
        { name: "Arabic", icon: "mdi:abjad-arabic", path: "" },
        {
          name: "Italian",
          icon: "material-symbols-light:keyboard-previous-language-outline",
        },
      ],
    },
    {
      key: "settings",
      name: "Settings",
      icon: "ic:outline-settings",
      tabs: [
        {
          name: "Profile",
          icon: "radix-icons:person",
          path: routes.studentPortal.settings,
        },
        {
          name: "Password",
          svg: Password,
          path: routes.studentPortal.settings,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (portalsData?.length !== 0 && portalsData?.length > 1) {
      const switchPortalTabs = portalsData
        ?.filter((portal: any) => portal?.slug !== "STUDENT")
        .sort((a: any, b: any) => a.priority - b.priority)
        .map((item: any) => ({
          name: item.name,
          icon: "radix-icons:person", // Set icon as desired
          path: item.path,
        }));

      // Define the new option to add
      const switchPortalOption = {
        key: "switchPortal",
        name: "Switch Portal",
        svg: SwitchAccessShortcut,
        tabs: switchPortalTabs,
      };
      setData([...data, switchPortalOption]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  const handleOnClickSubmenu = (menuKey: string, subMenuName: string) => {
    if (menuKey === data[0].key) {
      toogleTheme(subMenuName);
    } else if (menuKey === data[1].key) {
      toogleDirection(subMenuName);
      handleCloseModal();
    } else if (menuKey === data[2].key) {
      navigateToSettings(subMenuName);
      handleCloseModal();
    } else if (menuKey === data[3].key) {
      navigateToLMS(subMenuName);
      const navigateTo = portalsData?.find(
        (item: any) => item.name === subMenuName
      );
      if (window.location.hostname === "localhost") {
        if (subMenuName === "LMS") {
          window.location.href = `http://localhost:3002${navigateTo?.path}?userId=${user?.id}&token=${token}&orgId=${orgId}`;
        }
        if (subMenuName === "Organization") {
          window.location.href = `http://localhost:3001${navigateTo?.path}?userId=${user?.id}&token=${token}&orgId=${orgId}`;
        }
        if (subMenuName === "Student") {
          toast.info("Already on Student Portal.");
        }
      } else {
        window.location.href = `${window.location.origin}${navigateTo?.path}`;
      }
      handleCloseModal();
    }
  };

  const navigateToLMS = (settingName: string) => {
    const userId = readFromLocalStorage("userId");
    const token = readFromLocalStorage("token");
    const orgId = readFromLocalStorage("OrgId");
    if (settingName == "INSTRUCTOR") {
      if (window.location.origin?.includes("localhost"))
        window.location.href = `http://localhost:${3001}/org/dashboard?userId=${userId}&token=${token}&orgId=${orgId}`;
      else
        window.location.href = `${window.location.origin}/org/dashboard?userId=${userId}&token=${token}&orgId=${orgId}`;
    }
  };

  const navigateToSettings = (settingName: string) => {
    if (settingName === data[2].tabs[0].name) {
      //Navigate to profile settings Tab
      navigate(routes.studentPortal.settings, { state: { selectedTab: 0 } });
    }
    if (settingName === data[2].tabs[1].name) {
      //Navigate to Password settings Tab
      navigate(routes.studentPortal.settings, { state: { selectedTab: 1 } });
    }
  };
  const toogleDirection = (lang: string) => {
    if (lang === data[1].tabs[0].name) {
      //language is English then Apply LTR
      dispatch(appDirection(false));
    } else if (lang === data[1].tabs[1].name) {
      //language is Arabic then Apply RTL
      dispatch(appDirection(true));
    }
  };
  const toogleTheme = (themeType: string) => {
    if (themeType == data[0].tabs[0].name) {
      dispatch(appTheme("dark"));
    } else if (themeType == data[0].tabs[1].name) {
      dispatch(appTheme("light"));
    }
  };

  return (
    <nav id="user-drop-down" ref={profileRef}>
      <div onClick={toggleMenu}>
        {user?.profilePictureURL ? (
          <img
            src={user?.profilePictureURL}
            alt="Profile picture"
            className="avatar"
          />
        ) : (
          <span className="avatar name">
            {user ? GetInitials(user?.firstName, user?.lastName) : "??"}
          </span>
        )}
      </div>

      <div className={`wrapper ${isMenuOpen ? "show" : ""}`} ref={modalRef}>
        <ul className={`menu-bar ${isMenuOpen ? "show-menu" : ""}`}>
          {data.map((tab, key) => (
            <li
              key={key}
              className={`setting-item ${
                showSubopt && tab.name === isDisplayOpen
                  ? "submenu submenu-open"
                  : ""
              }`}
              onClick={() => toggleDisplay(showSubopt ? "" : tab.name)}
            >
              {!showSubopt && (
                <a className="d-flex justify-space-between">
                  <div className="d-flex gap-5 list">
                    <div className="profile-img-icon">
                      {tab.icon ? (
                        <Icon
                          icon={tab?.icon}
                          height="20px"
                          className="list-img"
                          color="#64748B"
                        />
                      ) : (
                        <img
                          src={tab.svg?.toString()}
                          alt={tab.name}
                          height="20px"
                          className="list-img"
                        />
                      )}
                    </div>
                    <div className="text-arrow-align">
                      <div className="display-text">{tab.name}</div>
                    </div>
                  </div>
                  <Icon
                    icon="ic:sharp-chevron-right"
                    fontSize="24px"
                    color="#64748B"
                  />
                </a>
              )}
              {showSubopt && tab.name === isDisplayOpen && (
                <>
                  <li className="arrow" onClick={() => toggleDisplay("")}>
                    <div className="d-flex justify-space-between align-center">
                      <div>{tab.name}</div>
                      <Icon
                        icon="ic:sharp-chevron-left"
                        fontSize="24px"
                        color="#64748B"
                      />
                    </div>
                  </li>

                  {tab?.tabs &&
                    tab?.tabs.map((tb: any, subKey) => (
                      <li className="block-list submenu-item" key={subKey}>
                        <a
                          onClick={() => handleOnClickSubmenu(tab.key, tb.name)}
                        >
                          <div className="icon">
                            {tb?.icon ? (
                              <Icon
                                icon={tb?.icon}
                                className="fas fa-user"
                                color="#64748B"
                              />
                            ) : (
                              <img
                                src={tb?.svg.toString()}
                                alt={tab.name}
                                height="20px"
                                className="list-img"
                              />
                            )}
                          </div>
                          {tb.name}
                        </a>
                      </li>
                    ))}
                </>
              )}
            </li>
          ))}
          <hr />
          <div className="logout-wraper" onClick={handleLogout}>
            <li className="d-flex list">
              <div className="profile-img-icon">
                <Icon
                  icon="ic:twotone-logout"
                  className="list-img"
                  color="#64748B"
                />
              </div>
              Logout
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default UserDropDown;

