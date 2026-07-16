import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getProduct } from "@/data/products";
import { useCart } from "@/stores/shop";
import { formatPrice } from "@/components/ProductCard";

export function CartSheet() {
  const { items, isOpen, toggle, remove, setQty } = useCart();

  const detailed = items
    .map((i) => ({ item: i, product: getProduct(i.id) }))
    .filter((x) => x.product);
  const subtotal = detailed.reduce((n, x) => n + (x.product!.price * x.item.qty), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggle(false)}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col glass-strong"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Votre écrin
                </p>
                <h2 className="font-display text-2xl">Panier</h2>
              </div>
              <button
                onClick={() => toggle(false)}
                aria-label="Fermer"
                className="inline-flex size-9 items-center justify-center rounded-full hover:bg-white/5"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {detailed.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full glass animate-gold-pulse">
                    <ShoppingBag className="size-6 text-gold" />
                  </div>
                  <p className="font-display text-2xl">Votre panier est vide</p>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Explorez notre catalogue pour composer une sélection à votre image.
                  </p>
                  <Link
                    to="/catalog"
                    onClick={() => toggle(false)}
                    className="mt-6 inline-flex items-center rounded-full bg-gold-gradient px-6 py-2.5 text-sm text-primary-foreground shadow-gold"
                  >
                    Explorer
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {detailed.map(({ item, product }) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 rounded-xl border border-white/5 p-3"
                      >
                        <img
                          src={product!.image}
                          alt={product!.name}
                          className="size-20 rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                                {product!.categoryLabel}
                              </p>
                              <p className="truncate font-display text-lg">{product!.name}</p>
                            </div>
                            <button
                              onClick={() => remove(item.id)}
                              aria-label="Retirer"
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-white/10">
                              <button
                                onClick={() => setQty(item.id, item.qty - 1)}
                                aria-label="Diminuer"
                                className="inline-flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-6 text-center text-sm">{item.qty}</span>
                              <button
                                onClick={() => setQty(item.id, item.qty + 1)}
                                aria-label="Augmenter"
                                className="inline-flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <p className="font-display text-gold">
                              {formatPrice(product!.price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {detailed.length > 0 && (
              <div className="border-t border-white/5 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-display text-xl text-gold">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Livraison et taxes calculées à l'étape suivante.
                </p>
                <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold-lg transition-transform hover:scale-[1.02]">
                  Passer commande
                </button>
                <Link
                  to="/catalog"
                  onClick={() => toggle(false)}
                  className="mt-2 block text-center text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
                >
                  Continuer la sélection
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
