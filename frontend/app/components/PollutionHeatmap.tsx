'use client';

import React, { useState, useEffect } from 'react';

interface Report {
  _id: string;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  severity: string;
  description: string;
  points: number;
}

const PollutionHeatmap = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const BACKEND_URL = 'http://localhost:7777';

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reports?limit=100`);
      const data = await response.json();
      if (data.success) {
        setReports(data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500 text-red-100';
      case 'medium':
        return 'bg-yellow-500 text-yellow-100';
      case 'low':
        return 'bg-green-500 text-green-100';
      default:
        return 'bg-gray-500 text-gray-100';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'air':
        return '💨';
      case 'water':
        return '💧';
      case 'soil':
        return '🌍';
      case 'noise':
        return '🔊';
      default:
        return '⚠️';
    }
  };

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  if (loading) {
    return <div className="text-center py-8 text-white">Loading pollution data...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🔍</span> Filter by Category
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            ✓ All Reports ({reports.length})
          </button>
          
          <button
            onClick={() => setSelectedCategory('air')}
            className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === 'air'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            💨 Air ({reports.filter(r => r.category === 'air').length})
          </button>

          <button
            onClick={() => setSelectedCategory('water')}
            className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === 'water'
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            💧 Water ({reports.filter(r => r.category === 'water').length})
          </button>

          <button
            onClick={() => setSelectedCategory('soil')}
            className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === 'soil'
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            🌍 Soil ({reports.filter(r => r.category === 'soil').length})
          </button>

          <button
            onClick={() => setSelectedCategory('noise')}
            className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === 'noise'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            🔊 Noise ({reports.filter(r => r.category === 'noise').length})
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📍</span> Pollution Reports ({filteredReports.length})
        </h3>
        
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => {
              const severityGradient = 
                report.severity === 'high' 
                  ? 'from-red-600 to-red-700' 
                  : report.severity === 'medium' 
                  ? 'from-yellow-600 to-yellow-700' 
                  : 'from-green-600 to-green-700';

              const severityBorder = 
                report.severity === 'high' ? 'border-red-500' 
                : report.severity === 'medium' ? 'border-yellow-500' 
                : 'border-green-500';

              return (
                <div
                  key={report._id}
                  className={`bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-lg border-2 ${severityBorder} hover:shadow-2xl transition transform hover:scale-105`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getCategoryEmoji(report.category)}</span>
                      <h3 className="text-lg font-bold text-white">
                        {report.location}
                      </h3>
                    </div>
                    <div className={`bg-gradient-to-r ${severityGradient} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                      {report.severity}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                    {report.description}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-900 rounded-lg">
                    <div>
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Category</p>
                      <p className="text-white font-bold capitalize">{report.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Points Earned</p>
                      <p className="text-yellow-300 font-bold">⭐ {report.points}</p>
                    </div>
                  </div>

                  {/* Coordinates */}
                  {report.latitude && report.longitude && (
                    <div className="text-xs text-gray-400 mb-4 p-2 bg-slate-900 rounded border border-slate-600">
                      <p className="font-mono">📍 {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</p>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className={`w-full bg-gradient-to-r ${severityGradient} hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105`}>
                    📍 View on Map →
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="col-span-full bg-slate-800 border-2 border-slate-600 rounded-xl p-12 text-center">
            <p className="text-gray-300 text-lg">📭 No pollution reports found for this category.</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>

      <button
        onClick={fetchReports}
        className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
      >
        🔄 Refresh Data
      </button>
    </div>
  );
};

export default PollutionHeatmap;
