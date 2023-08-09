import React, { useState, useEffect } from "react";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "components/organisms/navbar";
import LandingPage from "pages/LandingPage";
import ButtomNavigation from "components/organisms/Footer";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import EmailConfirmation from "pages/Auth/Confirmation";
import About from "pages/Others/About";
import Privacy from "pages/Others/Privacy";
import Dashboard from "pages/Home/Dashboard";
import Upload from "pages/Home/Upload";
import Favorites from "pages/Home/Favorites";
import Orders from "pages/Home/Orders";
import Settings from "pages/Home/Settings";
import Services from "pages/Others/Services";
import Pracing from "pages/Others/Pracing";

import Error_404 from "pages/Errors/Error_404/404";

import Admin_dashboard from "pages/Admin/Dashboard";
import Admin_login from "pages/Admin/Login";
import Customers from "pages/Admin/Customers";
import Admin_orders from "pages/Admin/Orders";
import Admin_payment from "pages/Admin/Payment";

import Wizard_navbar from "components/organisms/Wizard_navbar";
import Wizard_upload from "pages/Wizard/Upload";
import Wizard_filter from "pages/Wizard/Filter";
import Wizard_products from "pages/Wizard/Products";
import Wizard_details from "pages/Wizard/Details";
import Wizard_checkout from "pages/Wizard/Checkout";

import Confirmation from "pages/Confirmation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute, AdminRoute, FlexRoute } from "Utils/PrivateRoute";
import { GetAuthMe } from "api/auth";
import { store } from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";

function HandleContinueStatus() {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Checking if user is logged in");
    let token = localStorage.getItem("jwtToken");
    console.log(token);
    if (token) {
      GetAuthMe()
        .then((res) => {
          console.log(res);
          if (res.status !== 200) {
            localStorage.removeItem("jwtToken");
            dispatch({ type: "SET_LOGIN", payload: false });
            window.location.href = "/auth/login";
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwtToken");
          dispatch({ type: "SET_LOGIN", payload: false });
          window.location.href = "/auth/login";
        });
    }
    // else if (isLogin) {
    //   dispatch({ type: "SET_LOGIN", payload: false });
    //   window.location.href = "/auth/login";
    // }
  }, []);
  return null;
}

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWizard, setIsWizard] = useState(false);
  const [Datastep, setDatastep] = useState({});
  const [ImgPath, setImgPath] = useState("");
  const [SelectedImg, setSelectedImg] = useState(null);
  const [ContinueStatus, setContinueStatus] = useState(false);
  const [PreDetailsData, setPreDetailsData] = useState({});
  const [PreCheckoutData, setPreCheckoutData] = useState({});

  const [current, setCurrent] = useState(1);

  const handlestep = (step) => {
    setCurrent(step);
  };

  return (
    <Provider store={store}>
      <HandleContinueStatus />
      <NextUIProvider>
        <Router>
          <Navigation show={showNavbar} isAdmin={isAdmin} />
          <Wizard_navbar isWizard={isWizard} current={current} setCurrent={setCurrent} ContinueStatus={ContinueStatus} />
          <Routes>
            <Route exact path="/auth/login" element={<Login />} />
            <Route exact path="/confirm-email/*" element={<EmailConfirmation />} />
            <Route path="/*" element={<Error_404 setShowNavbar={setShowNavbar} />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/home/dashboard" element={<Dashboard />} />
              <Route exact path="/home/upload" element={<Upload />} />
              <Route exact path="/home/favorites" element={<Favorites />} />
              <Route exact path="/home/orders" element={<Orders />} />
              <Route exact path="/home/Settings" element={<Settings />} />
            </Route>
            <Route element={<FlexRoute />}>
              <Route
                exact
                path="/wizard/upload"
                element={
                  <Wizard_upload
                    wizardProps={{
                      setShowNavbar,
                      setIsWizard,
                      setDatastep,
                      setImgPath,
                      setContinueStatus,
                    }}
                  />
                }
              />
              <Route
                exact
                path="/wizard/filter"
                element={<Wizard_filter wizardProps={{ setShowNavbar, setIsWizard, setDatastep, Datastep, ImgPath, setSelectedImg }} />}
              />
              <Route
                exact
                path="/wizard/products"
                element={
                  <Wizard_products wizardProps={{ setShowNavbar, setIsWizard, Datastep, SelectedImg, setPreDetailsData, setContinueStatus }} />
                }
              />
              <Route
                exact
                path="/wizard/details"
                element={
                  <Wizard_details
                    wizardProps={{ setShowNavbar, setIsWizard, setContinueStatus, Datastep, SelectedImg, PreDetailsData, setPreCheckoutData }}
                  />
                }
              />
              <Route
                exact
                path="/wizard/checkout"
                element={<Wizard_checkout wizardProps={{ setShowNavbar, setIsWizard, Datastep, PreCheckoutData }} />}
              />
              <Route exact path="/confirmation" element={<Confirmation wizardProps={{ setShowNavbar, setIsWizard }} />} />
            </Route>
            <Route exact path="/auth/admin/login" element={<Admin_login setShowNavbar={setShowNavbar} />} />
            <Route element={<AdminRoute />}>
              <Route exact path="/admin/dashboard" element={<Admin_dashboard setIsAdmin={setIsAdmin} />} />
              <Route exact path="/admin/customers" element={<Customers setIsAdmin={setIsAdmin} />} />
              <Route exact path="/admin/orders" element={<Admin_orders setIsAdmin={setIsAdmin} />} />
              <Route exact path="/admin/payment" element={<Admin_payment setIsAdmin={setIsAdmin} />} />
            </Route>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/auth/register" element={<Register />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/pracing" element={<Pracing />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/privacy_policy" element={<Privacy />} />
          </Routes>
          <ToastContainer />
          <footer>
            <ButtomNavigation />
          </footer>
        </Router>
      </NextUIProvider>
    </Provider>
  );
}

export default App;
