import { writeFile, readFile } from 'fs'; //import from library fs

// Categories array with unique IDs
const categories = [
    {
        name: "meat",
        ID: 1001, // Unique ID for categories
    },
    {
        name: "vegetables",
        ID: 1002, // Unique ID for categories
    },
    {
        name: "fruits",
        ID: 1003, // Unique ID for categories
    },
    {
        name: "combined",
        ID: 1004, // Unique ID for categories
    },
    {
        name: "others",
        ID: 1005, // Unique ID for categories
    },
];
// API to return categories
export function getCategories() {
    return categories;
}

// Validate the incoming food object
function validateFood(food) {
    // Check if mandatory fields are present
    if (!food.name || typeof food.name !== 'string' || food.name.length > 150) {
        console.error('Validation Error: "name" is mandatory and must be a string up to 150 characters.');
        return false;
    }
    if (!food.amount || typeof food.amount !== 'number' || food.amount <= 0) {
        console.error('Validation Error: "amount" is mandatory and must be a positive number.');
        return false;
    }
    if (!food.receivedTime || !/^\d{2}\.\d{2}\.\d{4}$/.test(food.receivedTime)) {
        console.error('Validation Error: "receivedTime" is mandatory and must be in the format dd.mm.yyyy.');
        return false;
    }
    if (!food.category || !categories.some(cat => cat.ID === food.category.ID)) {
        console.error('Validation Error: "category" is mandatory and must match an existing category.');
        return false;
    }
    if (food.badFood !== null && food.badFood !== undefined && typeof food.badFood !== 'boolean') {
        console.error('Validation Error: "badFood" must be false or true.');
        return false;
    }
    // Note is optional, so no validation is required for it
    return true;
}


// Updated saveFood function to append food to the JSON file
export function saveFood(food) {
    const filePath = 'foods.json';

    // Check if the food object is valid before saving
    if (!validateFood(food)) {
    console.error('Food object validation failed. Food not saved.');
    return "Data did not pass validation";
}

    // Read the existing file
    readFile(filePath, 'utf8', (err, data) => {
        let foodsArray = [];

        if (!err && data) {
            // Parse existing data if the file exists and is not empty
            foodsArray = JSON.parse(data);
        }

        // Generate a unique ID for the new food item
        const existingIDs = foodsArray.map(item => item.ID);
        let newID = 1;
        while (existingIDs.includes(newID)) {
            newID++;
        }
        food.ID = newID; // Assign the unique ID to the food item

         
        foodsArray.push(food); // Add the new food item to the array

         

         const jsonData = JSON.stringify(foodsArray, null, 2);
         writeFile(filePath, jsonData, (err) => {
             if (err) {
                 console.error('Error saving foods:', err);
                 return "Error saving foods";
             } else {
                 console.log('Food added successfully to foods.json');
                 return "Food added successfully";
             }
         });
     });
 }
  
// Function to delete a food object by ID
export function deleteFood(foodID) {
    const filePath = 'foods.json';

    // Read the existing file
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading foods.json:', err);
            return "Error reading foods.json";
        }

        let foodsArray = [];

        if (data) {
            // Parse existing data if the file is not empty
            foodsArray = JSON.parse(data);
        }

        // Find the index of the food item with the given ID
        const foodIndex = foodsArray.findIndex(food => food.ID === foodID);
        if (foodIndex === -1) {
            console.error(`Food with ID ${foodID} not found.`);
            return `Food with ID ${foodID} not found.`;
        }

        // Remove the food item from the array
        foodsArray.splice(foodIndex, 1);

        // Write the updated array back to the file
        const jsonData = JSON.stringify(foodsArray, null, 2);
        writeFile(filePath, jsonData, (err) => {
            if (err) {
                console.error('Error saving updated foods.json:', err);
                return "Error saving updated foods.json";
            } else {
                console.log(`Food with ID ${foodID} deleted successfully.`);
                return `Food with ID ${foodID} deleted successfully.`;
            }
        });
    });
}

// Function to update a food object by ID
export function updateFood(foodID, updatedAttributes) {
    const filePath = 'foods.json';

    // Read the existing file
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading foods.json:', err);
            return "Error reading foods.json";
        }

        let foodsArray = [];

        if (data) {
            // Parse existing data if the file is not empty
            foodsArray = JSON.parse(data);
        }

        // Find the food object with the given ID
        const foodIndex = foodsArray.findIndex(food => food.ID === foodID);

        if (foodIndex === -1) {
            console.error(`Food with ID ${foodID} not found.`);
            return `Food with ID ${foodID} not found.`;
        }
        // Update the food object with the new attributes
        const foodToUpdate = foodsArray[foodIndex];
        foodsArray[foodIndex] = { ...foodToUpdate, ...updatedAttributes };

        // Validate the updated food object
        if (!validateFood(foodsArray[foodIndex])) {
            console.error('Updated food object validation failed. Changes not saved.');
            return "Updated food object validation failed.";
        }

        // Write the updated array back to the file
        const jsonData = JSON.stringify(foodsArray, null, 2);
        writeFile(filePath, jsonData, (err) => {
            if (err) {
                console.error('Error saving updated foods.json:', err);
                return "Error saving updated foods.json";
            } else {
                console.log(`Food with ID ${foodID} updated successfully.`);
                return `Food with ID ${foodID} updated successfully.`;
            }
        });
    });
}

// Function to return all foods from foods.json with optional filtering
export function getAllFoods(filters = {}, callback) {
    const filePath = 'foods.json';

    // Read the existing file
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading foods.json:', err);
            callback("Error reading foods.json", null);
            return;
        }

        let foodsArray = [];

        if (data) {
             // Parse existing data if the file is not empty
             foodsArray = JSON.parse(data);
            }
    
            // Apply filters if provided
            let filteredFoods = foodsArray;
    
            for (const [key, value] of Object.entries(filters)) {
                filteredFoods = filteredFoods.filter(food => {
                    if (key === "receivedTimeFrom") {
                        const foodDate = new Date(food.receivedTime.split('.').reverse().join('-'));
                        const filterDate = new Date(value.split('.').reverse().join('-'));
                        return foodDate >= filterDate;
                    }
                    if (key === "receivedTimeTo") {
                        const foodDate = new Date(food.receivedTime.split('.').reverse().join('-'));
                        const filterDate = new Date(value.split('.').reverse().join('-'));
                        return foodDate <= filterDate;
                    }
                    return food[key] === value;
                });
            }
    
            // Return the filtered foods
            callback(null, filteredFoods);
        });
    }