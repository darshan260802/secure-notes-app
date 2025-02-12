import { FormInstance, Tabs } from "antd";
import  { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { userLogin, userRegister } from "../api/auth";
import { useNavigate } from "react-router";
import { MessageInstance } from "antd/es/message/interface";

const Auth = ({messageApi}: {messageApi: MessageInstance}) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
  });
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
      children: (
        <Signup handleSignup={handleAuth} isLoading={state.isLoading} />
      ),
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
    messageApi.open({
      type: "loading",
      content:
        "name" in values && values.name
          ? "Creating Account..."
          : "Logging in...",
      duration: 0,
    });
    if ("name" in values && values.name) {
      userRegister({ ...values, name: values.name })
        .then((res) => {
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: res.data.message,
            duration: 2,
          });
          return

        })
        .catch((err) => {
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: err.response.data.message,
            duration: 2,
          });
          console.log(err.response.data.message);
        })
        .finally(() => {
          form?.resetFields();
          setState({ ...state, isLoading: false });
        });
    } else {
      userLogin(values)
        .then((res) => {
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: res.data.message,
            duration: 2,
          });
          navigate('/');
          return
        })
        .catch((err) => {
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: err.response.data.message,
            duration: 2,
          });
          console.log(err);
        })
        .finally(() => {
          form?.resetFields();
          setState({ ...state, isLoading: false });
        });
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth">
        <Tabs centered  items={tabItems} />
      </div>
    </div>
  );
};

export default Auth;
