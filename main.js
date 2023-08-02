const books = [
  {
    name: "Actual First Book",
    pagesRead: 1,
    totalPages: 100,
    finished: false,
    color: "#e5deca",
    id: 0,
  },
  {
    name: "First Book",
    pagesRead: 5,
    totalPages: 100,
    finished: false,
    color: "#363d32",
    id: 1,
  },
  {
    name: "Another Book1",
    pagesRead: 10,
    totalPages: 100,
    finished: false,
    color: "#9c7a84",
    id: 2,
  },
  {
    name: "Another Book2",
    pagesRead: 20,
    totalPages: 100,
    finished: true,
    color: "#b2543d",
    id: 3,
  },
  {
    name: "Another Book3",
    pagesRead: 30,
    totalPages: 100,
    finished: true,
    color: "#92a34c",
    id: 4,
  },
  {
    name: "Another Book4",
    pagesRead: 40,
    totalPages: 100,
    finished: true,
    color: "#e5deca",
    id: 5,
  },
  {
    name: "Another Book5",
    pagesRead: 50,
    totalPages: 100,
    finished: true,
    color: "#363d32",
    id: 6,
  },
  {
    name: "Another Book6",
    pagesRead: 60,
    totalPages: 100,
    finished: true,
    color: "#9c7a84",
    id: 7,
  },
  {
    name: "Another Book7",
    pagesRead: 70,
    totalPages: 100,
    finished: true,
    color: "#b2543d",
    id: 8,
  },
  {
    name: "Another Book8",
    pagesRead: 80,
    totalPages: 100,
    finished: true,
    color: "#92a34c",
    id: 9,
  },
  {
    name: "Another Book9",
    pagesRead: 90,
    totalPages: 100,
    finished: true,
    color: "#363d32",
    id: 10,
  },
];

const readingGoal = 44;
const goalRemaining = 15;

window.addEventListener("load", function () {
  this.document.querySelector("#readingGoal").textContent = readingGoal;
  this.document.querySelector("#goalRemaining").textContent = goalRemaining;
  generateBooks();
});

function generateBooks() {
  const booksRead = books.reduce((acc, book) => acc + Number(book.finished), 0);
  this.document.querySelector("#booksRead").textContent = booksRead;
  this.document.querySelector("#tbr").textContent = books.length - booksRead;

  document.querySelector("#booksContainer").innerHTML = "";
  books.forEach((book) => {
    const bookNode = this.document.createElement("div");
    const shelfNode = this.document.createElement("div");
    const bookTitleNode = this.document.createElement("div");
    const bookPercentageNode = this.document.createElement("div");

    const randomWidth = Math.floor(random() * 30) + 50;
    const randomHeight = Math.floor(random() * 60) + 180;
    bookNode.style.width = `${randomWidth}px`;
    bookNode.style.height = `${randomHeight}px`;
    shelfNode.style.width = `${randomWidth + 30}px`;
    shelfNode.style.height = `${randomHeight}px`;

    const percentageRead = Math.floor((100 * book.pagesRead) / book.totalPages);
    const bookColorDarkened = shadeColor(book.color, -10);
    bookNode.style.backgroundImage = `linear-gradient(to bottom, ${book.color} 0%, ${book.color} ${percentageRead}%, ${bookColorDarkened} ${percentageRead}%, ${bookColorDarkened} 100%)`;

    bookNode.classList.add("bookStyle");
    shelfNode.classList.add("shelfStyle");

    bookTitleNode.textContent = book.name;
    bookPercentageNode.textContent = `${percentageRead}%`;
    bookPercentageNode.style.fontSize = "14px";

    bookNode.appendChild(bookTitleNode);
    bookNode.appendChild(bookPercentageNode);
    bookNode.appendChild(shelfNode);

    bookNode.addEventListener("click", () => {
      showDialog(book);
    });

    this.document.querySelector("#booksContainer").appendChild(bookNode);
  });
}

function showDialog(book) {
  const favDialog = document.querySelector("#favDialog");
  favDialog.dataset.id = book.id;

  document.querySelector("#dialogTitle").textContent = book.name;
  document.querySelector("#newPagesRead").value = book.pagesRead;
  document.querySelector("#newFinished").checked = book.finished;
  document.querySelector(
    "#pagesRead"
  ).textContent = `Pages read: ${book.pagesRead} / ${book.totalPages}`;

  favDialog.showModal();
}

function confirmPageUpdate() {
  const favDialog = document.querySelector("#favDialog");
  const newPagesRead = document.querySelector("#newPagesRead").value;
  const newFinished = document.querySelector("#newFinished").checked;
  books[favDialog.dataset.id].pagesRead = newPagesRead;
  books[favDialog.dataset.id].finished = newFinished;
  currentSeed = originalSeed;
  generateBooks();
  favDialog.close();
}

function closeDialog() {
  favDialog.close();
}

const originalSeed = Math.floor(Math.random() * 10000);
let currentSeed = originalSeed;
function random() {
  var x = Math.sin(currentSeed++) * 10000;
  return x - Math.floor(x);
}

//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
