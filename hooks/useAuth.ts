'use client';

// Custom hook for authentication
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authentication check logic
    setLoading(false);
  }, []);

  return { user, loading };
}

