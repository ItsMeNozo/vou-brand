import React from "react";
import { Button, Form, Input, Typography, DatePicker, Upload, Select, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Use axios for API requests
import styles from "./CreateEventForm.module.css";

const { Title } = Typography;
const { Option } = Select;

const CreateEventForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: Record<string, any>) => {
    try {
      console.log("Form values submitted: ", values);

      // Convert dates to ISO string format
      const startDt = values.startDate.format("YYYY-MM-DDTHH:mm:ss[Z]");
      const endDt = values.endDate.format("YYYY-MM-DDTHH:mm:ss[Z]");

      // Retrieve the brandName from localStorage (or wherever you store the user info)
      const storedUserData = localStorage.getItem('userData');
      const brandName = storedUserData ? JSON.parse(storedUserData).username : 'BrandX'; // Default to BrandX if missing

      // Create form data object for API
      const eventData = {
        eventName: values.eventName,
        brandName, // Use the dynamic brandName from localStorage
        description: values.description || "No description",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtv_hiH9Q5piSh8e45BgxCj6njAr-lX4Od2A&s", // Placeholder image URL
        gameType: values.gameType, // Selected game type (quiz or shaking)
        startDt,
        endDt,
        status: "upcoming", // Default status
      };

      console.log("Event data being sent: ", eventData); // Check the payload you're sending

      // Send the event data to the API
      const eventResponse = await axios.post('http://localhost:8888/sale-events/create', eventData);

      if (eventResponse.status === 201) {
        const createdEventId = eventResponse.data.eventId;

        // Display success notification
        notification.success({
          message: "Event Created Successfully",
          description: `The event "${values.eventName}" was successfully created.`,
          placement: "topRight",
          duration: 3,  // Optional: Display notification for 3 seconds
        });

        // Redirect to the Create Voucher page for this event
        navigate(`/dashboard/events/${createdEventId}/vouchers/create`);
      }
    } catch (error) {
      console.error("Error creating event:", error);

      // Display error notification
      notification.error({
        message: "Event Creation Failed",
        description: "Failed to create event. Please try again.",
        placement: "topRight",
        duration: 3,  // Optional: Display notification for 3 seconds
      });
    }
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
        label="Description"
        name="description"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Description must not be empty!" }]}
      >
        <Input
          className={`mb-1.5 ${styles["input-style"]}`}
          placeholder="Enter description"
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
        label="Game Type"
        name="gameType"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Please select a game type!" }]}
      >
        <Select placeholder="Select a game type">
          <Option value="quiz">Quiz</Option>
          <Option value="shaking">Shaking</Option>
        </Select>
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
