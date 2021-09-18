import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

function RegisterForm() {
  //USE CONTEXT
  const { registerUser } = useContext(AuthContext);

  //HISTORY ROUTER

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegister = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Password does not match",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
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
      <AlertMessage info={alert} />
      <Form className="mt-2" onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegister}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegister}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegister}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
