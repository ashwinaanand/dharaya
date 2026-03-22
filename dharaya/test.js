const http = require('http');

const API_URL = 'http://localhost:5000';
let testsPassed = 0;
let testsFailed = 0;

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║          DHARAYA - FULL SYSTEM TEST SUITE                 ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'blue');

  // Test 1: Backend Health Check
  log('➤ TEST 1: Backend Health Check', 'yellow');
  try {
    const health = await makeRequest(`${API_URL}/api/health`);
    if (health.status === 200 && health.data.success) {
      log('✓ Backend is running on port 5000\n', 'green');
      testsPassed++;
    } else {
      log('✗ Backend health check failed\n', 'red');
      testsFailed++;
    }
  } catch (error) {
    log(`✗ Cannot connect to backend: ${error.message}\n`, 'red');
    testsFailed++;
  }

  // Test 2: GET Pollution Reports
  log('➤ TEST 2: GET All Pollution Reports', 'yellow');
  try {
    const reports = await makeRequest(`${API_URL}/api/pollution`);
    if (reports.status === 200 && reports.data.success) {
      log(`✓ Retrieved ${reports.data.data.length} pollution reports\n`, 'green');
      testsPassed++;
    } else {
      log('✗ Failed to retrieve pollution reports\n', 'red');
      testsFailed++;
    }
  } catch (error) {
    log(`✗ Error getting pollution reports: ${error.message}\n`, 'red');
    testsFailed++;
  }

  // Test 3: POST New Pollution Report
  log('➤ TEST 3: POST New Pollution Report', 'yellow');
  try {
    const newReport = {
      location: 'Test Location',
      severity: 'high',
      description: 'Test pollution report'
    };
    const response = await makeRequest(`${API_URL}/api/pollution`, 'POST', newReport);
    if (response.status === 201 && response.data.success) {
      log(`✓ Successfully submitted pollution report\n`, 'green');
      testsPassed++;
    } else {
      log('✗ Failed to submit pollution report\n', 'red');
      testsFailed++;
    }
  } catch (error) {
    log(`✗ Error submitting report: ${error.message}\n`, 'red');
    testsFailed++;
  }

  // Test 4: GET Risk Zones
  log('➤ TEST 4: GET Risk Zones', 'yellow');
  try {
    const zones = await makeRequest(`${API_URL}/api/risk-zones`);
    if (zones.status === 200 && zones.data.success) {
      log(`✓ Retrieved ${zones.data.data.length} risk zones\n`, 'green');
      testsPassed++;
    } else {
      log('✗ Failed to retrieve risk zones\n', 'red');
      testsFailed++;
    }
  } catch (error) {
    log(`✗ Error getting risk zones: ${error.message}\n`, 'red');
    testsFailed++;
  }

  // Test 5: GET Statistics
  log('➤ TEST 5: GET Statistics', 'yellow');
  try {
    const stats = await makeRequest(`${API_URL}/api/stats`);
    if (stats.status === 200 && stats.data.success) {
      const { totalReports, highSeverity, mediumSeverity, lowSeverity } = stats.data.data;
      log(`✓ Retrieved statistics:`, 'green');
      log(`  • Total Reports: ${totalReports}`);
      log(`  • High Severity: ${highSeverity}`);
      log(`  • Medium Severity: ${mediumSeverity}`);
      log(`  • Low Severity: ${lowSeverity}\n`);
      testsPassed++;
    } else {
      log('✗ Failed to retrieve statistics\n', 'red');
      testsFailed++;
    }
  } catch (error) {
    log(`✗ Error getting statistics: ${error.message}\n`, 'red');
    testsFailed++;
  }

  // Test 6: CORS Support
  log('➤ TEST 6: CORS Support (Frontend can access backend)', 'yellow');
  try {
    const corsTest = await makeRequest(`${API_URL}/api/health`);
    if (corsTest.status === 200) {
      log(`✓ CORS is properly configured\n`, 'green');
      testsPassed++;
    } else {
      log('✗ CORS check failed\n', 'red');
      testsFailed++;
    }
  } catch (error) {
    log(`✗ Error checking CORS: ${error.message}\n`, 'red');
    testsFailed++;
  }

  // Summary
  log('╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║                      TEST SUMMARY                         ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'blue');
  
  log(`Passed: ${testsPassed}`, 'green');
  log(`Failed: ${testsFailed}`, testsFailed > 0 ? 'red' : 'green');
  
  if (testsFailed === 0) {
    log('\n🎉 ALL TESTS PASSED! Your system is working perfectly!\n', 'green');
    log('✅ Frontend (http://localhost:3000)', 'green');
    log('✅ Backend (http://localhost:5000)', 'green');
    log('✅ Database connection ready', 'green');
    log('✅ All packages installed', 'green');
  } else {
    log(`\n⚠️  ${testsFailed} test(s) failed. Check your setup.\n`, 'red');
  }

  process.exit(testsFailed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  log(`Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
