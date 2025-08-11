import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Recipe, SearchFilters } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { LoadingSpinner } from '../components/LoadingSpinner';

const SAMPLE_RECIPES: Recipe[] = [
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
    id: '2',
    title: 'Margherita Pizza',
    description: 'A classic Italian pizza with fresh tomatoes, mozzarella, and basil.',
    category: 'Main Course',
    cuisine: 'Italian',
    prep_time: 20,
    cook_time: 15,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Pizza dough', amount: '1', unit: 'ball' },
      { name: 'Fresh mozzarella', amount: '8', unit: 'oz' }
    ],
    instructions: ['Prepare dough', 'Add toppings', 'Bake pizza'],
    image_url: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
    author_id: 'user2',
    author_name: 'Marco Rossi',
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T14:30:00Z',
    approved: true,
    rating: 4.9,
    review_count: 89,
    view_count: 1923
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
  },
  {
    id: '4',
    title: 'Spicy Thai Green Curry',
    description: 'Aromatic and creamy Thai curry with fresh vegetables and coconut milk.',
    category: 'Main Course',
    cuisine: 'Asian',
    prep_time: 15,
    cook_time: 25,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Green curry paste', amount: '3', unit: 'tbsp' },
      { name: 'Coconut milk', amount: '400', unit: 'ml' }
    ],
    instructions: ['Prepare curry paste', 'Add coconut milk', 'Simmer with vegetables'],
    image_url: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
    author_id: 'user4',
    author_name: 'Arjun Patel',
    created_at: '2024-01-12T16:45:00Z',
    updated_at: '2024-01-12T16:45:00Z',
    approved: true,
    rating: 4.6,
    review_count: 203,
    view_count: 4521
  }
];

const CATEGORIES = ['Desserts', 'Main Course', 'Appetizers', 'Healthy', 'Quick & Easy', 'Vegetarian'];
const CUISINES = ['Italian', 'American', 'Mediterranean', 'Asian', 'Mexican', 'Indian'];

export const SearchPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'newest' | 'popular'>('relevance');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    cuisine: '',
    difficulty: '',
    maxPrepTime: 240,
    ingredients: []
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecipes(SAMPLE_RECIPES);
      setFilteredRecipes(SAMPLE_RECIPES);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = recipes.filter(recipe => {
      const matchesQuery = !filters.query || 
        recipe.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(filters.query.toLowerCase()));
      
      const matchesCategory = !filters.category || recipe.category === filters.category;
      const matchesCuisine = !filters.cuisine || recipe.cuisine === filters.cuisine;
      const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;
      const matchesPrepTime = recipe.prep_time <= filters.maxPrepTime;

      return matchesQuery && matchesCategory && matchesCuisine && matchesDifficulty && matchesPrepTime;
    });

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.view_count - a.view_count);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredRecipes(filtered);
  }, [recipes, filters, sortBy]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

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
            Searching recipes...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Recipes</h1>
              <p className="text-gray-600 mt-1">
                Found {filteredRecipes.length} recipes
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="rating">Sort by Rating</option>
                <option value="newest">Sort by Newest</option>
                <option value="popular">Sort by Popular</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Filters Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
            categories={CATEGORIES}
            cuisines={CUISINES}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-8">
            <AnimatePresence mode="wait">
              {filteredRecipes.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters
                  </p>
                  <button
                    onClick={() => handleFiltersChange({
                      query: '',
                      category: '',
                      cuisine: '',
                      difficulty: '',
                      maxPrepTime: 240,
                      ingredients: []
                    })}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredRecipes.map((recipe, index) => (
                        <motion.div
                          key={recipe.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <RecipeCard
                            recipe={recipe}
                            onFavoriteToggle={(id) => console.log('Toggle favorite:', id)}
                            isFavorited={false}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredRecipes.map((recipe, index) => (
                        <motion.div
                          key={recipe.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="flex">
                            <div className="w-48 h-32 flex-shrink-0">
                              <img
                                src={recipe.image_url}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {recipe.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
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
                                <div className="flex flex-col items-end space-y-2">
                                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                                    {recipe.category}
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                    {recipe.cuisine}
                                  </span>
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
      </div>
    </div>
  );
};