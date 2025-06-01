// Import required modules
import { writeFile, readFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getCategories } from './categories.js';
import { validateFood } from './validation.js';

// Get __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the foods.json file
const filePath = join(__dirname, 'foods.json');

/**
 * Save a new food item to foods.json
 * @param {Object} food - The food object to save
 * @param {Function} callback - Callback function (err, result)
 */
export function saveFood(food, callback) {
    console.log('saveFood called with:', JSON.stringify(food));
    getCategories((err, categories) => {
        if (err) return callback('Categories not loaded');
        if (!validateFood(food, categories)) return callback('Data did not pass validation');

        readFile(filePath, 'utf8', (err, data) => {
            let foodsArray = [];
            if (!err && data) {
                foodsArray = JSON.parse(data);
            }
            // Generate a unique ID for the new food item
            const existingIDs = foodsArray.map(item => item.ID);
            let newID = 1;
            while (existingIDs.includes(newID)) {
                newID++;
            }
            food.ID = newID;

            foodsArray.push(food);

            const jsonData = JSON.stringify(foodsArray, null, 2);
            writeFile(filePath, jsonData, (err) => {
                if (err) {
                    console.error('Error saving foods:', err);
                    callback("Error saving foods");
                } else {
                    console.log('Food added successfully to foods.json');
                    callback(null, "Food added successfully");
                }
            });
        });
    });
}

/**
 * Delete a food item by ID
 * @param {number} foodID - The ID of the food to delete
 * @param {Function} callback - Callback function (err, result)
 */
export function deleteFood(foodID, callback) {
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading foods.json:', err);
            return callback("Error reading foods.json");
        }

        let foodsArray = [];
        if (data) {
            foodsArray = JSON.parse(data);
        }

        const foodIndex = foodsArray.findIndex(food => food.ID === foodID);
        if (foodIndex === -1) {
            console.error(`Food with ID ${foodID} not found.`);
            return callback(`Food with ID ${foodID} not found.`);
        }

        foodsArray.splice(foodIndex, 1);

        const jsonData = JSON.stringify(foodsArray, null, 2);
        writeFile(filePath, jsonData, (err) => {
            if (err) {
                console.error('Error saving updated foods.json:', err);
                return callback("Error saving updated foods.json");
            } else {
                console.log(`Food with ID ${foodID} deleted successfully.`);
                return callback(null, `Food with ID ${foodID} deleted successfully.`);
            }
        });
    });
}

/**
 * Update a food item by ID
 * @param {number} foodID - The ID of the food to update
 * @param {Object} updatedAttributes - The updated attributes
 * @param {Function} callback - Callback function (err, result)
 */
export function updateFood(foodID, updatedAttributes, callback) {
    console.log('updateFood called with:', foodID, updatedAttributes);
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading foods.json:', err);
            return callback("Error reading foods.json");
        }

        let foodsArray = [];
        if (data) {
            foodsArray = JSON.parse(data);
        }
        console.log('foodsArray:', foodsArray);

        const foodIndex = foodsArray.findIndex(food => food.ID === foodID);
        if (foodIndex === -1) {
            console.error(`Food with ID ${foodID} not found.`);
            return callback(`Food with ID ${foodID} not found.`);
        }

        const foodToUpdate = foodsArray[foodIndex];
        let updatedFood = { ...foodToUpdate, ...updatedAttributes };

        // Ensure amount is a number
        if (typeof updatedFood.amount === 'string') {
            updatedFood.amount = Number(updatedFood.amount);
        }

        getCategories((catErr, categories) => {
            if (catErr) {
                console.error('Error loading categories:', catErr);
                return callback("Error loading categories");
            }

            // If category is a string, replace with category object
            if (updatedFood.category && typeof updatedFood.category === 'string') {
                const foundCategory = categories.find(cat => cat.name === updatedFood.category);
                if (foundCategory) {
                    updatedFood.category = foundCategory;
                } else {
                    console.error('Category not found:', updatedFood.category);
                    return callback("Category not found");
                }
            }

            // Log before validation
            console.log('Before validation:', updatedFood, categories);

            // Validate updated food object
            if (!validateFood(updatedFood, categories)) {
                console.error('Updated food object validation failed. Changes not saved.');
                return callback("Updated food object validation failed.");
            }

            foodsArray[foodIndex] = updatedFood;
            const jsonData = JSON.stringify(foodsArray, null, 2);
            writeFile(filePath, jsonData, (err) => {
                if (err) {
                    console.error('Error saving updated foods.json:', err);
                    return callback("Error saving updated foods.json");
                } else {
                    console.log(`Food with ID ${foodID} updated successfully.`);
                    return callback(null, `Food with ID ${foodID} updated successfully.`);
                }
            });
        });
    });
}

/**
 * Get all foods, with optional filters
 * @param {Object} filters - Optional filters (e.g., { receivedTimeFrom, receivedTimeTo, ... })
 * @param {Function} callback - Callback function (err, foods)
 */
export function getAllFoods(filters = {}, callback) {
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading foods.json:', err);
            callback("Error reading foods.json", null);
            return;
        }

        let foodsArray = [];
        if (data) {
            foodsArray = JSON.parse(data);
        }

        // Apply filters if provided
        let filteredFoods = foodsArray;

        for (const [key, value] of Object.entries(filters)) {
            filteredFoods = filteredFoods.filter(food => {
                if (key === "receivedTimeFrom") {
                    // Convert DD.MM.YYYY to YYYY-MM-DD for Date parsing
                    const foodDate = new Date(food.receivedTime.split('.').reverse().join('-'));
                    const filterDate = new Date(value.split('.').reverse().join('-'));
                    return foodDate >= filterDate;
                }
                if (key === "receivedTimeTo") {
                    const foodDate = new Date(food.receivedTime.split('.').reverse().join('-'));
                    const filterDate = new Date(value.split('.').reverse().join('-'));
                    return foodDate <= filterDate;
                }
                // Exact match for other fields
                return food[key] === value;
            });
        }

        // Return the filtered foods
        callback(null, filteredFoods);
    });
}
