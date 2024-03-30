import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import ErrorBoundary from "../layout/error/ErrorBoundary";
import Loader from "../layout/Loading/Loading";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from "../layout/footer/Footer";

const ProtectRoute = ({ Component, isProtected, ...props }) => {
  return isProtected ? (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
    />
        <Component {...props} />
        <Footer/>
      </Suspense>
    </ErrorBoundary>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectRoute;
