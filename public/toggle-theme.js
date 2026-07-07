const primaryColorScheme = "rose-dark"; // default theme value

// Themes are named `${family}-${mode}`. Visitors may still have a value from
// before the rename stored; map those to their current equivalents.
const LEGACY_THEMES = {
  light: "zinc-light",
  default: "zinc-light",
  dark: "zinc-dark",
  midnight: "zinc-dark",
  sand: "rose-light",
  carbon: "rose-dark",
  sage: "mint-light",
  forest: "mint-dark",
  honey: "sand-light",
  umber: "sand-dark",
  lilac: "plum-light",
  plum: "plum-dark",
};

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return LEGACY_THEMES[currentTheme] ?? currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "zinc-dark"
    : "zinc-light";
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

// Sync with system changes: flip the current family to the matching mode,
// keeping the accent choice. Themes without a light/dark pair are left alone.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    const next = isDark
      ? themeValue.replace(/-light$/, "-dark")
      : themeValue.replace(/-dark$/, "-light");
    if (next !== themeValue) {
      themeValue = next;
      setPreference();
    }
  });
