export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  cuisine: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
  image_url: string;
  image_gallery?: string[];
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  approved: boolean;
  rating: number;
  review_count: number;
  view_count: number;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Review {
  id: string;
  recipe_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Cuisine {
  id: string;
  name: string;
  flag_url: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  cuisine: string;
  difficulty: string;
  maxPrepTime: number;
  ingredients: string[];
}