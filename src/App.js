import React from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, Signin, Signup, Browse } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

export default function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      {/* IsUserRedirect basically gives you Route of Signin component if you're not logged in, and if you have logged in and try to access signin or signup then it will redirect you to the browse page */}
      <IsUserRedirect
        exact
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGNIN}
      >
        <Signin />
      </IsUserRedirect>

      <IsUserRedirect
        exact
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGNUP}
      >
        <Signup />
      </IsUserRedirect>
      {/* browse page is the protected page so we have access to it only if we are signed in */}

      <ProtectedRoute exact path={ROUTES.BROWSE} user={user}>
        <Browse />
      </ProtectedRoute>
      {/* If the user is logged in, then it will take to Browse page (loggedInPath), else it will give back the children, meaning it will take us back to home page  */}
      <IsUserRedirect
        user={user}
        exact
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.HOME}
      >
        <Home />
      </IsUserRedirect>
      {/* default route to home page */}
      <Redirect to="/" />
    </Router>
  );
}
