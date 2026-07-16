import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import { z } from "zod";

const searchSchema = z.object({
  cat: z.string().optional(),
  sort: z.enum(["new", "price-asc", "price-desc", "rating"]).optional(),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catalogue — ROYALTY.STORE" },
      {
        name: "description",
        content:
          "Le catalogue ROYALTY.STORE : montres, téléphones, gaming, mode, parfums et pièces d'exception.",
      },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { cat, sort } = Route.useSearch();
  const [priceMax, setPriceMax] = useState(5000);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let out = PRODUCTS.slice();
    if (cat) out = out.filter((p) => p.category === cat);
    if (query.trim())
      out = out.filter((p) =>
        (p.name + " " + p.categoryLabel + " " + p.tagline)
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
    out = out.filter((p) => p.price <= priceMax);
    switch (sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        out.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        out.sort((a, b) => Number(b.badge === "new") - Number(a.badge === "new"));
        break;
    }
    return out;
  }, [cat, sort, priceMax, query]);

  const activeCat = CATEGORIES.find((c) => c.id === cat);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="pb-10"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Catalogue</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          {activeCat ? activeCat.label : "La collection"}
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          {activeCat ? activeCat.hint : "Une curation vivante, renouvelée chaque saison."}
        </p>
      </motion.header>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Recherche
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Un objet, une envie…"
              className="mt-2 w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Catégories
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <Link
                  to="/catalog"
                  className="block rounded-md px-2 py-1.5 text-sm text-foreground/70 hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: true }}
                >
                  Toutes
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/catalog"
                    search={{ cat: c.id as Category }}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-white/5 ${
                      cat === c.id ? "text-gold" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Prix maximum
              </p>
              <span className="font-display text-gold">
                {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(priceMax)}
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={5000}
              step={100}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="mt-3 w-full accent-gold"
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Trier</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                ["new", "Nouveautés"],
                ["price-asc", "Prix ↑"],
                ["price-desc", "Prix ↓"],
                ["rating", "Note"],
              ].map(([k, l]) => (
                <Link
                  key={k}
                  to="/catalog"
                  search={{ cat: cat as Category | undefined, sort: k as "new" | "price-asc" | "price-desc" | "rating" }}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    sort === k
                      ? "border-gold text-gold"
                      : "border-white/10 text-foreground/70 hover:border-gold/60"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {filtered.length} pièce{filtered.length > 1 ? "s" : ""}
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-satin/60 p-12 text-center">
              <p className="font-display text-2xl">Aucun objet ne correspond.</p>
              <p className="mt-2 text-sm text-muted-foreground">Ajustez vos filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
