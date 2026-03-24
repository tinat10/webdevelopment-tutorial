# Web Development Tutorial Project

This repo has **2 versions of the same project** so students can compare approaches clearly:

1. `vanilla-app` -> HTML + CSS + JavaScript
2. `react-app` -> React version of the same idea

## Why there are two `index.html` files

- `vanilla-app/index.html` is the full page for the plain HTML/CSS/JS version.
- `react-app/index.html` is just the React entry shell. React renders into this file through JavaScript.

That is normal in React projects and helps students see how React still ends up in HTML.

## Project concept

Both apps build a searchable card gallery:

- Type in a search input
- Cards are filtered as you type
- Non-matching cards are hidden

## Folder guide

### `vanilla-app`

- `index.html` -> page structure (title, input, cards)
- `styles.css` -> layout and visual design
- `script.js` -> search/filter logic

Use this version to teach:

- Semantic HTML
- CSS polish and spacing
- DOM selection and event listeners in JavaScript

### `react-app`

- `index.html` -> root container (`<div id="root"></div>`)
- `src/main.jsx` -> React app bootstrap
- `src/App.jsx` -> main app component and filtering logic
- `src/index.css` -> styles for the React version
- `package.json` -> scripts and dependencies

Use this version to teach:

- `useState`
- Components
- Rendering lists with `.map()`
- Filtering with `.filter()`
- State-driven UI updates

## How HTML, CSS, and JavaScript connect to React

- **HTML** in React is written as JSX inside components.
- **CSS** works the same way; styles are still separate or imported files.
- **JavaScript** powers React logic (state, events, filtering, rendering).

React does not replace HTML/CSS/JS. It organizes them into a component-based workflow.

## Run instructions

### Vanilla app

Open `vanilla-app/index.html` in a browser.

### React app

From repo root:

```bash
cd react-app
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Teaching flow suggestion

1. Build and test `vanilla-app` first.
2. Show the same behavior in `react-app`.
3. Compare "manual DOM updates" vs "state-driven rendering".

This keeps React from feeling random and ties it back to web fundamentals.
