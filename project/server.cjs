import { spawn } from 'child_process';
const path = require('path');

// Start the backend server
const server = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Start the frontend client
const client = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  server.kill();
  client.kill();
  process.exit();
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  client.kill();
  process.exit(code);
});

client.on('close', (code) => {
  console.log(`Client process exited with code ${code}`);
  server.kill();
  process.exit(code);
});