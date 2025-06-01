// Import dependencies
import { useEffect, useState } from 'react';
import './App.css';
import { saveFood } from './api';
import Dashboard from './components/Dashboard';
import ListOfFoods from './components/ListOfFoods';

const App = () => {
    // State declarations
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showBadFoods, setShowBadFoods] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showBadFoodForm, setShowBadFoodForm] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        note: '',
        receivedTime: '',
        category: ''
    });
    const [page, setPage] = useState('dashboard');
    const [menuOpen, setMenuOpen] = useState(false);

    // Fetch foods and categories
    const fetchFoods = () => {
        fetch("http://localhost:3000/foods")
            .then(res => res.json())
            .then(setFoods)
            .catch(err => console.error('Error loading foods:', err));
    };

    useEffect(() => {
        fetchFoods();
        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(setCategories)
            .catch(err => console.error('Error loading categories:', err));
    }, []);

    const badFoods = foods.filter(food => food.badFood);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedCategory = categories.find(cat => String(cat.ID) === formData.category);

        let formattedDate = '';
        if (formData.receivedTime) {
            const [year, month, day] = formData.receivedTime.split('-');
            formattedDate = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
        }

        const foodToSave = {
            name: formData.name,
            amount: Number(formData.amount),
            note: formData.note,
            receivedTime: formattedDate,
            badFood: false,
            category: selectedCategory
        };
        saveFood(foodToSave)
            .then(() => {
                setShowForm(false);
                setFormData({
                    name: '',
                    amount: '',
                    note: '',
                    receivedTime: '',
                    category: ''
                });
                fetchFoods();
            })
            .catch(err => alert('Error saving food: ' + err));
    };

return (
  <>
    {page === 'dashboard' && (
      <Dashboard
        foods={foods}
        categories={categories}
        showBadFoods={showBadFoods}
        setShowBadFoods={setShowBadFoods}
        showForm={showForm}
        setShowForm={setShowForm}
        showBadFoodForm={showBadFoodForm}
        setShowBadFoodForm={setShowBadFoodForm}
        selectedFoodId={selectedFoodId}
        setSelectedFoodId={setSelectedFoodId}
        formData={formData}
        setFormData={setFormData}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        page={page}
        setPage={setPage}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        badFoods={badFoods}
        fetchFoods={fetchFoods}
      />
    )}
        {page === 'foods' && (
  <ListOfFoods
    foods={foods}
    menuOpen={menuOpen}
    setMenuOpen={setMenuOpen}
    page={page}
    setPage={setPage}
    fetchFoods={fetchFoods}
    categories={categories}
  />
)}
  </>
);

};

export default App;



