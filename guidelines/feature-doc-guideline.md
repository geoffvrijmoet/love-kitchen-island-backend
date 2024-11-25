# Project Overview
    Use this guide to build a web app that allows me to manage the backend of my business, Love Kitchen Island (https://www.lovekitchenisland.com).

# What is Love Kitchen Island?

    Love Kitchen Island is a business that sells kitchen islands and other kitchen furniture. We are a dropshipping business that sells products from companies that ship from the United States, but many of the products are manufactured overseas in places like Thaiwan, Vietnam, China, and so on.

    We are in a competitive market with many other dropshipping businesses that sell similar products. Our selling point is that we offer super-competitive prices. We focus on selling high-quality products that are made from durable materials and are designed to last for many years, because one of the ways we are able to offer super-competitive prices is that we ideally will rarely need to issue refunds due to damaged, defective, or poorly shipped products.

    We are always on the lookout for new suppliers that can offer us high-quality products, and we are aware that if we are persistent, we will be able to find suppliers that can offer us products where the market is less competitive, which is when we can raise our prices and start to make more of a comfortable profit.

    Love Kitchen Island is a business that I run on the side to supplement my income. I am the only employee.

    Love Kitchen Island is currently hosted on Shopify. I don't want to migrate to a new platform, but I want to build a custom backend that simply integrates with Shopify and gives me more functionality than Shopify offers out of the box.



# Feature Requirements
    - The web app will be hosted at admin.lovekitchenisland.com.
    - There should be a feature which sync inventory between my store and my suppliers.
    - There should be a feature which calculates how much actual profit I am making on each product across different scenarios (e.g. different credit card processing fees, different shipping methods, etc.).
    - Our app should rely on the GraphQL API for Shopify, not the REST API.
    - There should be a UI which calculates how much actual profit I make on each individual sale.
    - There should be a UI which allows me to interact with my Google Ads campaigns. My personal strategy for Google Ads is to create an "Alpha" campaign and a "Beta" campaign. The Alpha campaign is set as "low priority", contains a higher budget and higher bids, and has a negative keyword list that excludes keywords that are very broad or not likely to convert (e.g. "kitchen island"). The Beta campaign is set as "high priority", contains a lower budget and lower bids, and has a negative keyword list that excludes keywords that are very specific (e.g. "kitchen island with quartz countertopp by Ashley Madison SKU 456-234"). These negative keyword lists should be adjusted over time as I learn more about which keywords convert and which don't, and the web app should allow me to make changes to these lists.
    - The web app should have lightning-fast performance.
    - The entire app should be extremely mobile-friendly.
    - The app will be built with Next.js, Shadcn, Lucid, Clerk, MongoDB, and Tailwind CSS to build the app.
    - Users will only be able to access the app if they are logged into sales@lovekitchenisland.com. No other users should be able to access the app.

# Relevant Docs
    This is the reference documentation for Clerk: https://clerk.com/docs/references/nextjs/

# Current File Structure
LOVE-KITCHEN-ISLAND-BACKEND
├── app/
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── guidelines/
│   └── feature-doc-guideline.md
├── lib/
│   └── utils.ts
├── node_modules/
├── .cursorrules
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go in /app.