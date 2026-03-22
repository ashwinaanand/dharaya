'use client';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Stats {
  totalReports: number;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  riskZonesCount: number;
}

const ChartsDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading charts...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8 text-red-500">Failed to load statistics</div>;
  }

  // Pie Chart Data
  const pieData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [stats.highSeverity, stats.mediumSeverity, stats.lowSeverity],
        backgroundColor: ['#ef4444', '#f59e0b', '#84cc16'],
        borderColor: ['#dc2626', '#d97706', '#65a30d'],
        borderWidth: 2,
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: ['Pollution Reports', 'Risk Zones', 'High Severity'],
    datasets: [
      {
        label: 'Count',
        data: [stats.totalReports, stats.riskZonesCount, stats.highSeverity],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderColor: ['#1e40af', '#059669', '#d97706'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-8">📊 Environmental Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Stats Cards */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">Total Reports</h3>
          <p className="text-4xl font-bold text-blue-400">{stats.totalReports}</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">Risk Zones</h3>
          <p className="text-4xl font-bold text-green-400">{stats.riskZonesCount}</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">High Severity</h3>
          <p className="text-4xl font-bold text-red-400">{stats.highSeverity}</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">Medium Severity</h3>
          <p className="text-4xl font-bold text-yellow-400">{stats.mediumSeverity}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Severity Distribution</h3>
          <div style={{ position: 'relative', height: '300px' }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Overview</h3>
          <div style={{ position: 'relative', height: '300px' }}>
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: '#white' } },
                },
                scales: {
                  y: { ticks: { color: '#9ca3af' } },
                  x: { ticks: { color: '#9ca3af' } },
                },
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={fetchStats}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        🔄 Refresh Data
      </button>
    </div>
  );
};

export default ChartsDashboard;
