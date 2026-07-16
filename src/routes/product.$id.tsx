import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import { getProduct, getRelated, type Product } from "@/data/products";
import { useCart, useFavorites } from "@/stores/shop";
import { ProductCard, formatPrice } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product, related: getRelated(params.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Introuvable — ROYALTY.STORE" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — ROYALTY.STORE` },
        { name: "description", content: product.tagline },
        { property: "og:title", content: `${product.name} — ROYALTY.STORE` },
        { property: "og:description", content: product.tagline },
        { property: "og:image", content: product.image },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData() as { product: Product; related: Product[] };
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const fav = useFavorites();
  const isFav = fav.ids.includes(product.id);

  return (
    <article className="mx-auto max-w-7xl px-6 py-8">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Maison</Link>
        <span className="mx-2">/</span>
        <Link to="/catalog" className="hover:text-foreground">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-satin">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={product.gallery[active]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="aspect-square w-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {product.gallery.map((g, i) => (
              <button
                key={g}
                onClick={() => setActive(i)}
                className={`overflow-hidden rounded-xl border transition-all ${
                  active === i ? "border-gold shadow-gold" : "border-white/10 opacity-70 hover:opacity-100"
                }`}
                aria-label={`Vue ${i + 1}`}
              >
            <img
  src={g}
  alt=""
  className="aspect-[3/4] w-full object-cover"
/>
              </button>
            ))}
          </div>
        </div>

        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{product.categoryLabel}</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">{product.name}</h1>
            <p className="mt-3 text-lg text-foreground/80">{product.tagline}</p>

            <div className="mt-5 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-3.5 ${i < Math.round(product.rating) ? "fill-gold" : "opacity-30"}`} />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating.toFixed(1)} · {product.reviews} avis
              </span>
            </div>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-4xl text-gold">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <p className="mt-6 text-sm text-foreground/75">{product.description}</p>

            {product.colors && (
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Finitions</p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="inline-block size-8 rounded-full border border-white/20"
                      style={{ background: c }}
                      aria-label={`Coloris ${c}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-white/10">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-muted-foreground hover:text-foreground" aria-label="Diminuer">−</button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-muted-foreground hover:text-foreground" aria-label="Augmenter">+</button>
              </div>
              <button
                onClick={() => add(product.id, qty)}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-gold-lg transition-transform hover:scale-[1.02]"
              >
                <ShoppingBag className="size-4" />
                Ajouter au panier
              </button>
              <button
                onClick={() => fav.toggle(product.id)}
                aria-label="Favoris"
                className="inline-flex size-12 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-gold"
              >
                <Heart className={`size-4 ${isFav ? "fill-gold stroke-gold" : ""}`} />
              </button>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/5 bg-satin/60 p-4 text-xs text-muted-foreground">
              <p>
                <span className="text-gold">✦</span> Livraison privée offerte dès 500 €. Retour
                sous 30 jours. Chaque pièce est authentifiée et emballée dans son écrin signature.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-32">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Composer</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Autres pièces de la maison</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
