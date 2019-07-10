import Softkey from "./js/softkey";
import Navigation from "./js/navigation";

document.addEventListener("keydown", event => {
  switch (event.key) {
    case "Enter":
      return Softkey.Enter(event);
    case "ArrowDown":
      return Navigation.Down(event);
    case "ArrowUp":
      return Navigation.Up(event);
    case "SoftRight":
      return Softkey.SoftRight(event);
    default:
      return;
  }
});
