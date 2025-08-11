import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Filter, Grid, List, Trash2, Share2 } from 'lucide-react';
import { Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

const SAMPLE_FAVORITES: Recipe[] = [
  {
    id: '1',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Soft, chewy cookies with melty chocolate chips that will remind you of home.',
    category: 'Desserts',
    cuisine: 'American',
    prep_time: 15,
    cook_time: 12,
    servings: 24,
    difficulty: 'Easy',
    ingredients: [
      { name: 'All-purpose flour', amount: '2¼', unit: 'cups' },
      { name: 'Chocolate chips', amount: '2', unit: 'cups' }
    ],
    instructions: ['Mix ingredients', 'Bake cookies'],
    image_url: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=600',
    author_id: 'user1',
    author_name: 'Sarah Johnson',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    approved: true,
    rating: 4.8,
    review_count: 127,
    view_count: 2847
  },
  {
    id: '3',
    title: 'Buddha Bowl with Tahini Dressing',
    description: 'A nourishing vegan bowl packed with colorful vegetables and protein.',
    category: 'Healthy',
    cuisine: 'Mediterranean',
    prep_time: 25,
    cook_time: 20,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Quinoa', amount: '1', unit: 'cup' },
      { name: 'Sweet potato', amount: '1', unit: 'large' }
    ],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Assemble bowl'],
    image_url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
    author_id: 'user3',
    author_name: 'Emma Green',
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-13T09:15:00Z',
    approved: true,
    rating: 4.7,
    review_count: 156,
    view_count: 3421
  }
];

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFavorites(SAMPLE_FAVORITES);
      setFilteredFavorites(SAMPLE_FAVORITES);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = favorites.filter(recipe => {
      const matchesSearch = !searchQuery || 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredFavorites(filtered);
  }, [favorites, searchQuery, selectedCategory]);

  const handleFavoriteToggle = (recipeId: string) => {
    setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
    setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleBulkRemove = () => {
    setFavorites(favorites.filter(recipe => !selectedRecipes.includes(recipe.id)));
    setSelectedRecipes([]);
  };

  const handleBulkShare = () => {
    const selectedFavorites = favorites.filter(recipe => selectedRecipes.includes(recipe.id));
    // Implement sharing logic
    console.log('Sharing recipes:', selectedFavorites);
  };

  const categories = Array.from(new Set(favorites.map(recipe => recipe.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-600 font-medium"
          >
            Loading your favorites...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 mr-3 fill-current" />
              <h1 className="text-4xl font-bold">My Favorite Recipes</h1>
            </div>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Your personal collection of beloved recipes, saved for easy access
            </p>
            <div className="mt-6 flex items-center justify-center space-x-6 text-red-100">
              <div className="text-center">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-sm">Saved Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{categories.length}</div>
                <div className="text-sm">Categories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Search your favorites..."
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              {/* Bulk Actions */}
              {selectedRecipes.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedRecipes.length} selected
                  </span>
                  <button
                    onClick={handleBulkShare}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleBulkRemove}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                </div>
              )}

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {filteredFavorites.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {searchQuery || selectedCategory ? 'No matching favorites' : 'No favorites yet'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start exploring recipes and save your favorites to see them here'
                }
              </p>
              {!searchQuery && !selectedCategory && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  onClick={() => window.location.href = '/'}
                >
                  Explore Recipes
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="favorites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-4 left-4 z-10">
                        <input
                          type="checkbox"
                          checked={selectedRecipes.includes(recipe.id)}
                          onChange={() => handleSelectRecipe(recipe.id)}
                          className="w-5 h-5 text-red-600 bg-white border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                        />
                      </div>
                      
                      <RecipeCard
                        recipe={recipe}
                        onFavoriteToggle={handleFavoriteToggle}
                        isFavorited={true}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFavorites.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex">
                        <div className="p-4 flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRecipes.includes(recipe.id)}
                            onChange={() => handleSelectRecipe(recipe.id)}
                            className="w-5 h-5 text-red-600 bg-white border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                          />
                        </div>
                        <div className="w-32 h-24 flex-shrink-0">
                          <img
                            src={recipe.image_url}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {recipe.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                                {recipe.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{recipe.prep_time + recipe.cook_time} min</span>
                                <span>{recipe.servings} servings</span>
                                <span>{recipe.difficulty}</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-yellow-500">★</span>
                                  <span>{recipe.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                {recipe.category}
                              </span>
                              <button
                                onClick={() => handleFavoriteToggle(recipe.id)}
                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Heart className="h-5 w-5 fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};