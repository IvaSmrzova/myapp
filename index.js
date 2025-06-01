import { Router } from 'express';
import { getCategories } from '../services/categories.js'; // Import the function from categories.js
import { getAllFoods,saveFood, deleteFood,updateFood,} from '../services/food.js'; // Import the function from food.js
const router = Router();




console.log('Routes file loaded');
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
router.put('/foods/:id', (req, res) => {
    console.log('PUT /foods/:id route hit');
    const foodID = Number(req.params.id);
    const updatedAttributes = req.body;
    updateFood(foodID, updatedAttributes, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: result });
    });
});

router.delete('/foods/:id', (req, res) => {
    const foodID = parseInt(req.params.id, 10);
    deleteFood(foodID, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(message);
        }
    });
});

// Route to get all categories
router.get('/categories', (req, res) => {
    getCategories((err, categories) => {
        if (err) {
            res.status(500).send('Error loading categories');
        } else {
            res.json(categories);
        }
    });
});




export default router;