function forms() {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

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

      openModal();

      prevModalDialog
        .querySelector("[data-close]")
        .addEventListener("click", closeModal);

      setTimeout(closeModal, 4000);
    }
  }
}

module.exports = forms;
