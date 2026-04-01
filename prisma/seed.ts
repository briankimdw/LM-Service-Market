import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...\n");

  // --- Admin User ---
  // Default password: admin123 (change immediately after first login)
  const admin = await prisma.user.upsert({
    where: { email: "admin@lmservicemarket.com" },
    update: {},
    create: {
      email: "admin@lmservicemarket.com",
      password: "$2b$10$67F3.vTJi9Ld7APWiYhd7.5bsOxGbpWMCVu48dlwcjoHNvDt/57a2",
      name: "Richard",
      role: "admin",
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // --- Store Settings ---
  const hours = JSON.stringify([
    { day: "Monday", open: "10:00 AM", close: "8:00 PM", closed: false },
    { day: "Tuesday", open: "10:00 AM", close: "8:00 PM", closed: false },
    { day: "Wednesday", open: "10:00 AM", close: "8:00 PM", closed: false },
    { day: "Thursday", open: "10:00 AM", close: "8:00 PM", closed: false },
    { day: "Friday", open: "10:00 AM", close: "8:00 PM", closed: false },
    { day: "Saturday", open: "10:00 AM", close: "8:00 PM", closed: false },
    { day: "Sunday", open: "11:00 AM", close: "6:00 PM", closed: false },
  ]);

  const settings = await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      shopName: "L & M Service Market",
      tagline: "Your friendly neighborhood market in the heart of Midtown Atlanta",
      address: "785 Argonne Ave NE",
      city: "Atlanta",
      state: "GA",
      zip: "30308",
      phone: "(404) 876-0576",
      email: "info@lmservicemarket.com",
      heroTitle: "Your Neighborhood Convenience Store",
      heroSubtitle:
        "Serving Midtown Atlanta with cold drinks, fresh snacks, groceries, and the best beer and wine selection in the neighborhood",
      aboutText:
        "L & M Service Market is a beloved neighborhood bodega in Midtown Atlanta. We carry everything you need day-to-day, from cold beer and wine to snacks, groceries, tobacco, lottery tickets, and everyday essentials. Whether you are grabbing a quick drink on your way home or stocking up for the weekend, we have got you covered with friendly service and fair prices.",
      ownerBio:
        "Richard has been running L & M Service Market for years, building it into one of the most trusted and highly rated neighborhood markets in Midtown Atlanta. His commitment to knowing his customers by name and stocking exactly what the neighborhood needs has earned the store a loyal following and a near-perfect reputation.",
      yearsInBusiness: "10+",
      memberships: JSON.stringify([
        "Georgia Retailers Association",
        "Midtown Alliance",
      ]),
      hoursJson: hours,
      isOpen: true,
      socialFacebook: "",
      socialInstagram: "",
      socialTwitter: "",
      autoFetchSpot: false,
      goldBuyPremium: 0,
      goldSellPremium: 0,
      silverBuyPremium: 0,
      silverSellPremium: 0,
      platinumBuyPremium: 0,
      platinumSellPremium: 0,
      palladiumBuyPremium: 0,
      palladiumSellPremium: 0,
    },
  });
  console.log(`Store settings created: ${settings.shopName}`);

  // --- FAQ Entries ---
  const faqs: Array<{
    question: string;
    answer: string;
    sortOrder: number;
    published: boolean;
  }> = [
    {
      question: "What are your store hours?",
      answer:
        "We are open Monday through Saturday from 10:00 AM to 8:00 PM, and Sunday from 11:00 AM to 6:00 PM. We are open every day of the week so you can always count on us being here when you need something.",
      sortOrder: 0,
      published: true,
    },
    {
      question: "What products do you carry?",
      answer:
        "We stock a wide variety of convenience store essentials including cold drinks, snacks, chips, candy, canned goods, bread, dairy items, household basics, tobacco products, lottery tickets, and more. Think of us as your one-stop neighborhood market for everything you need between big grocery runs.",
      sortOrder: 1,
      published: true,
    },
    {
      question: "Do you have a good beer and wine selection?",
      answer:
        "Absolutely! Our beer and wine selection is one of the things we are best known for. We carry a rotating variety of craft beers, domestic favorites, imports, and a solid wine selection at all price points. If you are looking for something specific, just ask and we will do our best to get it in stock for you.",
      sortOrder: 2,
      published: true,
    },
    {
      question: "Do you sell lottery tickets?",
      answer:
        "Yes, we sell Georgia Lottery tickets including scratch-offs and draw games like Powerball and Mega Millions. Stop by and try your luck!",
      sortOrder: 3,
      published: true,
    },
    {
      question: "Do you offer delivery or pickup?",
      answer:
        "Currently we are an in-store shopping experience only. We are located at 785 Argonne Ave NE in Midtown Atlanta, with easy access and plenty of street parking. Come by and say hello!",
      sortOrder: 4,
      published: true,
    },
  ];

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });
    if (!existing) {
      await prisma.fAQ.create({ data: faq });
    }
  }
  console.log(`${faqs.length} FAQ entries seeded`);

  // --- Testimonials ---
  const testimonials: Array<{
    name: string;
    text: string;
    rating: number;
    featured: boolean;
  }> = [
    {
      name: "Marcus T.",
      text: "This is hands down the best little market in Midtown. The beer selection is incredible for a store this size, and Richard always has a recommendation ready. I stop in almost every day.",
      rating: 5,
      featured: true,
    },
    {
      name: "Jennifer A.",
      text: "Such a gem in the neighborhood. They have everything I need for a quick dinner or a last-minute snack run. The prices are fair and the staff is always friendly and welcoming.",
      rating: 5,
      featured: true,
    },
    {
      name: "David P.",
      text: "I moved to Midtown a year ago and this place instantly became my go-to. Great craft beer selection, good snacks, and the owner remembers your name after the first visit. That kind of service is rare.",
      rating: 5,
      featured: true,
    },
    {
      name: "Keisha W.",
      text: "Love this store! It feels like a real neighborhood spot where everybody knows each other. The wine selection surprised me and the prices are very reasonable for the area.",
      rating: 5,
      featured: true,
    },
    {
      name: "Brian L.",
      text: "Solid convenience store with way more character than a chain. They always have what I need and the hours are convenient. The lottery ticket selection is good too.",
      rating: 5,
      featured: true,
    },
    {
      name: "Stephanie R.",
      text: "One of those hidden gems you feel lucky to have in your neighborhood. Clean store, well-stocked shelves, and genuinely nice people running it. Five stars all day.",
      rating: 5,
      featured: true,
    },
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: testimonial.name },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
  console.log(`${testimonials.length} testimonials seeded`);

  // --- Sample Inventory (6 convenience store products) ---
  const products: Array<{
    title: string;
    slug: string;
    category: string;
    metal: string | null;
    year: number | null;
    mintMark: string | null;
    grade: string | null;
    certification: string | null;
    certNumber: string | null;
    description: string;
    costBasis: number | null;
    askingPrice: number;
    quantity: number;
    featured: boolean;
    images: string;
  }> = [
    {
      title: "Local Craft IPA 6-Pack",
      slug: "local-craft-ipa-6-pack",
      category: "Beer & Wine",
      metal: null,
      year: null,
      mintMark: null,
      grade: null,
      certification: null,
      certNumber: null,
      description:
        "A rotating selection of locally brewed IPAs from Georgia craft breweries. Crisp, hoppy, and always served cold. Ask us what is in stock this week.",
      costBasis: 8,
      askingPrice: 12.99,
      quantity: 24,
      featured: true,
      images: "[]",
    },
    {
      title: "House Red Wine Bottle",
      slug: "house-red-wine-bottle",
      category: "Beer & Wine",
      metal: null,
      year: null,
      mintMark: null,
      grade: null,
      certification: null,
      certNumber: null,
      description:
        "A smooth and easy-drinking red blend, perfect for a weeknight dinner or casual get-together. One of our most popular wine picks at a great price.",
      costBasis: 5,
      askingPrice: 9.99,
      quantity: 18,
      featured: true,
      images: "[]",
    },
    {
      title: "Assorted Snack Chips Bag",
      slug: "assorted-snack-chips-bag",
      category: "Snacks",
      metal: null,
      year: null,
      mintMark: null,
      grade: null,
      certification: null,
      certNumber: null,
      description:
        "Classic and flavored potato chips in a variety of brands. Grab a bag on your way out or stock up for the weekend. We carry all the popular flavors.",
      costBasis: 1.5,
      askingPrice: 3.49,
      quantity: 50,
      featured: false,
      images: "[]",
    },
    {
      title: "Fresh Deli Sandwich",
      slug: "fresh-deli-sandwich",
      category: "Groceries",
      metal: null,
      year: null,
      mintMark: null,
      grade: null,
      certification: null,
      certNumber: null,
      description:
        "Freshly made deli sandwiches available daily. A quick and satisfying lunch option for the Midtown neighborhood. Check in-store for today's selections.",
      costBasis: 3,
      askingPrice: 6.99,
      quantity: 12,
      featured: true,
      images: "[]",
    },
    {
      title: "Cold Bottled Water (1L)",
      slug: "cold-bottled-water-1l",
      category: "Beverages",
      metal: null,
      year: null,
      mintMark: null,
      grade: null,
      certification: null,
      certNumber: null,
      description:
        "Ice-cold purified bottled water, perfect for staying hydrated on the go. Always chilled and ready in our cooler.",
      costBasis: 0.5,
      askingPrice: 1.99,
      quantity: 100,
      featured: false,
      images: "[]",
    },
    {
      title: "Georgia Lottery Scratch-Off Bundle",
      slug: "georgia-lottery-scratch-off-bundle",
      category: "Lottery",
      metal: null,
      year: null,
      mintMark: null,
      grade: null,
      certification: null,
      certNumber: null,
      description:
        "Try your luck with Georgia Lottery scratch-off tickets. We carry a wide range of games at various price points. Come in and pick your favorites!",
      costBasis: null,
      askingPrice: 5.0,
      quantity: 200,
      featured: true,
      images: "[]",
    },
  ];

  for (const product of products) {
    await prisma.coinListing.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`${products.length} product listings seeded`);

  // --- Summary ---
  console.log("\nSeed Summary:");
  console.log("  Admin user: admin@lmservicemarket.com / admin123");
  console.log("  Store settings: 1");
  console.log(`  FAQ entries: ${faqs.length}`);
  console.log(`  Testimonials: ${testimonials.length}`);
  console.log(`  Product listings: ${products.length}`);
  console.log("\nDatabase seeding complete!");
  console.log("IMPORTANT: Change the admin password after first login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
