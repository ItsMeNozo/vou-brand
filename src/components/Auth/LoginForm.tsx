import React from "react";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "@/config/firebaseConfig";
import { signInWithCustomToken } from "firebase/auth"; // Import Firebase's signInWithCustomToken
import styles from "./LoginForm.module.css";

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: { email: string; password: string }) => {
    console.log("Login attempt:", values);

    try {
      // Send a request to your backend for login and custom token generation
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
      );

      if (response.data.success) {
        const { customToken, uid, role } = response.data.data;
        console.log(response.data.data);
        if (role !== "brand") {
          // If the user is not a brand, show an error message and do not proceed
          message.error("Invalid credentials");
          return;
        }

        // Use Firebase's signInWithCustomToken to sign the user in
        await signInWithCustomToken(auth, customToken);

        // Store UID in local storage or state for future use
        localStorage.setItem('uid', uid);

        message.success("Login successful!");
     
        navigate(`/dashboard/events`);
      } else {
        // Handle backend login failure
        message.error(
          response.data.message || "Login failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login. Please try again.");
    }
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
        <Checkbox>Remember me</Checkbox>
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

      <div className="mt-6 text-center">
        <span>Not registered yet? </span>
        <span
          style={{ fontWeight: "600", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Create an account
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
