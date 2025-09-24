import modal, { openModal } from "./modules/modal";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    30000
  );

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalTimerId);
  timer(".timer", "2025-12-27");
  cards();
  forms("form", modalTimerId);
  slider();
});
