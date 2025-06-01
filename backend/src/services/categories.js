import {readFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const categoriesPath = join(__dirname, 'categories.json');




// Async helper to read categories
function readCategories(callback) {
    readFile(categoriesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading categories.json:', err);
            callback(err, null);
        } else {
            try {
                const categories = JSON.parse(data);
                callback(null, categories);
            } catch (parseErr) {
                console.error('Error parsing categories.json:', parseErr);
                callback(parseErr, null);
            }
        }
    });
}

// API to return categories
export function getCategories(callback) {
    readCategories(callback);
}