import { Button, Form, FormInstance, Input } from "antd";
import { useRef } from "react";

export default function Login({handleLogin, isLoading}: {handleLogin: (values: any, form: FormInstance) => void, isLoading: boolean}) {
  const form = useRef<FormInstance>(null);
  return (
    <div className="login-wrapper">
      <Form ref={form} wrapperCol={{ span: 25 }} onFinish={(values) => handleLogin(values, form.current as FormInstance)}>
        <Form.Item
          name={"email"}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
