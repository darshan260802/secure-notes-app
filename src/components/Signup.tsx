import { Button, Form, FormInstance, Input } from "antd";
import { useRef } from "react";

export default function Signup({
  handleSignup,
  isLoading,
}: {
  handleSignup: (values: any, form: FormInstance) => void;
  isLoading: boolean;
}) {
  const form = useRef<FormInstance>(null);
  return (
    <div className="login-wrapper">
      <Form
        onFinish={(values) =>
          handleSignup(values, form.current as FormInstance)
        }
        wrapperCol={{ span: 25 }}
      >
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
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
          <Button type="primary" htmlType="submit" block disabled={isLoading}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
