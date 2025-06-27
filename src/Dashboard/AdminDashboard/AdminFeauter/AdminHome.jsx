import React from 'react';
import { Card, Progress, Table, Avatar } from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// Mock Data
const userData = {
  name: "John Doe",
  role: "Project Manager",
  email: "john.doe@example.com",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
};

const tasks = [
  { id: 1, title: "Design Homepage", status: "In Progress", deadline: "2023-12-15" },
  { id: 2, title: "API Integration", status: "Completed", deadline: "2023-12-10" },
  { id: 3, title: "User Testing", status: "Pending", deadline: "2023-12-20" },
];

const projects = [
  { name: "Website Redesign", progress: 65 },
  { name: "Mobile App", progress: 40 },
  { name: "Dashboard UI", progress: 90 },
];

const activityLog = [
  { id: 1, action: "Logged in", time: "10:30 AM" },
  { id: 2, action: "Updated Project X", time: "11:45 AM" },
];

// Charts Data
const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'Tasks Completed',
    data: [12, 19, 3, 5, 2],
    backgroundColor: '#1890ff',
  }]
};

const pieChartData = {
  labels: ['Completed', 'Pending', 'In Progress'],
  datasets: [{
    data: [45, 25, 30],
    backgroundColor: ['#52c41a', '#faad14', '#1890ff'],
  }]
};

export default function AdminHome() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      {/* Top Row: Profile & Stats */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        {/* Profile Card */}
        <Card className="shadow-sm">
          <div className="flex items-center">
            <Avatar size={64} src={userData.avatar} icon={<UserOutlined />} />
            <div className="ml-4">
              <h2 className="font-semibold">{userData.name}</h2>
              <p className="text-gray-500">{userData.role}</p>
              <p className="text-sm">{userData.email}</p>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <Card className="shadow-sm">
          <div className="flex items-center">
            <ProjectOutlined className="mr-3 text-2xl text-blue-500" />
            <div>
              <p className="text-gray-500">Active Projects</p>
              <h3 className="text-xl font-bold">5</h3>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="flex items-center">
            <FileTextOutlined className="mr-3 text-2xl text-green-500" />
            <div>
              <p className="text-gray-500">Tasks Completed</p>
              <h3 className="text-xl font-bold">24</h3>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="flex items-center">
            <BellOutlined className="mr-3 text-2xl text-orange-500" />
            <div>
              <p className="text-gray-500">Notifications</p>
              <h3 className="text-xl font-bold">3</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
        <Card title="Monthly Progress" className="shadow-sm">
          <Bar data={barChartData} />
        </Card>
        <Card title="Task Distribution" className="shadow-sm">
          <Pie data={pieChartData} />
        </Card>
      </div>

      {/* Bottom Row: Tasks & Activity */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Recent Tasks" className="shadow-sm">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="p-2 mb-3 border-b">
                <div className="flex justify-between">
                  <span>{task.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.status === "Completed" ? "bg-green-100 text-green-800" :
                    task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Deadline: {task.deadline}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recent Activity" className="shadow-sm">
          <ul>
            {activityLog.map((log) => (
              <li key={log.id} className="p-2 mb-3 border-b">
                <div className="flex justify-between">
                  <span>{log.action}</span>
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}