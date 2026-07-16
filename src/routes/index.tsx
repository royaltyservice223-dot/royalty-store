import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { GoldParticles } from "@/components/GoldParticles";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROYALTY.STORE — Le Luxe de la Technologie et du Style" },
      {
        name: "description",
        content:
          "Découvrez ROYALTY.STORE, la maison où la technologie rencontre le raffinement. Montres, téléphones, gaming, mode, parfums.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Featured products={featured} />
      <Manifesto />
      <Promise />
    </>
  );
}

function Hero() {
  return (
    <section className="relative -mt-24 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden grain">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_20%,rgba(212,175,55,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_20%_80%,rgba(212,175,55,0.08),transparent_60%)]" />
        <GoldParticles density={80} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[11px] uppercase text-gold"
        >
          Maison — Édition 2026
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight">
          {"Royalty".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                delay: 0.15 + i * 0.06,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="inline-block text-gold"
          >
            .
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block text-gold italic"
          >
            Store
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mx-auto mt-8 max-w-xl text-base text-foreground/75"
        >
          Le Luxe de la Technologie et du Style. Une sélection d'objets rares,
          conçus pour ceux qui ne s'excusent pas d'exister.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.9 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/catalog"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-gold-lg transition-transform hover:scale-105"
          >
            <span className="relative z-10">Acheter maintenant</span>
            <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            to="/catalog"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm text-foreground/90 transition-colors hover:border-gold hover:text-gold"
          >
            Explorer la collection
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="mx-auto mb-2 h-10 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Défilez pour découvrir
        </p>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["Excellence", "Rareté", "Précision", "Silence", "Héritage", "Innovation"];
  const line = [...words, ...words, ...words];
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-white/5 bg-satin/40 py-6"
    >
      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {line.map((w, i) => (
          <span
            key={i}
            className="mx-8 font-display text-3xl italic text-foreground/40 md:text-5xl"
          >
            {w}
            <span className="mx-8 text-gold">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Univers</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Nos maisons</h2>
        </div>
        <Link
          to="/catalog"
          className="hidden text-sm uppercase tracking-[0.24em] text-muted-foreground hover:text-gold md:inline-flex"
        >
          Tout voir →
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <Link
              to="/catalog"
              search={{ cat: c.id }}
              className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-satin p-5 transition-all hover:border-gold/40"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {c.hint}
              </span>
              <div>
                <p className="font-display text-2xl group-hover:text-gold">{c.label}</p>
                <ArrowUpRight className="mt-2 size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </div>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured({ products }: { products: typeof PRODUCTS }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Sélection</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Pièces iconiques</h2>
        </div>
        <Link
          to="/catalog"
          className="hidden text-sm uppercase tracking-[0.24em] text-muted-foreground hover:text-gold md:inline-flex"
        >
          Catalogue complet →
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Manifeste</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">
            La technologie <br />
            <span className="italic text-gold">habillée</span> de silence.
          </h2>
          <p className="mt-6 max-w-lg text-base text-foreground/75">
            ROYALTY.STORE n'est pas un catalogue. C'est une curation. Chaque
            objet est choisi pour sa maîtrise, son savoir-faire et sa capacité
            à traverser le temps. Nous croyons à l'objet juste — celui qui vous
            accompagne, sans jamais vous suivre.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/catalog"
              className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
            >
              Découvrir
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80"
              alt="Détail horlogerie or"
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl glass-strong p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Depuis 2026</p>
              <p className="mt-1 font-display text-2xl">Un cercle, pas une foule.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Promise() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Authenticité garantie",
      text: "Chaque pièce est certifiée et numérotée par nos ateliers.",
    },
    {
      icon: Truck,
      title: "Livraison privée",
      text: "Concierge dédié, remise en main propre à Bamako et dans le monde.",
    },
    {
      icon: Sparkles,
      title: "Écrin signé",
      text: "Emballage cousu main, présenté dans un coffret laqué noir mat.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08}>
            <div className="flex h-full items-start gap-4 rounded-2xl border border-white/5 bg-satin/60 p-6">
              <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground shadow-gold">
                <it.icon className="size-4" />
              </div>
              <div>
                <p className="font-display text-xl">{it.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
