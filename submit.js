// submit.js — полностью рабочий

function initSubmitForm(formSelector, modalSelector) {
  const form = document.querySelector(formSelector);
  const modal = document.querySelector(modalSelector);
  if (!form || !modal) return;

  const closeModalBtn = document.getElementById("close-modal2");
  let selectedPackage = "";

  // --- Закрытие модалки ---
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // --- Выбор пакета ---
  document.querySelectorAll(".prices-slot .cta1").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      const slot = btn.closest(".prices-slot");
      if (!slot) return;

      // Снимаем активные классы
      document.querySelectorAll(".prices-slot").forEach(card => card.classList.remove("active"));

      // Делаем текущий активным
      slot.classList.add("active");

      // Сохраняем пакет
      const chosenPackage = btn.dataset.package || slot.querySelector("h3")?.innerText.trim() || "Business";
      selectedPackage = chosenPackage;

      // Записываем в скрытое поле
      const packageInput = form.querySelector("#selected-package");
      if (packageInput) packageInput.value = selectedPackage;

      // Скролл к форме (опционально)
      const contacts = document.getElementById("contacts");
      if (contacts) contacts.scrollIntoView({ behavior: "smooth" });

      console.log("Выбран пакет:", chosenPackage);
    });
  });

  // --- Submit формы ---
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (form.dataset.sending === "1") return;
    form.dataset.sending = "1";

    // --- Элементы формы ---
    const name = form.querySelector("#name");
    const lastname = form.querySelector("#lastname");
    const email = form.querySelector("#email");
    const telefon = form.querySelector("#telefon");
    const description = form.querySelector("#description");
    const consent = form.querySelector("#consent");
    const packageInput = form.querySelector("#selected-package");
    const langInput = form.querySelector("#formLang");

    // --- Валидация ---
    if (!name.value.trim()) { alert("Введите имя"); name.focus(); form.dataset.sending = "0"; return; }
    if (!email.value.trim()) { alert("Введите email"); email.focus(); form.dataset.sending = "0"; return; }
    if (!consent.checked) { alert("Необходимо согласие"); consent.focus(); form.dataset.sending = "0"; return; }

    // --- Заполняем скрытые поля ---
    packageInput.value = selectedPackage || "Business";
    langInput.value = localStorage.getItem("siteLang") || "de";

    // --- Сохраняем FormData перед сбросом формы ---
    const formData = new FormData(form);

    // --- Мгновенный UX: открываем модалку и сбрасываем форму ---
    modal.classList.remove("hidden");
    form.reset();
    selectedPackage = "";
    document.querySelectorAll(".prices-slot").forEach(s => s.classList.remove("active"));
    form.dataset.sending = "0";

    // --- Отправка в фоне ---
    fetch(form.action, {
      method: "POST",
      mode: "no-cors",
      body: formData
    }).catch(err => console.error("Ошибка отправки формы:", err));
  });
}

// --- Инициализация после загрузки DOM ---
document.addEventListener("DOMContentLoaded", () => {
  initSubmitForm("#myForm", "#modal2");
});
