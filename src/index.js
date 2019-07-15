import Softkey from "./js/softkey";
import Navigation from "./js/navigation";
import Theme from './js/theme';

Theme.init("light");

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
    case "SoftLeft":
      return Softkey.SoftLeft(event);
    default:
      return;
  }
});
