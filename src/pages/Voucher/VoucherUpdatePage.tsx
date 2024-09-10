import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // Lightweight date library

const VoucherUpdatePage: React.FC = () => {
  const { eventId, voucherId } = useParams<{ eventId: string; voucherId: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch voucher details to pre-fill the form
    const fetchVoucherDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/sale-events/${eventId}/vouchers/${voucherId}`);
        const data = response.data.data; // Accessing the nested data object

        // Set the form values with the fetched voucher details
        form.setFieldsValue({
          voucherCode: data.code,
          value: data.value,
          quantity: data.quantity,
          description: data.description,
          expiryDt: dayjs(data.expiryDt),
        });
      } catch (error) {
        message.error("Failed to load voucher details.");
      }
    };

    fetchVoucherDetails();
  }, [eventId, voucherId, form]);

  const handleUpdateVoucher = async (values: any) => {
    try {
      setLoading(true);
      const updateData = {
        ...values,
        expiryDt: values.expiryDt.format("YYYY-MM-DD"),
      };

      // Make the PATCH request to update the voucher
      await axios.patch(`http://localhost:8888/sale-events/${eventId}/vouchers/${voucherId}`, updateData);
      message.success("Voucher updated successfully!");

      // Navigate back to the event detail page after update
      navigate(`/dashboard/events/${eventId}`);
    } catch (error) {
      message.error("Failed to update the voucher.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVoucher = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`http://localhost:8888/sale-events/${eventId}/vouchers/${voucherId}`);
      message.success("Voucher deleted successfully!");
      
      // Navigate back to the event detail page after deletion
      navigate(`/dashboard/events/${eventId}`);
    } catch (error) {
      message.error("Failed to delete the voucher.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this voucher?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No",
      onOk: handleDeleteVoucher,
    });
  };

  const handleCancel = () => {
    navigate(`/dashboard/events/${eventId}`);
  };

  return (
    <div>
      <h1>Update Voucher</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateVoucher}
      >
        {/* Editable Fields */}
        <Form.Item
          label="Voucher Code"
          name="voucherCode"
          rules={[{ required: true, message: "Please input the voucher code!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[{ required: true, message: "Please input the voucher value!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Expiry Date"
          name="expiryDt"
          rules={[{ required: true, message: "Please select the expiry date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Voucher
          </Button>
          <Button type="default" onClick={handleCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </Button>
          <Button type="dashed" onClick={confirmDelete} loading={deleteLoading} style={{ marginLeft: "10px" }}>
            Delete Voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VoucherUpdatePage;
