import { Link } from "@/i18n/navigation";

type Props = {
  name?: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  profileUrl?: string;
};

const DEFAULTS = {
  name: "Map-6 Editorial",
  role: "GTA 6 Coverage",
  bio: "Fan-run coverage of GTA 6 geography, preorders, and launch prep. Not affiliated with Rockstar Games or Take-Two.",
  avatarUrl: "/images/map6-editorial-avatar.png",
  profileUrl: "/about",
} as const;

export function AuthorBlock({
  name = DEFAULTS.name,
  role = DEFAULTS.role,
  bio = DEFAULTS.bio,
  avatarUrl = DEFAULTS.avatarUrl,
  profileUrl = DEFAULTS.profileUrl,
}: Props) {
  return (
    <aside className="mt-5 flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <img
        src={avatarUrl}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">
          <Link href={profileUrl} className="hover:text-pink-300">
            {name}
          </Link>
        </p>
        <p className="text-xs uppercase tracking-wider text-pink-300/80">
          {role}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/55">{bio}</p>
      </div>
    </aside>
  );
}
