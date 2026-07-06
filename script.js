const tabs = document.querySelectorAll(".tab");
const groups = document.querySelectorAll(".menu-group");
const rows = document.querySelectorAll(".menu-row");

const menuImages = {
  "Rakhine Moke Ti": "tom-yum.png",
  "Moke Hin Kha": "tom-yum.png",
  "Ohn No Khauk Swe": "ohn-no-khaukswe.png",
  "Wat Tar Dot Htole": "burmese-curry.png",
  "Tabawa Hincho": "buddha-bowl.png",
  "Lahphet Thoke": "lahphet-thoke.png",
  "Shouk Ti Thoke": "centella-thoke.png",
  "Myin Kwar Ywet Thoke": "centella-thoke.png",
  "Pal Pyar Thoke": "buddha-bowl.png",
  "Ahsone Thoke": "nan-gyi-thoke.png",
  "Nan Gyi Thoke": "nan-gyi-thoke.png",
  "Thamin Kyaw": "fried-rice.png",
  "Khauk Swe Kyaw": "stir-fried-noodle.png",
  "Lahphet Thamin": "fried-rice.png",
  "Si Chat Khauk Swe": "stir-fried-noodle.png",
  "Mala Shan Gaw": "stir-fried-noodle.png",
  "Clay Pot Curry": "burmese-curry.png",
  "Curry & Rice": "coconut-rice-plate.png",
  "Set 1 · Bagan Vegan": "buddha-bowl.png",
  "Set 2 · Inle Vegetarian": "lahphet-thoke.png",
  "Set 3 · Mandalay Chicken": "ohn-no-khaukswe.png",
  "Set 4 · Shan Pork": "burmese-curry.png",
  "Set 5 · Rakhine Seafood": "tom-yum.png",
  "Tiramisu": "atirimisu.png",
  "Syrok": "syrok.png",
  "Coco-Ice Cream Cup": "atirimisu.png"
};

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

  if (image && !row.classList.contains("no-thumb")) {
    const thumb = document.createElement("img");
    thumb.className = "menu-thumb";
    thumb.src = `public/assets/atiri-food/${image}`;
    thumb.alt = title;
    thumb.loading = "lazy";
    row.prepend(thumb);
    row.classList.add("has-image");

    const action = document.createElement("span");
    action.className = "row-action";
    action.textContent = "See dish";
    row.querySelector("div")?.append(action);
  }

  if (tags.length) {
    const tagList = document.createElement("div");
    tagList.className = "row-proteins";
    tagList.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
    row.querySelector("div")?.append(tagList);
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
});

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
