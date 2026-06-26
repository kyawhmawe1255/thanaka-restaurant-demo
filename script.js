const tabs = document.querySelectorAll(".tab");
const groups = document.querySelectorAll(".menu-group");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    groups.forEach((group) => {
      const matches = filter === "all" || group.dataset.category === filter;
      group.classList.toggle("is-hidden", !matches);
    });

    document.querySelector(".menu-board")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
