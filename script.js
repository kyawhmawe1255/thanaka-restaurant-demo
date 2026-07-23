const tabs = document.querySelectorAll(".tab");
const groups = document.querySelectorAll(".menu-group");
const rows = document.querySelectorAll(".menu-row");
const menuBoard = document.querySelector(".menu-board");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

function closeMobileMenu() {
  if (!mobileMenu || !mobileMenuToggle) return;
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("mobile-nav-open");
}

function openMobileMenu() {
  if (!mobileMenu || !mobileMenuToggle) return;
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  mobileMenuToggle.setAttribute("aria-expanded", "true");
  mobileMenuToggle.setAttribute("aria-label", "Close menu");
  document.body.classList.add("mobile-nav-open");
  mobileMenu.querySelector("a")?.focus();
}

mobileMenuToggle?.addEventListener("click", () => {
  if (mobileMenu?.classList.contains("is-open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileMenuClose?.addEventListener("click", closeMobileMenu);
mobileMenu?.addEventListener("click", (event) => {
  if (event.target === mobileMenu) closeMobileMenu();
});
mobileMenuLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

const menuImages = {
  "Rakhine Moke Ti": "rakhine-moke-ti.jpeg",
  "Moke Hin Kha": "moke-hin-kha.jpeg",
  "Ohn No Khauk Swe": "ohn-no-khauk-swe.jpeg",
  "Wat Tar Dot Htole": "wat-tar-dot-htole.jpeg",
  "Tabawa Hincho": "tabawa-hincho.jpeg",
  "Lahphet Thoke": "lahphet-thoke.jpeg",
  "Shouk Ti Thoke": "shouk-ti-thoke.jpeg",
  "Myin Kwar Ywet Thoke": "myin-kwar-ywet-thoke.jpeg",
  "Pal Pyar Thoke": "pal-pyar-thoke.jpeg",
  "Ahsone Thoke": "ahsone-thoke.jpeg",
  "Nan Gyi Thoke": "nan-gyi-thoke.jpeg",
  "Thamin Kyaw": "thamin-kyaw.jpeg",
  "Khauk Swe Kyaw": "khauk-swe-kyaw.jpeg",
  "Lahphet Thamin": "lahphet-thamin.jpeg",
  "Si Chat Khauk Swe": "si-chat-khauk-swe.jpeg",
  "Mala Shan Gaw": "mala-shan-gaw.jpeg",
  "Clay Pot Curry": "clay-pot-curry.jpeg",
  "Curry & Rice": "clay-pot-curry.jpeg",
  "Set 1 · Bagan Vegan": "tabawa-hincho.jpeg",
  "Set 2 · Inle Vegetarian": "lahphet-thoke.jpeg",
  "Set 3 · Mandalay Chicken": "ohn-no-khauk-swe.jpeg",
  "Set 4 · Shan Pork": "wat-tar-dot-htole.jpeg",
  "Set 5 · Rakhine Seafood": "rakhine-moke-ti.jpeg",
  "Tiramisu": "atirimisu.png",
  "Syrok": "syrok.png",
  "Coco-Ice Cream Cup": "atirimisu.png"
};

const menuImageBase = "public/assets/thanaka-menu/";

const menuDialog = document.createElement("div");
menuDialog.className = "menu-dialog";
menuDialog.setAttribute("role", "dialog");
menuDialog.setAttribute("aria-modal", "true");
menuDialog.setAttribute("aria-hidden", "true");
menuDialog.innerHTML = `
  <div class="menu-dialog-panel" role="document">
    <button class="menu-dialog-close" type="button" aria-label="Close menu item details">X</button>
    <img class="menu-dialog-img" alt="">
    <div class="menu-dialog-body">
      <p class="kicker dark">Menu detail</p>
      <div class="menu-dialog-title">
        <h3></h3>
        <span></span>
      </div>
      <p class="menu-dialog-description"></p>
      <div class="dialog-proteins" aria-label="Menu notes"></div>
    </div>
  </div>
`;
document.body.append(menuDialog);

const dialogImage = menuDialog.querySelector(".menu-dialog-img");
const dialogPanel = menuDialog.querySelector(".menu-dialog-panel");
const dialogTitle = menuDialog.querySelector(".menu-dialog-title h3");
const dialogPrice = menuDialog.querySelector(".menu-dialog-title span");
const dialogDescription = menuDialog.querySelector(".menu-dialog-description");
const dialogTags = menuDialog.querySelector(".dialog-proteins");
const dialogClose = menuDialog.querySelector(".menu-dialog-close");

function getTags(row) {
  return (row.dataset.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function formatPrice(price) {
  if (!price) return "";
  if (price.toLowerCase().includes("ask")) return price;
  if (price.toLowerCase().includes("from")) return `${price}B`;
  return `${price}B`;
}

function closeMenuDialog() {
  menuDialog.classList.remove("is-open");
  menuDialog.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function openMenuDialog(row) {
  const title = row.querySelector("strong")?.textContent.trim() || "";
  const price = row.querySelector(":scope > span")?.textContent.trim() || "";
  const description = row.querySelector("p")?.textContent.trim() || "Ask our family for today's preparation.";
  const image = row.querySelector("img")?.src;
  const tags = getTags(row);

  dialogTitle.textContent = title;
  dialogPrice.textContent = formatPrice(price);
  dialogDescription.textContent = description;
  dialogTags.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
  dialogTags.hidden = tags.length === 0;

  if (image) {
    dialogImage.src = image;
    dialogImage.alt = title;
    dialogImage.hidden = false;
    dialogPanel.classList.remove("no-image");
  } else {
    dialogImage.removeAttribute("src");
    dialogImage.alt = "";
    dialogImage.hidden = true;
    dialogPanel.classList.add("no-image");
  }

  menuDialog.classList.add("is-open");
  menuDialog.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  dialogClose.focus();
}

rows.forEach((row) => {
  const title = row.querySelector("strong")?.textContent.trim();
  const image = menuImages[title];
  const tags = getTags(row);
  const rowContent = row.querySelector("div");

  if (image && !row.classList.contains("no-thumb")) {
    const thumb = document.createElement("img");
    thumb.className = "menu-thumb";
    thumb.src = `${menuImageBase}${image}`;
    thumb.alt = title;
    thumb.loading = "lazy";
    row.prepend(thumb);
    row.classList.add("has-image");
  }

  if (tags.length) {
    const tagList = document.createElement("div");
    tagList.className = "row-proteins";
    tagList.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
    rowContent?.append(tagList);
  }

  if (image && !row.classList.contains("no-thumb")) {
    const action = document.createElement("span");
    action.className = "row-action";
    action.textContent = "See dish";
    rowContent?.append(action);
  }
});

rows.forEach((row) => {
  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");
  row.setAttribute("aria-label", `View details for ${row.querySelector("strong")?.textContent.trim() || "this menu item"}`);

  row.addEventListener("click", () => openMenuDialog(row));
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenuDialog(row);
    }
  });
});

dialogClose.addEventListener("click", closeMenuDialog);
menuDialog.addEventListener("click", (event) => {
  if (event.target === menuDialog) closeMenuDialog();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuDialog.classList.contains("is-open")) {
    closeMenuDialog();
  }
  if (event.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
    closeMobileMenu();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-pressed", "true");

    menuBoard?.classList.add("is-filtering");

    window.setTimeout(() => {
      groups.forEach((group) => {
        const isRecommendedGroup = group.dataset.recommended === "true";
        const groupRows = [...group.querySelectorAll(".menu-row")];

        groupRows.forEach((row) => {
          row.classList.toggle("is-hidden", filter === "recommended" && row.dataset.recommended !== "true");
        });

        const matchesCategory = filter === "all" || group.dataset.category === filter;
        const hasRecommendedRows = groupRows.some((row) => row.dataset.recommended === "true");
        const matchesRecommended = filter === "recommended" && (isRecommendedGroup || hasRecommendedRows);

        group.classList.toggle("is-hidden", !(matchesCategory || matchesRecommended));
      });

      menuBoard?.classList.remove("is-filtering");
    }, 120);

    document.querySelector(".menu-board")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
