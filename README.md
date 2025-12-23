
# Jumbo Meat Suppliers - Documentation

Welcome to the Jumbo Meat Suppliers website project. This is a high-performance React application designed to help the business manage orders via WhatsApp and engage with customers in Bulawayo.

## Project Structure
- `index.tsx`: Application entry point.
- `App.tsx`: Main layout, routing, and state management (Cart).
- `constants.ts`: **Central data hub.** Edit this file to update business information, hours, or products.
- `types.ts`: TypeScript interfaces for the data models.
- `components/`: Modular UI sections (Hero, About, Products, etc.).

## How to Update Content (Admin Access)
Since this is a static-driven professional site, updates are managed via `constants.ts`.

### 1. Update Products
Find the `PRODUCTS` array in `constants.ts`. Each product has:
- `id`: Unique identifier (string).
- `name`: Display name.
- `category`: 'Beef' | 'Pork' | 'Chicken' | 'Offals' | 'Boerewors'.
- `description`: A short selling pitch.
- `priceRange`: Formatted string (e.g., "$8.50 - $12.00 /kg").
- `image`: URL to a high-quality photo.

### 2. Update Business Info
Edit the `BUSINESS_INFO` object in `constants.ts` to change:
- Phone numbers & WhatsApp.
- Operating hours.
- Store address.

### 3. Manage Testimonials
Add or remove entries in the `TESTIMONIALS` array to update social proof on the homepage.

## Features
- **WhatsApp Cart**: Users build a "Braai Basket" and send an itemized list to the butcher.
- **AI Butcher Assistant**: Uses Gemini 3 to answer meat-related questions.
- **Responsive Design**: Optimized for mobile users in Bulawayo.
