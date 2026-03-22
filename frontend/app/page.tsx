'use client';

import { useState } from 'react';
import Link from 'next/link';
import Dashboard from './components/Dashboard';
import PollutionHeatmap from './components/PollutionHeatmap';

type PageType = 'home' | 'report' | 'dashboard' | 'heatmap';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [category, setCategory] = useState('air');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const BACKEND_URL = 'http://localhost:7777';

  const handleReportPollution = async () => {
    if (!category || !location || !description) {
      setMessage('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          location,
          severity,
          description,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null
        })
      });

      const data = await response.json();
      if (data.success) {
        setMessage('✅ Pollution report submitted successfully! You earned ' + data.data.points + ' points!');
        setCategory('air');
        setLocation('');
        setDescription('');
        setSeverity('medium');
        setLatitude('');
        setLongitude('');
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ ' + (data.message || 'Failed to submit report'));
      }
    } catch (error) {
      setMessage('❌ Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold text-white">DHARAYA</h1>
          </div>
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 'home'
                  ? 'bg-white text-green-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => setCurrentPage('report')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 'report'
                  ? 'bg-white text-green-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              📝 Report
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 'dashboard'
                  ? 'bg-white text-green-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('heatmap')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 'heatmap'
                  ? 'bg-white text-green-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🗺️ Heat Map
            </button>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg font-semibold transition text-white hover:bg-white/20 border border-white/30 hover:border-white"
            >
              🔐 Login
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Home Page */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 text-white py-24 px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">Monitor & Combat Environmental Pollution</h2>
                <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                  Join DHARAYA to report environmental issues, track pollution levels, and make a difference in your community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentPage('report')}
                    className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                  >
                    📝 Start Reporting
                  </button>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                  >
                    📊 View Statistics
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-slate-800">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-4xl font-bold text-white text-center mb-16">Why DHARAYA?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Feature Card 1 */}
                  <div className="bg-gradient-to-br from-green-800 to-green-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                    <div className="text-5xl mb-4">🌱</div>
                    <h4 className="text-2xl font-bold text-white mb-3">Easy Reporting</h4>
                    <p className="text-gray-200">
                      Report pollution incidents with photos, location data, and detailed descriptions. Help authorities take action.
                    </p>
                  </div>

                  {/* Feature Card 2 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                    <div className="text-5xl mb-4">📊</div>
                    <h4 className="text-2xl font-bold text-white mb-3">Real-time Analytics</h4>
                    <p className="text-gray-200">
                      Track pollution trends with interactive charts and statistics. Understand air, water, soil, and noise pollution patterns.
                    </p>
                  </div>

                  {/* Feature Card 3 */}
                  <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                    <div className="text-5xl mb-4">🗺️</div>
                    <h4 className="text-2xl font-bold text-white mb-3">Pollution Heat Map</h4>
                    <p className="text-gray-200">
                      Visualize pollution hotspots in your region. See where issues are concentrated and take preventive measures.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pollution Categories */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-4xl font-bold text-white text-center mb-16">Pollution Categories We Track</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Air */}
                  <div className="bg-slate-700 p-6 rounded-lg border-l-4 border-blue-400 hover:bg-slate-650 transition">
                    <div className="text-4xl mb-3">🌫️</div>
                    <h4 className="text-xl font-bold text-white mb-2">Air</h4>
                    <p className="text-gray-300 text-sm">Smoke, dust, emissions affecting air quality</p>
                  </div>

                  {/* Water */}
                  <div className="bg-slate-700 p-6 rounded-lg border-l-4 border-cyan-400 hover:bg-slate-650 transition">
                    <div className="text-4xl mb-3">💧</div>
                    <h4 className="text-xl font-bold text-white mb-2">Water</h4>
                    <p className="text-gray-300 text-sm">Contamination, sewage, chemical waste in water</p>
                  </div>

                  {/* Soil */}
                  <div className="bg-slate-700 p-6 rounded-lg border-l-4 border-yellow-400 hover:bg-slate-650 transition">
                    <div className="text-4xl mb-3">🌍</div>
                    <h4 className="text-xl font-bold text-white mb-2">Soil</h4>
                    <p className="text-gray-300 text-sm">Degradation, waste disposal, chemical contamination</p>
                  </div>

                  {/* Noise */}
                  <div className="bg-slate-700 p-6 rounded-lg border-l-4 border-red-400 hover:bg-slate-650 transition">
                    <div className="text-4xl mb-3">🔊</div>
                    <h4 className="text-xl font-bold text-white mb-2">Noise</h4>
                    <p className="text-gray-300 text-sm">Excessive noise from traffic, construction, industry</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h3>
                <p className="text-lg text-green-100 mb-8">
                  Start reporting pollution in your area today and earn points while contributing to a cleaner environment.
                </p>
                <button
                  onClick={() => setCurrentPage('report')}
                  className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-12 rounded-lg transition transform hover:scale-105 text-lg"
                >
                  📝 Report Now
                </button>
              </div>
            </section>
          </>
        )}

        {/* Report Page */}
        {currentPage === 'report' && (
          <section className="py-12 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-3xl font-bold text-white mb-2">Report Pollution</h2>
                <p className="text-gray-300 mb-8">Help us combat pollution by reporting issues in your area</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="air">🌫️ Air Pollution</option>
                      <option value="water">💧 Water Pollution</option>
                      <option value="soil">🌍 Soil Pollution</option>
                      <option value="noise">🔊 Noise Pollution</option>
                      <option value="other">❓ Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Location *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location (e.g., Park, Street name, Region)"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Latitude</label>
                      <input
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="e.g., 28.6139"
                        step="0.0001"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:border-blue-500 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Longitude</label>
                      <input
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="e.g., 77.2090"
                        step="0.0001"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:border-blue-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Severity *</label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="low">🟢 Low - Minor issue</option>
                      <option value="medium">🟡 Medium - Moderate concern</option>
                      <option value="high">🔴 High - Urgent issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Description *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the pollution in detail (what, where, when, impact)"
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleReportPollution}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
                  >
                    {loading ? '⏳ Submitting...' : '📤 Submit Report & Earn Points'}
                  </button>
                </div>

                {message && (
                  <div className={`mt-6 p-4 rounded-lg font-semibold ${
                    message.includes('✅') 
                      ? 'bg-green-900 border border-green-700 text-green-200' 
                      : 'bg-red-900 border border-red-700 text-red-200'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Dashboard Page */}
        {currentPage === 'dashboard' && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
              <p className="text-gray-300 mb-8">Real-time pollution analytics and statistics</p>
              <Dashboard />
            </div>
          </section>
        )}

        {/* Heat Map Page */}
        {currentPage === 'heatmap' && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-2">Pollution Heat Map</h2>
              <p className="text-gray-300 mb-8">View pollution hotspots and trends in your region</p>
              <PollutionHeatmap />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="mb-2">🌍 DHARAYA - Environmental Pollution Monitoring & Reporting Platform</p>
          <p className="text-sm">Together, we can build a healthier environment for everyone</p>
        </div>
      </footer>
    </div>
  );
}
