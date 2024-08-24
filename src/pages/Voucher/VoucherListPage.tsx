import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import styles from "./VoucherListPage.module.css";
import logo from "../../assets/logo.png"
interface Voucher {
  key: string;
  code: string;
  image: string;
  value: number;
  description: string;
  expiryDate: string;
  status: string;
}

const VoucherListPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of vouchers from your API or a data source
    const fetchData = async () => {
      const data: Voucher[] = [
        {
          key: "1",
          code: "ABC123",
          image: logo,
          value: 100,
          description: "Discount for Black Friday",
          expiryDate: "2024-11-30",
          status: "Active",
        },
        {
          key: "2",
          code: "XYZ456",
          image: logo,
          value: 50,
          description: "Christmas Sale Discount",
          expiryDate: "2024-12-25",
          status: "Expired",
        },
        {
          key: "3",
          code: "LMN789",
          image: logo,
          value: 75,
          description: "New Year Special Offer",
          expiryDate: "2025-01-01",
          status: "Upcoming",
        },
      ];
      setVouchers(data);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<Voucher> = [
    {
      title: "Voucher Code",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <Button type="link" onClick={() => navigate(`/dashboard/vouchers/${text}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: "QR Code",
      dataIndex: "code",
      key: "qrCode",
      render: (text) => <QRCode value={text} size={64} />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="Voucher" className={styles.image} />,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => `$${value}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const showVoucherDetails = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.voucherListPage}>
      <Typography.Title level={1} className={styles.title}>
        Voucher Management
      </Typography.Title>
      <Table columns={columns} dataSource={vouchers} pagination={{ pageSize: 5 }} />

      <Modal
        title="Voucher Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        {selectedVoucher && (
          <div>
            <p><strong>Code:</strong> {selectedVoucher.code}</p>
            <p><strong>Value:</strong> ${selectedVoucher.value}</p>
            <p><strong>Description:</strong> {selectedVoucher.description}</p>
            <p><strong>Expiry Date:</strong> {selectedVoucher.expiryDate}</p>
            <p><strong>Status:</strong> {selectedVoucher.status}</p>
            <p><strong>QR Code:</strong></p>
            <QRCode value={selectedVoucher.code} size={128} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VoucherListPage;
