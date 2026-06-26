const tabs = document.querySelectorAll(".tab");
const groups = document.querySelectorAll(".menu-group");
const menuImages = {
  "Acai Bowl": "acai-bowl.png",
  "Smoothie Bowl": "smoothie-bowl.png",
  "Frozen Yoghurt Bowl": "frozen-yoghurt-bowl.png",
  "Cacao Bowl": "cacao-bowl.png",
  "Chai Matcha Brioche Sticks": "chai-matcha-brioche-sticks.png",
  "Coco Brioche Sticks": "coco-brioche-sticks.png",
  "Lavender Ricotta Brioche Sticks": "lavender-ricotta-brioche-sticks.png",
  "Avocado Tofu Croffle": "avocado-tofu-croffle.png",
  "Avocado Salmon Croffle": "avocado-salmon-croffle.png",
  "Dubai Chocolate Croffle": "dubai-chocolate-croffle.png",
  "Egg Benedict": "eggs-benedict.png",
  "Shakshuka": "shakshuka.png",
  "Cilbir": "cilbir.png",
  "Crepe": "crepe.png",
  "Spring Rolls": "spring-rolls.png",
  "Chicken Wings": "chicken-wings.png",
  "Truffle Fries": "truffle-fries.png",
  "Pork Meatball": "pork-meatball.png",
  "Lahphet Thoke": "lahphet-thoke.png",
  "Centella Thoke": "centella-thoke.png",
  "Nan Gyi Thoke": "nan-gyi-thoke.png",
  "Coconut Rice Plate": "coconut-rice-plate.png",
  "Buddha Bowl": "buddha-bowl.png",
  "Poke Bowl": "poke-bowl.png",
  "Truffle Smash Burger": "truffle-smash-burger.png",
  "Burmese Curry": "burmese-curry.png",
  "Thai Panang Curry": "panang-curry.png",
  "Thai Green Curry": "thai-green-curry.png",
  "Ohn No Khauk Swe": "ohn-no-khaukswe.png",
  "Tom Yum": "tom-yum.png",
  "Stir Fried Noodle": "stir-fried-noodle.png",
  "Fried Rice": "fried-rice.png",
  "Fried Fish": "fried-fish.png",
  "Brownie": "brownie.png",
  "Syrok": "syrok.png"
};

document.querySelectorAll(".menu-row").forEach((row) => {
  const title = row.querySelector("strong")?.textContent.trim();
  const image = menuImages[title];

  if (!image) return;

  const thumb = document.createElement("img");
  thumb.className = "menu-thumb";
  thumb.src = `public/assets/atiri-food/${image}`;
  thumb.alt = title;
  thumb.loading = "lazy";
  row.prepend(thumb);
  row.classList.add("has-image");
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
