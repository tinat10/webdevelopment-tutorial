import { useMemo, useState } from "react";

const resources = [
  { id: 1, title: "HTML Basics", desc: "Learn structure and semantic tags." },
  { id: 2, title: "CSS Styling", desc: "Design clean user interfaces." },
  { id: 3, title: "JavaScript Logic", desc: "Add interactivity to pages." },
  { id: 4, title: "Accessibility", desc: "Improve usability for all learners." },
  { id: 5, title: "React Components", desc: "Build reusable UI building blocks." }
];

function ResourceCard({ title, desc }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{desc}</p>
    </article>
  );
}

export default function App() {
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    const query = search.toLowerCase().trim();
    return resources.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <main className="page">
      <h1>Learning Resources</h1>
      <p className="subtitle">Type in the search box to filter cards in real time.</p>

      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search resources"
      />

      <p className="result-count">
        {filteredResources.length === resources.length
          ? "Showing all resources"
          : `Showing ${filteredResources.length} resource${
              filteredResources.length === 1 ? "" : "s"
            }`}
      </p>

      <section className="card-grid">
        {filteredResources.map((item) => (
          <ResourceCard key={item.id} title={item.title} desc={item.desc} />
        ))}
      </section>

      {filteredResources.length === 0 ? (
        <p className="no-results">No results found.</p>
      ) : null}
    </main>
  );
}
