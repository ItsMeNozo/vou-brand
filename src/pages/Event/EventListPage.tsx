import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './EventListPage.css';
import logo from "../../assets/logo.png"; // Placeholder or update with your image handling

interface Voucher {
    voucherId: string;
    value: string;
    quantity: number;
    description: string;
    imgUrl: string;
    expiryDt: string;
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

const EventListPage: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]); // To store fetched events
    const [brandFilter, setBrandFilter] = useState<string>(''); // Initialize as an empty string

    useEffect(() => {
      // Retrieve the stored user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        
        // Extract brandName or username from the userData object
        const brandName = userData.username; // Assuming the brand name is stored in the username field
        
        // Set the brandFilter state with the extracted brandName
        setBrandFilter(brandName);
      } else {
        console.error('User data not found in localStorage');
      }
    }, []); // The effect runs only once after the component is mounted

    // Fetch events using axios
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8888/sale-events'); // Your API endpoint
                const filteredEvents = response.data.filter((event: Event) => event.brandName === brandFilter);
                setEvents(filteredEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [brandFilter]);

    const handleCreateEvent = () => {
        navigate('/dashboard/events/create');
    };

    const handleSearchEvents = () => {
        navigate('/dashboard/events/search');
    };

    const handleEventClick = (eventId: string) => {
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
                        
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Game Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.eventId} onClick={() => handleEventClick(event.eventId)} className="clickable-row">
                                <td className="highlighted-name">{event.eventName}</td>
                                <td><img src={event.imgUrl} alt={event.eventName} className="event-image" /></td>
                                
                               
                                <td>{new Date(event.startDt).toLocaleDateString()}</td>
                                <td>{new Date(event.endDt).toLocaleDateString()}</td>
                                <td>{event.gameType}</td>
                                <td>{event.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>No events found for this brand.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EventListPage;
