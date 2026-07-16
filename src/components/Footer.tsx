import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/Navbar";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-satin/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <LogoMark size={22} />
              <span className="font-display tracking-[0.28em]">
                ROYALTY<span className="text-gold">.</span>STORE
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Le Luxe de la Technologie et du Style. Une maison, un manifeste.
            </p>
          </div>
          <FooterCol title="Maison" links={[["À propos", "/about"], ["Contact", "/about"], ["Journal", "/about"]]} />
          <FooterCol title="Boutique" links={[["Catalogue", "/catalog"], ["Favoris", "/favorites"], ["Nouveautés", "/catalog"]]} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Cercle privé</p>
            <p className="mt-3 font-display text-lg">Rejoignez le cercle</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex items-center rounded-full border border-white/10 bg-black/40 pl-4 pr-1"
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-gold-gradient px-4 py-1.5 text-xs font-medium text-primary-foreground">
                Rejoindre
              </button>
            </form>
          </div>
        </div>
        <div className="mt-14 h-px w-full gold-line opacity-40" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} ROYALTY.STORE — Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-foreground">Confidentialité</Link>
            <Link to="/" className="hover:text-foreground">CGV</Link>
            <Link to="/" className="hover:text-foreground">Livraison</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-foreground/80 hover:text-gold">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
