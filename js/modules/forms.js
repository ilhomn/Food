import { closeModal, openModal } from "./modal";
import { postData } from "./services/services";

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

  function bindpostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let oldStatus = form.querySelector(".status");
      if (oldStatus) oldStatus.remove();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(msg) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    if (prevModalDialog) {
      prevModalDialog.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${msg}</div>
      </div>
    `;

      openModal(".modal", modalTimerId);

      prevModalDialog
        .querySelector("[data-close]")
        .addEventListener("click", closeModal);

      setTimeout(closeModal, 4000);
    }
  }
}

export default forms;
