let movies = [];
let currentPage = 1;
const perPage = 12;

async function loadMovies() {
  const res = await fetch("movies.json");
  movies = await res.json();
  renderAlphabet();
  renderMovies();
}

function renderAlphabet() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  document.getElementById("alphabet").innerHTML = alphabet
    .map(letter => `<button onclick="filterByLetter('${letter}')">${letter}</button>`)
    .join("");
}

function renderMovies(list = movies) {
  const start = (currentPage - 1) * perPage;
  const paginated = list.slice(start, start + perPage);

  document.getElementById("movies").innerHTML = paginated.map(m => `
    <div class="movie-card">
      <a href="movie.html?id=${m.id}">
        <img src="${m.poster}" alt="${m.title}">
        <h4>${m.title}</h4>
        <p>${m.year}</p>
      </a>
    </div>
  `).join("");

  renderPagination(list.length);
}

function renderPagination(total) {
  const pages = Math.ceil(total / perPage);
  let buttons = "";
  for (let i = 1; i <= pages; i++) {
    buttons += `<button onclick="goToPage(${i})">${i}</button>`;
  }
  document.getElementById("pagination").innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  renderMovies();
}

function filterByLetter(letter) {
  const filtered = movies.filter(m => m.title.toUpperCase().startsWith(letter));
  currentPage = 1;
  renderMovies(filtered);
}

document.getElementById("search").addEventListener("input", function() {
  const q = this.value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(q));
  currentPage = 1;
  renderMovies(filtered);
});

loadMovies();
