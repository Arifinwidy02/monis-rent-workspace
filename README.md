# Monis.rent Workspace Designer

An interactive workspace rental experience for **Monis.rent**, designed for digital nomads and startups looking to build their ideal workspace in Bali.

The goal of this project is to make workspace selection feel more visual, intuitive, and engaging than a traditional product catalog.

> **Build your workspace, don't just browse it.**

---

## Live Demo

🔗 **Live:** [https://monis-rent-workspace-inky.vercel.app/workspace]

---

## Overview

This project was built as part of the **Desent Solutions Developer Challenge**.

Instead of presenting office equipment as a conventional product listing, the experience focuses on a visual workspace playground where users can:

- Choose a desk
- Choose a chair
- Add workspace accessories
- See their workspace update visually
- Move monitors within the workspace
- See the rental price update immediately
- Review their setup before submitting a rental request

The experience is intentionally kept simple and focused on the core interaction.

---

## User Flow

```text
Landing / Entry
      │
      ▼
/workspace
      │
      │  Choose desk
      │  Choose chair
      │  Add accessories
      │  Move monitors
      │
      ▼
/checkout
      │
      │  Review workspace
      │  Review monthly price
      │
      ▼
/success
      │
      ▼
Rental request confirmation
```

The root route (`/`) redirects users directly to the workspace builder so the core product experience starts immediately.

---

## Key Features

### 🪑 Desk Selection

Users can choose between multiple desk configurations:

- Dual Motor Standard Desk
- Electrical Adjustable Desk
- Mechanical Adjustable Desk

Selecting a desk immediately updates the workspace scene.

### 🪑 Chair Selection

Users can choose between different chair options, including:

- Default ergonomic chair
- Gaming chair

The selected chair is reflected directly in the workspace preview.

### 🖥️ Workspace Accessories

Users can add accessories such as monitors and other workspace elements.

Accessories are treated as individual visual layers rather than generating a separate image for every possible combination.

This keeps the implementation flexible and prevents a combinatorial explosion of scene images.

### 🖱️ Draggable Monitors

Monitors can be repositioned directly inside the workspace.

The monitor position is stored as responsive coordinates rather than fixed desktop pixels so the interaction remains usable across different screen sizes.

### 💰 Dynamic Pricing

The monthly rental price updates immediately as the workspace configuration changes.

The selected setup is carried through to the checkout/review screen.

### 📋 Rental Review

The checkout screen provides a clear summary of:

- Selected desk
- Selected chair
- Selected accessories
- Workspace configuration
- Monthly rental price

This is designed as a **rental request review**, rather than a traditional ecommerce checkout.

### ✅ Confirmation

After submitting the rental request, users are shown a confirmation screen summarizing their selected workspace.

---

## Design Approach

### Visual Workspace Instead of Product Catalog

The main UX decision was to make the workspace itself the primary interface.

Instead of:

```text
Product → Product → Product → Add to Cart
```

the interaction becomes:

```text
Workspace
    ↓
Choose desk
    ↓
Choose chair
    ↓
Add accessories
    ↓
Customize
    ↓
Review setup
```

This makes the relationship between the products easier to understand because users can immediately see how the selected items work together.

---

## 2D Layered Scene

The workspace is implemented using a **2D layered composition** rather than a 3D/WebGL environment.

Conceptually:

```text
┌─────────────────────────────┐
│        Background           │
├─────────────────────────────┤
│            Desk             │
├─────────────────────────────┤
│          Monitor(s)         │
├─────────────────────────────┤
│     Lamp / Accessories      │
├─────────────────────────────┤
│            Chair            │
└─────────────────────────────┘
```

Each visual element can be changed independently.

This approach was chosen because it provides:

- A lightweight implementation
- Faster development
- Better control over the visual composition
- Easy product swapping
- Easy accessory additions
- No unnecessary 3D complexity

---

## Furniture Anchoring

Workspace elements use furniture-dependent positioning where appropriate.

For example, when the desk changes, related elements can use the new desk's anchor positions so that monitors and accessories remain visually connected to the desk.

Instead of relying entirely on hardcoded screen coordinates, the scene uses relative positioning where possible.

This allows the composition to remain more stable across different viewport sizes.

---

## Asset Structure

Assets are separated between **catalog assets** and **scene assets**.

```text
public/
└── assets/
    ├── products/
    │   ├── desks/
    │   ├── chairs/
    │   ├── monitors/
    │   ├── lighting/
    │   └── extras/
    │
    └── scene/
        ├── background/
        ├── desks/
        ├── chairs/
        ├── monitors/
        ├── lighting/
        └── extras/
```

### Product Assets

Product assets are used for selection cards and product information.

### Scene Assets

Scene assets are transparent visual elements prepared specifically for the workspace composition.

Keeping these two asset types separate makes it easier to replace product imagery without affecting the workspace scene.

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **React**
- **Vercel**

The implementation intentionally avoids unnecessary infrastructure because this challenge focuses on the frontend experience and interaction.

---

## State Management

The workspace configuration is maintained on the client side.

The selected:

- Desk
- Chair
- Accessories
- Monitor positions
- Pricing

are shared between the workspace and review screens.

No backend or database is required for the challenge scope.

The goal is to demonstrate the complete interaction flow without introducing infrastructure that is not necessary for the prototype.

---

## Project Structure

A simplified structure:

```text
app/
├── workspace/
│   └── page.tsx
│
├── checkout/
│   └── page.tsx
│
├── success/
│   └── page.tsx
│
└── page.tsx

components/
├── workspace/
├── products/
├── checkout/
└── ui/

public/
└── assets/
    ├── products/
    └── scene/
```

The exact component structure may evolve as the implementation grows.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Arifinwidy02/monis-rent-workspace
```

### 2. Navigate to the project

```bash
cd YOUR_REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Routes

| Route        | Purpose                             |
| ------------ | ----------------------------------- |
| `/`          | Entry point, redirects to workspace |
| `/workspace` | Interactive workspace builder       |
| `/checkout`  | Workspace review and rental request |
| `/success`   | Rental request confirmation         |

---

## UX Decisions

### 1. The workspace is the main interface

The visual scene is prioritized over long product descriptions.

Users should understand the result of their choices immediately.

### 2. Immediate feedback

Changing a desk, chair, or accessory updates the workspace without requiring an additional "Apply" action.

### 3. Progressive customization

Users start with the main furniture and progressively add accessories.

This keeps the initial interface simple while still allowing customization.

### 4. Visual confirmation

The workspace preview acts as a continuous confirmation of the user's configuration.

### 5. Simple rental flow

The final screen focuses on reviewing the workspace and rental request rather than introducing a complex ecommerce checkout.

---

## Why 2D Instead of 3D?

A 3D implementation could provide more freedom, but it would also introduce additional complexity that is not necessary for this challenge.

The 2D layered approach provides enough visual interaction to communicate the product concept while keeping the experience:

- Lightweight
- Fast
- Responsive
- Easier to maintain
- Faster to iterate

The implementation can also be extended later if Monis.rent requires a more advanced configurator.

---

## Responsive Design

The workspace is designed to work across:

- Desktop
- Tablet
- Mobile

Responsive positioning is used for scene elements where possible instead of relying exclusively on fixed pixel coordinates.

The interface also adapts the product selection and review layout for smaller screens.

---

## Accessibility

The implementation aims to maintain basic accessibility practices, including:

- Keyboard-accessible interactive controls
- Meaningful button labels
- Appropriate image `alt` text
- Visible selected states
- Focus states
- Avoiding color as the only indicator of selection

---

## Performance Considerations

The project avoids unnecessary heavy dependencies and 3D rendering.

Visual assets are optimized where possible using modern image formats such as:

- WebP
- AVIF
- PNG where transparency is required

The workspace uses individual scene layers so that only the necessary visual elements need to change when the configuration changes.

---

## Scope

This challenge intentionally focuses on the workspace configuration experience.

### Included

- Workspace visualizer
- Desk selection
- Chair selection
- Accessories
- Monitor positioning
- Dynamic pricing
- Workspace review
- Rental request confirmation
- Responsive UI

### Not included

- Authentication
- Database
- Payment processing
- Admin dashboard
- Inventory management
- Real rental API integration
- CMS
- 3D/WebGL engine

These could be introduced in a production implementation but are outside the scope of this challenge.

---

## Future Improvements

If this were developed further for production, possible improvements could include:

- Real inventory availability
- Real-time rental pricing
- Backend rental request API
- Customer accounts
- Saved workspace configurations
- More accessories
- More furniture options
- Mobile-specific scene interactions
- 3D workspace configuration
- Integration with the actual rental platform
- Checkout and payment integration

---

## Challenge Notes

The primary goal of this implementation was not to build a complete rental platform, but to demonstrate how the Monis.rent rental experience could become more visual and interactive.

The main design principle is:

> **Don't make users browse an office catalog. Let them build their workspace.**

---

## Author

Built as part of the **Desent Solutions Developer Challenge**.

**Developer:** Arifin Widyatmoko

---

## License

This project was created for the Desent Solutions Developer Challenge.
