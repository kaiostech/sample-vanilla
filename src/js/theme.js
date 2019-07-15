/*
Authors:
- Paulo Brandão <https://github.com/paulo-devfrontend>
- Johnatan Dias
*/

/**
 * Initialize Theme service
 * @param {String} currentTheme
 */
const init = currentTheme => {
  const theme = currentTheme || "light";
  apply(theme.toLocaleLowerCase());
}

/**
 * Apply a theme to the app and persists the value
 * @param {String} theme (light | dark)
 * @param {Function} whenApplyingTheme
 */
const apply = (theme, whenApplyingTheme) => {
  document.documentElement.setAttribute("theme", theme);
  statusbar(theme);
  whenApplyingTheme && whenApplyingTheme();
}

/**
 * Apply a theme to the system statusbar
 * @param {String} type (dark | light | transparent | color)
 * @param {Array} value [r,g,b[,a]]
 */
const statusbar = (type, value) => {
  const meta = document.head.querySelector('meta[name="theme-color"]');

  switch (type.toLocaleLowerCase()) {
    case "dark":
    case "light":
      meta.setAttribute("content", getStatusbarCSSVar());
      break;
    case "transparent":
      meta.setAttribute("content", "transparent");
      break;
    case "color":
      meta.setAttribute("content", joinRGBValue(value));
      break;
    default:
      throw new Error(`Theme.statusbar => invalid type parameter: ${type}`);
  }
}

/**
 * Get the statusbar color from the declared CSS variable
 * @param {String} value (light | dark)
 * @returns {String} rgb[a]
 */
const getStatusbarCSSVar = () => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const color = rootStyles.getPropertyValue(`--statusbar-color`);

  if (color.startsWith("#")) {
    const rgb = hexToRGB(color);
    return joinRGBValue(rgb);
  }

  return color;
}

/**
 * Join array values to RGB string
 * @param {Array} value
 * @returns {String} rgb color
 */
const joinRGBValue = value => {
  if (!Array.isArray(value)) {
    throw new Error(`Theme.statusbar => invalid value parameter: ${value}`);
  }
  let content = "rgb";
  if (value.length === 4) content += "a";
  content += `(${value.join(", ")})`;
  return content;
}

/**
  * Convert Hex color to Array RGB
  * @param {String} hexColor
  * @returns {Array} RGB values
  */
 const hexToRGB = hexColor => {
  const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;
  const [, short, long] = String(hexColor).match(RGB_HEX) || [];

  if (long) {
    const value = Number.parseInt(long, 16);
    return [value >> 16, (value >> 8) & 0xff, value & 0xff];
  } else if (short) {
    return Array.from(short, s => Number.parseInt(s, 16)).map(
      n => (n << 4) | n
    );
  }
}

/**
 * Returns the current theme of the storage
 * @returns {String} (light | dark)
 */
const current = () => {
  return document.documentElement.getAttribute("theme");
}

/**
 * Toggle themes light and dark
 * @param {Function} whenApplyingTheme
 */
const toggle = whenApplyingTheme => {
  const applyTheme = current() === "dark" ? "light": "dark";
  apply(applyTheme, whenApplyingTheme);
}

export default { init, apply, current, toggle };