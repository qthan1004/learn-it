import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

function LoginForm() {
  //USE CONTEXT
  const { loginUser } = useContext(AuthContext);

  //HISTORY ROUTER
  const history = useHistory();

  const [loginForm, setLoginFrom] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);
  const { username, password } = loginForm;

  const onChangeLogin = (event) => {
    setLoginFrom({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);

      if (loginData.success) {
        history.push("/dashboard"); //login thành công -> đẩy đi tới dashboard
      } else {
        setAlert({ type: "danger", message: loginData.message });
        //CLEAR WARNING
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="mt-2" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLogin}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLogin}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
