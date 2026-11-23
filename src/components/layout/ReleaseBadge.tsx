import { useTranslations } from "next-intl";

export function ReleaseBadge() {
  const t = useTranslations("countdown");
  return (
    <span className="rounded-full bg-pink-500/20 px-2.5 py-0.5 text-xs font-semibold text-accent">
      {t("outNow")}
    </span>
  );
}
