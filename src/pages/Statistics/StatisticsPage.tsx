import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography } from "antd";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
} from "recharts";
import styles from "./StatisticsPage.module.css";

const { Title } = Typography;

interface Voucher {
  voucherId: string;
  value: number;
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

const StatisticsPage: React.FC = () => {
  const [budgetData, setBudgetData] = useState<{ name: string; budget: number }[]>([]);
  const [promotionStatusData, setPromotionStatusData] = useState<{ name: string; value: number }[]>([]);
  const [voucherRedemptionData, setVoucherRedemptionData] = useState<{ name: string; value: number }[]>([]);
  const [eventTypeData, setEventTypeData] = useState<{ name: string; count: number }[]>([]);
  const [voucherExpiryData, setVoucherExpiryData] = useState<{ name: string; count: number }[]>([]);
  const [totalVouchersByEvent, setTotalVouchersByEvent] = useState<{ name: string; totalVouchers: number }[]>([]);
  const [voucherRedemptionByEventType, setVoucherRedemptionByEventType] = useState<{ name: string; redeemed: number }[]>([]);

  // Fetch events and calculate statistics
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8888/sale-events"); // Adjust the endpoint
        const events: Event[] = response.data;

        // Initialize data structures
        const budgetByMonth: { [key: string]: number } = {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        };

        const statusCounts = { Active: 0, Expired: 0, Upcoming: 0 };
        const eventTypeCounts: { [key: string]: number } = { quiz: 0, shaking: 0 };
        const voucherExpirations: { [key: string]: number } = {};
        let totalVouchers = 0;
        let totalRedeemed = 0;

        // Total vouchers per event
        const totalVouchersForEvents = events.map((event) => {
          const totalVouchers = event.vouchers.reduce((sum, voucher) => sum + voucher.quantity, 0);
          return { name: event.eventName, totalVouchers };
        });

        setTotalVouchersByEvent(totalVouchersForEvents);

        // Calculate voucher redemption statistics by event type
        const redemptionByEventType = { quiz: 0, shaking: 0 };
        events.forEach((event) => {
          const redeemedVouchers = event.vouchers.reduce(
            (sum, voucher) => sum + (voucher.quantity - voucher.remainings), 0);

          // Add redeemed vouchers to the respective event type
          if (event.gameType === "quiz" || event.gameType === "shaking") {
            redemptionByEventType[event.gameType] += redeemedVouchers;
          }
        });

        // Set the voucher redemption data
        const calculatedRedemptionData = Object.entries(redemptionByEventType).map(([name, redeemed]) => ({
          name,
          redeemed,
        }));
        setVoucherRedemptionByEventType(calculatedRedemptionData);

        // Process event data
        events.forEach((event) => {
          const month = new Date(event.startDt).toLocaleString("default", { month: "long" });

          // Calculate budget for each voucher
          event.vouchers.forEach((voucher) => {
            const voucherTotal = voucher.value * voucher.quantity;
            budgetByMonth[month] += voucherTotal;
            totalVouchers += voucher.quantity;
            totalRedeemed += voucher.quantity - voucher.remainings;

            // Track voucher expirations
            const expiryMonth = new Date(voucher.expiryDt).toLocaleString("default", { month: "long" });
            if (!voucherExpirations[expiryMonth]) voucherExpirations[expiryMonth] = 0;
            voucherExpirations[expiryMonth] += 1;
          });

          // Update status counts
          if (event.status === "active") statusCounts.Active++;
          if (event.status === "expired") statusCounts.Expired++;
          if (event.status === "upcoming") statusCounts.Upcoming++;

          // Track event types
          if (event.gameType === "quiz" || event.gameType === "shaking") {
            eventTypeCounts[event.gameType]++;
          }
        });

        // Prepare budget data
        const calculatedBudgetData = Object.entries(budgetByMonth).map(([name, budget]) => ({
          name,
          budget,
        }));
        setBudgetData(calculatedBudgetData);

        // Prepare promotion status data
        const calculatedStatusData = Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value,
        }));
        setPromotionStatusData(calculatedStatusData);

        // Prepare voucher redemption data
        const redemptionData = [
          { name: "Redeemed", value: totalRedeemed },
          { name: "Available", value: totalVouchers - totalRedeemed },
        ];
        setVoucherRedemptionData(redemptionData);

        // Prepare event type data
        const calculatedEventTypeData = Object.entries(eventTypeCounts).map(([name, count]) => ({
          name,
          count,
        }));
        setEventTypeData(calculatedEventTypeData);

        // Prepare voucher expiry data
        const calculatedExpiryData = Object.entries(voucherExpirations).map(([name, count]) => ({
          name,
          count,
        }));
        setVoucherExpiryData(calculatedExpiryData);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.statisticsPage}>
      <Title level={2} className={styles.title}>
        Platform Statistics
      </Title>

      <Row gutter={[16, 16]}>
        {/* Budget Statistics */}
        <Col span={24}>
          <Card title="Budget Statistics (Thống kê ngân sách)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="budget" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Total Vouchers per Event (New Chart) */}
        <Col span={24}>
          <Card title="Total Vouchers per Event (Tổng số lượng voucher mỗi sự kiện)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={totalVouchersByEvent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalVouchers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Voucher Redemption by Event Type (New Chart) */}
        <Col span={24}>
          <Card title="Voucher Redemption by Event Type (Thống kê đổi voucher theo loại sự kiện)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={voucherRedemptionByEventType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="redeemed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Voucher Redemption Statistics */}
        <Col span={24}>
          <Card title="Voucher Redemption (Thống kê đổi voucher)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={voucherRedemptionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Event Type Distribution */}
        <Col span={24}>
          <Card title="Event Types (Loại sự kiện)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventTypeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Voucher Expiry Timeline */}
        <Col span={24}>
          <Card title="Voucher Expiry Timeline (Lịch hết hạn voucher)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={voucherExpiryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;
