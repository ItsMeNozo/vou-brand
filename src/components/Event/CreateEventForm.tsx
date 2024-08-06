import React from "react";
import { Button, Form, Input, Typography, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEventForm.module.css";

const { Title } = Typography;

const CreateEventForm: React.FC = () => {
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
      name="create-event"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["create-event-form"]}
      form={form}
    >
      <Title level={1} className="text-center">
        Create Event
      </Title>

      <Form.Item
        label="Event Name"
        name="eventName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Event name must not be empty!" }]}
      >
        <Input
          className={`mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter event name"
        />
      </Form.Item>

      <Form.Item
        label="Picture"
        name="picture"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Upload>
          <Button icon={<UploadOutlined />}>Upload Picture</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Voucher Amount"
        name="voucherAmount"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          { required: true, message: "Voucher amount must not be empty!" },
          { type: "number", message: "Voucher amount is invalid!" },
        ]}
      >
        <Input
          type="number"
          className={`mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter voucher amount"
        />
      </Form.Item>

      <Form.Item
        label="Start Date"
        name="startDate"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Start date must not be empty!" }]}
      >
        <DatePicker className={`mb-1.5 ${styles["input-style"]}`} />
      </Form.Item>

      <Form.Item
        label="End Date"
        name="endDate"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "End date must not be empty!" }]}
      >
        <DatePicker className={`mb-1.5 ${styles["input-style"]}`} />
      </Form.Item>

      <Form.Item
        label="Voucher Setup"
        name="voucherSetup"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Voucher setup must not be empty!" }]}
      >
        <Input
          className={`mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter voucher setup"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={`${styles["btn-style"]} justify-center"`}
          block
        >
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEventForm;
