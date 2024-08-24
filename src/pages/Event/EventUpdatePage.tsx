import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EventUpdatePage.module.css";
import dayjs from 'dayjs'; // Lightweight date library

const EventUpdatePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details to pre-fill the form
    const fetchEventDetails = async () => {
      const data = {
        name: "Black Friday Sale",
        image: "../../assets/eventImage.png",
        voucherAmount: 100,
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        description: "This is the biggest sale event of the year.",
      };

      // Convert string dates to dayjs objects
      form.setFieldsValue({
        ...data,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
      });
    };

    fetchEventDetails();
  }, [eventId, form]);

  const handleUpdateEvent = (values: any) => {
    console.log("Updated values:", values);
    // Simulate the update logic here (e.g., API call)
    message.success("Event updated successfully!");
    navigate(`/dashboard/events/${eventId}`); // Navigate back to the event detail page after update
  };

  const handleCancel = () => {
    navigate(`/dashboard/events/${eventId}`);
  };

  return (
    <div className={styles.updateEventPage}>
      <h1>Update Event</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateEvent}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Event Name"
          name="name"
          rules={[{ required: true, message: "Please input the event name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Voucher Amount"
          name="voucherAmount"
          rules={[{ required: true, message: "Please input the voucher amount!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please select the start date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: "Please select the end date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Event
          </Button>
          <Button type="default" onClick={handleCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventUpdatePage;
