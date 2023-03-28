import { User,ROLES } from "./01-enum";

const currentUser: User = {
  username: "nicoBytes",
  role: ROLES.CUSTOMER,
}

export const checkAdminRole = () => {
  if (currentUser.role === ROLES.ADMIN) {
    return true;
  }
  return false;
}

export const checkRole = () => {
  if (currentUser.role === ROLES.ADMIN) {
    return true;
  }
  return false;
}

export const checkRoleV2 = (...roles: string[]) => {
  if (roles.includes(currentUser.role)) {
    return true;
  }
  return false;
}

console.log(checkAdminRole());
