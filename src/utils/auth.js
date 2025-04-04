export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch (e) {
    console.log(e);
    return null;
  }
};
