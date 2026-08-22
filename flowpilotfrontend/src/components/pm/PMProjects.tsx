import React, { useEffect, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

interface BackendProject {
  id: number;
  projectCode: string;
  projectName: string;
  sprint: string;
  team: string;
  budget: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
}

interface Project {
  backendId: number;
  id: string;
  name: string;
  status: string;
  statusColor: "green" | "yellow" | "red";
  sprint: string;
  team: string;
  budget: string;
  startDate: string;
  endDate: string;
  progress: number;
}

/* =========================================================
   API
========================================================= */

const API_URL = "http://localhost:8080/api/pm/projects";

/* =========================================================
   AUTH TOKEN
========================================================= */

function getAuthToken(): string | null {
  const keys = [
    "token",
    "accessToken",
    "jwtToken",
    "authToken",
  ];

  for (const key of keys) {
    const localToken = localStorage.getItem(key);

    if (localToken) {
      return localToken;
    }

    const sessionToken = sessionStorage.getItem(key);

    if (sessionToken) {
      return sessionToken;
    }
  }

  return null;
}

/* =========================================================
   STATUS STYLES
========================================================= */

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

/* =========================================================
   STATUS COLOR
========================================================= */

function getStatusColor(
  status: string
): Project["statusColor"] {
  if (status === "At Risk") {
    return "yellow";
  }

  if (status === "Delayed") {
    return "red";
  }

  return "green";
}

/* =========================================================
   CONVERT BACKEND PROJECT -> FRONTEND PROJECT
========================================================= */

function mapBackendProject(
  project: BackendProject
): Project {
  return {
    backendId: project.id,
    id: project.projectCode,
    name: project.projectName,
    status: project.status,
    statusColor: getStatusColor(project.status),
    sprint: project.sprint,
    team: project.team,
    budget: project.budget,
    startDate: project.startDate,
    endDate: project.endDate,
    progress: project.progress ?? 0,
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export function PMProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     FORM DATA
  ======================================================= */

  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    sprint: "Sprint 1",
    team: "",
    budget: "",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    status: "On Track",
    progress: "0",
  });

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Authentication token not found. Please log in again."
        );
      }

      const response = await fetch(API_URL, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Access denied (403). Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load projects (${response.status})`
        );
      }

      const data: BackendProject[] =
        await response.json();

      const mappedProjects =
        data.map(mapBackendProject);

      setProjects(mappedProjects);
    } catch (err) {
      console.error(
        "Error loading projects:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD WHEN PAGE OPENS
  ======================================================= */

  useEffect(() => {
    loadProjects();
  }, []);

  /* =======================================================
     OPEN ADD / EDIT MODAL
  ======================================================= */

  const handleOpenModal = (
    project?: Project
  ) => {
    setError("");

    if (project) {
      setEditingId(project.backendId);

      setFormData({
        projectCode: project.id,
        projectName: project.name,
        sprint: project.sprint,
        team: project.team,
        budget: project.budget,
        startDate:
          project.startDate ||
          "2026-01-01",
        endDate:
          project.endDate ||
          "2026-06-30",
        status: project.status,
        progress: String(
          project.progress
        ),
      });
    } else {
      setEditingId(null);

      const nextNumber =
        projects.length + 1;

      setFormData({
        projectCode: `PRJ-${String(
          nextNumber
        ).padStart(3, "0")}`,

        projectName: "",

        sprint: "Sprint 1",

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

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingId(null);
    setError("");
  };

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     ADD / UPDATE PROJECT
  ======================================================= */

  const handleSaveProject = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    /* -------------------------------
       VALIDATION
    -------------------------------- */

    if (
      !formData.projectCode.trim()
    ) {
      setError(
        "Project Code is required."
      );
      return;
    }

    if (
      !formData.projectName.trim()
    ) {
      setError(
        "Project Name is required."
      );
      return;
    }

    if (!formData.team.trim()) {
      setError(
        "Team is required."
      );
      return;
    }

    if (!formData.budget.trim()) {
      setError(
        "Budget is required."
      );
      return;
    }

    if (!formData.startDate) {
      setError(
        "Start Date is required."
      );
      return;
    }

    if (!formData.endDate) {
      setError(
        "End Date is required."
      );
      return;
    }

    /* -------------------------------
       TOKEN
    -------------------------------- */

    const token = getAuthToken();

    if (!token) {
      setError(
        "Authentication token not found. Please log in again."
      );
      return;
    }

    /* -------------------------------
       BACKEND OBJECT
    -------------------------------- */

    const projectData = {
      projectCode:
        formData.projectCode.trim(),

      projectName:
        formData.projectName.trim(),

      sprint:
        formData.sprint,

      team:
        formData.team.trim(),

      budget:
        formData.budget.trim(),

      startDate:
        formData.startDate,

      endDate:
        formData.endDate,

      status:
        formData.status,

      progress:
        Math.min(
          100,
          Math.max(
            0,
            Number(formData.progress) || 0
          )
        ),
    };

    try {
      setSaving(true);

      let response: Response;

      /* =================================================
         UPDATE
      ================================================= */

      if (editingId !== null) {
        response = await fetch(
          `${API_URL}/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              projectData
            ),
          }
        );
      }

      /* =================================================
         CREATE
      ================================================= */

      else {
        response = await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              projectData
            ),
          }
        );
      }

      /* =================================================
         AUTH ERROR
      ================================================= */

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        throw new Error(
          "Access denied (403). Please log in again."
        );
      }

      /* =================================================
         OTHER ERROR
      ================================================= */

      if (!response.ok) {
        const errorText =
          await response.text();

        throw new Error(
          errorText ||
            `Request failed (${response.status})`
        );
      }

      /* =================================================
         SUCCESS
      ================================================= */

      await loadProjects();

      setShowModal(false);
      setEditingId(null);

      setFormData({
        projectCode: "",
        projectName: "",
        sprint: "Sprint 1",
        team: "",
        budget: "",
        startDate: "2026-01-01",
        endDate: "2026-06-30",
        status: "On Track",
        progress: "0",
      });
    } catch (err) {
      console.error(
        "Error saving project:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     DELETE PROJECT
  ======================================================= */

  const handleDeleteProject =
    async () => {
      if (editingId === null) {
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this project?"
        );

      if (!confirmed) {
        return;
      }

      const token = getAuthToken();

      if (!token) {
        setError(
          "Authentication token not found. Please log in again."
        );
        return;
      }

      try {
        setSaving(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/${editingId}`,
            {
              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          throw new Error(
            "Access denied (403). Please log in again."
          );
        }

        if (!response.ok) {
          throw new Error(
            `Failed to delete project (${response.status})`
          );
        }

        await loadProjects();

        setShowModal(false);
        setEditingId(null);
      } catch (err) {
        console.error(
          "Error deleting project:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to delete project"
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* ERROR */}

      {error && (
        <div
          className="
            rounded-lg
            border border-red-200
            bg-red-50
            px-4 py-3
            text-sm font-medium
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* ADD PROJECT BUTTON */}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            handleOpenModal()
          }
          className="
            rounded-lg
            bg-red-400
            px-3 py-2
            text-sm font-bold
            text-white
            shadow-sm
            transition
            hover:bg-red-600
            active:scale-95
          "
        >
          + Add Project
        </button>
      </div>

      {/* LOADING */}

      {loading && (
        <div
          className="
            rounded-2xl
            border border-slate-100
            bg-white
            p-10
            text-center
            text-sm
            text-slate-400
          "
        >
          Loading projects...
        </div>
      )}

      {/* NO PROJECTS */}

      {!loading &&
        projects.length === 0 && (
          <div
            className="
              rounded-2xl
              border border-slate-100
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >
            <p className="text-sm text-slate-400">
              No projects found.
            </p>

            <p className="mt-1 text-xs text-slate-300">
              Click "Add Project" to
              create a new project.
            </p>
          </div>
        )}

      {/* PROJECT GRID */}

      {!loading &&
        projects.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              lg:gap-6
            "
          >
            {projects.map(
              (project) => (
                <ProjectCard
                  key={project.backendId}
                  project={project}
                  onEdit={() =>
                    handleOpenModal(
                      project
                    )
                  }
                />
              )
            )}
          </div>
        )}

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center
            justify-center
            bg-slate-900/40
            p-4
          "
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              handleCloseModal();
            }
          }}
        >
          <div
            className="
              max-h-[95vh]
              w-full
              max-w-[500px]
              overflow-y-auto
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-start
                justify-between
                px-7 pt-7
              "
            >
              <div>
                <h2
                  className="
                    text-[23px]
                    font-bold
                    text-slate-800
                  "
                >
                  {editingId !== null
                    ? "Edit Project"
                    : "Add New Project"}
                </h2>
              </div>

              <button
                type="button"
                onClick={
                  handleCloseModal
                }
                disabled={saving}
                className="
                  text-2xl
                  font-light
                  leading-none
                  text-slate-400
                  transition
                  hover:text-slate-700
                  disabled:opacity-50
                "
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSaveProject
              }
            >
              <div
                className="
                  px-7
                  pb-1
                  pt-6
                "
              >

                {/* PROJECT CODE + NAME */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <FormField label="Project Code">
                    <input
                      name="projectCode"
                      value={
                        formData.projectCode
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="PRJ-006"
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Project Name">
                    <input
                      name="projectName"
                      value={
                        formData.projectName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Project name"
                      className="form-input"
                    />
                  </FormField>
                </div>

                {/* SPRINT + TEAM */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <FormField label="Sprint">
                    <select
                      name="sprint"
                      value={
                        formData.sprint
                      }
                      onChange={
                        handleChange
                      }
                      className="
                        form-input
                        cursor-pointer
                      "
                    >
                      {Array.from(
                        {
                          length: 12,
                        },
                        (_, i) => (
                          <option
                            key={i}
                            value={`Sprint ${
                              i + 1
                            }`}
                          >
                            Sprint{" "}
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </FormField>

                  <FormField label="Team">
                    <input
                      name="team"
                      value={
                        formData.team
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. 12 members"
                      className="form-input"
                    />
                  </FormField>
                </div>

                {/* BUDGET + START DATE */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <FormField label="Budget">
                    <input
                      name="budget"
                      value={
                        formData.budget
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. ₹24L / ₹40L"
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Start Date">
                    <input
                      type="date"
                      name="startDate"
                      value={
                        formData.startDate
                      }
                      onChange={
                        handleChange
                      }
                      className="form-input"
                    />
                  </FormField>
                </div>

                {/* END DATE + STATUS */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <FormField label="End Date">
                    <input
                      type="date"
                      name="endDate"
                      value={
                        formData.endDate
                      }
                      onChange={
                        handleChange
                      }
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Status">
                    <select
                      name="status"
                      value={
                        formData.status
                      }
                      onChange={
                        handleChange
                      }
                      className="
                        form-input
                        cursor-pointer
                      "
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
                      value={
                        formData.progress
                      }
                      onChange={
                        handleChange
                      }
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  px-7
                  py-6
                "
              >

                {/* DELETE */}

                {editingId !== null ? (
                  <button
                    type="button"
                    onClick={
                      handleDeleteProject
                    }
                    disabled={saving}
                    className="
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-5 py-3
                      text-sm
                      font-bold
                      text-red-500
                      transition
                      hover:bg-red-100
                      disabled:opacity-50
                    "
                  >
                    Delete Project
                  </button>
                ) : (
                  <div />
                )}

                {/* ACTIONS */}

                <div
                  className="
                    flex
                    gap-3
                  "
                >
                  <button
                    type="button"
                    onClick={
                      handleCloseModal
                    }
                    disabled={saving}
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-5 py-3
                      text-sm
                      font-bold
                      text-slate-500
                      transition
                      hover:bg-slate-50
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      rounded-xl
                      bg-red-500
                      px-5 py-3
                      text-sm
                      font-bold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-red-600
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
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

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-sm
          font-bold
          text-slate-500
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: () => void;
}) {
  const style =
    statusStyles[
      project.statusColor
    ];

  return (
    <article
      className={`
        rounded-2xl
        border
        ${style.border}
        bg-white
        p-5
        shadow-sm
        transition
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        sm:p-6
      `}
    >

      {/* TOP */}

      <div
        className="
          flex
          flex-wrap
          items-start
          justify-between
          gap-2
        "
      >
        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              text-xs
              font-medium
              tracking-wide
              text-slate-400
            "
          >
            {project.id}
          </p>

          <h3
            className="
              mt-1
              truncate
              text-lg
              font-bold
              text-slate-800
              sm:text-xl
            "
          >
            {project.name}
          </h3>
        </div>

        {/* STATUS + EDIT */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className={`
              shrink-0
              rounded-lg
              border
              px-3 py-1.5
              text-xs
              font-bold
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
              border
              border-slate-200
              px-3 py-1.5
              text-xs
              font-bold
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

      <div
        className="
          mt-1
          grid
          grid-cols-2
          gap-x-2
          gap-y-1
          sm:grid-cols-3
        "
      >
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

        <div
          className="
            mb-1
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-sm
              text-slate-400
            "
          >
            Overall Progress
          </span>

          <span
            className={`
              text-sm
              font-bold
              ${style.percentage}
            `}
          >
            {project.progress}%
          </span>
        </div>

        <div
          className="
            h-2
            w-full
            overflow-hidden
            rounded-full
            bg-slate-200
          "
        >
          <div
            className={`
              h-full
              rounded-full
              ${style.bar}
              transition-all
              duration-500
            `}
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  0,
                  project.progress
                )
              )}%`,
            }}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-xl
        px-2 py-2
        sm:px-3.5
      "
    >
      <p
        className="
          mt-2
          text-xs
          font-normal
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          truncate
          text-sm
          font-bold
          text-slate-700
        "
      >
        {value}
      </p>
    </div>
  );
}