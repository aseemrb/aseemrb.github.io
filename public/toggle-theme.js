const primaryColorScheme = "carbon"; // default theme value (rose dark)

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  const themeSelector = document.querySelector("#theme-selector");
  if (themeSelector) {
    themeSelector.value = themeValue;
  }

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    document.querySelector("#theme-selector")?.addEventListener("change", (e) => {
      themeValue = e.target.value;
      setPreference();
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// Set theme-color value before page transition
// to avoid navigation bar color flickering in Android dark mode
document.addEventListener("astro:before-swap", event => {
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");

  event.newDocument
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bgColor);
});

// Light/dark counterparts within each accent family. Keep in sync with
// FAMILIES in src/components/ThemeSelector.astro. Legacy stored values
// ("light", "dark") map into the zinc family they used to render as.
const DARK_COUNTERPART = {
  light: "midnight",
  default: "midnight",
  sage: "forest",
  sand: "carbon",
  honey: "umber",
  lilac: "plum",
};
const LIGHT_COUNTERPART = {
  dark: "default",
  midnight: "default",
  forest: "sage",
  carbon: "sand",
  umber: "honey",
  plum: "lilac",
};

// Sync with system changes: flip the current family to the matching mode,
// keeping the accent choice. Themes without a counterpart are left alone.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    const next = (isDark ? DARK_COUNTERPART : LIGHT_COUNTERPART)[themeValue];
    if (next) {
      themeValue = next;
      setPreference();
    }
  });
