import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : initialValue;
      }
    } catch (error) {
      console.error("Lỗi đọc LocalStorage:", error);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.getItem(key);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Lỗi ghi LocalStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}