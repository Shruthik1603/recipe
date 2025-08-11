import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, Star, Heart, Share2, ChefHat, 
  ArrowLeft, MessageCircle, Eye, Bookmark,
  Timer, Utensils, Award, TrendingUp
} from 'lucide-react';
import { Recipe, Review } from '../types';
import { StarRating } from '../components/StarRating';
import { ImageGallery } from '../components/ImageGallery';
import { LoadingSpinner } from '../components/LoadingSpinner';

const SAMPLE_RECIPE: Recipe = {
  id: '1',
  title: 'Classic Chocolate Chip Cookies',
  description: 'Soft, chewy cookies with melty chocolate chips that will remind you of home. These cookies are perfect for any occasion and loved by both kids and adults.',
  category: 'Desserts',
  cuisine: 'American',
  prep_time: 15,
  cook_time: 12,
  servings: 24,
  difficulty: 'Easy',
  ingredients: [
    { name: 'All-purpose flour', amount: '2¼', unit: 'cups' },
    { name: 'Baking soda', amount: '1', unit: 'tsp' },
    { name: 'Salt', amount: '1', unit: 'tsp' },
    { name: 'Butter', amount: '1', unit: 'cup' },
    { name: 'Granulated sugar', amount: '¾', unit: 'cup' },
    { name: 'Brown sugar', amount: '¾', unit: 'cup' },
    { name: 'Vanilla extract', amount: '1', unit: 'tsp' },
    { name: 'Large eggs', amount: '2', unit: 'pieces' },
    { name: 'Chocolate chips', amount: '2', unit: 'cups' }
  ],
  instructions: [
    'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
    'In a medium bowl, whisk together flour, baking soda, and salt. Set aside.',
    'In a large bowl, beat butter and both sugars until light and fluffy, about 3-4 minutes.',
    'Beat in vanilla and eggs one at a time until well blended.',
    'Gradually beat in flour mixture until just combined. Don\'t overmix.',
    'Stir in chocolate chips until evenly distributed.',
    'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.',
    'Bake 9 to 11 minutes or until golden brown around edges but still soft in center.',
    'Cool on baking sheet for 5 minutes, then remove to wire rack to cool completely.'
  ],
  image_url: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
  image_gallery: [
    'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4110007/pexels-photo-4110007.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  author_id: 'user1',
  author_name: 'Sarah Johnson',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
  approved: true,
  rating: 4.8,
  review_count: 127,
  view_count: 2847
};

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    recipe_id: '1',
    user_id: 'user2',
    user_name: 'Mike Chen',
    rating: 5,
    comment: 'These cookies are absolutely amazing! My family loved them and they disappeared within hours. Will definitely make again!',
    created_at: '2024-01-16T14:30:00Z'
  },
  {
    id: '2',
    recipe_id: '1',
    user_id: 'user3',
    user_name: 'Emma Wilson',
    rating: 4,
    comment: 'Great recipe! I added some sea salt on top and they were perfect. The texture was exactly what I was looking for.',
    created_at: '2024-01-17T09:15:00Z'
  },
  {
    id: '3',
    recipe_id: '1',
    user_id: 'user4',
    user_name: 'David Rodriguez',
    rating: 5,
    comment: 'Best chocolate chip cookie recipe I\'ve tried! Easy to follow instructions and perfect results every time.',
    created_at: '2024-01-18T16:45:00Z'
  }
];

export const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'reviews'>('ingredients');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecipe(SAMPLE_RECIPE);
      setReviews(SAMPLE_REVIEWS);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: recipe?.title,
        text: recipe?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const submitReview = () => {
    const review: Review = {
      id: Date.now().toString(),
      recipe_id: recipe!.id,
      user_id: 'current-user',
      user_name: 'You',
      rating: newReview.rating,
      comment: newReview.comment,
      created_at: new Date().toISOString()
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
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
            Loading recipe details...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-96 bg-gradient-to-r from-orange-500 to-red-500"
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to recipes
                </Link>
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {recipe.title}
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 max-w-2xl"
              >
                {recipe.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipe Info Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Clock, label: 'Prep Time', value: `${recipe.prep_time} min`, color: 'text-blue-500' },
                { icon: Timer, label: 'Cook Time', value: `${recipe.cook_time} min`, color: 'text-green-500' },
                { icon: Users, label: 'Servings', value: recipe.servings.toString(), color: 'text-purple-500' },
                { icon: Award, label: 'Difficulty', value: recipe.difficulty, color: 'text-orange-500' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
                >
                  <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <ImageGallery images={recipe.image_gallery || [recipe.image_url]} title={recipe.title} />
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { key: 'ingredients', label: 'Ingredients', icon: Utensils },
                    { key: 'instructions', label: 'Instructions', icon: ChefHat },
                    { key: 'reviews', label: 'Reviews', icon: MessageCircle }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                        activeTab === tab.key
                          ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'ingredients' && (
                    <motion.div
                      key="ingredients"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
                      <div className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            <span className="font-medium text-orange-600">
                              {ingredient.amount} {ingredient.unit}
                            </span>
                            <span className="text-gray-900">{ingredient.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'instructions' && (
                    <motion.div
                      key="instructions"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
                      <div className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <p className="text-gray-900 leading-relaxed">{instruction}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Reviews ({reviews.length})</h3>
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Write Review
                        </button>
                      </div>

                      {showReviewForm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <StarRating
                              rating={newReview.rating}
                              onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                              size="lg"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                            <textarea
                              value={newReview.comment}
                              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              rows={4}
                              placeholder="Share your thoughts about this recipe..."
                            />
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={submitReview}
                              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              Submit Review
                            </button>
                            <button
                              onClick={() => setShowReviewForm(false)}
                              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}

                      <div className="space-y-4">
                        {reviews.map((review, index) => (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                  {review.user_name[0]}
                                </div>
                                <span className="font-medium text-gray-900">{review.user_name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <StarRating rating={review.rating} readonly size="sm" />
                                <span className="text-sm text-gray-500">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            {review.comment && (
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recipe Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recipe Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-700">Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-gray-900">{recipe.rating}</span>
                    <span className="text-gray-500">({recipe.review_count})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Views</span>
                  </div>
                  <span className="font-bold text-gray-900">{recipe.view_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Category</span>
                  </div>
                  <span className="font-bold text-gray-900">{recipe.category}</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFavoriteToggle}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isFavorited
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  <span>{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share Recipe</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Save to Collection</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Author Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recipe Author</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {recipe.author_name[0]}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{recipe.author_name}</div>
                  <div className="text-sm text-gray-500">Recipe Creator</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Published on {new Date(recipe.created_at).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};