// Admin Configuration
export const ADMIN_CONFIG = {
  owner: {
    name: 'K Shruthi',
    email: 'shruthik1603@gmail.com',
    phone: '6300833287',
    role: 'owner',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-01-01',
    permissions: ['all']
  },
  settings: {
    appName: 'RecipeShare Pro',
    version: '1.0.0',
    localMode: true,
    autoApprove: true, // Auto-approve recipes in local mode
    maxRecipesPerUser: 100,
    allowGuestViewing: true
  }
};

export const isAdmin = (userEmail?: string) => {
  return userEmail === ADMIN_CONFIG.owner.email;
};

export const isOwner = (userEmail?: string) => {
  return userEmail === ADMIN_CONFIG.owner.email;
};