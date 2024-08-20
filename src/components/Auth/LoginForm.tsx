import React from "react";
import { Button, Checkbox, Form, Input, Typography, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
const { Title } = Typography;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values: unknown) => {
    console.log(values);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["login-form"]}
      form={form}
    >
      <Title level={1} className="text-center">
        Log in to your account
      </Title>

      <Form.Item
        label="Email"
        name="email"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          { required: true, message: "Email must not be empty!" },
          { type: "email", message: "Email is invalid!" },
        ]}
      >
        <Input
          className={`mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: "Password must not be empty!",
          },
          {
            min: 6,
            message: "Password must be at least 6 characters!",
          },
        ]}
      >
        <Input.Password
          className={`mb-1 ${styles["input-style"]}`}
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Flex className="mt-3" justify="space-between">
          <Checkbox>Remember me</Checkbox>
          <span
            style={{ fontWeight: "500", cursor: "pointer" }}
            onClick={() => navigate("/auth/forgot-password")}
          >
            Forgot password ?
          </span>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={`${styles["btn-style"]} justify-center"`}
          block
        >
          Log in to your account
        </Button>
      </Form.Item>

      <Flex className="!mt-6" justify="center" gap="small">
        <span className={styles[""]}>Not registered yet?</span>
        <span
          style={{ fontWeight: "600", cursor: "pointer" }}
          onClick={() => navigate("/auth/register")}
        >
          Create an account
        </span>
      </Flex>
    </Form>
  );
};

export default LoginForm;
