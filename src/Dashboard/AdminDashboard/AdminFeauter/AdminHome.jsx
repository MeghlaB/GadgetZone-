import React, { useState, useEffect } from 'react';
import { Card, Statistic, Table, Avatar, Tag, Switch } from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  BarChartOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

// Mock Data
const userData = {
  name: "Sarah Johnson",
  role: "Administrator",
  avatar: "https://randomuser.me/api/portraits/women/12.jpg",
};

const tasks = [
  { id: 1, title: "Q4 Financial Report", status: "In Progress", deadline: "2023-12-15" },
  { id: 2, title: "Inventory Audit", status: "Completed", deadline: "2023-12-10" },
  { id: 3, title: "Marketing Strategy", status: "Pending", deadline: "2023-12-20" },
];

const activityLog = [
  { id: 1, action: "Updated sales report", time: "10:30 AM", user: "Sarah J." },
  { id: 2, action: "Added new product", time: "11:45 AM", user: "Michael T." },
];

const businessMetrics = {
  revenue: 124532,
  revenueChange: 12.5,
  orders: 342,
  ordersChange: 8.2,
  customers: 1245,
  customersChange: 5.7,
  conversion: 4.3,
  conversionChange: 2.1,
};

const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [{
    label: 'Revenue ($)',
    data: [12500, 19000, 22000, 31000],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 2,
    fill: true,
    tension: 0.3,
  }]
};

const salesDistributionData = {
  labels: ['Electronics', 'Clothing', 'Home Goods', 'Books'],
  datasets: [{
    data: [45, 25, 15, 15],
    backgroundColor: [
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
    ],
  }]
};

const topProductsColumns = [
  { title: 'Product', dataIndex: 'product', key: 'product' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Price', dataIndex: 'price', key: 'price', render: (p) => `$${p}` },
  { title: 'Units Sold', dataIndex: 'sold', key: 'sold' },
];

const topProductsData = [
  { key: '1', product: 'Wireless Headphones', category: 'Electronics', price: 199, sold: 142 },
  { key: '2', product: 'Fitness Tracker', category: 'Electronics', price: 89, sold: 231 },
];

export default function AdminHome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top', labels: { color: darkMode ? "#fff" : "#000" } } },
    scales: {
      y: { ticks: { color: darkMode ? "#fff" : "#000" } },
      x: { ticks: { color: darkMode ? "#fff" : "#000" } }
    }
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen p-4`}>
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Business Dashboard</h1>
          <p className="text-sm opacity-70">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center mt-4 space-x-4 md:mt-0">
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <Avatar size="large" src={userData.avatar} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{userData.name}</div>
            <div className="text-xs opacity-70">{userData.role}</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <Statistic title="Revenue" value={businessMetrics.revenue} prefix="$" valueStyle={{ color: "#3f8600" }}
            suffix={<span className="text-green-500"><RiseOutlined /> {businessMetrics.revenueChange}%</span>} />
        </Card>
        <Card className="shadow-sm">
          <Statistic title="Orders" value={businessMetrics.orders} valueStyle={{ color: "#1890ff" }}
            suffix={<span className="text-green-500"><RiseOutlined /> {businessMetrics.ordersChange}%</span>} />
        </Card>
        <Card className="shadow-sm">
          <Statistic title="Customers" value={businessMetrics.customers} valueStyle={{ color: "#722ed1" }}
            suffix={<span className="text-green-500"><RiseOutlined /> {businessMetrics.customersChange}%</span>} />
        </Card>
        {/* <Card className="shadow-sm">
          <Statistic title="Conversion" value={businessMetrics.conversion} precision={2} suffix="%"
            valueStyle={{ color: "#cf1322" }}
            suffix={<span className="text-red-500"><FallOutlined /> {businessMetrics.conversionChange}%</span>} />
        </Card> */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Card title={<><BarChartOutlined /> Revenue Overview</>}>
          <Line data={revenueChartData} options={chartOptions} height={80} />
        </Card>
        <Card title="Sales Distribution">
          <Doughnut data={salesDistributionData} options={chartOptions} />
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Recent Tasks">
          <ul>
            {tasks.map(t => (
              <li key={t.id} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span>{t.title}</span>
                <Tag color={t.status === "Completed" ? "green" : t.status === "In Progress" ? "blue" : "orange"}>
                  {t.status}
                </Tag>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Top Products">
          <Table columns={topProductsColumns} dataSource={topProductsData} pagination={false} size="small" />
        </Card>
      </div>
    </div>
  );
}
