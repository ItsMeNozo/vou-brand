import React from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./StatisticsPage.module.css";

const { Title } = Typography;

// Sample data for budget statistics (Thống kê ngân sách)
const budgetData = [
  { name: "January", budget: 4000 },
  { name: "February", budget: 3000 },
  { name: "March", budget: 5000 },
  { name: "April", budget: 2000 },
  { name: "May", budget: 2780 },
  { name: "June", budget: 1890 },
  { name: "July", budget: 2390 },
];

// Sample data for promotion status statistics (Thống kê tình trạng khuyến mãi)
const promotionStatusData = [
  { name: "Active", value: 400 },
  { name: "Expired", value: 300 },
  { name: "Upcoming", value: 300 },
];

const StatisticsPage: React.FC = () => {
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

        {/* Promotion Status Statistics */}
        <Col span={24}>
          <Card title="Promotion Status (Thống kê tình trạng khuyến mãi)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={promotionStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;
