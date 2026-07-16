import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "La Maison — ROYALTY.STORE" },
      {
        name: "description",
        content:
          "L'histoire, la vision et les valeurs de la maison ROYALTY.STORE.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[10px] uppercase tracking-[0.3em] text-gold"
      >
        La Maison
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-4 font-display text-6xl leading-[1.02] md:text-8xl"
      >
        Un cercle, <br />
        <span className="italic text-gold">pas une foule.</span>
      </motion.h1>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-2xl text-lg text-foreground/80">
          Née à Bamako, ROYALTY.STORE est une maison indépendante qui célèbre
          la rencontre entre l'artisanat, la technologie et le style. Chaque
          objet est choisi pour sa maîtrise, son savoir-faire et son intention.
        </p>
      </Reveal>
      <Reveal delay={0.35}>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
          Nous ne vendons pas des produits. Nous éditons des pièces. Nous
          n'inondons pas les vitrines. Nous cultivons un cercle. Chaque
          commande est traitée par un concierge dédié, chaque écrin est cousu
          main, chaque livraison est un rendez-vous.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          ["01", "Rareté", "Séries limitées, numérotées, jamais réimprimées."],
          ["02", "Précision", "Un contrôle qualité en 47 points sur chaque pièce."],
          ["03", "Silence", "Un design qui parle bas, mais que l'on entend longtemps."],
        ].map(([n, t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="rounded-2xl border border-white/5 bg-satin/60 p-8 text-left">
              <p className="font-display text-4xl text-gold">{n}</p>
              <p className="mt-3 font-display text-2xl">{t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <Link
          to="/catalog"
          className="mt-16 inline-flex items-center justify-center rounded-full bg-gold-gradient px-8 py-3 text-sm font-medium text-primary-foreground shadow-gold-lg transition-transform hover:scale-[1.03]"
        >
          Découvrir la collection
        </Link>
      </Reveal>
    </div>
  );
}
