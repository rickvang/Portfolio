import type { ImportedContent } from "@/lib/imported-content";

type ProfileStatsProps = {
  stats: ImportedContent["profile"]["stats"];
};

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <dl aria-label="Experience summary" className="profile-stats">
      {stats.map((stat) => (
        <div className="profile-stat" key={stat.label}>
          <dd>{stat.value}</dd>
          <dt>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
