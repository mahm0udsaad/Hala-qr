import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user data from AsyncStorage on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        const storedToken = await AsyncStorage.getItem("userToken");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  // Save user data to AsyncStorage
  const saveUserData = async (userData, userToken) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("userToken", userToken);
      setUser(userData);
      setToken(userToken);
    } catch (error) {
      console.error("Failed to save user data", error);
    }
  };

  // In your UserContext
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userData",
        "userToken",
        "hasSeenOnboarding",
      ]);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout failed", error);
      throw error; // Propagate the error to handle it in the component
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        token,
        saveUserData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => useContext(UserContext);
