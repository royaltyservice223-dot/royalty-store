export type Category =
  | "gaming"
  | "computers"
  | "phones"
  | "audio"
  | "fashion-men"
  | "fashion-women"
  | "watches"
  | "fragrance"
  | "beauty"
  | "bags";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  category: Category;
  categoryLabel: string;
  image: string;
  gallery: string[];
  badge?: "new" | "bestseller" | "limited";
  colors?: string[];
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  features: string[];
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES: { id: Category; label: string; hint: string }[] = [
  { id: "watches", label: "Montres", hint: "Horlogerie d'exception" },
  { id: "phones", label: "Téléphones", hint: "Technologie de pointe" },
  { id: "gaming", label: "Gaming", hint: "Performance ultime" },
  { id: "computers", label: "Ordinateurs", hint: "Puissance & précision" },
  { id: "audio", label: "Audio", hint: "Son signature" },
  { id: "fashion-men", label: "Mode Homme", hint: "Élégance masculine" },
  { id: "fashion-women", label: "Mode Femme", hint: "Grâce contemporaine" },
  { id: "fragrance", label: "Parfums", hint: "Sillages rares" },
  { id: "beauty", label: "Beauté", hint: "Rituels haute cosmétique" },
  { id: "bags", label: "Maroquinerie", hint: "Cuir d'exception" },
];

export const PRODUCTS: Product[] = [
  {
    id: "Royalty chrono Noir",
    name: "Royalty Arabic chrono",
    tagline: "Chronographe automatique or 18k",
    price: 5000,
    oldPrice: 5490,
    category: "watches",
    categoryLabel: "Montres",
    image: "/ARABIC-PRINCIPAL.JPG",
    gallery: [
     "/ARABIC-PRINCIPAL.JPG", 
      "/ARABIC-VUE1.jpg",
      "/ARABIC-VUE3.jpg",
      "/ARABIC-VUE5.jpg",
      "/ARABIC-VUE6.jpg",
      "/ARABIC-VUE7.jpg",
    ],
    badge: "limited",
    colors: ["#0B0B0B", "#d3d3d3", "#8A6F2E", "#e5ff00", "#FFFFFF", "#3b0fff", "#D4AF37", "#F5F5F5"],
    rating: 4.9,
    reviews: 122,
    stock: 100,
    description:
      "Charme, Coin, Mode, Édition limitée, Luxe, Sport, Antique, Dessin animé, Affaires.",
    features: [
      "Mouvement automatique suisse",
      "Boîtier 42 mm — acier PVD noir",
      "Cadran squelette or 18 carats",
      "Verre saphir bombé anti-reflet",
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    tagline: "Clavier à axe magnétique.",
    price: 30000,
   category: "gaming",
categoryLabel: "Gaming", 
    image: "/CLAVIER MECANIQUE-PRINCIPAL.jpg",
    gallery: [
      "/CLAVIER-PRINCIPAL.jpg",
      "/CLAVIER-VUE1.jpg",
      "/CLAVIER-VUE2.jpg",
    ],
    badge: "new",
    colors: ["#0B0B0B", "#D4AF37", "#F5F5F5"],
    rating: 4.8,
    reviews: 1032,
    stock: 20,
    description:
  "Un clavier mécanique gaming conçu pour les joueurs exigeants. Ses switchs réactifs offrent une frappe précise et rapide, tandis que son éclairage RGB personnalisable apporte une ambiance immersive à votre setup. Sa conception robuste garantit confort, performance et durabilité, aussi bien pour le gaming compétitif que pour la création au quotidien.",
    features: [
  "Switchs mécaniques ultra-réactifs pour un retour précis",
  "Rétroéclairage RGB personnalisable avec plusieurs effets lumineux",
  "Temps de réponse ultra-rapide pour le gaming compétitif",
  "Construction robuste avec touches durables et confort de frappe",
],
  },
  {
    id: "obsidian-monitor-49",
    name: "Obsidian Ultra 49",
    tagline: "Écran gaming incurvé 180 Hz",
    price: 100000,
    oldPrice: 120499,
    category: "gaming",
    categoryLabel: "Gaming",
    image:"/ECRAN-PRINCIPAL.jpg",
    gallery: [
      "/ECRAN-PRINCIPAL.jpg",
      "/ECRAN-VUE1.jpg",
    ],
    badge: "bestseller",
    rating: 4.9,
    reviews: 421,
    stock: 10,
    description:
      "Un panneau incurvé DQHD 49″ 240 Hz, 1 ms, HDR 1000. L'immersion à l'état pur, calibrée pour l'excellence.",
    features: [
      "49″ DQHD incurvé 1000R",
      "180 Hz · 1 ms GtG",
      "HDR 1000 · P3 95%",
      "USB-C 90 W",
    ],
  },
  {
    id: "atlas-pro-laptop",
    name: "Atlas Pro 16",
    tagline: "Studio créatif · silicium M-Ultra",
    price: 850000,
    category: "computers",
    categoryLabel: "Ordinateurs",
    image: "/LAPTOP-PRINCIPAL.jpg",
    gallery: [
      "/LAPTOP-PRINCIPAL.jpg",
      "/LAPTOP-VUE1.jpg",
      "/LAPTOP-VUE2.jpg",
    ],
    badge: "new",
    rating: 4.9,
    reviews: 289,
    stock: 3,
  description:
  "Un ordinateur portable gaming nouvelle génération conçu pour les joueurs et les créateurs exigeants. Équipé d'un Intel Core i7-14650HX, d'une NVIDIA GeForce RTX 5060 8 Go et d'un écran 16 pouces haute résolution 2560×1600, il offre une expérience fluide pour les jeux AAA, le montage vidéo et les applications professionnelles. Son système de refroidissement haute performance maintient des performances stables même lors des longues sessions, tandis que le WiFi 7 garantit une connexion ultra-rapide.", 
    features: [
  "Processeur Intel Core i7-14650HX jusqu'à 5.2 GHz pour des performances gaming et multitâches exceptionnelles",
  "Carte graphique NVIDIA GeForce RTX 5060 8 Go dédiée pour un rendu fluide en haute résolution et le ray tracing",
  "Écran 16 pouces 2560×1600 au format 16:10 offrant une image détaillée et immersive",
  "16 Go de RAM + SSD 1 To pour un démarrage rapide, un stockage confortable et une excellente réactivité",
],
  },
  {
    id: "aura-headphones",
    name: "Écouteurs intra-auriculaires KZ AS16 PRO HiFi IEM",
    tagline: "Casque à réduction active — cuir nappa",
    price: 5000,
    category: "audio",
    categoryLabel: "Audio",
    image:"/CASQUE-PRINCIPAL.jpg",
    gallery: [
      "/CASQUE-PRINCIPAL.jpg",
      "/CASQUE-VUE1.jpg",
      "/CASQUE-VUE2.jpg"
      
    ],
    badge: "bestseller",
    colors: ["#0B0B0B", "#D4AF37", "#3b0fff", "#8A6F2E", "#e5ff00", "#FFFFFF"],
    rating: 4.8,
    reviews: 186,
    stock: 50,
    description:
      "Pilote audio hybride: Le pilote audio hybride combine des pilotes dynamiques et à armature équilibrée, offrant un son plus détaillé et équilibré pour une expérience d'écoute améliorée.",
    features: [
      "Réduction active adaptative",
      "Filaire",
      "Transducteurs planaires 40 mm",
      "Stéréo bilatérale"
    ],
  },
  {
    id: "eclipse-keyboard",
    name: "Eclipse Mechanical",
    tagline: "Clavier hall-effect · switchs magnétiques",
    price: 329,
    category: "gaming",
    categoryLabel: "Gaming",
    image: img("photo-1587829741301-dc798b83add3"),
    gallery: [
      img("photo-1587829741301-dc798b83add3"),
      img("photo-1595225476474-87563907a212"),
      img("photo-1541140532154-b024d705b90a"),
    ],
    rating: 4.7,
    reviews: 356,
    stock: 30,
    description:
      "Châssis aluminium CNC. Switchs à effet Hall analogiques. Rétroéclairage RGB par touche. Précision compétition.",
    features: [
      "Switchs magnétiques 0.1 mm",
      "8 000 Hz polling",
      "Aluminium CNC",
      "Sans fil tri-mode",
    ],
  },
  {
    id: "noir-tuxedo",
    name: "Smoking Noir",
    tagline: "Laine mérinos · revers satin",
    price: 1450,
    category: "fashion-men",
    categoryLabel: "Mode Homme",
    image: img("photo-1594938298603-c8148c4dae35"),
    gallery: [
      img("photo-1594938298603-c8148c4dae35"),
      img("photo-1507679799987-c73779587ccf"),
      img("photo-1521572163474-6864f9cf17ab"),
    ],
    badge: "new",
    rating: 4.9,
    reviews: 87,
    stock: 15,
    description:
      "Coupe italienne slim, laine Super 150s, revers en satin de soie. Tailoring signé par nos maîtres tailleurs.",
    features: [
      "Laine mérinos Super 150s",
      "Revers satin de soie",
      "Doublure cupro",
      "Fait à la main",
    ],
  },
  {
    id: "dune-heels",
    name: "Dune Stiletto",
    tagline: "Escarpin cuir verni — talon 100 mm",
    price: 890,
    category: "fashion-women",
    categoryLabel: "Mode Femme",
    image: img("photo-1543163521-1bf539c55dd2"),
    gallery: [
      img("photo-1543163521-1bf539c55dd2"),
      img("photo-1596703263926-eb0762ee17e4"),
      img("photo-1549298916-b41d501d3772"),
    ],
    badge: "limited",
    rating: 4.8,
    reviews: 142,
    stock: 8,
    description:
      "Cuir verni italien, semelle intérieure en agneau, talon aiguille sculpté à la main. Une silhouette architecturale.",
    features: [
      "Cuir verni italien",
      "Talon 100 mm",
      "Semelle agneau",
      "Fabriqué en Italie",
    ],
  },
  {
    id: "regalia-perfume",
    name: "Regalia Extrait",
    tagline: "Oud royal · ambre · cuir · 100 ml",
    price: 420,
    category: "fragrance",
    categoryLabel: "Parfums",
    image: img("photo-1541643600914-78b084683601"),
    gallery: [
      img("photo-1541643600914-78b084683601"),
      img("photo-1523293182086-7651a899d37f"),
      img("photo-1592945403244-b3fbafd7f539"),
    ],
    badge: "bestseller",
    rating: 4.9,
    reviews: 604,
    stock: 33,
    description:
      "Un extrait 30% : oud du Laos, ambre gris, cuir suédé. Sillage majestueux, tenue supérieure à 24 h.",
    features: [
      "Extrait 30% · 100 ml",
      "Oud du Laos",
      "Flacon cristal or",
      "Composé à Grasse",
    ],
  },
  {
    id: "silk-clutch",
    name: "Silk Envelope",
    tagline: "Pochette soie brodée fils d'or",
    price: 1290,
    category: "bags",
    categoryLabel: "Maroquinerie",
    image: img("photo-1584917865442-de89df76afd3"),
    gallery: [
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1548036328-c9fa89d128fa"),
      img("photo-1590874103328-eac38a683ce7"),
    ],
    rating: 4.8,
    reviews: 76,
    stock: 11,
    description:
      "Pochette soie sauvage doublée nappa, broderies aux fils d'or fin. Chaque pièce numérotée à la main.",
    features: [
      "Soie sauvage brodée",
      "Fils d'or 24 carats",
      "Doublure cuir nappa",
      "Édition numérotée",
    ],
  },
  {
    id: "velvet-serum",
    name: "Velvet Elixir",
    tagline: "Sérum caviar & or colloïdal · 30 ml",
    price: 280,
    category: "beauty",
    categoryLabel: "Beauté",
    image: img("photo-1620916566398-39f1143ab7be"),
    gallery: [
      img("photo-1620916566398-39f1143ab7be"),
      img("photo-1631730359585-9b0c05fbe64a"),
      img("photo-1608248543803-ba4f8c70ae0b"),
    ],
    badge: "new",
    rating: 4.7,
    reviews: 233,
    stock: 40,
    description:
      "Extrait de caviar biologique, or colloïdal 24 carats, acide hyaluronique triple molécule. Restaure l'éclat.",
    features: [
      "Or colloïdal 24 carats",
      "Caviar biologique",
      "Hyaluronique triple",
      "Formulé en Suisse",
    ],
  },
  {
    id: "meridian-mouse",
    name: "Meridian Wireless",
    tagline: "Souris esport 8 kHz · 55 g",
    price: 199,
    category: "gaming",
    categoryLabel: "Gaming",
    image: img("photo-1527814050087-3793815479db"),
    gallery: [
      img("photo-1527814050087-3793815479db"),
      img("photo-1615663245857-ac93bb7c39e7"),
      img("photo-1616071358578-eb9f4d0fdfc4"),
    ],
    rating: 4.8,
    reviews: 512,
    stock: 60,
    description:
      "Coque magnésium ajourée. Capteur optique 42 000 DPI. Polling 8 000 Hz sans fil. L'arme des champions.",
    features: [
      "Capteur 42 000 DPI",
      "Polling 8 kHz sans fil",
      "Coque magnésium 55 g",
      "Autonomie 90 h",
    ],
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getRelated = (id: string) => {
  const p = getProduct(id);
  if (!p) return [];
  return PRODUCTS.filter((x) => x.id !== id && x.category === p.category).slice(0, 4);
};
