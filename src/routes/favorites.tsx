import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useFavorites } from "@/stores/shop";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favoris — ROYALTY.STORE" },
      { name: "description", content: "Vos pièces favorites ROYALTY.STORE." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const ids = useFavorites((s) => s.ids);
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pb-10"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Sélection privée</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">Vos favoris</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Une liste tenue à votre image, sauvegardée sur cet appareil.
        </p>
      </motion.header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-satin/60 py-24 text-center">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full glass animate-gold-pulse">
            <Heart className="size-6 text-gold" />
          </div>
          <p className="font-display text-3xl">Aucun favori pour l'instant</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Marquez d'un cœur les pièces qui vous séduisent — elles vous attendront ici.
          </p>
          <Link
            to="/catalog"
            className="mt-8 rounded-full bg-gold-gradient px-8 py-3 text-sm font-medium text-primary-foreground shadow-gold"
          >
            Explorer la collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
