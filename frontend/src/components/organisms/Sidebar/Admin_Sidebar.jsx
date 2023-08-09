import React, { useEffect, useState } from "react";
import "./styles.css";
import "./module.style.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { Text, Grid, Avatar, Dropdown, Input, Spacer, Image, Navbar } from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { GetUserSettings } from "api/auth";
import { SignedUrl } from "api/files";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import Appconfig from "config/Appconfig";

function Admin_Sidebar() {
  const [phone, setPhone] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Clickedon, setClickedon] = useState(1);
  const [PhotoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const urlPath = window.location.pathname;

    if (urlPath === "/admin/dashboard") {
      setClickedon(1);
    } else if (urlPath === "/admin/customers") {
      setClickedon(2);
    } else if (urlPath === "/admin/orders") {
      setClickedon(3);
    } else if (urlPath === "/admin/payment") {
      setClickedon(4);
    } else if (urlPath === "/admin/account") {
      setClickedon(5);
    }

    GetUserSettings().then((res) => {
      setFirstName(res.body.firstName);
      setLastName(res.body.lastName);
      setEmail(res.body.email);
      setPhone(res.body.phone);
      console.log(res.body);
      if (res.body.photoUrl !== null) {
        const data = {
          key: res.body.photoUrl,
        };
        SignedUrl(data).then((res) => {
          setPhotoUrl(res.text);
        });
      } else setPhotoUrl("https://i.ibb.co/5T3yFw9/user-318-159711.png");
    });

    const body = document.querySelector("body"),
      sidebar = body.querySelector("nav"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

    const handleToggleClick = () => {
      sidebar.classList.toggle("close");
    };

    const handleSearchClick = () => {
      sidebar.classList.remove("close");
    };

    const handleModeClick = () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
    };

    searchBtn.addEventListener("click", handleSearchClick);
    modeSwitch.addEventListener("click", handleModeClick);

    // Cleanup the event listeners when the component unmounts
    return () => {
      searchBtn.removeEventListener("click", handleSearchClick);
      modeSwitch.removeEventListener("click", handleModeClick);
    };
  }, []);

  const HandleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  const handleActions = (actionKey) => {
    if (actionKey === "logout") {
      HandleLogout();
    }
  };

  const HandleSelected = (index) => {
    setClickedon(index);
  };

  return (
    <React.Fragment>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <Image src={Appconfig.app_logo} />
            </span>

            <div className="text logo-text">
              <span className="name">LOGO</span>
              <span className="profession">Admin Dashboard</span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." style={{ backgroundColor: "#252E3E" }} />
            </li>
            <Spacer y={0.5} />
            <ul className="menu-links">
              <li
                className={`nav-link ${Clickedon === 1 ? "activeSelect" : ""}`}
                onClick={() => {
                  HandleSelected(1);
                }}
              >
                <Link to="/admin/dashboard">
                  <i className="bx bxs-bar-chart-alt-2 icon" style={{ color: Clickedon === 1 ? "#6366F1" : "" }}></i>

                  <span className="text nav-text" style={{ color: Clickedon === 1 ? "#fff" : "" }}>
                    Overview
                  </span>
                </Link>
              </li>

              <li
                className={`nav-link ${Clickedon === 2 ? "activeSelect" : ""}`}
                onClick={() => {
                  HandleSelected(2);
                }}
              >
                <Link to="/admin/customers">
                  <i className="icon" style={{ color: Clickedon === 2 ? "#6366F1" : "" }}>
                    <HiUsers />
                  </i>
                  <span className="text nav-text" style={{ color: Clickedon === 2 ? "#fff" : "" }}>
                    Customers
                  </span>
                </Link>
              </li>

              <li
                className={`nav-link ${Clickedon === 3 ? "activeSelect" : ""}`}
                onClick={() => {
                  HandleSelected(3);
                }}
              >
                <Link to="/admin/orders">
                  <i className="icon" style={{ color: Clickedon === 3 ? "#6366F1" : "" }}>
                    <BsFillBoxSeamFill />
                  </i>
                  <span className="text nav-text" style={{ color: Clickedon === 3 ? "#fff" : "" }}>
                    Orders
                  </span>
                </Link>
              </li>

              <li
                className={`nav-link ${Clickedon === 4 ? "activeSelect" : ""}`}
                onClick={() => {
                  HandleSelected(4);
                }}
              >
                <Link to="/admin/payment">
                  <i className="icon" style={{ color: Clickedon === 4 ? "#6366F1" : "" }}>
                    <MdOutlineAttachMoney />
                  </i>

                  <span className="text nav-text" style={{ color: Clickedon === 4 ? "#fff" : "" }}>
                    Products
                  </span>
                </Link>
              </li>

              <li
                className={`nav-link ${Clickedon === 6 ? "activeSelect" : ""}`}
                onClick={() => {
                  HandleSelected(6);
                }}
              >
                <Link to="/home/settings">
                  <i className="bx bxs-user icon" style={{ color: Clickedon === 6 ? "#6366F1" : "" }}></i>
                  <span className="text nav-text" style={{ color: Clickedon === 6 ? "#fff" : "" }}>
                    Account
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a onClick={HandleLogout}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
      <Grid className="home">
        <Navbar variant="sticky" maxWidth={"fluid"}>
          <Grid>
            <Input
              clearable
              contentLeft={<FiSearch size={16} />}
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Grid>
          <Grid css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Dropdown placement="bottom-right">
              <Dropdown.Trigger css={{ cursor: "pointer" }}>
                <Grid>
                  <IoMdNotificationsOutline size="26px" color="#4361ee" />
                </Grid>
              </Dropdown.Trigger>
              <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={(actionKey) => handleActions(actionKey)}>
                <Dropdown.Item key="1">
                  <Text size={15} color="inherit">
                    It is a long established fact that...
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="2" withDivider>
                  <Text size={15} color="inherit">
                    It is a long established fact that...
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="3" withDivider>
                  <Text size={15} color="inherit">
                    It is a long established fact that...
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="4" withDivider>
                  <Text size={15} color="inherit">
                    It is a long established fact that...
                  </Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Spacer x={1} />
            <Dropdown placement="bottom-right">
              <Dropdown.Trigger>
                <Avatar bordered as="button" color="primary" size="md" src={PhotoUrl} />
              </Dropdown.Trigger>
              <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={(actionKey) => handleActions(actionKey)}>
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {Email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  <Link to="/home/settings">My Settings</Link>
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  <Link to="/home/contact">Help & Feedback</Link>
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Navbar>
      </Grid>
    </React.Fragment>
  );
}

export default Admin_Sidebar;
