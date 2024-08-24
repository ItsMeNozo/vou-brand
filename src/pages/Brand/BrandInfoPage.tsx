import React, { useState, useEffect } from 'react';
import { Card, Typography, Descriptions, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface Brand {
    name: string;
    field: string;
    address: string;
    gps: string;
    status: string;
}

const BrandInfoPage: React.FC = () => {
    const [brand, setBrand] = useState<Brand | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the brand information from an API or data source
        // Here we provide a placeholder for demonstration purposes
        const fetchBrandInfo = async () => {
            const data: Brand = {
                name: "TIKI",
                field: "E-Commerce",
                address: "VN",
                gps: "40.730610, -73.935242",
                status: "Active"
            };
            setBrand(data);
        };

        fetchBrandInfo();
    }, []);

    const handleEditBrand = () => {
        // Navigate to a page where the brand info can be edited
        navigate('/dashboard/brand/edit');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Brand Information</Title>
            {brand ? (
                <Card>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Brand Name">{brand.name}</Descriptions.Item>
                        <Descriptions.Item label="Field of Operation">{brand.field}</Descriptions.Item>
                        <Descriptions.Item label="Address">{brand.address}</Descriptions.Item>
                        <Descriptions.Item label="GPS Coordinates">{brand.gps}</Descriptions.Item>
                        <Descriptions.Item label="Status">{brand.status}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button type="primary" onClick={handleEditBrand}>
                            Edit Brand Information
                        </Button>
                    </div>
                </Card>
            ) : (
                <p>Loading brand information...</p>
            )}
        </div>
    );
};

export default BrandInfoPage;
