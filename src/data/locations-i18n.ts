import type { Location } from "./locations";

type LocationCopyFields = Pick<Location, "slug" | "description">;

/**
 * Bulk descriptions are generated from three English templates (GTADB pins,
 * district hubs, scenic pull-offs). Translating the templates localizes ~1450
 * pins without duplicating strings per slug.
 */
type DescriptionTemplates = {
  district: (name: string, region: string) => string;
  scenic: (region: string) => string;
  gtadb: (name: string, layer: string) => string;
};

const DISTRICT_RE =
  /^(.+) — district and landmark area in (.+), mapped from community cartography and trailer geography cross-checks\.$/;
const SCENIC_RE =
  /^Scenic pull-off in (.+) useful for trailer matching and pre-launch route planning on Map-6\.$/;
const GTADB_RE = /^(.+) — community-mapped location \((L\d+), GTADB\)\.$/;

const TEMPLATES: Record<string, DescriptionTemplates> = {
  fr: {
    district: (name, region) =>
      `${name} — quartier et zone repère de ${region}, cartographié depuis la carto communautaire et des recoupements avec la géographie des trailers.`,
    scenic: (region) =>
      `Point de vue en bord de route dans ${region}, utile pour recouper les trailers et préparer vos itinéraires avant le lancement sur Map-6.`,
    gtadb: (name, layer) =>
      `${name} — lieu cartographié par la communauté (${layer}, GTADB).`,
  },
  es: {
    district: (name, region) =>
      `${name} — barrio y zona de referencia en ${region}, cartografiado desde la cartografía comunitaria y cruces con la geografía de los tráilers.`,
    scenic: (region) =>
      `Mirador a pie de carretera en ${region}, útil para cotejar tráilers y planificar rutas antes del lanzamiento en Map-6.`,
    gtadb: (name, layer) =>
      `${name} — ubicación cartografiada por la comunidad (${layer}, GTADB).`,
  },
  de: {
    district: (name, region) =>
      `${name} — Viertel und Landmarken-Gebiet in ${region}, kartiert aus Community-Kartografie und Abgleichen mit der Trailer-Geografie.`,
    scenic: (region) =>
      `Aussichtspunkt am Straßenrand in ${region} — nützlich für Trailer-Abgleiche und Routenplanung vor dem Launch auf Map-6.`,
    gtadb: (name, layer) =>
      `${name} — von der Community kartierter Ort (${layer}, GTADB).`,
  },
  it: {
    district: (name, region) =>
      `${name} — quartiere e area di riferimento in ${region}, mappato dalla cartografia della community e dai confronti con la geografia dei trailer.`,
    scenic: (region) =>
      `Punto panoramico lungo la strada in ${region}, utile per confrontare i trailer e pianificare i percorsi prima del lancio su Map-6.`,
    gtadb: (name, layer) =>
      `${name} — luogo mappato dalla community (${layer}, GTADB).`,
  },
  pt: {
    district: (name, region) =>
      `${name} — bairro e área de referência em ${region}, mapeado a partir da cartografia da comunidade e de cruzamentos com a geografia dos trailers.`,
    scenic: (region) =>
      `Miradouro à beira da estrada em ${region}, útil para cruzar trailers e planear rotas antes do lançamento no Map-6.`,
    gtadb: (name, layer) =>
      `${name} — local mapeado pela comunidade (${layer}, GTADB).`,
  },
};

/** Hand-written prose for indexable hubs and curated POIs. */
const FR: Record<string, string> = {
  "vice-city":
    "Le cœur néon de GTA 6. Vice City revient en hub central, mêlant architecture inspirée de Miami et satire signature de Rockstar.",
  "ocean-drive":
    "Front de mer iconique bordé d'hôtels art déco, de vie nocturne et de boutiques haut de gamme — un terrain de choix pour l'exploration et les collectibles.",
  "hidden-package-01":
    "Collectible GTA classique caché près des docks. Les paquets cachés devraient revenir dans GTA 6 — marquez ce point sur votre carte.",
  grassrivers:
    "Vastes zones humides inspirées des Everglades, avec hydroglisseurs, alligators et hameaux isolés en pleine mangrove — la nature sauvage de GTA 6.",
  "leonida-keys":
    "Archipel tropical relié à Vice City par des ponts-chaussées — inspiré des Florida Keys.",
  "port-gellhorn":
    "Ville portuaire industrielle du nord, avec chantiers navals, entrepôts et routes de contrebande du golfe.",
  "ambrosia-island":
    "Île de villégiature luxueuse au large de la côte de Leonida. Elle abriterait propriétés exclusives, yachts et missions à gros enjeux.",
  "mount-kalaga":
    "La frontière sauvage du nord de Leonida — forêts, rivières et canyons aux airs de pays de chasse. Nommé par Rockstar ; les limites exactes restent estimées.",
  "grassroots-weapons":
    "Armurerie locale desservant la région de Vice City. Repérez tous les ramassages d'armes et les boutiques avant le jour du lancement.",
  "everglades-lookout":
    "Point de vue isolé au cœur des zones humides de Leonida. Parfait pour l'exploration tout-terrain et les rencontres avec la faune.",
  "vice-city-international-airport":
    "Approche d'aéroport repérée dans les trailers, avec deux pistes et des routes périphériques bordées de palmiers.",
  "ocean-drive-art-deco-strip":
    "Alignement d'hôtels néon et promenade en front de mer présents dans les deux trailers officiels de GTA VI.",
  "leonida-causeway-bridge":
    "Long pont côtier reliant Vice City à la chaîne d'îles du sud.",
  "port-gellhorn-shipping-yard":
    "Grues industrielles et piles de conteneurs visibles dans les plans de coupe du trailer sur la côte ouvrière.",
  "grassrivers-airboat-dock":
    "Ponton en bois et point de mise à l'eau pour hydroglisseurs dans un marais à la Everglades.",
  "mount-kalaga-river-overlook":
    "Point de vue sur un canyon forestier, vu dans les images de la nature sauvage du nord de Leonida.",
  "ambrosia-marina-gates":
    "Marina fermée et littoral de luxe, terrain de la satire sur l'île des fortunés.",
  "vice-city-nightclub-district":
    "Grappe dense de vie nocturne au sud des tours du centre-ville, dans les plans de nuit du trailer.",
  "little-vice-street-art-alley":
    "Blocs intérieurs resserrés, avec fresques murales et quais de chargement d'entrepôts.",
  "leonida-keys-fishing-pier":
    "Ponton en bois s'avançant dans les eaux turquoise peu profondes de l'archipel sud.",
  "port-gellhorn-rail-yard":
    "Voies de garage de fret et rail industriel propice à la contrebande, près de la côte du golfe.",
  "grassrivers-gator-lagoon":
    "Lagune à courant lent ceinturée de racines de cyprès — spot de photo animalière.",
  "vice-city-downtown-freeway-stack":
    "Échangeur surélevé où les tours de verre du centre rejoignent les autoroutes côtières.",
  "mount-kalaga-hunting-cabin":
    "Cabane isolée dans une clairière en lisière de forêt — ambiance frontière du nord.",
  "ambrosia-private-beach-club":
    "Plage privée réservée aux membres, avec dunes entretenues et mouillages de yachts.",
  "vice-city-stadium-parking":
    "Vaste nappe d'asphalte près d'une silhouette de stade repérée dans la carto communautaire.",
  "leonida-keys-lighthouse":
    "Phare de navigation sur un key rocheux, marquant la voie maritime du sud.",
  "port-gellhorn-oil-tank-farm":
    "Réservoirs cylindriques et enchevêtrement de pipelines le long du front de mer industriel.",
  "grassrivers-highway-rest-stop":
    "Aire de repos routière où l'humidité des marais croise le trafic de l'interstate.",
  "vice-city-marina-bayside":
    "Marina adjacente au centre-ville, avec anneaux de luxe et vue sur la skyline.",
  "mount-kalaga-logging-road":
    "Piste de service en terre traversant la pinède vers les vallées fluviales.",
  "ocean-drive-hotel-rooftop-pool":
    "Toit-terrasse d'hôtel art déco souvent recoupé avec les plans néon des trailers.",
  "leonida-keys-smuggler-cove":
    "Crique cachée entre les îlots de mangrove — géographie classique de la contrebande.",
  "port-gellhorn-fish-market":
    "Étals du marché aux poissons et quais à glace du front de mer ouvrier.",
  "grassrivers-boardwalk-trail":
    "Passerelle en bois surélevée à travers les hautes herbes et les chenaux peu profonds.",
};

const ES: Record<string, string> = {
  "vice-city":
    "El corazón de neón de GTA 6. Vice City vuelve como hub central, mezclando arquitectura inspirada en Miami con la sátira característica de Rockstar.",
  "ocean-drive":
    "Paseo marítimo icónico con hoteles art déco, vida nocturna y tiendas de lujo — un punto ideal para explorar y buscar coleccionables.",
  "hidden-package-01":
    "Coleccionable clásico de GTA escondido cerca de los muelles. Se espera que los paquetes ocultos vuelvan en GTA 6 — marca este punto en tu mapa.",
  grassrivers:
    "Vastos humedales inspirados en los Everglades, con hidrodeslizadores, caimanes y asentamientos aislados en el pantano — la naturaleza salvaje de GTA 6.",
  "leonida-keys":
    "Archipiélago tropical unido a Vice City por puentes-calzada — inspirado en los Cayos de Florida.",
  "port-gellhorn":
    "Ciudad portuaria industrial del norte, con astilleros, almacenes y rutas de contrabando del Golfo.",
  "ambrosia-island":
    "Isla de lujo frente a la costa de Leonida. Se rumorea que alberga propiedades exclusivas, yates y misiones de alto riesgo.",
  "mount-kalaga":
    "La frontera salvaje del norte de Leonida — bosques, ríos y cañones con aire de tierra de caza. Nombrado por Rockstar; los límites exactos siguen siendo estimados.",
  "grassroots-weapons":
    "Armería local que abastece la zona de Vice City. Localiza todos los puntos de recogida de armas y tiendas antes del día del lanzamiento.",
  "everglades-lookout":
    "Mirador remoto en los humedales de Leonida. Perfecto para explorar campo a través y encontrarse con la fauna.",
  "vice-city-international-airport":
    "Aproximación al aeropuerto vista en los tráilers, con dos pistas y carreteras perimetrales bordeadas de palmeras.",
  "ocean-drive-art-deco-strip":
    "Hilera de hoteles de neón y paseo marítimo presentes en los dos tráilers oficiales de GTA VI.",
  "leonida-causeway-bridge":
    "Largo puente costero que une Vice City con la cadena de islas del sur.",
  "port-gellhorn-shipping-yard":
    "Grúas industriales y pilas de contenedores visibles en los planos de recurso del tráiler sobre la costa obrera.",
  "grassrivers-airboat-dock":
    "Pasarela de madera y punto de botadura de hidrodeslizadores en una marisma estilo Everglades.",
  "mount-kalaga-river-overlook":
    "Mirador sobre un cañón boscoso, visto en las imágenes de la naturaleza salvaje del norte de Leonida.",
  "ambrosia-marina-gates":
    "Marina cerrada y litoral de lujo, terreno de la sátira sobre la isla de los ricos.",
  "vice-city-nightclub-district":
    "Denso núcleo de vida nocturna al sur de las torres del centro, en los planos nocturnos del tráiler.",
  "little-vice-street-art-alley":
    "Manzanas interiores estrechas, con murales y muelles de carga de almacenes.",
  "leonida-keys-fishing-pier":
    "Muelle de madera que se adentra en las aguas turquesas poco profundas del archipiélago sur.",
  "port-gellhorn-rail-yard":
    "Vías de apartado de mercancías y ferrocarril industrial propicio al contrabando, junto a la costa del Golfo.",
  "grassrivers-gator-lagoon":
    "Laguna de corriente lenta rodeada de raíces de ciprés — punto de fotografía de fauna.",
  "vice-city-downtown-freeway-stack":
    "Enlace elevado donde las torres de cristal del centro se juntan con las autopistas costeras.",
  "mount-kalaga-hunting-cabin":
    "Cabaña aislada en un claro al borde del bosque — tono de frontera norteña.",
  "ambrosia-private-beach-club":
    "Playa privada solo para socios, con dunas cuidadas y amarres de yates.",
  "vice-city-stadium-parking":
    "Gran extensión de asfalto junto a la silueta de un estadio identificada en la cartografía comunitaria.",
  "leonida-keys-lighthouse":
    "Faro de navegación en un cayo rocoso que marca la ruta marítima del sur.",
  "port-gellhorn-oil-tank-farm":
    "Depósitos cilíndricos y una maraña de tuberías a lo largo del frente marítimo industrial.",
  "grassrivers-highway-rest-stop":
    "Área de descanso donde la humedad del pantano se cruza con el tráfico de la interestatal.",
  "vice-city-marina-bayside":
    "Marina junto al centro, con amarres de lujo y vistas al skyline.",
  "mount-kalaga-logging-road":
    "Pista de servicio de tierra que atraviesa el pinar hacia los valles fluviales.",
  "ocean-drive-hotel-rooftop-pool":
    "Azotea de hotel art déco que suele cotejarse con los planos de neón de los tráilers.",
  "leonida-keys-smuggler-cove":
    "Cala escondida entre islotes de manglar — geografía clásica del contrabando.",
  "port-gellhorn-fish-market":
    "Puestos del mercado de pescado y muelles de hielo del frente marítimo obrero.",
  "grassrivers-boardwalk-trail":
    "Pasarela de madera elevada entre hierba de sierra y canales poco profundos.",
};

const BY_LOCALE: Record<string, Record<string, string>> = { fr: FR, es: ES };

function fromTemplate(
  description: string,
  templates: DescriptionTemplates,
): string | undefined {
  const gtadb = GTADB_RE.exec(description);
  if (gtadb) return templates.gtadb(gtadb[1], gtadb[2]);

  const district = DISTRICT_RE.exec(description);
  if (district) return templates.district(district[1], district[2]);

  const scenic = SCENIC_RE.exec(description);
  if (scenic) return templates.scenic(scenic[1]);

  return undefined;
}

/** Localized POI description; falls back to the English source string. */
export function getLocationDescription(
  location: LocationCopyFields,
  locale: string,
): string {
  const override = BY_LOCALE[locale]?.[location.slug];
  if (override) return override;

  const templates = TEMPLATES[locale];
  if (!templates) return location.description;

  return fromTemplate(location.description, templates) ?? location.description;
}
