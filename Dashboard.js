import React from 'react';
import BadFoodTable from './BadFoodTable';
import BadFoodDialog from './BadFoodDialog';
import Menu from './Menu';
import FoodList from './FoodList';
import DashboardHeader from './DashboardHeader';
import ShowBadFoodsButton from './ShowBadFoodsButton';
import NewBadFoodButton from './NewBadFoodButton';

// Helper: Get foods received in the last 7 days
const getRecentFoods = (foods) => {
  const now = new Date();
  return foods.filter(food => {
    if (!food.receivedTime) return false;
    const [day, month, year] = food.receivedTime.split('.');
    const foodDate = new Date(`${year}-${month}-${day}`);
    const diffDays = (now - foodDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7 && diffDays >= 0;
  });
};

const Dashboard = ({
  foods, categories, showBadFoods, setShowBadFoods,
  showForm, setShowForm, showBadFoodForm, setShowBadFoodForm,
  selectedFoodId, setSelectedFoodId, formData, setFormData,
  menuOpen, setMenuOpen, page, setPage,
  handleInputChange, handleFormSubmit, badFoods, fetchFoods
}) => {
  // Only show foods from the last 7 days
  const recentFoods = getRecentFoods(foods);

  return (
    <div
      className="dashboard-root"
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f9f6f1'
      }}
    >
      {/* Sidebar/Menu */}
      <div
        style={{
          marginRight: 24,
          marginTop: 140, // Space from top for menu
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          minWidth: 0,
          position: 'relative'
        }}
      >
        <Menu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
        />
      </div>

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header/Logo */}
        <DashboardHeader setPage={setPage} />

        {/* Content Area */}
        <div
          style={{
            marginTop: 0,
            padding: '0 40px',
            marginLeft: 48
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            {/* Food List Section */}
            <section
              style={{
                minWidth: '500px',
                marginRight: '40px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <FoodList
                foods={recentFoods}
                showForm={showForm}
                setShowForm={setShowForm}
                formData={formData}
                categories={categories}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                setFormData={setFormData}
              />
            </section>

            {/* Bad Foods Section */}
            <aside
              style={{
                minWidth: '350px',
                marginLeft: '300px',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              {/* Controls for Bad Foods */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '0',
                  position: 'relative'
                }}
              >
                {/* Show/Hide Bad Foods Button and Rollout */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    position: 'relative'
                  }}
                >
                  <ShowBadFoodsButton
                    showBadFoods={showBadFoods}
                    setShowBadFoods={setShowBadFoods}
                  />
                  {/* Rollout: Bad foods table appears below button */}
                  {showBadFoods && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 10,
                        minWidth: 320,
                        background: '#f3e9d2',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        marginTop: 4,
                        border: '1px solid #f99'
                      }}
                    >
                      <BadFoodTable badFoods={badFoods} />
                    </div>
                  )}
                </div>

                {/* Button: Add new bad food */}
                <NewBadFoodButton onClick={() => setShowBadFoodForm(true)} />

                {/* Dialog: Select food to mark as bad */}
                {showBadFoodForm && (
                  <BadFoodDialog
                    foods={foods}
                    selectedFoodId={selectedFoodId}
                    setSelectedFoodId={setSelectedFoodId}
                    onClose={() => {
                      setShowBadFoodForm(false);
                      setSelectedFoodId('');
                    }}
                    onMarkBad={async (e) => {
                      e.preventDefault();
                      if (!selectedFoodId) return;
                      const food = foods.find(f => String(f.ID) === selectedFoodId);
                      if (!food) return;
                      try {
                        await fetch(`http://localhost:3000/foods/${food.ID}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ...food, badFood: true })
                        });
                        setShowBadFoodForm(false);
                        setSelectedFoodId('');
                        fetchFoods();
                      } catch (err) {
                        alert('Failed to mark as bad food');
                      }
                    }}
                  />
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;