// Load Alphabet Nav
const alphabetNav = document.getElementById("alphabet");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
letters.forEach(l => {
  let btn = document.createElement("button");
  btn.innerText = l;
  btn.onclick = () => showMoviesByLetter(l);
  alphabetNav.appendChild(btn);
});

// Show movies by letter
function showMoviesByLetter(letter) {
  const list = document.getElementById("movies-list");
  list.innerHTML = "";
  const filtered = movies.filter(m => m.title.toUpperCase().startsWith(letter));
  filtered.forEach(m => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${m.poster}" alt="${m.title}">
      <h3>${m.title} (${m.year})</h3>
      <a href="movie.html?id=${m.id}">View Details</a>
    `;
    list.appendChild(card);
  });
}

// Search Movies
document.getElementById("search").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  const list = document.getElementById("movies-list");
  list.innerHTML = "";
  const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
  filtered.forEach(m => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${m.poster}" alt="${m.title}">
      <h3>${m.title} (${m.year})</h3>
      <a href="movie.html?id=${m.id}">View Details</a>
    `;
    list.appendChild(card);
  });
});

// Load Detail Page
function loadMovieDetail() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  const movie = movies.find(m => m.id === movieId);

  if (movie) {
    document.getElementById("movie-detail").innerHTML = `
      <h2>${movie.title} (${movie.year})</h2>
      <img src="${movie.poster}" alt="${movie.title}">
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p>${movie.description}</p>
      <a class="download-btn" href="${movie.link}" target="_blank">Download Now</a>
    `;
  }
}
