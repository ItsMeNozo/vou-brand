import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventListPage.css';
import logo from "../../assets/logo.png";

interface Event {
    id: number;
    name: string;
    image: string;
    voucherQuantity: number;
    startDate: string;
    endDate: string;
    gameType: string;
    status: string;
}

const EventListPage: React.FC = () => {
    const navigate = useNavigate();

    const events: Event[] = [
        {
            id: 1,
            name: "Black Friday Sale",
            image: logo,
            voucherQuantity: 100,
            startDate: "2024-11-25",
            endDate: "2024-11-30",
            gameType: "Spin the Wheel",
            status: "Active"
        },
        {
            id: 2,
            name: "Christmas Sale",
            image: logo,
            voucherQuantity: 50,
            startDate: "2024-12-20",
            endDate: "2024-12-25",
            gameType: "Quiz",
            status: "Upcoming"
        },
        {
            id: 3,
            name: "New Year Sale",
            image: logo,
            voucherQuantity: 75,
            startDate: "2024-12-31",
            endDate: "2025-01-01",
            gameType: "Treasure Hunt",
            status: "Upcoming"
        },
    ];

    const handleCreateEvent = () => {
        navigate('/dashboard/events/create');
    };

    const handleSearchEvents = () => {
        navigate('/dashboard/events/search');
    };

    const handleEventClick = (eventId: number) => {
        navigate(`/dashboard/events/${eventId}`);
    };

    return (
        <div className="event-list-page">
            <h1>Event Management</h1>
            <div className="event-actions">
                <button className="create-event-button" onClick={handleCreateEvent}>
                    Create Event
                </button>
                <button className="search-event-button" onClick={handleSearchEvents}>
                    Tra cứu sự kiện
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Voucher Quantity</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Game Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id} onClick={() => handleEventClick(event.id)} className="clickable-row">
                            <td className="highlighted-name">{event.name}</td>
                            <td><img src={event.image} alt={event.name} className="event-image" /></td>
                            <td>{event.voucherQuantity}</td>
                            <td>{event.startDate}</td>
                            <td>{event.endDate}</td>
                            <td>{event.gameType}</td>
                            <td>{event.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventListPage;
