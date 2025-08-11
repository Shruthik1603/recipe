import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Upload, Camera, Clock, Users, 
  ChefHat, Star, Save, Eye, ArrowLeft 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Recipe, Ingredient } from '../types';

const CATEGORIES = ['Desserts', 'Main Course', 'Appetizers', 'Healthy', 'Quick & Easy', 'Vegetarian'];
const CUISINES = ['Italian', 'American', 'Mediterranean', 'Asian', 'Mexican', 'Indian'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: '',
    description: '',
    category: '',
    cuisine: '',
    prep_time: 0,
    cook_time: 0,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [],
    instructions: [],
    image_url: '',
    image_gallery: []
  });

  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: '',
    amount: '',
    unit: ''
  });

  const [newInstruction, setNewInstruction] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Recipe details and timing' },
    { number: 2, title: 'Ingredients', description: 'Add all ingredients' },
    { number: 3, title: 'Instructions', description: 'Step-by-step cooking guide' },
    { number: 4, title: 'Images', description: 'Upload recipe photos' },
    { number: 5, title: 'Review', description: 'Final review and submit' }
  ];

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.amount) {
      setRecipe({
        ...recipe,
        ingredients: [...(recipe.ingredients || []), newIngredient]
      });
      setNewIngredient({ name: '', amount: '', unit: '' });
    }
  };

  const removeIngredient = (index: number) => {
    const ingredients = recipe.ingredients || [];
    setRecipe({
      ...recipe,
      ingredients: ingredients.filter((_, i) => i !== index)
    });
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setRecipe({
        ...recipe,
        instructions: [...(recipe.instructions || []), newInstruction.trim()]
      });
      setNewInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    const instructions = recipe.instructions || [];
    setRecipe({
      ...recipe,
      instructions: instructions.filter((_, i) => i !== index)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setRecipe({ ...recipe, image_url: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRecipe = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return recipe.title && recipe.description && recipe.category && recipe.cuisine;
      case 2:
        return (recipe.ingredients?.length || 0) > 0;
      case 3:
        return (recipe.instructions?.length || 0) > 0;
      case 4:
        return recipe.image_url;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Recipe</h1>
                <p className="text-gray-600">Share your culinary creation with the community</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep >= step.number
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  animate={{
                    scale: currentStep === step.number ? 1.1 : 1,
                    backgroundColor: currentStep >= step.number ? '#f97316' : '#e5e7eb'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number}
                </motion.div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Recipe Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipe Title *
                    </label>
                    <input
                      type="text"
                      value={recipe.title}
                      onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter a catchy recipe title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={recipe.description}
                      onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Describe your recipe and what makes it special..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={recipe.category}
                        onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select category</option>
                        {CATEGORIES.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cuisine *
                      </label>
                      <select
                        value={recipe.cuisine}
                        onChange={(e) => setRecipe({ ...recipe, cuisine: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select cuisine</option>
                        {CUISINES.map(cuisine => (
                          <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Prep Time (min)
                      </label>
                      <input
                        type="number"
                        value={recipe.prep_time}
                        onChange={(e) => setRecipe({ ...recipe, prep_time: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Cook Time (min)
                      </label>
                      <input
                        type="number"
                        value={recipe.cook_time}
                        onChange={(e) => setRecipe({ ...recipe, cook_time: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="h-4 w-4 inline mr-1" />
                        Servings
                      </label>
                      <input
                        type="number"
                        value={recipe.servings}
                        onChange={(e) => setRecipe({ ...recipe, servings: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Star className="h-4 w-4 inline mr-1" />
                        Difficulty
                      </label>
                      <select
                        value={recipe.difficulty}
                        onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        {DIFFICULTIES.map(difficulty => (
                          <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Ingredients */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe Ingredients</h2>
                
                {/* Add Ingredient Form */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add Ingredient</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={newIngredient.name}
                        onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Ingredient name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newIngredient.amount}
                        onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Amount"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newIngredient.unit}
                        onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Unit"
                      />
                      <button
                        onClick={addIngredient}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Ingredients ({recipe.ingredients?.length || 0})
                  </h3>
                  {recipe.ingredients?.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="font-medium text-orange-600">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                        <span className="text-gray-900">{ingredient.name}</span>
                      </div>
                      <button
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                  
                  {(!recipe.ingredients || recipe.ingredients.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <ChefHat className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No ingredients added yet. Add your first ingredient above!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Instructions */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cooking Instructions</h2>
                
                {/* Add Instruction Form */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add Step</h3>
                  <div className="flex space-x-4">
                    <textarea
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      rows={3}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Describe this cooking step in detail..."
                    />
                    <button
                      onClick={addInstruction}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors self-start"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Instructions List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Instructions ({recipe.instructions?.length || 0} steps)
                  </h3>
                  {recipe.instructions?.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex space-x-4 p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 leading-relaxed">{instruction}</p>
                      </div>
                      <button
                        onClick={() => removeInstruction(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                  
                  {(!recipe.instructions || recipe.instructions.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <ChefHat className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No instructions added yet. Add your first step above!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Images */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe Images</h2>
                
                <div className="space-y-6">
                  {/* Main Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Main Recipe Image *
                    </label>
                    
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Recipe preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setImagePreview('');
                            setRecipe({ ...recipe, image_url: '' });
                          }}
                          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Upload Recipe Image
                          </p>
                          <p className="text-gray-500">
                            Click to browse or drag and drop your image here
                          </p>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Photo Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use natural lighting when possible</li>
                      <li>• Show the finished dish from an appealing angle</li>
                      <li>• Include some ingredients or cooking tools for context</li>
                      <li>• Make sure the image is clear and high quality</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Recipe</h2>
                
                <div className="space-y-6">
                  {/* Recipe Preview */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-6">
                      {recipe.image_url && (
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                        <p className="text-gray-600 mb-4">{recipe.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{recipe.category}</span>
                          <span>•</span>
                          <span>{recipe.cuisine}</span>
                          <span>•</span>
                          <span>{(recipe.prep_time || 0) + (recipe.cook_time || 0)} min</span>
                          <span>•</span>
                          <span>{recipe.servings} servings</span>
                          <span>•</span>
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {recipe.ingredients?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Ingredients</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {recipe.instructions?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Steps</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {recipe.image_url ? '1' : '0'}
                      </div>
                      <div className="text-sm text-gray-600">Images</div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Ready to Share?</h4>
                    <p className="text-orange-800 text-sm mb-4">
                      Your recipe will be reviewed by our team before being published to ensure quality and safety.
                    </p>
                    <button
                      onClick={submitRecipe}
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Recipe...</span>
                        </>
                      ) : (
                        <>
                          <ChefHat className="h-5 w-5" />
                          <span>Submit Recipe for Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentStep >= step.number ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </button>
            ) : (
              <div className="w-20" /> // Spacer
            )}
          </div>
        </div>
      </div>
    </div>
  );
};