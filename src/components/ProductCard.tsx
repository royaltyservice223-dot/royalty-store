import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart, useFavorites } from "@/stores/shop";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const fav = useFavorites();
  const isFav = fav.ids.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden rounded-2xl border border-white/5 bg-satin"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
           className="size-full object-contain transition-all duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
          <div className="pointer-events-none absolute -inset-x-8 -top-8 h-40 rotate-12 bg-gradient-to-b from-white/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

          {product.badge && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-gold">
              {product.badge === "new" && "Nouveauté"}
              {product.badge === "bestseller" && "Iconique"}
              {product.badge === "limited" && "Édition limitée"}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              fav.toggle(product.id);
            }}
            aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full glass transition-transform hover:scale-110"
          >
            <Heart
              className={`size-4 transition-colors ${
                isFav ? "fill-gold stroke-gold" : "stroke-foreground/70"
              }`}
            />
          </button>

          <div className="absolute inset-x-4 bottom-4 flex translate-y-4 items-center justify-between opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[11px] uppercase tracking-[0.24em] text-foreground/80">
              Découvrir
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product.id, 1);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-xs font-medium text-primary-foreground shadow-gold transition-transform hover:scale-105"
            >
              <ShoppingBag className="size-3.5" />
              Ajouter
            </button>
          </div>
        </div>

        <div className="flex items-baseline justify-between p-5">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {product.categoryLabel}
            </p>
            <h3 className="mt-1 truncate font-display text-xl">{product.name}</h3>
          </div>
          <div className="text-right">
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            <p className="font-display text-lg text-gold">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function formatPrice(v: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(v);
}
