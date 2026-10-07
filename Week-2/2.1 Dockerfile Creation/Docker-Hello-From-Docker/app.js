const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
        <h1>Docker Week 2 Project</h1>
        <p>Hello from my Docker container!</p>
        <p>Cloud & DevOps - Skill Set Go EduTech</p>
    `);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});