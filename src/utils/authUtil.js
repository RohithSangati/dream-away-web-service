import roles from "../constants/roles";

const hasAccess = (userRoles, roles) => {
  if (!userRoles) return false;
  for (let role of roles) {
    if (userRoles.includes(role)) {
      return true;
    }
  }
  return false;
};

const isAuthenticated = (user, allowedRoles = [roles.ROLE_USER]) => {
  return user && hasAccess(user.roles, allowedRoles);
};

export { hasAccess, isAuthenticated };
