import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EventUpdatePage.module.css";
import dayjs from "dayjs"; // Lightweight date library

const { Option } = Select;

const EventUpdatePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch event details to pre-fill the form
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/sale-events/${eventId}`);
        const data = response.data;

        // Convert string dates to dayjs objects for date fields
        form.setFieldsValue({
          ...data,
          startDate: dayjs(data.startDate),
          endDate: dayjs(data.endDate),
        });
      } catch (error) {
        message.error("Failed to load event details.");
      }
    };

    fetchEventDetails();
  }, [eventId, form]);

  const handleUpdateEvent = async (values: any) => {
    try {
      setLoading(true);
      const updateData = {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
      };

      // Make the PATCH request to update the event
      await axios.patch(`http://localhost:8888/sale-events/${eventId}`, updateData);
      message.success("Event updated successfully!");

      // Navigate back to the event detail page after update
      navigate(`/dashboard/events/${eventId}`);
    } catch (error) {
      message.error("Failed to update the event.");
    } finally {
      setLoading(false);
    }
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
        {/* Editable Fields */}
        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[{ required: true, message: "Please input the event name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
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
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select>
            <Option value="upcoming">Upcoming</Option>
            <Option value="happening">Happening</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>

        {/* Read-only Fields */}
        <Form.Item
          label="Brand Name"
          name="brandName"
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Game Type"
          name="gameType"
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imgUrl"
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
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
