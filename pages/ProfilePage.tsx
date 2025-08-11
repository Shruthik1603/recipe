import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, Award, ChefHat, 
  Heart, Star, Eye, Edit3, Save, X, Camera,
  Settings, Shield, Bell, Lock
} from 'lucide-react';
import { ADMIN_CONFIG } from '../config/admin';

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: ADMIN_CONFIG.owner.name,
    email: ADMIN_CONFIG.owner.email,
    phone: ADMIN_CONFIG.owner.phone,
    bio: 'Passionate food enthusiast and recipe creator. Love experimenting with flavors from around the world.',
    location: 'Hyderabad, India',
    website: 'www.recipeshare.com',
    joinDate: ADMIN_CONFIG.owner.joinDate
  });

  const [stats] = useState({
    recipesCreated: 25,
    totalViews: 15420,
    avgRating: 4.8,
    followers: 1250,
    following: 180,
    favorites: 89
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save to local storage or API
  };

  const achievements = [
    { title: 'Recipe Master', description: 'Created 25+ recipes', icon: ChefHat, color: 'text-orange-500' },
    { title: 'Community Favorite', description: '1000+ recipe views', icon: Eye, color: 'text-blue-500' },
    { title: 'Top Rated', description: '4.8+ average rating', icon: Star, color: 'text-yellow-500' },
    { title: 'Admin', description: 'Platform administrator', icon: Shield, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-opacity-30 transition-all"
            >
              <Camera className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <img
                  src={ADMIN_CONFIG.owner.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full text-white shadow-lg hover:bg-orange-600 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isEditing 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </motion.button>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Owner & Administrator</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6 pt-6 border-t border-gray-200">
              {[
                { label: 'Recipes', value: stats.recipesCreated, icon: ChefHat },
                { label: 'Views', value: stats.totalViews.toLocaleString(), icon: Eye },
                { label: 'Rating', value: stats.avgRating, icon: Star },
                { label: 'Followers', value: stats.followers.toLocaleString(), icon: User },
                { label: 'Following', value: stats.following, icon: User },
                { label: 'Favorites', value: stats.favorites, icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-1">
                    <stat.icon className="h-5 w-5 text-orange-500 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-orange-500" />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: profile.name, key: 'name', icon: User },
                  { label: 'Email', value: profile.email, key: 'email', icon: Mail },
                  { label: 'Phone', value: profile.phone, key: 'phone', icon: Phone },
                  { label: 'Location', value: profile.location, key: 'location', icon: Calendar },
                  { label: 'Website', value: profile.website, key: 'website', icon: Settings }
                ].map((field) => (
                  <div key={field.key} className="flex items-center space-x-4">
                    <field.icon className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{field.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-start space-x-4">
                  <User className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200"
                >
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-orange-500" />
                Achievements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className={`p-3 rounded-full bg-white shadow-md ${achievement.color}`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-orange-500" />
                Quick Settings
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Email Notifications', icon: Bell, enabled: true },
                  { label: 'Profile Visibility', icon: Eye, enabled: true },
                  { label: 'Two-Factor Auth', icon: Lock, enabled: false }
                ].map((setting, index) => (
                  <motion.div
                    key={setting.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <setting.icon className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-900">{setting.label}</span>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      setting.enabled ? 'bg-orange-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" />
                  <span>Member since {new Date(profile.joinDate).getFullYear()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};