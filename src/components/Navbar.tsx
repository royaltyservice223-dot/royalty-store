import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, useFavorites } from "@/stores/shop";
import { CATEGORIES } from "@/data/products";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/catalog", label: "Catalogue" },
  { to: "/catalog", label: "Nouveautés", search: { sort: "new" as const } },
  { to: "/about", label: "Maison" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const favCount = useFavorites((s) => s.ids.length);
  const toggleCart = useCart((s) => s.toggle);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={`glass-strong flex w-full max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "shadow-gold" : ""
          }`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-lg tracking-[0.28em] text-foreground">
              ROYALTY<span className="text-gold">.</span>STORE
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group relative px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <IconBtn label="Rechercher">
              <Search className="size-4" />
            </IconBtn>
            <Link
              to="/favorites"
              className="relative inline-flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label="Favoris"
            >
              <Heart className="size-4" />
              {favCount > 0 && <Badge>{favCount}</Badge>}
            </Link>
            <button
              onClick={() => toggleCart(true)}
              className="relative inline-flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label="Panier"
            >
              <ShoppingBag className="size-4" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="ml-1 inline-flex size-9 items-center justify-center rounded-full text-foreground/70 md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="font-display text-lg tracking-[0.28em]"
              >
                ROYALTY<span className="text-gold">.</span>STORE
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full glass"
                aria-label="Fermer"
              >
                <X className="size-4" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="mt-14 flex flex-col gap-2 px-8"
            >
              {NAV.map((n) => (
                <motion.div
                  key={n.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block font-display text-4xl tracking-tight text-foreground/90 hover:text-gold"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 h-px w-full gold-line" />
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Catégories
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CATEGORIES.slice(0, 8).map((c) => (
                  <Link
                    key={c.id}
                    to="/catalog"
                    search={{ cat: c.id }}
                    onClick={() => setOpen(false)}
                    className="rounded-lg glass px-3 py-2 text-sm"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-gradient px-1 text-[10px] font-semibold text-primary-foreground shadow-gold">
      {children}
    </span>
  );
}

export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lg-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8A6F2E" />
          <stop offset="50%" stopColor="#F5DC82" />
          <stop offset="100%" stopColor="#B8912B" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
        stroke="url(#lg-gold)"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M16 8 L22 12 L22 20 L16 24 L10 20 L10 12 Z"
        fill="url(#lg-gold)"
        opacity="0.9"
      />
      <circle cx="16" cy="16" r="1.6" fill="#050505" />
    </svg>
  );
}
