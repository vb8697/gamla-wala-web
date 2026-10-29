'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  isInWishlist: () => false,
  toggleWishlist: () => {},
  wishlistCount: 0,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gamlawala_wishlist');
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('gamlawala_wishlist', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        wishlistCount: mounted ? wishlistIds.length : 0,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
