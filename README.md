# Product Catalog App - Neurogine Assessment

## 👨‍💻 Author

**Afnan Wajdi**  
- Candidate for Mobile Developer at **Neurogine**  
- Email: [afnanwajdi@gmail.com](mailto:afnanwajdi@gmail.com)  
- Repository: [github.com/afnanww/neurogine-assesstment](https://github.com/afnanww/neurogine-assesstment)

---

## Overview

This project was developed as part of the **Neurogine Mobile Developer Technical Assessment**. The goal was to build a Product Catalog app with following the guideline from the assessment brief. Also a great experience to get hands on experience with mobile development on selected tech stack.

---

## 🛠 Tech Stack Used - React Native

[![Framework](https://img.shields.io/badge/Framework-React%20Native%200.88-blue?logo=react)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK%2058-black?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Router](https://img.shields.io/badge/Navigation-Expo%20Router%20v58-purple)](https://docs.expo.dev/router/introduction/)
[![API](https://img.shields.io/badge/API-DummyJSON-orange)](https://dummyjson.com)

| Technology | Specification |
|---|---|
| **Framework** | [React Native](https://reactnative.dev/) (`0.88.0-rc.0`) |
| **Tooling & Runtime** | [Expo](https://expo.dev/) (`SDK 58 Preview`) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (`~6.0.3`) |
| **Navigation** | [Expo Router](https://docs.expo.dev/router/introduction/) (`~58.0.4`) |
| **Data Source** | [DummyJSON REST API](https://dummyjson.com/products) |
| **Icons** | [`@expo/vector-icons`](https://docs.expo.dev/guides/icons/) (Ionicons) |
| **Styling** | React Native `StyleSheet` |

---

## 📋 Assessment Requirements & Feature Matrix

Below is the complete feature matrix based on the requirements and bonus items specified in the assessment brief, highlighting what was implemented and how:

### 🎯 Core Requirements

| # | Requirement Mentioned | Status | Implementation Details |
|:---:|---|:---:|---|
| **1** | **Product List Screen**<br>Title, thumbnail, and price per product | ✅ | Displays items in a clean 2-column responsive grid with thumbnails, formatted prices, star ratings, and remaining stock counts. |
| **2** | **Pagination (Infinite Scroll)**<br>Load more items as user scrolls (using `limit` and `skip`) | ✅ | Seamlessly loads the next batch of products as the user scrolls towards the end of the list, with safeguards against duplicate items. |
| **3** | **Product Detail Screen**<br>Tap product to see full description, price, rating, and images | ✅ | Tapping any product card opens a dedicated details screen featuring a swipeable photo gallery with a live counter, price, ratings, stock status, and full description. |
| **4** | **Application States**<br>Visually distinguish: loading, error (with retry button), empty, and success | ✅ | Distinct UI states for loading spinners, error screens with a working **"Try Again"** retry button, empty list notices, and catalog content. |
| **5** | **Basic Search**<br>Debounced search box (endpoint vs. client-side; state choice and why) | ⏳ | Ran out of time and didn't get to implement the UI, but the strategy and trade-offs are documented in [Architectural Decisions](#3-search-strategy-endpoint-vs-client-side). |
| **6** | **Code Organization**<br>Separate into at least 2 layers (e.g. data / UI) | ✅ | Organized into decoupled layers: Data (API services), State / Logic (custom hooks), Presentation (screens and UI components), and Routing. |

### 🎁 Bonus Features (Nice-to-Have)

| # | Bonus Requirement Mentioned | Status | Implementation Details |
|:---:|---|:---:|---|
| **B1** | **Pull-to-Refresh**<br>Swipe down to refresh catalog | ✅ | Pull down on the product catalog to reload the latest items and reset pagination. |
| **B2** | **Image Loading Placeholder / Fallback**<br>Placeholder or error handling for images | ✅ | Displays a dedicated placeholder when images are missing or broken, with graceful fallbacks on the details screen. |
| **B3** | **Polished UI/UX Micro-Details**<br>Details to showcase in walkthrough video | ✅ | • **Image Gallery Counter**: Dynamic badge showing current photo position.<br>• **List-End Indicator**: Clean notice informing user when all catalog products have loaded.<br>• **Minimalist Aesthetic Theme**: Clean, modern card styling with subtle badges for stock and star ratings. |
| **B4** | **Unit Test**<br>Test for data or business logic | ⏳ | Time-boxed for future iteration. Strategy for API and hook testing outlined in [TODOs](#todos). |

---

## Architecture & Code Organization

The application is structured into clean, decoupled layers following single-responsibility principles:

```text
product-catalog-app/
├── src/
│   ├── api/                # Data Layer: Raw REST API calls to DummyJSON
│   │   └── productsApi.ts
│   ├── hooks/              # Domain & Business Logic Layer: State & pagination logic
│   │   └── useProducts.ts
│   ├── types/              # Type Definitions: TypeScript interfaces & API contracts
│   │   └── products.ts
│   ├── screens/            # Presentation Layer: Screen-level composition
│   │   ├── ProductListScreen.tsx
│   │   └── ProductDetailScreen.tsx
│   ├── components/         # Presentation Layer: Reusable atomic UI components
│   │   ├── ProductCard.tsx
│   │   ├── LoadingView.tsx
│   │   ├── ErrorView.tsx
│   │   └── EmptyView.tsx
│   └── app/                # Application Routing Layer: Expo Router file-based routes
│       ├── _layout.tsx     # Root stack & navigation headers
│       ├── index.tsx       # Main Catalog screen entry point
│       └── product.tsx     # Product Details screen entry point
├── package.json
└── tsconfig.json
```

---

## Key Architectural Decisions & Engineering Deep-Dives

### 1. Infinite Scroll Concurrency Guards & Stale Closure Prevention

Common pitfall where mobile infinite scroll is triggering duplicate network requests when the user flings the list rapidly. If three `onEndReached` events fire before the first request finishes, the app would fetch the same offset 3 times, causing duplicate entries or flickering. By using mutable React refs (`useRef`) alongside state, the app tracks the current pagination offset, total count, and fetch status synchronously. Because refs update immediately without waiting for a React re-render, any rapid subsequent scroll events arriving within milliseconds are instantly blocked until the active request completes.

---

### 2. ID-Based Deduplication

Based on research I made, even with network locks, edge cases such as catalog mutations or overlapping skip offsets. It still can introduce duplicate product IDs, which would cause duplicate key warnings in React Native's `FlatList`. Thus, incoming batches are sanitized through a `Set` lookup to filter out existing IDs before appending new items to state.

---

### 3. Search Strategy: Endpoint vs. Client-Side

The assessment requirements ask to choose between an API search endpoint or client-side filtering and explain the rationale:

**Conclusion:**  
Endpoint search without a doubt. This is because we are using pagination with `limit=20, skip=0`. If we use client-side search in this setup, for example if the user hasn't loaded or scrolled past the initial batch of 20, the search will only happen on the 20 products currently loaded in memory, which would be misleading for the user.

---

### 4. Application States

The app explicitly handles each user-facing state:

- **Loading**: Centered spinner on initial launch, and an indicator at the bottom during pagination.
- **Success**: Responsive 2-column product catalog grid.
- **Error**: Error view with a working **"Try Again"** retry button.
- **Empty**: Friendly notice if no products are found.
- **End of List**: Clean divider indicating all products have been loaded.

---

## 🚀 How to Run the Application

### Prerequisites
- **Node.js** (v18.x or later)
- **npm** or **yarn**
- **Expo Go** mobile app (iOS/Android) OR an active Android Emulator / iOS Simulator

### 1. Clone the repository
```bash
git clone https://github.com/afnanww/neurogine-assesstment.git
cd neurogine-assesstment/product-catalog-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npx expo start
```

### 4. Run on your platform of choice
- **Android**: Press `a` in the terminal or run `npm run android`
- **iOS**: Press `i` in the terminal or run `npm run ios`
- **Physical Device**: Scan the terminal QR code using the **Expo Go** app (Android) or Camera app (iOS)

---

## TODOs

In keeping with the 2–3 hour assessment guideline, the following items are earmarked for future iterations:

- [ ] **Search Implementation**: Debounced search bar connected to the endpoint to handle server requests efficiently.
- [ ] **Automated Unit Testing**: Jest + React Native Testing Library suites for `productsApi.ts` and `useProducts.ts` state assertions.

---

## 🤖 Note on AI Usage

In full transparency and adherence to the assessment guidelines:
- **Core Architecture & Implementation**: The layered project structure, React hook concurrency controls, component modularity, and state design were authored and implemented directly for this project. Used AI for researches purpose such the worry on mobile design, like the ScreenSafeArea, on user experience and the standard of mobile development and also things that need consider on mobile development. Entirely on research in structuring the architecture.

- **AI Assistance**: AI tools were utilized strictly for syntax lookup and comparism, Expo Router route configuration verification, and assisting in formatting this README documentation.
