// Local Data Storage for Offline Mode
import { Recipe, Category, Review, User } from '../types';

export const LOCAL_STORAGE_KEYS = {
  RECIPES: 'recipeShare_recipes',
  USERS: 'recipeShare_users',
  REVIEWS: 'recipeShare_reviews',
  FAVORITES: 'recipeShare_favorites',
  ANALYTICS: 'recipeShare_analytics'
};

// Enhanced Sample Data with More Recipes
export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Decadent Chocolate Lava Cake',
    description: 'Rich, molten chocolate cake with a gooey center that flows like lava when cut. Perfect for special occasions and chocolate lovers.',
    category: 'Desserts',
    cuisine: 'French',
    prep_time: 20,
    cook_time: 12,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Dark chocolate', amount: '200', unit: 'g' },
      { name: 'Butter', amount: '200', unit: 'g' },
      { name: 'Eggs', amount: '4', unit: 'large' },
      { name: 'Sugar', amount: '100', unit: 'g' },
      { name: 'All-purpose flour', amount: '50', unit: 'g' },
      { name: 'Vanilla extract', amount: '1', unit: 'tsp' },
      { name: 'Butter for ramekins', amount: '2', unit: 'tbsp' },
      { name: 'Cocoa powder', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter 4 ramekins and dust with cocoa powder.',
      'Melt chocolate and butter in a double boiler until smooth.',
      'In a bowl, whisk eggs and sugar until thick and pale.',
      'Fold in the melted chocolate mixture and vanilla.',
      'Sift in flour and fold gently until just combined.',
      'Divide batter among prepared ramekins.',
      'Bake for 12-14 minutes until edges are firm but centers jiggle slightly.',
      'Let cool for 1 minute, then run a knife around edges and invert onto plates.',
      'Serve immediately with vanilla ice cream and fresh berries.'
    ],
    image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    image_gallery: [
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4110007/pexels-photo-4110007.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    author_id: 'admin',
    author_name: 'K Shruthi',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    approved: true,
    rating: 4.9,
    review_count: 156,
    view_count: 3247
  },
  {
    id: '2',
    title: 'Authentic Margherita Pizza',
    description: 'Classic Italian pizza with San Marzano tomatoes, fresh mozzarella di bufala, and aromatic basil leaves on a perfectly crispy crust.',
    category: 'Main Course',
    cuisine: 'Italian',
    prep_time: 30,
    cook_time: 15,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Pizza dough', amount: '500', unit: 'g' },
      { name: 'San Marzano tomatoes', amount: '400', unit: 'g' },
      { name: 'Fresh mozzarella di bufala', amount: '250', unit: 'g' },
      { name: 'Fresh basil leaves', amount: '20', unit: 'pieces' },
      { name: 'Extra virgin olive oil', amount: '3', unit: 'tbsp' },
      { name: 'Sea salt', amount: '1', unit: 'tsp' },
      { name: 'Garlic', amount: '2', unit: 'cloves' },
      { name: 'Oregano', amount: '1', unit: 'tsp' }
    ],
    instructions: [
      'Preheat oven to 500°F (260°C) with pizza stone inside.',
      'Crush tomatoes by hand and season with salt, garlic, and oregano.',
      'Roll out pizza dough on floured surface to 12-inch circle.',
      'Transfer dough to parchment paper.',
      'Spread tomato sauce evenly, leaving 1-inch border.',
      'Tear mozzarella into chunks and distribute over sauce.',
      'Drizzle with olive oil and sprinkle with salt.',
      'Slide pizza onto hot stone and bake 10-12 minutes.',
      'Remove when crust is golden and cheese is bubbly.',
      'Top with fresh basil leaves and serve immediately.'
    ],
    image_url: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    image_gallery: [
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    author_id: 'admin',
    author_name: 'K Shruthi',
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T14:30:00Z',
    approved: true,
    rating: 4.8,
    review_count: 203,
    view_count: 4521
  },
  {
    id: '3',
    title: 'Rainbow Buddha Bowl',
    description: 'Vibrant, nutrient-packed bowl with quinoa, roasted vegetables, avocado, and creamy tahini dressing. A complete meal in a bowl.',
    category: 'Healthy',
    cuisine: 'Mediterranean',
    prep_time: 25,
    cook_time: 30,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Quinoa', amount: '1', unit: 'cup' },
      { name: 'Sweet potato', amount: '1', unit: 'large' },
      { name: 'Chickpeas', amount: '1', unit: 'can' },
      { name: 'Kale', amount: '2', unit: 'cups' },
      { name: 'Red cabbage', amount: '1', unit: 'cup' },
      { name: 'Carrots', amount: '2', unit: 'medium' },
      { name: 'Avocado', amount: '1', unit: 'large' },
      { name: 'Tahini', amount: '3', unit: 'tbsp' },
      { name: 'Lemon juice', amount: '2', unit: 'tbsp' },
      { name: 'Maple syrup', amount: '1', unit: 'tbsp' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { name: 'Pumpkin seeds', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Cook quinoa according to package directions.',
      'Cube sweet potato and toss with olive oil and salt.',
      'Roast sweet potato for 25-30 minutes until tender.',
      'Drain and rinse chickpeas, then roast for 20 minutes.',
      'Massage kale with a bit of olive oil until softened.',
      'Shred red cabbage and julienne carrots.',
      'Whisk tahini, lemon juice, maple syrup, and water for dressing.',
      'Assemble bowls with quinoa as base.',
      'Arrange vegetables in colorful sections.',
      'Top with sliced avocado and pumpkin seeds.',
      'Drizzle with tahini dressing and serve.'
    ],
    image_url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    image_gallery: [
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    author_id: 'admin',
    author_name: 'K Shruthi',
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-13T09:15:00Z',
    approved: true,
    rating: 4.7,
    review_count: 189,
    view_count: 3821
  },
  {
    id: '4',
    title: 'Spicy Thai Green Curry',
    description: 'Aromatic and creamy Thai curry with tender chicken, fresh vegetables, and coconut milk. Bursting with authentic Thai flavors.',
    category: 'Main Course',
    cuisine: 'Asian',
    prep_time: 20,
    cook_time: 25,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Green curry paste', amount: '3', unit: 'tbsp' },
      { name: 'Coconut milk', amount: '400', unit: 'ml' },
      { name: 'Chicken breast', amount: '500', unit: 'g' },
      { name: 'Thai eggplant', amount: '2', unit: 'pieces' },
      { name: 'Bell peppers', amount: '2', unit: 'pieces' },
      { name: 'Thai basil', amount: '1', unit: 'cup' },
      { name: 'Fish sauce', amount: '2', unit: 'tbsp' },
      { name: 'Palm sugar', amount: '1', unit: 'tbsp' },
      { name: 'Kaffir lime leaves', amount: '4', unit: 'pieces' },
      { name: 'Thai chilies', amount: '2', unit: 'pieces' },
      { name: 'Jasmine rice', amount: '2', unit: 'cups' }
    ],
    instructions: [
      'Cook jasmine rice according to package directions.',
      'Heat oil in a wok over medium-high heat.',
      'Add curry paste and fry for 2 minutes until fragrant.',
      'Add thick coconut milk and stir until combined.',
      'Add sliced chicken and cook until nearly done.',
      'Add eggplant and bell peppers.',
      'Pour in remaining coconut milk.',
      'Season with fish sauce and palm sugar.',
      'Add lime leaves and chilies.',
      'Simmer until vegetables are tender.',
      'Garnish with Thai basil and serve with rice.'
    ],
    image_url: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    image_gallery: [
      'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    author_id: 'admin',
    author_name: 'K Shruthi',
    created_at: '2024-01-12T16:45:00Z',
    updated_at: '2024-01-12T16:45:00Z',
    approved: true,
    rating: 4.6,
    review_count: 267,
    view_count: 5234
  },
  {
    id: '5',
    title: 'Artisan Sourdough Bread',
    description: 'Handcrafted sourdough with a perfect crust and airy crumb. Made with wild yeast starter for complex flavors.',
    category: 'Baking',
    cuisine: 'European',
    prep_time: 30,
    cook_time: 45,
    servings: 8,
    difficulty: 'Hard',
    ingredients: [
      { name: 'Sourdough starter', amount: '100', unit: 'g' },
      { name: 'Bread flour', amount: '500', unit: 'g' },
      { name: 'Water', amount: '350', unit: 'ml' },
      { name: 'Sea salt', amount: '10', unit: 'g' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      'Mix starter with water until dissolved.',
      'Add flour and mix until shaggy dough forms.',
      'Rest for 30 minutes (autolyse).',
      'Add salt and knead until smooth.',
      'First rise: 4-6 hours with folds every 30 minutes.',
      'Shape into boule and place in banneton.',
      'Second rise: overnight in refrigerator.',
      'Preheat Dutch oven to 450°F (230°C).',
      'Score dough and bake covered 20 minutes.',
      'Remove lid and bake 20-25 minutes until golden.',
      'Cool completely before slicing.'
    ],
    image_url: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800',
    author_id: 'admin',
    author_name: 'K Shruthi',
    created_at: '2024-01-11T08:30:00Z',
    updated_at: '2024-01-11T08:30:00Z',
    approved: true,
    rating: 4.9,
    review_count: 134,
    view_count: 2876
  },
  {
    id: '6',
    title: 'Gourmet Beef Tacos',
    description: 'Elevated street tacos with perfectly seasoned beef, fresh toppings, and homemade salsa verde.',
    category: 'Main Course',
    cuisine: 'Mexican',
    prep_time: 25,
    cook_time: 20,
    servings: 6,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Corn tortillas', amount: '12', unit: 'pieces' },
      { name: 'Beef chuck roast', amount: '600', unit: 'g' },
      { name: 'White onion', amount: '1', unit: 'large' },
      { name: 'Cilantro', amount: '1', unit: 'bunch' },
      { name: 'Lime', amount: '3', unit: 'pieces' },
      { name: 'Tomatillos', amount: '500', unit: 'g' },
      { name: 'Jalapeño', amount: '2', unit: 'pieces' },
      { name: 'Mexican crema', amount: '½', unit: 'cup' },
      { name: 'Queso fresco', amount: '200', unit: 'g' },
      { name: 'Cumin', amount: '1', unit: 'tsp' },
      { name: 'Chili powder', amount: '2', unit: 'tsp' }
    ],
    instructions: [
      'Season beef with cumin, chili powder, salt, and pepper.',
      'Sear beef in hot pan until browned on all sides.',
      'Slow cook beef until tender and shreddable.',
      'Char tomatillos and jalapeños for salsa verde.',
      'Blend charred vegetables with cilantro and lime.',
      'Warm tortillas on griddle until lightly charred.',
      'Shred the cooked beef.',
      'Dice onion and chop cilantro finely.',
      'Assemble tacos with beef, onion, and cilantro.',
      'Top with crema, queso fresco, and salsa verde.',
      'Serve with lime wedges.',
      'Enjoy immediately while warm.'
    ],
    image_url: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
    image_gallery: [
      'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5737241/pexels-photo-5737241.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    author_id: 'admin',
    author_name: 'K Shruthi',
    created_at: '2024-01-10T19:15:00Z',
    updated_at: '2024-01-10T19:15:00Z',
    approved: true,
    rating: 4.8,
    review_count: 198,
    view_count: 4123
  }
];

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Desserts',
    description: 'Sweet treats and indulgent pastries',
    image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Main Course',
    description: 'Hearty meals and dinner dishes',
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Healthy',
    description: 'Nutritious and wholesome recipes',
    image_url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Baking',
    description: 'Artisan breads and baked goods',
    image_url: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Quick & Easy',
    description: 'Simple recipes under 30 minutes',
    image_url: 'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Vegetarian',
    description: 'Plant-based delicious meals',
    image_url: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Local Storage Helper Functions
export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key: string, defaultValue: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Initialize local data
export const initializeLocalData = () => {
  if (!getFromLocalStorage(LOCAL_STORAGE_KEYS.RECIPES)) {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.RECIPES, SAMPLE_RECIPES);
  }
  
  if (!getFromLocalStorage(LOCAL_STORAGE_KEYS.USERS)) {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.USERS, [{
      id: 'admin',
      name: 'K Shruthi',
      email: 'shruthik1603@gmail.com',
      phone: '6300833287',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: '2024-01-01T00:00:00Z'
    }]);
  }
};