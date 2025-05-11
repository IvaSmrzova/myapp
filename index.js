import { Router } from 'express';
import { getAllFoods,saveFood,getCategories, deleteFood,updateFood } from '../services/backend.js'; // Import the function from backend.js
const router = Router();


// Default route
router.get('/', (req, res) => {
    res.send("Welcome to the Foods API");
});

// Route to get all foods with optional filters
router.get('/foods', (req, res) => {
    const filters = req.query; // Get filters from query parameters
    getAllFoods(filters, (err, foods) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(foods);
        }
    });
});

// Route to save a food object
router.post('/create', (req, res) => {
    const food = req.body; // Get the food object from the request body
    saveFood(food, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(message); // Send success message
        }
    });
});

// Route to update a food object
router.post('/foods/:id', (req, res) => {
    const foodID = parseInt(req.params.id, 10); // Get the food ID from the URL
    const updatedAttributes = req.body; // Get the updated attributes from the request body
    updateFood(foodID, updatedAttributes, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(message); // Send success message
        }
    });
});

// Route to delete a food object
router.post('/foods/:id', (req, res) => {
    const foodID = parseInt(req.params.id, 10); // Get the food ID from the URL
    deleteFood(foodID, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(message); // Send success message
        }
    });
});

export default router;