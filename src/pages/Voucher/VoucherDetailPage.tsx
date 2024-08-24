import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Button } from "antd";
import QRCode from "qrcode.react";
import styles from "./VoucherDetailPage.module.css";
import logo from "../../assets/logo.png"
interface Voucher {
  code: string;
  image: string;
  value: number;
  description: string;
  expiryDate: string;
  status: string;
}

const VoucherDetailPage: React.FC = () => {
  const { voucherCode } = useParams<{ voucherCode: string }>();
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    // Fetch voucher details from API or data source
    const fetchVoucher = async () => {
      const data: Voucher = {
        code: voucherCode || "ABC123",
        image: logo, // Placeholder image path
        value: 100,
        description: "Discount for Black Friday",
        expiryDate: "2024-11-30",
        status: "Active",
      };
      setVoucher(data);
    };

    fetchVoucher();
  }, [voucherCode]);

  return (
    <div className={styles.voucherDetailPage}>
      <Typography.Title level={2} className={styles.title}>
        Voucher Details
      </Typography.Title>

      {voucher ? (
        <Card className={styles.card}>
          <Typography.Title level={4}>Voucher Code: {voucher.code}</Typography.Title>
          <img src={voucher.image} alt="Voucher" className={styles.image} />
          <p><strong>Value:</strong> ${voucher.value}</p>
          <p><strong>Description:</strong> {voucher.description}</p>
          <p><strong>Expiry Date:</strong> {voucher.expiryDate}</p>
          <p><strong>Status:</strong> {voucher.status}</p>
          <div>
            <p><strong>QR Code:</strong></p>
            <QRCode value={voucher.code} size={128} />
          </div>
          <Button type="primary" className={styles.backButton} onClick={() => window.history.back()}>
            Back to Voucher List
          </Button>
        </Card>
      ) : (
        <Typography.Paragraph>Loading voucher details...</Typography.Paragraph>
      )}
    </div>
  );
};

export default VoucherDetailPage;
