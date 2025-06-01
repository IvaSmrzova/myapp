// Validate the incoming food object
export function validateFood(food, categories) {
    console.log('Validating food:', JSON.stringify(food));
    if (!food.name || typeof food.name !== 'string' || food.name.length > 150) {
        console.log('Invalid name:', food.name);
        return false;
    }
    if (!food.amount || typeof food.amount !== 'number' || food.amount <= 0) {
        console.log('Invalid amount:', food.amount);
        return false;
    }
    if (!food.receivedTime || !/^\d{2}\.\d{2}\.\d{4}$/.test(food.receivedTime)) {
        console.log('Invalid receivedTime:', food.receivedTime);
        return false;
    }
    if (!food.category) {
        console.log('Missing category:', food);
        return false;
    }
    if (!categories.some(cat => cat.ID === food.category.ID)) {
        console.log('Category ID not found:', food.category);
        return false;
    }
    if (food.badFood !== null && food.badFood !== undefined && typeof food.badFood !== 'boolean') {
        console.log('Invalid badFood:', food.badFood);
        return false;
    }
    return true;
}
