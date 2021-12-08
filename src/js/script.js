window.addEventListener("DOMContentLoaded", function () {
  // slider
  const slider = tns({
    container: ".carousel__inner",
    items: 1,
    slideBy: "page",
    controls: false,
    nav: false,
  });

  function subscribeForSliderAction(selector, operation) {
    document
      .querySelector(selector)
      .addEventListener("click", () => slider.goTo(operation));
  }

  subscribeForSliderAction(".prev", "prev");
  subscribeForSliderAction(".next", "next");

  // catalog
  const tabs = document.querySelectorAll(".catalog__tab");
  const tabContents = document.querySelectorAll(".catalog__content");
  const contents = document.querySelectorAll(".catalog-item__content");
  const lists = document.querySelectorAll(".catalog-item__list");

  function subscribeForTabs() {
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        deactivateAllTabs();
        tab.classList.add("catalog__tab_active");
        tabContents[index].classList.add("catalog__content_active");
      });
    });
  }

  function deactivateAllTabs() {
    tabs.forEach((tab, index) => {
      tab.classList.remove("catalog__tab_active");
      tabContents[index].classList.remove("catalog__content_active");
    });
  }

  function subscribeForItemLinkToggle(selector) {
    document.querySelectorAll(selector).forEach((item, index) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        contents[index].classList.toggle("catalog-item__content_active");
        lists[index].classList.toggle("catalog-item__list_active");
      });
    });
  }

  subscribeForTabs();
  subscribeForItemLinkToggle(".catalog-item__link");
  subscribeForItemLinkToggle(".catalog-item__back");

  // modal
  const overlay = document.querySelector(".overlay");

  function showElement(element) {
    overlay.classList.remove("hidden");
    element.classList.remove("hidden");
  }

  document.querySelectorAll("[data-modal=consultation]").forEach((button) => {
    button.addEventListener("click", () => {
      showElement(document.querySelector("#consultation"));
    });
  });

  document.querySelectorAll(".button_mini").forEach((button) => {
    button.addEventListener("click", () => {
      const orderModal = document.querySelector("#order");
      const orderDescr = orderModal.querySelector(".modal__descr");

      orderDescr.textContent = button
        .closest(".catalog-item")
        .querySelector(".catalog-item__subtitle").textContent;

      showElement(orderModal);
    });
  });

  document.querySelectorAll(".modal__close").forEach((closeElement) => {
    closeElement.addEventListener("click", () => {
      overlay.classList.add("hidden");
      document.querySelectorAll(".modal").forEach((element) => {
        element.classList.add("hidden");
      });
    });
  });
});
