import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ChefHat, Star, Eye, TrendingUp, Award, 
  Settings, BarChart3, PieChart, Activity,
  Calendar, Clock, Heart, MessageCircle
} from 'lucide-react';
import { ADMIN_CONFIG } from '../config/admin';
import { getFromLocalStorage, LOCAL_STORAGE_KEYS } from '../data/localData';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalViews: 0,
    avgRating: 0,
    popularRecipes: [],
    recentActivity: []
  });

  useEffect(() => {
    // Load stats from local storage
    const recipes = getFromLocalStorage(LOCAL_STORAGE_KEYS.RECIPES, []);
    const users = getFromLocalStorage(LOCAL_STORAGE_KEYS.USERS, []);
    const reviews = getFromLocalStorage(LOCAL_STORAGE_KEYS.REVIEWS, []);
    
    const totalViews = recipes.reduce((sum: number, recipe: any) => sum + (recipe.view_count || 0), 0);
    const avgRating = recipes.reduce((sum: number, recipe: any) => sum + (recipe.rating || 0), 0) / recipes.length || 0;
    
    setStats({
      totalRecipes: recipes.length,
      totalUsers: users.length,
      totalReviews: reviews.length,
      totalViews,
      avgRating: Math.round(avgRating * 10) / 10,
      popularRecipes: recipes.sort((a: any, b: any) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 5),
      recentActivity: []
    });
  }, []);

  const statCards = [
    {
      title: 'Total Recipes',
      value: stats.totalRecipes,
      icon: ChefHat,
      color: 'from-orange-500 to-red-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews,
      icon: MessageCircle,
      color: 'from-green-500 to-teal-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Average Rating',
      value: stats.avgRating,
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      change: '+0.2',
      changeType: 'positive'
    },
    {
      title: 'Engagement Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'from-indigo-500 to-blue-500',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {ADMIN_CONFIG.owner.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Owner & Administrator</div>
                <div className="text-lg font-semibold text-gray-900">{ADMIN_CONFIG.owner.email}</div>
                <div className="text-sm text-gray-500">{ADMIN_CONFIG.owner.phone}</div>
              </div>
              <img
                src={ADMIN_CONFIG.owner.avatar}
                alt={ADMIN_CONFIG.owner.name}
                className="w-12 h-12 rounded-full border-2 border-orange-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-white text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </span>
                  <TrendingUp className={`h-4 w-4 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Recipes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-orange-500" />
                Popular Recipes
              </h3>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {stats.popularRecipes.map((recipe: any, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{recipe.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {recipe.view_count?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {recipe.rating || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-green-500" />
                Recent Activity
              </h3>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { action: 'New recipe added', user: 'K Shruthi', time: '2 hours ago', type: 'recipe' },
                { action: 'Recipe reviewed', user: 'User123', time: '4 hours ago', type: 'review' },
                { action: 'Recipe favorited', user: 'FoodLover', time: '6 hours ago', type: 'favorite' },
                { action: 'New user registered', user: 'ChefMaster', time: '8 hours ago', type: 'user' },
                { action: 'Recipe shared', user: 'CookingPro', time: '1 day ago', type: 'share' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'recipe' ? 'bg-orange-500' :
                    activity.type === 'review' ? 'bg-blue-500' :
                    activity.type === 'favorite' ? 'bg-red-500' :
                    activity.type === 'user' ? 'bg-purple-500' : 'bg-green-500'
                  }`}>
                    {activity.type === 'recipe' && <ChefHat className="h-5 w-5 text-white" />}
                    {activity.type === 'review' && <MessageCircle className="h-5 w-5 text-white" />}
                    {activity.type === 'favorite' && <Heart className="h-5 w-5 text-white" />}
                    {activity.type === 'user' && <Users className="h-5 w-5 text-white" />}
                    {activity.type === 'share' && <TrendingUp className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">by {activity.user} • {activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-purple-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Manage Recipes', icon: ChefHat, color: 'from-orange-500 to-red-500' },
              { title: 'User Management', icon: Users, color: 'from-blue-500 to-purple-500' },
              { title: 'Analytics', icon: BarChart3, color: 'from-green-500 to-teal-500' },
              { title: 'Settings', icon: Settings, color: 'from-purple-500 to-pink-500' }
            ].map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${action.color} p-6 rounded-xl text-white hover:shadow-lg transition-all duration-300`}
              >
                <action.icon className="h-8 w-8 mb-3 mx-auto" />
                <p className="font-semibold">{action.title}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};