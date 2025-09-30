import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "./pages/error/PageNotFound";
import SignUp from "./pages/authentication/SignUp";
import AuthLayout from "./pages/authentication/AuthLayout";
import TermsAndConditions from "./pages/authentication/TermsAndConditions";
import Login from "./pages/authentication/Login";
import RestrictedRoute from "./pages/authentication/RestrictedRoute";
import ProtectedRoute from "./pages/authentication/ProtectedRoute";
import ResetPassword from "./pages/authentication/ResetPassoword";
import UserLayout from "./pages/user/Userlayout";
import Profile from "./pages/user/Profile";
import roles from "./constants/roles";
import SupportLayout from "./pages/support/SupportLayout";
import GetInTouch from "./pages/support/GetInTouch";
import Faqs from "./pages/support/Faqs";
import Settings from "./pages/user/Settings";
import ListYourProperty from "./pages/listProperty/ListYourProperty";
import AdminLayout from "./pages/admin/AdminLayout";
import PropertyRequests from "./pages/admin/PropertyRequests";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path="user"
          element={
            <ProtectedRoute
              element={<UserLayout />}
              roles={[roles.ROLE_USER]}
            />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="support" element={<SupportLayout />}>
          <Route path="get-in-touch" element={<GetInTouch />} />
          <Route path="faqs" element={<Faqs />} />
        </Route>
        <Route
          path="admin"
          element={
            <ProtectedRoute
              element={<AdminLayout />}
              roles={[roles.ROLE_ADMIN]}
            />
          }
        >
          <Route path="property-requests" element={<PropertyRequests />} />
        </Route>
        <Route
          path="list-your-property"
          element={
            <ProtectedRoute
              element={<ListYourProperty />}
              roles={[roles.ROLE_USER]}
            />
          }
        />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="signup"
          element={<RestrictedRoute element={<SignUp />} />}
        />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="login" element={<RestrictedRoute element={<Login />} />} />
        <Route
          path="forgot-password"
          element={<RestrictedRoute element={<ResetPassword />} />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
