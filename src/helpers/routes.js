import React from "react";
import { Route, Redirect } from "react-router-dom";

// this function redirects a logged in user to the browse page if he tries to access sign in / sign out page
export function IsUserRedirect({ user, loggedInPath, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={() => {
        if (!user) {
          return children;
        }
        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }
        return null;
      }}
    />
  );
}

// this function protects the browse page. If user is not signed in, the user is redirected to sign in page / sign up page (back to the page he came from) if he tries to access browse page

export function ProtectedRoute({ user, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        // location is an obj that holds pathname and other things. pathname is the current location
        if (user) {
          console.log("USER LOGGED IN " + location.pathname);
          return children; // here it returns the browse page if children passed is Browse if the user is logged in. Else if the user is not logged in, he will be redirected to where he came from (using state param )
        }
        if (!user) {
          console.log("USER LOGGED OUT " + location.pathname);

          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}
