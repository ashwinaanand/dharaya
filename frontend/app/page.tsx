'use client';

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import PollutionHeatmap from './components/PollutionHeatmap';

type PageType = 'home' | 'report' | 'dashboard' | 'heatmap';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [category, setCategory] = useState('air');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const BACKEND_URL = 'http://localhost:7777';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      if (!loginEmail || !loginPassword) {
        setLoginError('Please fill in all fields');
        setLoginLoading(false);
        return;
      }

      if (!loginEmail.includes('@')) {
        setLoginError('Please enter a valid email address');
        setLoginLoading(false);
        return;
      }

      // Simulate login - replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Success
      setIsLoggedIn(true);
      setLoginEmail('');
      setLoginPassword('');
      setCurrentPage('home');
    } catch (err) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

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
    <>
      {!isLoggedIn ? (
        // LOGIN PAGE
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌍</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-sm">Sign in to DHARAYA and continue protecting the environment</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 transition"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">❌ {loginError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loginLoading ? (
                    <>
                      <span className="animate-spin">⏳</span> Signing in...
                    </>
                  ) : (
                    <>
                      🔐 Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500 font-medium">Demo Access</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-800 font-medium">✨ Use any email and password to demo</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                <p>🔒 Your credentials are secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // MAIN APP
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-linear-to-r from-green-600 to-blue-600 shadow-lg">
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
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold transition text-white hover:bg-red-600/50 border border-white/30 hover:border-red-400"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Home Page */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="bg-linear-to-br from-green-500 via-blue-500 to-purple-600 text-white py-24 px-4">
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
                  <div className="bg-linear-to-br from-green-800 to-green-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                    <div className="text-5xl mb-4">🌱</div>
                    <h4 className="text-2xl font-bold text-white mb-3">Easy Reporting</h4>
                    <p className="text-gray-200">
                      Report pollution incidents with photos, location data, and detailed descriptions. Help authorities take action.
                    </p>
                  </div>

                  {/* Feature Card 2 */}
                  <div className="bg-linear-to-br from-blue-800 to-blue-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                    <div className="text-5xl mb-4">📊</div>
                    <h4 className="text-2xl font-bold text-white mb-3">Real-time Analytics</h4>
                    <p className="text-gray-200">
                      Track pollution trends with interactive charts and statistics. Understand air, water, soil, and noise pollution patterns.
                    </p>
                  </div>

                  {/* Feature Card 3 */}
                  <div className="bg-linear-to-br from-purple-800 to-purple-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
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
            <section className="py-16 px-4 bg-linear-to-r from-green-600 to-blue-600">
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
                    className="w-full bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 shadow-lg"
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
      )}
    </>
  );
}
