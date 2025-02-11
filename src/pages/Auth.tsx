import { FormInstance, Tabs } from "antd";
import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { userLogin, userRegister } from "../api/auth";

const Auth: React.FC = () => {

  const [state, setState] = useState({
    isLoading: false
  })
  const tabItems = [
    {
      label: "Login",
      key: "login",
      disabled: state.isLoading,
      children: <Login handleLogin={handleAuth} isLoading={state.isLoading} />,
    },
    {
      label: "Sign Up",
      disabled: state.isLoading,
      key: "signup",
      children: <Signup handleSignup={handleAuth} isLoading={state.isLoading} />,
    },
  ];

  function handleAuth(
    values: {
      email: string;
      password: string;
      name?: string;
    },
    form: FormInstance
  ) {
    setState({ ...state, isLoading: true });
    if ("name" in values && values.name) {
      userRegister({ ...values, name: values.name })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          setState({ ...state, isLoading: false });
        });
    } else {
      userLogin(values)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          setState({ ...state, isLoading: false });
        });
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth">
        <Tabs centered items={tabItems} />
      </div>
    </div>
  );
};

export default Auth;
