import React, { useState, useEffect } from "react";
import { Card, Typography, Descriptions, Button, Spin, List, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // Lightweight date library
import styles from "./EventDetailPage.module.css";
const { Title } = Typography;

interface Voucher {
  voucherId: string;
  code: string;
  value: string;
  quantity: number;
  expiryDt: string;
  status: string;
  remainings: number;
}

interface Event {
  eventId: string;
  eventName: string;
  brandName: string;
  description: string;
  imgUrl: string;
  gameType: string;
  startDt: string;
  endDt: string;
  status: string;
  vouchers: Voucher[];
}

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8888/sale-events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details.");
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleUpdateEvent = () => {
    navigate(`/dashboard/events/update/${eventId}`);
  };

  const handleUpdateVoucher = (voucherId: string) => {
    navigate(`/dashboard/events/${eventId}/vouchers/update/${voucherId}`);
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.eventDetailPage}>
      <Title level={2} className={styles.title}>
        Event Details
      </Title>
      {event ? (
        <Card>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Event Name">{event.eventName}</Descriptions.Item>
            <Descriptions.Item label="Brand Name">{event.brandName}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{dayjs(event.startDt).format("YYYY-MM-DD")}</Descriptions.Item>
            <Descriptions.Item label="End Date">{dayjs(event.endDt).format("YYYY-MM-DD")}</Descriptions.Item>
            <Descriptions.Item label="Status">{event.status}</Descriptions.Item>
            <Descriptions.Item label="Game Type">{event.gameType}</Descriptions.Item>
            <Descriptions.Item label="Description">{event.description || "No description available"}</Descriptions.Item>
            <Descriptions.Item label="Image">
              <img src={event.imgUrl} alt="Event" className={styles.image} />
            </Descriptions.Item>
          </Descriptions>

          {/* Render Vouchers Section */}
          {event.vouchers.length > 0 ? (
            <>
              <Title level={4}>Vouchers</Title>
              <List
                bordered
                dataSource={event.vouchers}
                renderItem={(voucher) => (
                  <List.Item
                    actions={[
                      <Button type="link" onClick={() => handleUpdateVoucher(voucher.voucherId)}>
                        Update Voucher
                      </Button>,
                    ]}
                  >
                    <Descriptions column={1}>
                      <Descriptions.Item label="Voucher Code">{voucher.code}</Descriptions.Item>
                      <Descriptions.Item label="Value">{voucher.value}</Descriptions.Item>
                      <Descriptions.Item label="Quantity">{voucher.quantity}</Descriptions.Item>
                      <Descriptions.Item label="Remainings">{voucher.remainings}</Descriptions.Item>

                      <Descriptions.Item label="Expiry Date">
                        {dayjs(voucher.expiryDt).format("YYYY-MM-DD")}
                      </Descriptions.Item>
                    </Descriptions>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <p>No vouchers available for this event.</p>
          )}

          <div className={styles.buttonGroup}>
            <Button type="primary" onClick={handleUpdateEvent}>
              Update Event
            </Button>
          </div>
        </Card>
      ) : (
        <p>No event details found</p>
      )}
    </div>
  );
};

export default EventDetailPage;
