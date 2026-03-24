const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");
const resultCount = document.getElementById("resultCount");

function updateCards(query) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const title = card.querySelector("h2")?.textContent?.toLowerCase() ?? "";
    const description = card.querySelector("p")?.textContent?.toLowerCase() ?? "";
    const matches = title.includes(query) || description.includes(query);

    card.classList.toggle("hidden", !matches);
    if (matches) visibleCount += 1;
  });

  noResults.classList.toggle("hidden", visibleCount !== 0);
  resultCount.textContent =
    visibleCount === cards.length
      ? "Showing all resources"
      : `Showing ${visibleCount} resource${visibleCount === 1 ? "" : "s"}`;
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();
  updateCards(query);
});

updateCards("");
