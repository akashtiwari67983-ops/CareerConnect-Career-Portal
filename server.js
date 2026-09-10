const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Helper to read and write database
function readDB() {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (e) {
        return { jobs: [], users: [], admins: [], applications: [] };
    }
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ======= USER APP (Port 3000) =======
const userApp = express();
userApp.use(cors());
userApp.use(bodyParser.json());
userApp.use(express.static(path.join(__dirname), { index: false }));

userApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

userApp.post('/api/login/user', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, role: 'user', username: user.username, name: user.name });
    } else {
        res.status(401).json({ success: false, message: 'Invalid user credentials.' });
    }
});

userApp.post('/api/login/admin', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const admin = db.admins.find(a => a.username === username && a.password === password);
    
    if (admin) {
        res.json({ success: true, role: 'admin', url: 'http://localhost:3001/' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
});

userApp.get('/api/jobs', (req, res) => {
    res.json(readDB().jobs);
});

userApp.post('/api/apply', (req, res) => {
    const { username, jobId, applicantName, applicantEmail } = req.body;
    if (!username || !jobId) return res.status(400).json({ success: false, message: 'Missing fields' });
    
    const db = readDB();
    const newApp = {
        id: Date.now(),
        username,
        jobId,
        applicantName,
        applicantEmail,
        status: 'Pending',
        appliedAt: new Date().toISOString()
    };
    db.applications.push(newApp);
    writeDB(db);
    
    res.json({ success: true, message: 'Applied successfully!' });
});

userApp.post('/api/messages', (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    
    const db = readDB();
    if (!db.messages) db.messages = [];
    
    const newMessage = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        message,
        submittedAt: new Date().toISOString()
    };
    
    db.messages.push(newMessage);
    writeDB(db);
    
    res.json({ success: true, message: 'Message sent successfully' });
});

userApp.listen(3000, () => {
    console.log(`User portal is running on http://localhost:3000`);
});


// ======= ADMIN APP (Port 3001) =======
const adminApp = express();
adminApp.use(cors());
adminApp.use(bodyParser.json());
adminApp.use(express.static(path.join(__dirname), { index: false })); // Serve static for assets without index.html

// Default to admin.html
adminApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Since admin might need to verify session (dummy), we allow direct route
adminApp.get('/api/jobs', (req, res) => {
    res.json(readDB().jobs);
});

adminApp.post('/api/jobs', (req, res) => {
    const db = readDB();
    const newJob = { ...req.body, id: Date.now() };
    db.jobs.push(newJob);
    writeDB(db);
    res.json({ success: true, job: newJob });
});

adminApp.put('/api/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id);
    const db = readDB();
    const index = db.jobs.findIndex(j => j.id === jobId);
    
    if (index !== -1) {
        db.jobs[index] = { ...req.body, id: jobId };
        writeDB(db);
        res.json({ success: true, job: db.jobs[index] });
    } else {
        res.status(404).json({ success: false });
    }
});

adminApp.delete('/api/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id);
    const db = readDB();
    db.jobs = db.jobs.filter(j => j.id !== jobId);
    writeDB(db);
    res.json({ success: true });
});

adminApp.get('/api/applications', (req, res) => {
    const db = readDB();
    const populated = db.applications.map(app => {
        const job = db.jobs.find(j => j.id === app.jobId);
        return {
            ...app,
            jobTitle: job ? job.title : 'Unknown Job',
            company: job ? job.company : 'Unknown'
        };
    });
    res.json(populated);
});

adminApp.put('/api/applications/:id/status', (req, res) => {
    const appId = parseInt(req.params.id);
    const { status } = req.body;
    const db = readDB();
    const app = db.applications.find(a => a.id === appId);
    
    if (app) {
        app.status = status;
        writeDB(db);
        res.json({ success: true, application: app });
    } else {
        res.status(404).json({ success: false });
    }
});

adminApp.get('/api/users', (req, res) => {
    res.json(readDB().users);
});

adminApp.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const db = readDB();
    db.users = db.users.filter(u => u.id !== userId);
    writeDB(db);
    res.json({ success: true });
});

adminApp.get('/api/messages', (req, res) => {
    const db = readDB();
    res.json(db.messages || []);
});

adminApp.delete('/api/messages/:id', (req, res) => {
    const msgId = parseInt(req.params.id);
    const db = readDB();
    db.messages = (db.messages || []).filter(m => m.id !== msgId);
    writeDB(db);
    res.json({ success: true });
});

adminApp.listen(3001, () => {
    console.log(`Admin portal is running on http://localhost:3001`);
});
