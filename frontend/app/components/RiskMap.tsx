'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RiskZone {
  id: string;
  name: string;
  severity: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const RiskMap = () => {
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskZones();
  }, []);

  const fetchRiskZones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/risk-zones');
      setRiskZones(response.data.data);
    } catch (error) {
      console.error('Error fetching risk zones:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#84cc16';
      default:
        return '#6b7280';
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading risk zones...</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-6">📍 Risk Zones Map</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskZones.map((zone) => (
          <div key={zone.id} className="bg-blue-700 p-4 rounded-lg hover:bg-blue-600 transition">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-semibold text-lg">{zone.name}</h3>
              <span
                className={`${getSeverityBgColor(zone.severity)} text-white text-xs font-bold px-2 py-1 rounded`}
              >
                {zone.severity.toUpperCase()}
              </span>
            </div>

            <div className="bg-blue-800 p-2 rounded text-sm text-gray-300">
              <p className="mb-1">📌 Latitude: {zone.coordinates.lat.toFixed(4)}</p>
              <p>📌 Longitude: {zone.coordinates.lng.toFixed(4)}</p>
            </div>

            <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded transition">
              View on Map →
            </button>
          </div>
        ))}
      </div>

      {riskZones.length === 0 && (
        <div className="text-center py-8 text-blue-200">
          No risk zones available at the moment.
        </div>
      )}

      <button
        onClick={fetchRiskZones}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        🔄 Refresh Risk Zones
      </button>
    </div>
  );
};

export default RiskMap;
