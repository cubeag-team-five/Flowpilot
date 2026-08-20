import React, { useState } from "react";

interface Project {
  id: string;
  name: string;
  status: string;
  statusColor: "green" | "yellow" | "red";
  sprint: string;
  team: string;
  budget: string;
  progress: number;
}

const initialProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "IPMT Platform v2",
    status: "On Track",
    statusColor: "green",
    sprint: "Sprint 12",
    team: "12 members",
    budget: "₹24L / ₹40L",
    progress: 72,
  },
  {
    id: "PRJ-002",
    name: "E-Commerce Relaunch",
    status: "At Risk",
    statusColor: "yellow",
    sprint: "Sprint 8",
    team: "8 members",
    budget: "₹18L / ₹35L",
    progress: 45,
  },
  {
    id: "PRJ-003",
    name: "Mobile App Development",
    status: "On Track",
    statusColor: "green",
    sprint: "Sprint 2",
    team: "6 members",
    budget: "₹8L / ₹50L",
    progress: 22,
  },
  {
    id: "PRJ-004",
    name: "API Gateway Migration",
    status: "Delayed",
    statusColor: "red",
    sprint: "Sprint 5",
    team: "5 members",
    budget: "₹12L / ₹18L",
    progress: 58,
  },
];

const statusStyles = {
  green: {
    badge: "border-green-200 bg-green-50 text-green-500",
    bar: "bg-green-400",
    percentage: "text-green-500",
    border: "border-green-100",
  },
  yellow: {
    badge: "border-orange-200 bg-orange-50 text-orange-500",
    bar: "bg-orange-400",
    percentage: "text-orange-500",
    border: "border-orange-100",
  },
  red: {
    badge: "border-red-200 bg-red-50 text-red-500",
    bar: "bg-red-400",
    percentage: "text-red-500",
    border: "border-red-100",
  },
} as const;

export function PMProjects() {
  const [projects, setProjects] =
    useState<Project[]>(initialProjects);

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    activeSprint: "Sprint 1",
    team: "",
    budget: "",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    status: "On Track",
    progress: "0",
  });

  /* OPEN ADD / EDIT MODAL */

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);

      setFormData({
        projectCode: project.id,
        projectName: project.name,
        activeSprint: project.sprint,
        team: project.team,
        budget: project.budget,
        startDate: "2026-01-01",
        endDate: "2026-06-30",
        status: project.status,
        progress: String(project.progress),
      });
    } else {
      setEditingId(null);

      setFormData({
        projectCode: `PRJ-${String(
          projects.length + 1
        ).padStart(3, "0")}`,
        projectName: "",
        activeSprint: "Sprint 1",
        team: "",
        budget: "",
        startDate: "2026-01-01",
        endDate: "2026-06-30",
        status: "On Track",
        progress: "0",
      });
    }

    setShowModal(true);
  };

  /* CLOSE MODAL */

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  /* INPUT CHANGE */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ADD / EDIT PROJECT */

  const handleSaveProject = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !formData.projectCode.trim() ||
      !formData.projectName.trim() ||
      !formData.team.trim() ||
      !formData.budget.trim()
    ) {
      return;
    }

    const statusColor: Project["statusColor"] =
      formData.status === "At Risk"
        ? "yellow"
        : formData.status === "Delayed"
        ? "red"
        : "green";

    const newProject: Project = {
      id: formData.projectCode,
      name: formData.projectName,
      status: formData.status,
      statusColor,
      sprint: formData.activeSprint,
      team: formData.team,
      budget: formData.budget,
      progress: Number(formData.progress) || 0,
    };

    if (editingId) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingId
            ? newProject
            : project
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        newProject,
      ]);
    }

    handleCloseModal();
  };

  /* DELETE PROJECT */

  const handleDeleteProject = () => {
    if (!editingId) return;

    setProjects((prev) =>
      prev.filter(
        (project) => project.id !== editingId
      )
    );

    handleCloseModal();
  };

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* ADD PROJECT BUTTON */}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="
            rounded-lg bg-red-400
            px-3 py-2
            text-sm font-bold text-white
            shadow-sm transition
            hover:bg-red-600
            active:scale-95
          "
        >
          + Add Project
        </button>
      </div>

      {/* PROJECT GRID */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() =>
              handleOpenModal(project)
            }
          />
        ))}
      </div>

      {/* MODAL */}

      {showModal && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-slate-900/40 p-4
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div
            className="
              w-full max-w-[500px]
              overflow-hidden rounded-2xl
              bg-white shadow-2xl
            "
          >

            {/* HEADER */}

            <div className="flex items-start justify-between px-7 pt-7">

              <h2 className="text-[23px] font-bold text-slate-800">
                {editingId
                  ? "Edit Project"
                  : "Add New Project"}
              </h2>

              <button
                type="button"
                onClick={handleCloseModal}
                className="
                  text-2xl font-light
                  leading-none text-slate-400
                  transition hover:text-slate-700
                "
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form onSubmit={handleSaveProject}>

              <div className="px-7 pb-1 pt-6">

                {/* PROJECT CODE + NAME */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <FormField label="Project Code">
                    <input
                      name="projectCode"
                      value={formData.projectCode}
                      onChange={handleChange}
                      placeholder="PRJ-006"
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Project Name">
                    <input
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="Project name"
                      className="form-input"
                    />
                  </FormField>

                </div>

                {/* SPRINT + TEAM */}

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <FormField label="Sprint">
                    <select
                      name="activeSprint"
                      value={formData.activeSprint}
                      onChange={handleChange}
                      className="form-input cursor-pointer"
                    >
                      {Array.from(
                        { length: 12 },
                        (_, i) => (
                          <option key={i}>
                            Sprint {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </FormField>

                  <FormField label="Team">
                    <input
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      placeholder="e.g. 12 members"
                      className="form-input"
                    />
                  </FormField>

                </div>

                {/* BUDGET + START DATE */}

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <FormField label="Budget">
                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. ₹24L / ₹40L"
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Start Date">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </FormField>

                </div>

                {/* END DATE + STATUS */}

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <FormField label="End Date">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Status">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-input cursor-pointer"
                    >
                      <option value="On Track">
                        On Track
                      </option>

                      <option value="At Risk">
                        At Risk
                      </option>

                      <option value="Delayed">
                        Delayed
                      </option>
                    </select>
                  </FormField>

                </div>

                {/* PROGRESS */}

                <div className="mt-4">
                  <FormField label="Progress %">
                    <input
                      type="number"
                      name="progress"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </FormField>
                </div>

              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-between px-7 py-6">

                {/* DELETE */}

                {editingId ? (
                  <button
                    type="button"
                    onClick={handleDeleteProject}
                    className="
                      rounded-xl
                      border border-red-200
                      bg-red-50
                      px-5 py-3
                      text-sm font-bold
                      text-red-500
                      transition
                      hover:bg-red-100
                    "
                  >
                    Delete Project
                  </button>
                ) : (
                  <div />
                )}

                {/* ACTIONS */}

                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="
                      rounded-xl
                      border border-slate-200
                      bg-white
                      px-5 py-3
                      text-sm font-bold
                      text-slate-500
                      transition
                      hover:bg-slate-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      rounded-xl
                      bg-red-500
                      px-5 py-3
                      text-sm font-bold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-red-600
                      active:scale-95
                    "
                  >
                    {editingId
                      ? "Save Changes"
                      : "Add Project"}
                  </button>

                </div>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}


/* FORM FIELD */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
}


/* PROJECT CARD */

function ProjectCard({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: () => void;
}) {
  const style = statusStyles[project.statusColor];

  return (
    <article
      className={`
        rounded-2xl border ${style.border}
        bg-white p-5 shadow-sm
        transition duration-200
        hover:-translate-y-0.5 hover:shadow-md
        sm:p-6
      `}
    >

      {/* TOP */}

      <div className="flex flex-wrap items-start justify-between gap-0">

        <div className="min-w-0 flex-1">

          <p className="text-xs font-medium tracking-wide text-slate-400">
            {project.id}
          </p>

          <h3 className="mt-1 truncate text-lg font-bold text-slate-800 sm:text-xl">
            {project.name}
          </h3>

        </div>

        {/* STATUS + EDIT */}

        <div className="flex items-center gap-2">

          <span
            className={`
              shrink-0 rounded-lg border
              px-3 py-1.5 text-xs font-bold
              ${style.badge}
            `}
          >
            {project.status}
          </span>

          <button
            type="button"
            onClick={onEdit}
            className="
              rounded-lg
              border border-slate-200
              px-3 py-1.5
              text-xs font-bold
              text-slate-500
              transition
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-500
            "
          >
            Edit
          </button>

        </div>
      </div>

      {/* DETAILS */}

      <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3">

        <InfoBox
          label="Sprint"
          value={project.sprint}
        />

        <InfoBox
          label="Team"
          value={project.team}
        />

        <InfoBox
          label="Budget"
          value={project.budget}
        />

      </div>

      {/* PROGRESS */}

      <div className="mt-4">

        <div className="mb-1 flex items-center justify-between">

          <span className="text-sm text-slate-400">
            Overall Progress
          </span>

          <span
            className={`text-sm font-bold ${style.percentage}`}
          >
            {project.progress}%
          </span>

        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">

          <div
            className={`
              h-full rounded-full
              ${style.bar}
              transition-all duration-500
            `}
            style={{
              width: `${project.progress}%`,
            }}
          />

        </div>
      </div>
    </article>
  );
}


/* INFO BOX */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl px-2 py-2 sm:px-3.5">

      <p className="mt-2 text-xs font-normal text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-bold text-slate-700">
        {value}
      </p>

    </div>
  );
}