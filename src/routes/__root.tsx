import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Erreur 404</p>
        <h1 className="mt-3 font-display text-7xl">Introuvable</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          La page que vous cherchez n'appartient pas à notre collection.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
        >
          Retour à la maison
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Un instant.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une anomalie est survenue. Nous vous invitons à réessayer.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="rounded-full border border-white/10 px-6 py-2.5 text-sm"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ROYALTY.STORE — Le Luxe de la Technologie et du Style" },
      {
        name: "description",
        content:
          "Découvrez ROYALTY.STORE, la maison où la technologie rencontre le raffinement. Montres, téléphones, gaming, mode, parfums.",
      },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "ROYALTY.STORE — Le Luxe de la Technologie et du Style" },
      {
        property: "og:description",
        content:
          "Découvrez ROYALTY.STORE, la maison où la technologie rencontre le raffinement. Montres, téléphones, gaming, mode, parfums.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ROYALTY.STORE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ROYALTY.STORE — Le Luxe de la Technologie et du Style" },
      { name: "twitter:description", content: "Découvrez ROYALTY.STORE, la maison où la technologie rencontre le raffinement. Montres, téléphones, gaming, mode, parfums." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/97456798-838c-4ddf-acab-0401a880904d" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/97456798-838c-4ddf-acab-0401a880904d" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="min-h-screen pt-24">
        <Outlet />
      </main>
      <Footer />
      <CartSheet />
    </QueryClientProvider>
  );
}
