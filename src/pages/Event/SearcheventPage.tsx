import React, { useState } from "react";
import { Input, Table } from "antd";
import './SearchEventPage.css';

interface Event {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
}

const SearchEventPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

    const events: Event[] = [
        { id: 1, name: "Black Friday Sale", startDate: "2024-11-25", endDate: "2024-11-30", status: "Active" },
        { id: 2, name: "Christmas Sale", startDate: "2024-12-20", endDate: "2024-12-25", status: "Upcoming" },
        { id: 3, name: "New Year Sale", startDate: "2024-12-31", endDate: "2025-01-01", status: "Upcoming" },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term) {
            const results = events.filter(event =>
                event.name.toLowerCase().includes(term) ||
                event.startDate.includes(term) ||
                event.endDate.includes(term) ||
                event.status.toLowerCase().includes(term)
            );
            setFilteredEvents(results);
        } else {
            setFilteredEvents([]);
        }
    };

    return (
        <div className="search-events-page">
            <h1>Search Events</h1>
            <Input
                placeholder="Search by event name, date, or status"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <Table
                dataSource={filteredEvents}
                columns={[
                    { title: "Name", dataIndex: "name", key: "name" },
                    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
                    { title: "End Date", dataIndex: "endDate", key: "endDate" },
                    { title: "Status", dataIndex: "status", key: "status" }
                ]}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default SearchEventPage;
