// ============================================================
// STORE CONFIGURATION
// Change these values to reskin for a different store.
// ============================================================

export const shopConfig = {
  // These are defaults — they get overridden by StoreSettings in DB
  name: "L & M Service Market",
  tagline: "Your Neighborhood Convenience Store",
  address: "785 Argonne Ave NE",
  city: "Atlanta",
  state: "GA",
  zip: "30308",
  phone: "(404) 876-0576",
  email: "info@lmservicemarket.com",
  url: "https://lmservicemarket.com",

  // Categories available in inventory
  categories: [
    "Snacks & Candy",
    "Beverages",
    "Beer & Wine",
    "Groceries",
    "Dairy & Frozen",
    "Household",
    "Tobacco",
    "Lottery",
  ],

  metals: [] as string[],

  grades: [] as string[],

  certServices: [] as string[],

  // Services the store offers
  services: [
    { name: "Groceries", icon: "groceries", description: "Fresh produce, dairy, and everyday essentials" },
    { name: "Beer & Wine", icon: "beer", description: "Wide selection of craft beer and wine" },
    { name: "Snacks", icon: "snacks", description: "Chips, candy, and quick bites" },
    { name: "Beverages", icon: "beverages", description: "Cold drinks, coffee, and juices" },
    { name: "Lottery", icon: "lottery", description: "Lottery tickets and scratch-offs" },
    { name: "Household", icon: "household", description: "Cleaning supplies and everyday basics" },
  ],

  payoutEstimates: {} as Record<string, { min: number; max: number }>,

  // Social links (override from admin)
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

export type ShopConfig = typeof shopConfig;
