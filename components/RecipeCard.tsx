import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart, Eye, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle?: (recipeId: string) => void;
  isFavorited?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onFavoriteToggle, isFavorited }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/recipe/${recipe.id}`}>
          <div className="relative overflow-hidden">
            <motion.img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            />
          </div>
        </Link>
        
        {onFavoriteToggle && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavoriteToggle(recipe.id)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all hover:bg-white"
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
            />
          </motion.button>
        )}
        
        <div className="absolute bottom-3 left-3">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-full shadow-lg"
          >
            {recipe.category}
          </motion.span>
        </div>
        
        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}
          >
            {recipe.difficulty}
          </motion.span>
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/recipe/${recipe.id}`}>
          <motion.h3
            className="text-lg font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors line-clamp-2"
            whileHover={{ x: 2 }}
          >
            {recipe.title}
          </motion.h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>
        
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>{recipe.prep_time + recipe.cook_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4 text-gray-400" />
              <span>{recipe.view_count}</span>
            </div>
          </div>
        </div>
        
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{recipe.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>({recipe.review_count})</span>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-medium">
            {recipe.cuisine}
          </span>
        </div>
        
        {/* Author */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-600">
            by <span className="font-medium text-gray-900">{recipe.author_name}</span>
          </span>
          <motion.div
            className="text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {new Date(recipe.created_at).toLocaleDateString()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};