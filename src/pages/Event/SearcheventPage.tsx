import React, { useState } from "react";
import { Input, Table, notification, Image } from "antd";
import axios from "axios";
import './SearchEventPage.css';

interface Voucher {
    voucherId: string;
    discountAmount: number;
    expirationDate: string;
}

interface Event {
    eventId: string;
    eventName: string;
    brandName: string;
    description: string;
    imgUrl: string;
    gameId: string;
    startDt: string;
    endDt: string;
    status: string;
    vouchers: {
        quantity: number;
        available: number;
    };
}

const SearchEventPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim()) {
            try {
                setLoading(true);
                // Make API request to search events
                const response = await axios.get(`http://localhost:8888/sale-events/search?input=${term}`);
                const results: Event[] = response.data;

                // Update state with the search results
                setFilteredEvents(results);
            } catch (error) {
                console.error('Error searching events:', error);
                notification.error({
                    message: 'Search Failed',
                    description: 'Unable to fetch search results. Please try again later.',
                });
            } finally {
                setLoading(false);
            }
        } else {
            // Clear the results if the search term is empty
            setFilteredEvents([]);
        }
    };

    return (
        <div className="search-events-page">
            <h1>Search Events</h1>
            <Input
                placeholder="Search by event name"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <Table
                dataSource={filteredEvents}
                columns={[
                    {
                        title: "Event Name",
                        dataIndex: "eventName",
                        key: "eventName",
                        render: (text: string, record: Event) => (
                            <div>
                                <strong>{text}</strong>
                            </div>
                        ),
                    },
                    {
                        title: "Image",
                        dataIndex: "imgUrl",
                        key: "imgUrl",
                        render: (imgUrl: string) => (
                            <Image src={imgUrl} alt="Event" width={100} />
                        ),
                    },
                   
                    {
                        title: "Start Date",
                        dataIndex: "startDt",
                        key: "startDt",
                        render: (date: string) => new Date(date).toLocaleDateString(),
                    },
                    {
                        title: "End Date",
                        dataIndex: "endDt",
                        key: "endDt",
                        render: (date: string) => new Date(date).toLocaleDateString(),
                    },
                    {
                        title: "Game Type",
                        dataIndex: "gameType",
                        key: "gameType",
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                    },
                ]}
                rowKey="eventId"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default SearchEventPage;
