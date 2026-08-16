import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CS2_GTA6_MAP, getCs2SteamUrl } from "@/lib/cities-skylines";

type Props = {
  locale: string;
  locationName: string;
};

export async function Cs2ExploreBlock({ locale, locationName }: Props) {
  const t = await getTranslations("cs2");
  const steamUrl = getCs2SteamUrl(locale);

  return (
    <aside className="not-prose mb-10 rounded-xl border border-cyan-400/25 bg-cyan-500/5 p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-cyan-300">
        {t("badge")}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        {t("title", { name: locationName })}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        {t("body", { name: locationName, id: CS2_GTA6_MAP.mapId })}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-[#1b2838] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2a475e]"
        >
          {t("steamCta")}
        </a>
        <Link
          href="/guides/gta-6-map-cities-skylines-2"
          className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          {t("guideCta")}
        </Link>
      </div>
      <p className="mt-3 text-xs text-white/35">{t("disclaimer")}</p>
    </aside>
  );
}
