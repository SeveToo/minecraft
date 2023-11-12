const views = document.querySelector(".views"),
  view1 = views.querySelector(".view1"),
  view2 = views.querySelector(".view2"),
  view3 = views.querySelector(".view3"),
  view4 = views.querySelector(".view4");
const menu = document.querySelector(".menu");

let last = Math.floor(view1.clientHeight / 50) - 1;

let Textures = [
  { name: "grass", bg: "images/grass2.jpg", bg2: "images/grass.jpg" },
  { name: "wood1", bg: "#523A28" },
  { name: "wood2", bg: "#A47551" },
  { name: "wood3", bg: "#D0B49F" },
  { name: "glass", bg: "#E7F2F844" },
];

let selected = 0;

let eq = "";
for (let i = 0; i < Textures.length; i++) {
  if (Textures[i].bg.charAt(0) == "#") {
    eq += `<div style="background: ${Textures[i].bg}" class="box b${i + 1}"> ${
      i + 1
    } </div>`;
  } else {
    eq += `<div style="background: url('${Textures[i].bg}')" class="box b${
      i + 1
    }"> ${i + 1} </div>`;
  }
}
menu.innerHTML = eq;
let buttonsEQ = document.querySelectorAll(".box");
function select(a) {
  selected = Number(a.substr(1, 2)) - 1;
  buttonsEQ.forEach((el) => el.classList.remove("active"));
  a = document.querySelector(`.${a}`);
  a.classList.add("active");
}

buttonsEQ.forEach(
  (el) =>
    (el.onclick = () => {
      // console.log(el.classList[1]);
      select(el.classList[1]);
    })
);
select("b1");

document.querySelector("body").onkeydown = (el) => {
  if (el.key > -1 && el.key < 10) {
    select(`b${el.key}`);
  }
};
let tabV1 = [];

// View 1
let v1grid = '<table class="t1">';
for (let i = 0; i < view1.clientHeight / 50; i++) {
  v1grid += "<tr>";
  tabV1[i] = [];
  for (let j = 0; j < view1.clientWidth / 50; j++) {
    v1grid += `<td class="v1" data-row="${i}" data-column="${j}"></td>`;
    tabV1[i][j] = {
      height: [0],
      material: "air",
    };
  }
  v1grid += "</tr>";
}
view1.innerHTML = v1grid;

// View 1 onclick
let tdsV1 = document.querySelectorAll(".v1");

// Create Block v1

function addBlock(r, c, el) {
  tabV1[r][c].height.push(Textures[selected]);
  if (Textures[selected].bg.charAt(0) == "#") {
    el.style.background = Textures[selected].bg;
  } else {
    el.style.background = `url("${Textures[selected].bg}")`;
  }
  updateView(r, c, el);
}

tdsV1.forEach((el) => {
  el.onmousedown = () => {
    addBlock(el.getAttribute("data-row"), el.getAttribute("data-column"), el);
  };
});

let tabV2 = [];

// View 2
let v2grid = '<table class="t2">';
for (let i = 0; i < view1.clientHeight / 50; i++) {
  v2grid += "<tr>";
  tabV2[i] = [];
  for (let j = 0; j < view1.clientWidth / 50; j++) {
    v2grid += `<td class="v2" data-row="${i}" data-column="${j}"></td>`;
    tabV2[i][j] = {
      height: [0],
      material: "air",
    };
  }
  v2grid += "</tr>";
}

view2.innerHTML = v2grid;

let boxV2;
function updateView(i, j) {
  tabV2[i][j].height.push(Textures[selected]);
  heightV2 = tabV1[i][j].height.length - 2;
  if (heightV2 < view1.clientHeight / 50) {
    boxV2 = document.querySelector(
      `[class='v2'][data-row='${last + 1 - heightV2}'][data-column='${j}']`
    );
    // boxV2.style.background = Textures[selected].bg2;
    if (Textures[selected].bg.charAt(0) == "#") {
      boxV2.style.background = Textures[selected].bg;
    } else {
      boxV2.style.background = `url("${Textures[selected].bg2}")`;
    }
  }
}
