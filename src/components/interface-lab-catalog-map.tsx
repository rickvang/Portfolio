type InterfaceLabCatalogMapProps = {
  compact?: boolean;
};

const catalogGroups = [
  { name: "Foundations", detail: "Visual rules" },
  { name: "Layout", detail: "Structure" },
  { name: "Components", detail: "Controls" },
  { name: "Modules", detail: "Compositions" },
  { name: "Patterns", detail: "Workflows" },
] as const;

// Source-backed taxonomy diagram, not a screenshot or an embedded Storybook instance.
export function InterfaceLabCatalogMap({ compact = false }: InterfaceLabCatalogMapProps) {
  return (
    <div
      className={compact ? "lab-catalog-map lab-catalog-map-compact" : "lab-catalog-map"}
      role="img"
      aria-label="Illustrative map of the Storybook catalog: Foundations, Layout, Components, Modules, and Patterns."
    >
      <div className="lab-map-rail" aria-hidden="true">
        <span className="lab-map-mark">UI / LAB</span>
        <span className="lab-map-rail-label">Storybook</span>
        <span className="lab-map-rail-line" />
        <span className="lab-map-rail-caption">CATALOG</span>
        <span className="lab-map-rail-caption">PROTOTYPES</span>
      </div>
      <div className="lab-map-content" aria-hidden="true">
        <div className="lab-map-header">
          <span>Interface catalog</span>
          <span className="lab-map-status">DESIGN SYSTEM / WORKING REFERENCE</span>
        </div>
        <div className="lab-map-groups">
          {catalogGroups.map((group, index) => (
            <div className="lab-map-group" key={group.name}>
              <span className="lab-map-group-number">0{index + 1}</span>
              <div>
                <strong>{group.name}</strong>
                <small>{group.detail}</small>
              </div>
              <span className="lab-map-group-dot" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
