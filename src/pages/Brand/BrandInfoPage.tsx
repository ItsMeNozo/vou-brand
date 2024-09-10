import React, { useState, useEffect } from 'react';
import { Card, Typography, Descriptions, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API requests

const { Title } = Typography;

interface User {
  username: string;
  fullname: string;
  phoneNumber: string;
  industry: string;
  address: string;
  status: string;
  role: string;
  verified: boolean;
}

const BrandInfoPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve UID from localStorage or global context
    const uid = localStorage.getItem('uid'); // Replace this with context if needed

    if (uid) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/user/${uid}`);
          setUser(response.data.data); // Use 'data.data' to access the correct structure
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo();
    } else {
      navigate('/login'); // Redirect to login if UID is not found
    }
  }, [navigate]);

  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Brand Information</Title>
      {user ? (
        <Card>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Brand Name">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Industry">
              {user.industry || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {user.address || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{user.status}</Descriptions.Item>
          </Descriptions>
          
        </Card>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default BrandInfoPage;
