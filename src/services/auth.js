export const roles = {
  ADMIN: 'Admin',
  VETERINARIAN: 'Veterinarian',
  USER: 'User',
};

export function getCurrentUserRole() {
  // Mock function to get the current user's role
  // Replace with actual authentication logic
  return localStorage.getItem('userRole') || roles.USER;
}

export function isAuthorized(requiredRole) {
  const currentRole = getCurrentUserRole();
  return currentRole === requiredRole;
}