const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, 'hospitals.json');


const initializeData = async () => {
    const defaultData = [
        {
            "Name": "City Care Hospital",
            "PatientCount": 120,
            "Location": "Thiruvananthapuram, Kerala"
        },
        {
            "Name": "Green Valley Medical Center",
            "PatientCount": 85,
            "Location": "Kochi, Kerala"
        },
        {
            "Name": "Sunrise General Hospital",
            "PatientCount": 200,
            "Location": "Chennai, Tamil Nadu"
        },
        {
            "Name": "Harmony Health Clinic",
            "PatientCount": 60,
            "Location": "Bengaluru, Karnataka"
        },
        {
            "Name": "Global Healthcare Institute",
            "PatientCount": 150,
            "Location": "Mumbai, Maharashtra"
        }
    ];

    try {
        await fs.access(filePath); 
    } catch {
        await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2)); // Create file with default data
    }
};


const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
};


const writeData = async (data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error;
    }
};


initializeData();


router.get('/data', async (req, res) => {
    try {
        const hospitals = await readData();
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ error: 'Error reading hospital data' });
    }
});


router.post('/add', async (req, res) => {
    try {
        const hospitals = await readData();
        hospitals.push(req.body);
        await writeData(hospitals);
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ error: 'Error adding hospital' });
    }
});


router.put('/edit/:id', async (req, res) => {
    try {
        const hospitals = await readData();
        const id = parseInt(req.params.id);
        
        if (id >= 0 && id < hospitals.length) {
            hospitals[id] = req.body;
            await writeData(hospitals);
            res.json(hospitals);
        } else {
            res.status(404).json({ error: 'Hospital not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating hospital' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const hospitals = await readData();
        const id = parseInt(req.params.id);
        
        if (id >= 0 && id < hospitals.length) {
            hospitals.splice(id, 1);
            await writeData(hospitals);
            res.json(hospitals);
        } else {
            res.status(404).json({ error: 'Hospital not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting hospital' });
    }
});

module.exports = router;
