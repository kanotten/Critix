// src/store/authStore.js
import { create } from 'zustand';


const loadStoredAuth = () => {
  try {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error loading auth from localStorage", error);
    return null;
  }
};

const storedAuth = loadStoredAuth();

const useAuthStore = create((set) => ({
  isAuthenticated: storedAuth?.isAuthenticated || false,
  token: storedAuth?.token || null,
  userRole: storedAuth?.userRole || null,
  email: storedAuth?.email || null,

  login: (token, role, email) => {
    const newState = {
      isAuthenticated: true,
      token,
      userRole: role,
      email,
    };
    localStorage.setItem("auth", JSON.stringify(newState));
    set(newState);
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({
      isAuthenticated: false,
      token: null,
      userRole: null,
      email: null,
    });
  },
}));

export default useAuthStore;