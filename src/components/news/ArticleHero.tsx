type Props = {
  title: string;
  src: string;
};

/** In-body 1200×630 hero — Discover needs a large image on the page, not only OG. */
export function ArticleHero({ title, src }: Props) {
  return (
    <figure className="mt-6">
      <img
        src={src}
        alt={title}
        width={1200}
        height={630}
        className="aspect-[1200/630] w-full rounded-xl border border-white/10 object-cover"
      />
    </figure>
  );
}
