import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { SearchPage } from './pages/SearchPage';
import { AddRecipePage } from './pages/AddRecipePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { ADMIN_CONFIG, isAdmin } from './config/admin';
import { initializeLocalData } from './data/localData';

function App() {
  const [user, setUser] = useState<any>(ADMIN_CONFIG.owner);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initialize local data and set admin user
    initializeLocalData();
    setUser(ADMIN_CONFIG.owner);
    setLoading(false);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">RecipeShare</h2>
          <p className="text-gray-600">Loading your culinary experience...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
        <Header user={user} onSearch={handleSearch} />
        <maqwein>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route 
              path="/add-recipe" 
              element={user ? <AddRecipePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/favorites" 
              element={user ? <FavoritesPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user && isAdmin(user.email) ? <AdminDashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <AuthPage mode="login" />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/" /> : <AuthPage mode="signup" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;