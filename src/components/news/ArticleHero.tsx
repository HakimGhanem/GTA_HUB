import Image from "next/image";

type Props = {
  title: string;
  src: string;
};

/** In-body 1200×630 hero — Discover needs a large image on the page, not only OG. */
export function ArticleHero({ title, src }: Props) {
  return (
    <figure className="mt-6">
      <Image
        src={src}
        alt={title}
        width={1200}
        height={630}
        sizes="(min-width: 768px) 736px, 100vw"
        loading="eager"
        fetchPriority="high"
        className="aspect-[1200/630] w-full rounded-xl border border-foreground/10 object-cover"
      />
    </figure>
  );
}
