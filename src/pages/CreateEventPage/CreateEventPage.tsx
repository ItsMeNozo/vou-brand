import React from 'react';
import CreateEventForm from '@/components/Event/CreateEventForm';
import './CreateEventPage.css';

const CreateEventPage: React.FC = () => {
  return (
    <div className="create-event-page">
      <CreateEventForm />
    </div>
  );
};

export default CreateEventPage;
