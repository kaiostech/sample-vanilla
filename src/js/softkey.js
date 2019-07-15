import Navigation from "./navigation";
import Theme from './theme';

const getCurrentElement = () => document.querySelector("[nav-selected=true]");

const Enter = event => {
  const currentElement = getCurrentElement();
  currentElement.tagName === "INPUT"
    ? addToDo(currentElement)
    : toggleToDo(currentElement);
};

const SoftRight = event => {
  const currentElement = getCurrentElement();
  if (currentElement.tagName === "INPUT") return;

  const currentIndex = parseInt(currentElement.getAttribute("nav-index"), 10);
  const allElementsSelectable = document.querySelectorAll("[nav-selectable]");
  const selectElement = allElementsSelectable[currentIndex - 1];
  Navigation.selectElement(selectElement);

  if (currentIndex - 1 === 0) setLabels({ center: "Insert" });
  currentElement.remove();
};

const SoftLeft = event => {
  const whenApplyingTheme = () => {
    const currentLabels = getLabels();
    setLabels({
      ...currentLabels,
      left: currentLabels.left === "Dark" ? "Light" : "Dark"
    })
  }

  Theme.toggle(whenApplyingTheme);
};

const getLabels = () => ({
  left: document.getElementById("left").textContent,
  center: document.getElementById("center").textContent,
  right: document.getElementById("right").textContent
});

const setLabels = newLabels => {
  const currentLabels = getLabels();
  const applyLabels = { ...currentLabels, ...newLabels };
  document.getElementById("left").innerText = applyLabels.left;
  document.getElementById("center").innerText = applyLabels.center;
  document.getElementById("right").innerText = applyLabels.right;
};

const addToDo = currentElement => {
  if (!currentElement.value.length) return;
  const toDos = document.getElementById("toDos");
  const node = document.createElement("SPAN");
  const text = document.createTextNode(currentElement.value);
  node.setAttribute("nav-selectable", "true");
  node.appendChild(text);
  toDos.appendChild(node);
  currentElement.value = "";
};

const toggleToDo = currentElement =>
  currentElement.classList.toggle("completed");

export default { Enter, SoftRight, SoftLeft, getLabels, setLabels };
