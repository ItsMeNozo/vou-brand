import React, { useState, useEffect } from "react";
import { Card, Typography, Descriptions, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EventDetailPage.module.css";
import logo from "../../assets/logo.png";
const { Title } = Typography;

interface Event {
  id: string;
  name: string;
  image: string;
  voucherAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
}

const EventDetailPage: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details from API or data source
    const fetchEventDetails = async () => {
      const data: Event = {
        id: eventId || "1",
        name: "Black Friday Sale",
        image: logo, // Placeholder image
        voucherAmount: 100,
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        status: "Active",
        description: "This is the biggest sale event of the year.",
      };
      setEvent(data);
    };

    fetchEventDetails();
  }, [eventId]);

  const handleUpdateEvent = () => {
    navigate(`/dashboard/events/update/${eventId}`);
  };

  const handleSearchRelatedEvents = () => {
    navigate('/dashboard/events/search');
  };

  return (
    <div className={styles.eventDetailPage}>
      <Title level={2} className={styles.title}>
        Event Details
      </Title>
      {event ? (
        <Card>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Event Name">{event.name}</Descriptions.Item>
            <Descriptions.Item label="Voucher Amount">{event.voucherAmount}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{event.startDate}</Descriptions.Item>
            <Descriptions.Item label="End Date">{event.endDate}</Descriptions.Item>
            <Descriptions.Item label="Status">{event.status}</Descriptions.Item>
            <Descriptions.Item label="Description">{event.description}</Descriptions.Item>
            <Descriptions.Item label="Image">
              <img src={event.image} alt="Event" className={styles.image} />
            </Descriptions.Item>
          </Descriptions>
          <div className={styles.buttonGroup}>
            <Button type="primary" onClick={handleUpdateEvent}>
              Update Event
            </Button>
            <Button type="default" onClick={handleSearchRelatedEvents}>
              Tra cứu sự kiện
            </Button>
          </div>
        </Card>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventDetailPage;
