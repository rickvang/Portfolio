import type { HarnessState, Project } from "@/lib/fixtures";

type ProjectListProps = {
  projects: Project[];
  state?: HarnessState;
};

export function ProjectList({ projects, state = "success" }: ProjectListProps) {
  if (state === "loading") {
    return (
      <div className="state-card" aria-busy="true" aria-label="Loading projects">
        <span className="spinner" aria-hidden="true" />
        <p>Loading projects…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="state-card state-card-error" role="alert">
        <p className="state-card-title">Projects could not load.</p>
        <p>Use the retry path once a real data adapter is connected.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="state-card">
        <p className="state-card-title">No projects yet.</p>
        <p>Add the first approved project to the content source.</p>
      </div>
    );
  }

  return (
    <div className="project-grid" aria-label="Projects">
      {projects.map((project) => (
        <article className="project-card" key={project.id}>
          <div className="project-card-meta">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </article>
      ))}
    </div>
  );
}
