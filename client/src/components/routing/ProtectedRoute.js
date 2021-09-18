//LÀ HIGHER ORDER COMPONENT
import { Route, Redirect } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavBarMenu from "../layout/NavBarMenu";

const ProctectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavBarMenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProctectedRoute;
