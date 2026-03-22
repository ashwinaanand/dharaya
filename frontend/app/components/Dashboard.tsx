'use client';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Stats {
  totalReports: number;
  byCategory: Array<{ _id: string; count: number }>;
  byStatus: Array<{ _id: string; count: number }>;
  bySeverity: Array<{ _id: string; count: number }>;
  totalPoints: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = 'http://localhost:7777';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-white">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8 text-red-500">Failed to load statistics</div>;
  }

  // Prepare severity distribution data
  const severityData = {
    labels: stats.bySeverity.map(s => s._id.charAt(0).toUpperCase() + s._id.slice(1)),
    datasets: [
      {
        data: stats.bySeverity.map(s => s.count),
        backgroundColor: stats.bySeverity.map(s => 
          s._id === 'high' ? '#ef4444' : s._id === 'medium' ? '#f59e0b' : '#84cc16'
        ),
        borderColor: '#334155',
        borderWidth: 2,
      },
    ],
  };

  // Prepare category distribution data
  const categoryData = {
    labels: stats.byCategory.map(c => c._id.charAt(0).toUpperCase() + c._id.slice(1)),
    datasets: [
      {
        label: 'Reports',
        data: stats.byCategory.map(c => c.count),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        borderColor: '#334155',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Reports Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">Total Reports</p>
              <p className="text-5xl font-bold text-white">{stats.totalReports}</p>
            </div>
            <div className="text-5xl opacity-20">📋</div>
          </div>
          <p className="text-blue-100 text-xs mt-3">All pollution reports submitted</p>
        </div>

        {/* High Severity Card */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-semibold uppercase tracking-wider mb-2">High Severity</p>
              <p className="text-5xl font-bold text-white">
                {stats.bySeverity.find(s => s._id === 'high')?.count || 0}
              </p>
            </div>
            <div className="text-5xl opacity-20">🔴</div>
          </div>
          <p className="text-red-100 text-xs mt-3">Urgent issues requiring attention</p>
        </div>

        {/* Total Points Card */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-semibold uppercase tracking-wider mb-2">Total Points</p>
              <p className="text-5xl font-bold text-white">{stats.totalPoints}</p>
            </div>
            <div className="text-5xl opacity-20">⭐</div>
          </div>
          <p className="text-green-100 text-xs mt-3">Earned by community members</p>
        </div>

        {/* Pending Status Card */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-semibold uppercase tracking-wider mb-2">Pending Issues</p>
              <p className="text-5xl font-bold text-white">
                {stats.byStatus.find(s => s._id === 'Pending')?.count || 0}
              </p>
            </div>
            <div className="text-5xl opacity-20">⏳</div>
          </div>
          <p className="text-yellow-100 text-xs mt-3">Awaiting action or resolution</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Severity Distribution Chart */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl shadow-lg border border-slate-600 hover:border-slate-500 transition">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">🎯</span>
            <h3 className="text-2xl font-bold text-white">Severity Distribution</h3>
          </div>
          <div className="bg-slate-900 rounded-lg p-4">
            <div style={{ position: 'relative', height: '320px' }}>
              <Pie 
                data={severityData} 
                options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: '#e5e7eb',
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl shadow-lg border border-slate-600 hover:border-slate-500 transition">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">📊</span>
            <h3 className="text-2xl font-bold text-white">Reports by Category</h3>
          </div>
          <div className="bg-slate-900 rounded-lg p-4">
            <div style={{ position: 'relative', height: '320px' }}>
              <Bar
                data={categoryData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { 
                      labels: { 
                        color: '#e5e7eb',
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                      } 
                    },
                  },
                  scales: {
                    y: { 
                      ticks: { color: '#9ca3af', font: { size: 11 } }, 
                      grid: { color: '#475569' },
                      beginAtZero: true
                    },
                    x: { 
                      ticks: { color: '#9ca3af', font: { size: 11 } }, 
                      grid: { color: '#475569' } 
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl shadow-lg border border-slate-600">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">🔄</span>
          <h3 className="text-2xl font-bold text-white">Status Overview</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.byStatus && stats.byStatus.map((status) => (
            <div key={status._id} className="bg-slate-700 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-300 font-semibold mb-2">{status._id}</p>
              <p className="text-3xl font-bold text-white">{status.count}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={fetchStats}
        className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
      >
        🔄 Refresh Dashboard
      </button>
    </div>
  );
};

export default Dashboard;
