import React from "react";
import { Button, Form, Input, Typography, Select, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

const { Title } = Typography;
const { Option } = Select;

const RegisterForm: React.FC = () => {
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
            min: 8,
            message: "Password must be at least 8 characters!",
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
        name="password-confirm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Password confirm must not be empty!",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Password does not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter your password"
        />
      </Form.Item>
      <Divider className="!my-12" />
      {/* Brand Registration Fields */}
      <Title level={2} className="!text-left">
        Brand information
      </Title>

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
        label="Latitude"
        name="latitude"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Latitude must not be empty!" }]}
      >
        <Input
          className={`mb-3 ${styles["input-style"]}`}
          placeholder="Enter latitude"
        />
      </Form.Item>

      <Form.Item
        label="Longitude"
        name="longitude"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Longitude must not be empty!" }]}
      >
        <Input
          className={`mb-3 ${styles["input-style"]}`}
          placeholder="Enter longitude"
        />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Status must not be empty!" }]}
      >
        <Select
          className={`!mb-1.5 ${styles["input-style"]}`}
          placeholder="Select status"
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="!mt-6 !h-11" block>
          Create your account
        </Button>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "center", gap: "small" }}>
        <span>Already have an account? </span>
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
