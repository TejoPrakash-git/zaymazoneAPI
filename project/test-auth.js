// Test script for authentication and user profile functionality

// 1. Test user registration
console.log('Testing user registration...');
fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'buyer'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Registration response:', data);
  if (data.token) {
    console.log('✅ Registration successful, received token');
    // Store token for subsequent tests
    localStorage.setItem('test_token', data.token);
    testLogin();
  } else {
    console.log('❌ Registration failed, no token received');
  }
})
.catch(error => {
  console.error('Registration error:', error);
});

// 2. Test user login
function testLogin() {
  console.log('\nTesting user login...');
  fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Login response:', data);
    if (data.token) {
      console.log('✅ Login successful, received token');
      // Store token for subsequent tests
      localStorage.setItem('test_token', data.token);
      testGetProfile();
    } else {
      console.log('❌ Login failed, no token received');
    }
  })
  .catch(error => {
    console.error('Login error:', error);
  });
}

// 3. Test getting user profile
function testGetProfile() {
  console.log('\nTesting get profile...');
  const token = localStorage.getItem('test_token');
  
  fetch('http://localhost:5000/api/users/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Profile response:', data);
    if (data._id) {
      console.log('✅ Profile fetch successful');
      testUpdateProfile(data._id);
    } else {
      console.log('❌ Profile fetch failed');
    }
  })
  .catch(error => {
    console.error('Profile fetch error:', error);
  });
}

// 4. Test updating user profile
function testUpdateProfile(userId) {
  console.log('\nTesting update profile...');
  const token = localStorage.getItem('test_token');
  
  fetch(`http://localhost:5000/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: 'Updated Test User',
      location: 'Test City'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Update profile response:', data);
    if (data.name === 'Updated Test User') {
      console.log('✅ Profile update successful');
      testPasswordUpdate(userId);
    } else {
      console.log('❌ Profile update failed');
    }
  })
  .catch(error => {
    console.error('Profile update error:', error);
  });
}

// 5. Test updating password
function testPasswordUpdate(userId) {
  console.log('\nTesting password update...');
  const token = localStorage.getItem('test_token');
  
  fetch(`http://localhost:5000/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword: 'password123',
      password: 'newpassword123'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Password update response:', data);
    if (data._id) {
      console.log('✅ Password update successful');
      testLoginWithNewPassword();
    } else {
      console.log('❌ Password update failed');
    }
  })
  .catch(error => {
    console.error('Password update error:', error);
  });
}

// 6. Test login with new password
function testLoginWithNewPassword() {
  console.log('\nTesting login with new password...');
  fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'newpassword123'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Login with new password response:', data);
    if (data.token) {
      console.log('✅ Login with new password successful');
      console.log('\n🎉 All tests completed successfully!');
    } else {
      console.log('❌ Login with new password failed');
    }
  })
  .catch(error => {
    console.error('Login with new password error:', error);
  });
}

// Note: This script is meant to be run in a browser environment
// You can paste it into the browser console while running the application
// or create a simple HTML file that includes this script