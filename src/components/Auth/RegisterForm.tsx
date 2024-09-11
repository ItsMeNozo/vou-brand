import React from "react";
import { Button, Form, Input, Typography, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import axios from "axios";

const { Title } = Typography;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    brandName: string;
    industry: string;
    address: string;
    phoneNumber: string;
  }) => {
    try {
      console.log(values);

      const response = await axios.post(
        `${import.meta.env.VITE_API_GATEWAY_URL}/api/user`,
        {
          email: values.email,
          password: values.password,
          role: "brand",
          userDetails: {
            username: values.username,
            fullname: values.brandName,
            phoneNumber: values.phoneNumber,
            industry: values.industry,
            address: values.address,
          },
        },
      );

      if (response.data.success) {
        message.success("Sign up successful! Please verify your email.");
        navigate("/login");
      } else {
        message.error("Registration failed. Please try again.");
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("An error occurred during registration.");
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={`${styles["register-form"]} !my-8`}
      form={form}
    >
      <Title level={2} className="!text-left">
        Account information
      </Title>

      {/* User Account Fields */}
      <Form.Item
        label="Email"
        name="email"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: "Email must not be empty!",
          },
          {
            type: "email",
            message: "Email format is not valid!",
          },
        ]}
      >
        <Input
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: "Username must not be empty!",
          },
        ]}
      >
        <Input
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter your username"
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
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Password confirm must not be empty!",
          },
          {
            min: 6,
            message: "Password must be at least 6 characters!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Confirm your password"
        />
      </Form.Item>
      <Divider className="!my-12" />

      <Form.Item
        label="Brand Name"
        name="brandName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Brand name must not be empty!" }]}
      >
        <Input
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter brand name"
        />
      </Form.Item>

      <Form.Item
        label="Industry"
        name="industry"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Industry must not be empty!" }]}
      >
        <Input
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter industry"
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Address must not be empty!" }]}
      >
        <Input
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter address"
        />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phoneNumber"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: false }]}
      >
        <Input
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="123-456-7890"
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="!mt-6 !h-11" block>
          Create your account
        </Button>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "center", gap: "small" }}>
        <span className="mr-2">Already have an account? </span>

        <span
          style={{ fontWeight: "600", cursor: "pointer" }}
          onClick={() => navigate("/auth/login", { replace: true })}
        >
          Log in
        </span>
      </div>
    </Form>
  );
};

export default RegisterForm;
