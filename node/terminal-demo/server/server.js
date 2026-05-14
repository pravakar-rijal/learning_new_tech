const express = require("express");
const { WebSocketServer } = require("ws");
const pty = require("node-pty");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve the frontend
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// WebSocket server on top of HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Spawn a shell (bash for Linux/Mac, powershell.exe for Windows)
  const shell = process.platform === "win32" ? "powershell.exe" : "bash";

  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  // PTY -> Browser
  ptyProcess.onData((data) => {
    ws.send(data);
  });

  // Browser -> PTY
  ws.on("message", (msg) => {
    ptyProcess.write(msg);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    ptyProcess.kill();
  });
});
