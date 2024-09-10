import React from "react";
import { Button, Form, Input, InputNumber, Typography, DatePicker, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Use axios for API requests
import moment from "moment"; // For date formatting

const { Title } = Typography;

const CreateVoucherForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>(); // Retrieve eventId from URL
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: Record<string, any>) => {
    try {
      // Create form data object for API
      const voucherData = {
        code: values.code || "VOUCHER_CODE",
        qrCode: values.qrCode || "QR123",
        imgUrl: "http://example.com/voucher.jpg", // Placeholder image URL
        value: values.value,
        description: values.description,
        expiryDt: values.expiryDate.toISOString(),
        quantity: values.quantity,
        remainings: values.quantity,
        redeemMethod: "online", // Default method
      };

      // Send the voucher data to the API
      const response = await axios.post(`http://localhost:8888/sale-events/${eventId}/vouchers`, voucherData);

      if (response.status === 201) {
        notification.success({
          message: "Voucher Created",
          description: `The voucher for this event was successfully created.`,
          placement: "topRight",
        });

        // Redirect to the Event List page after voucher creation
        setTimeout(() => {
          navigate('/dashboard/events');
        }, 500);
      }
    } catch (error) {
      console.error("Error creating voucher:", error);
      notification.error({
        message: "Error",
        description: "Failed to create voucher. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <Form
      name="create-voucher"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Title level={1} className="text-center">
        Create Voucher
      </Title>

      <Form.Item
        label="Voucher Code"
        name="code"
        rules={[{ required: true, message: "Voucher code must not be empty!" }]}
      >
        <Input placeholder="Enter voucher code" />
      </Form.Item>

      <Form.Item
        label="QR Code"
        name="qrCode"
        rules={[{ required: true, message: "QR code must not be empty!" }]}
      >
        <Input placeholder="Enter QR code" />
      </Form.Item>

      <Form.Item
        label="Value"
        name="value"
        rules={[{ required: true, message: "Value must not be empty!" }]}
      >
        <Input placeholder="Enter voucher value" />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Quantity must not be empty!" }]}
      >
        <InputNumber min={0} placeholder="Enter quantity" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Expiry Date"
        name="expiryDate"
        rules={[{ required: true, message: "Expiry date must not be empty!" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Description must not be empty!" }]}
      >
        <Input.TextArea placeholder="Enter voucher description" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Voucher
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateVoucherForm;
