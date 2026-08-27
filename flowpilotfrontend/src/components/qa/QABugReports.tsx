import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

type BugReport = {
  id?: number;
  bugId: string;
  title: string;
  projectId?: number;
  linkedTaskId: string;
  environment: string;
  severity: string;
  assignedTo: string;
  createdBy?: string;
  stepsToReproduce: string;
  status?: string;
  createdAt?: string;
  filedDate?: string;
};

type BugForm = {
  bugId: string;
  bugTitle: string;
  projectId: string;
  linkedTaskId: string;
  environment: string;
  severity: string;
  assignedTo: string;
  stepsToReproduce: string;
};

type Project = {
  id: number;
  projectCode: string;
  projectName: string;
  teamMemberIds?: Array<number | string>;
};

type Member = {
  employeeId: number | string;
  name: string;
  email: string;
  role: string;
  department: string;
  designation: string;
  status: string;
  lastLogin: string;
  initials: string;
};

type StoredUser = {
  id?: string | number;
  userId?: string | number;
  employeeId?: string | number;
  name?: string;
  fullName?: string;
  username?: string;
  email?: string;
};

const BUG_API_URL =
  "http://localhost:8080/api/qa/bugs";

const PROJECT_API_URL =
  "http://localhost:8080/api/pm/projects";

const SUPERADMIN_USERS_URL =
  "http://localhost:8080/api/superadmin/users";

const emptyForm: BugForm = {
  bugId: "",
  bugTitle: "",
  projectId: "",
  linkedTaskId: "",
  environment: "Dev",
  severity: "Medium",
  assignedTo: "",
  stepsToReproduce: "",
};

/* =========================================================
   GET CURRENT USER
========================================================= */

const getCurrentUser =
  (): StoredUser | null => {

    const keys = [
      "currentUser",
      "user",
      "auth",
      "userData",
      "loggedInUser",
    ];

    for (const key of keys) {

      const value =
        localStorage.getItem(key) ||
        sessionStorage.getItem(key);

      if (!value) {
        continue;
      }

      try {

        const parsed =
          JSON.parse(value);

        const user =
          parsed?.user ??
          parsed?.data?.user ??
          parsed?.data ??
          parsed;

        if (
          user?.id ||
          user?.userId ||
          user?.employeeId ||
          user?.name ||
          user?.fullName ||
          user?.username ||
          user?.email
        ) {
          return user;
        }

      } catch {
        // Continue.
      }
    }

    const fallback: StoredUser = {
      id:
        localStorage.getItem(
          "userId"
        ) ||
        localStorage.getItem(
          "id"
        ) ||
        undefined,

      userId:
        localStorage.getItem(
          "userId"
        ) ||
        undefined,

      employeeId:
        localStorage.getItem(
          "employeeId"
        ) ||
        undefined,

      name:
        localStorage.getItem(
          "name"
        ) ||
        localStorage.getItem(
          "fullName"
        ) ||
        localStorage.getItem(
          "username"
        ) ||
        undefined,

      fullName:
        localStorage.getItem(
          "fullName"
        ) ||
        undefined,

      username:
        localStorage.getItem(
          "username"
        ) ||
        undefined,

      email:
        localStorage.getItem(
          "email"
        ) ||
        undefined,
    };

    const hasUser =
      Object.values(
        fallback
      ).some(
        (value) =>
          value !== undefined &&
          value !== null &&
          String(value).trim() !== ""
      );

    return hasUser
      ? fallback
      : null;
  };

/* =========================================================
   CURRENT USER DISPLAY NAME
========================================================= */

const getUserName = (
  user: StoredUser | null
): string => {

  if (!user) {
    return "";
  }

  return (
    user.name ||
    user.fullName ||
    user.username ||
    user.email ||
    ""
  ).trim();
};

/* =========================================================
   TOKEN
========================================================= */

const getToken = () => {

  const keys = [
    "token",
    "accessToken",
    "jwtToken",
    "authToken",
    "jwt",
    "access_token",
  ];

  for (const key of keys) {

    const localToken =
      localStorage.getItem(key);

    if (localToken) {
      return localToken.replace(
        /^Bearer\s+/i,
        ""
      );
    }

    const sessionToken =
      sessionStorage.getItem(key);

    if (sessionToken) {
      return sessionToken.replace(
        /^Bearer\s+/i,
        ""
      );
    }
  }

  const objectKeys = [
    "currentUser",
    "user",
    "auth",
    "userData",
    "loggedInUser",
  ];

  for (const key of objectKeys) {

    const value =
      localStorage.getItem(key) ||
      sessionStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {

      const parsed =
        JSON.parse(value);

      const token =
        parsed?.token ||
        parsed?.jwt ||
        parsed?.accessToken ||
        parsed?.access_token ||
        parsed?.jwtToken ||
        parsed?.user?.token;

      if (token) {

        return String(token).replace(
          /^Bearer\s+/i,
          ""
        );
      }

    } catch {
      // Continue.
    }
  }

  return "";
};

/* =========================================================
   HEADERS
========================================================= */

const getHeaders = () => {

  const token =
    getToken();

  return {
    "Content-Type":
      "application/json",

    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
  };
};

/* =========================================================
   COMPONENT
========================================================= */

const QABugReports: React.FC = () => {

  const [bugs, setBugs] =
    useState<BugReport[]>([]);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [members, setMembers] =
    useState<Member[]>([]);

  const [memberSearch, setMemberSearch] =
    useState("");

  const [showMemberDropdown, setShowMemberDropdown] =
    useState(false);

  const [form, setForm] =
    useState<BugForm>(
      emptyForm
    );

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [loadingProjects, setLoadingProjects] =
    useState(false);

  const [loadingMembers, setLoadingMembers] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [globalSearch, setGlobalSearch] =
    useState("");

  const [currentUser, setCurrentUser] =
    useState<StoredUser | null>(
      null
    );

  /* =========================================================
     LOAD CURRENT USER
  ========================================================= */

  useEffect(() => {

    setCurrentUser(
      getCurrentUser()
    );

  }, []);

  /* =========================================================
     GLOBAL QA SEARCH
  ========================================================= */

  useEffect(() => {

    const handleGlobalSearch = (
      event: Event
    ) => {

      const customEvent =
        event as CustomEvent<string>;

      setGlobalSearch(
        customEvent.detail || ""
      );
    };

    window.addEventListener(
      "qa-global-search",
      handleGlobalSearch
    );

    return () => {

      window.removeEventListener(
        "qa-global-search",
        handleGlobalSearch
      );
    };

  }, []);

  /* =========================================================
     SUCCESS MESSAGE
  ========================================================= */

  useEffect(() => {

    if (!success) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          setSuccess("");
        },
        4000
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };

  }, [success]);

  /* =========================================================
     LOAD BUGS
  ========================================================= */

  const loadBugs = async () => {

    try {

      setLoading(true);
      setError("");

      const user =
        getCurrentUser();

      setCurrentUser(user);

      const createdBy =
        getUserName(user);

      /*
       * =====================================================
       * IMPORTANT
       *
       * Load bugs specifically created by the
       * currently logged-in QA user.
       * =====================================================
       */

      if (!createdBy) {

        setBugs([]);

        return;
      }

      const response =
        await fetch(
          `${BUG_API_URL}/by-creator?createdBy=${encodeURIComponent(
            createdBy
          )}`,
          {
            method: "GET",
            headers: getHeaders(),
          }
        );

      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
            `Failed to load bug reports (${response.status})`
        );
      }

      const result =
        await response.json();

      const data =
        Array.isArray(
          result
        )
          ? result
          : Array.isArray(
              result?.data
            )
          ? result.data
          : [];

      const sortedData =
        [...data].sort(
          (a, b) => {

            const dateA =
              new Date(
                a.createdAt ||
                  a.filedDate ||
                  0
              ).getTime();

            const dateB =
              new Date(
                b.createdAt ||
                  b.filedDate ||
                  0
              ).getTime();

            return dateB - dateA;
          }
        );

      setBugs(
        sortedData
      );

    } catch (err) {

      console.error(
        "Error loading bugs:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load bug reports"
      );

      setBugs([]);

    } finally {

      setLoading(false);
    }
  };

  /* =========================================================
     LOAD PROJECTS
  ========================================================= */

  const loadProjects = async () => {

    try {

      setLoadingProjects(
        true
      );

      const response =
        await fetch(
          PROJECT_API_URL,
          {
            method: "GET",
            headers: getHeaders(),
          }
        );

      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
            `Failed to load projects (${response.status})`
        );
      }

      const result =
        await response.json();

      const data =
        Array.isArray(
          result
        )
          ? result
          : Array.isArray(
              result?.data
            )
          ? result.data
          : [];

      setProjects(
        data
      );

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

      setLoadingProjects(
        false
      );
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    loadBugs();
    loadProjects();

  }, []);

  /* =========================================================
     LOAD PROJECT MEMBERS
  ========================================================= */

  const loadMembersForProject =
    async (
      project: Project
    ) => {

      try {

        setLoadingMembers(
          true
        );

        setError("");
        setMembers([]);

        const projectMemberIds =
          (
            project.teamMemberIds ||
            []
          )
            .map(
              (id) =>
                String(
                  id
                ).trim()
            )
            .filter(
              Boolean
            );

        if (
          projectMemberIds.length ===
          0
        ) {

          setMembers([]);

          return;
        }

        const token =
          getToken();

        if (!token) {

          throw new Error(
            "Authentication token not found. Please log in again."
          );
        }

        const response =
          await fetch(
            SUPERADMIN_USERS_URL,
            {
              method: "GET",
              headers: {
                "Content-Type":
                  "application/json",
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (
          response.status ===
            401 ||
          response.status ===
            403
        ) {

          throw new Error(
            "Access denied while loading PM members. Please log in again."
          );
        }

        if (!response.ok) {

          const errorText =
            await response.text();

          throw new Error(
            errorText ||
              `Failed to load PM members (${response.status})`
          );
        }

        const result =
          await response.json();

        const allMembers: Member[] =
          Array.isArray(
            result
          )
            ? result
            : Array.isArray(
                result?.data
              )
            ? result.data
            : Array.isArray(
                result?.users
              )
            ? result.users
            : [];

        const activeMembers =
          allMembers.filter(
            (member) =>
              member.status
                ?.toUpperCase() ===
              "ACTIVE"
          );

        const projectMembers =
          activeMembers.filter(
            (member) =>
              projectMemberIds.includes(
                String(
                  member.employeeId
                ).trim()
              )
          );

        const uniqueMembers =
          Array.from(
            new Map(
              projectMembers.map(
                (member) => [
                  String(
                    member.employeeId
                  ),
                  member,
                ]
              )
            ).values()
          );

        setMembers(
          uniqueMembers
        );

      } catch (err) {

        console.error(
          "Error loading PM project members:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load PM project members"
        );

        setMembers([]);

      } finally {

        setLoadingMembers(
          false
        );
      }
    };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {

    const {
      name,
      value,
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  /* =========================================================
     PROJECT CHANGE
  ========================================================= */

  const handleProjectChange =
    async (
      event: React.ChangeEvent<
        HTMLSelectElement
      >
    ) => {

      const projectId =
        event.target.value;

      setForm(
        (previous) => ({
          ...previous,
          projectId,
          assignedTo: "",
        })
      );

      setMemberSearch("");
      setShowMemberDropdown(false);
      setMembers([]);

      if (!projectId) {
        return;
      }

      const selectedProject =
        projects.find(
          (project) =>
            String(
              project.id
            ) ===
            String(
              projectId
            )
        );

      if (!selectedProject) {
        return;
      }

      await loadMembersForProject(
        selectedProject
      );
    };

  /* =========================================================
     MEMBER SEARCH
  ========================================================= */

  const filteredMembers =
    useMemo(() => {

      const search =
        memberSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return members;
      }

      return members.filter(
        (member) =>
          member.name
            ?.toLowerCase()
            .includes(search) ||
          String(
            member.employeeId
          )
            .toLowerCase()
            .includes(search) ||
          member.designation
            ?.toLowerCase()
            .includes(search) ||
          member.email
            ?.toLowerCase()
            .includes(search)
      );

    }, [
      members,
      memberSearch,
    ]);

  /* =========================================================
     SELECT MEMBER
  ========================================================= */

  const selectMember = (
    member: Member
  ) => {

    setForm(
      (previous) => ({
        ...previous,
        assignedTo:
          member.name,
      })
    );

    setMemberSearch(
      member.name
    );

    setShowMemberDropdown(
      false
    );
  };

  /* =========================================================
     OPEN FORM
  ========================================================= */

  const openForm = () => {

    setError("");
    setSuccess("");

    setForm({
      ...emptyForm,

      bugId:
        `BUG-${String(
          bugs.length + 1
        ).padStart(
          3,
          "0"
        )}`,
    });

    setMembers([]);
    setMemberSearch("");
    setShowMemberDropdown(false);
    setShowForm(true);
  };

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {

    setShowForm(false);
    setForm(emptyForm);
    setMembers([]);
    setMemberSearch("");
    setShowMemberDropdown(false);
    setError("");
  };

  /* =========================================================
     SUBMIT BUG
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.bugId.trim() ||
      !form.bugTitle.trim() ||
      !form.projectId ||
      !form.linkedTaskId.trim() ||
      !form.assignedTo.trim() ||
      !form.stepsToReproduce.trim()
    ) {

      setError(
        "Please fill all required fields."
      );

      return;
    }

    const user =
      getCurrentUser();

    const createdBy =
      getUserName(user);

    if (!createdBy) {

      setError(
        "Unable to identify the logged-in user. Please login again."
      );

      return;
    }

    try {

      setSaving(true);

      const response =
        await fetch(
          BUG_API_URL,
          {
            method: "POST",

            headers:
              getHeaders(),

            body:
              JSON.stringify({
                bugId:
                  form.bugId.trim(),

                title:
                  form.bugTitle.trim(),

                projectId:
                  Number(
                    form.projectId
                  ),

                linkedTaskId:
                  form.linkedTaskId.trim(),

                environment:
                  form.environment,

                severity:
                  form.severity,

                assignedTo:
                  form.assignedTo.trim(),

                /*
                 * IMPORTANT:
                 * Save the person who filed the bug.
                 */
                createdBy:
                  createdBy,

                stepsToReproduce:
                  form.stepsToReproduce.trim(),

                status:
                  "Open",
              }),
          }
        );

      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
            `Failed to save bug report (${response.status})`
        );
      }

      setSuccess(
        "Bug successfully added."
      );

      setShowForm(
        false
      );

      setForm(
        emptyForm
      );

      setMembers([]);
      setMemberSearch("");
      setShowMemberDropdown(false);

      await loadBugs();

    } catch (err) {

      console.error(
        "Error saving bug:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save bug report"
      );

    } finally {

      setSaving(false);
    }
  };

  /* =========================================================
     SEARCH BUGS
  ========================================================= */

  const filteredBugs =
    useMemo(() => {

      const search =
        globalSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return bugs;
      }

      return bugs.filter(
        (bug) => {

          const values = [
            bug.bugId,
            bug.title,
            bug.linkedTaskId,
            bug.environment,
            bug.severity,
            bug.assignedTo,
            bug.createdBy,
            bug.status,
            bug.stepsToReproduce,
          ];

          return values.some(
            (value) =>
              String(
                value ?? ""
              )
                .toLowerCase()
                .includes(search)
          );
        }
      );

    }, [
      bugs,
      globalSearch,
    ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const openCount =
    bugs.filter(
      (bug) =>
        (
          bug.status ||
          "Open"
        )
          .toLowerCase() ===
        "open"
    ).length;

  const fixedCount =
    bugs.filter(
      (bug) =>
        (
          bug.status ||
          ""
        )
          .toLowerCase() ===
        "fixed"
    ).length;

  const closedCount =
    bugs.filter(
      (bug) =>
        (
          bug.status ||
          ""
        )
          .toLowerCase() ===
        "closed"
    ).length;

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDateTime = (
    bug: BugReport
  ) => {

    const value =
      bug.createdAt ||
      bug.filedDate;

    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return date.toLocaleString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  /* =========================================================
     PROJECT NAME
  ========================================================= */

  const getProjectName = (
    projectId?: number
  ) => {

    if (!projectId) {
      return "—";
    }

    const project =
      projects.find(
        (item) =>
          item.id ===
          projectId
      );

    if (!project) {
      return `Project ${projectId}`;
    }

    return `${project.projectCode} - ${project.projectName}`;
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="w-full">

      {/* FILE BUG BUTTON */}

      <div className="flex justify-center mb-6">

        <button
          type="button"
          onClick={
            openForm
          }
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
        >
          + File Bug
        </button>

      </div>

      {/* SUCCESS */}

      {success && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">

          <div className="flex items-center gap-2">

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs">
              ✓
            </span>

            <span>
              {success}
            </span>

          </div>

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
            className="text-green-500 hover:text-green-700 text-lg leading-none"
          >
            ×
          </button>

        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* NEW BUG FORM */}

      {showForm && (
        <div className="mb-6 rounded-xl border border-red-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between mb-5">

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                New Bug Report
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Enter the details of the bug
              </p>

            </div>

            <button
              type="button"
              onClick={
                closeForm
              }
              className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
            >
              ×
            </button>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              <div>

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  BUG ID
                </label>

                <input
                  name="bugId"
                  value={
                    form.bugId
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="BUG-090"
                />

              </div>

              <div>

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  BUG TITLE
                </label>

                <input
                  name="bugTitle"
                  value={
                    form.bugTitle
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="Bug title"
                />

              </div>

              <div>

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  PROJECT
                </label>

                <select
                  name="projectId"
                  value={
                    form.projectId
                  }
                  onChange={
                    handleProjectChange
                  }
                  disabled={
                    loadingProjects
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 bg-white disabled:bg-slate-50"
                >

                  <option value="">
                    {loadingProjects
                      ? "Loading projects..."
                      : "Select Project"}
                  </option>

                  {projects.map(
                    (
                      project
                    ) => (
                      <option
                        key={
                          project.id
                        }
                        value={
                          project.id
                        }
                      >
                        {project.projectCode}{" "}
                        -{" "}
                        {project.projectName}
                      </option>
                    )
                  )}

                </select>

              </div>

              <div>

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  LINKED TASK ID
                </label>

                <input
                  name="linkedTaskId"
                  value={
                    form.linkedTaskId
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="T-044"
                />

              </div>

              <div>

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  ENVIRONMENT
                </label>

                <select
                  name="environment"
                  value={
                    form.environment
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 bg-white"
                >

                  <option value="Dev">
                    Dev
                  </option>

                  <option value="Staging">
                    Staging
                  </option>

                  <option value="Production">
                    Production
                  </option>

                </select>

              </div>

              <div>

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  SEVERITY
                </label>

                <select
                  name="severity"
                  value={
                    form.severity
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 bg-white"
                >

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Critical">
                    Critical
                  </option>

                </select>

              </div>

              <div className="relative">

                <label className="block mb-2 text-xs font-medium text-slate-600">
                  ASSIGN TO
                </label>

                <input
                  type="text"
                  value={
                    memberSearch
                  }
                  disabled={
                    !form.projectId
                  }
                  onChange={(
                    event
                  ) => {

                    setMemberSearch(
                      event.target.value
                    );

                    setForm(
                      (
                        previous
                      ) => ({
                        ...previous,
                        assignedTo:
                          "",
                      })
                    );

                    setShowMemberDropdown(
                      true
                    );
                  }}
                  onFocus={() => {

                    if (
                      form.projectId
                    ) {

                      setShowMemberDropdown(
                        true
                      );
                    }
                  }}
                  placeholder={
                    !form.projectId
                      ? "Select project first"
                      : loadingMembers
                      ? "Loading members..."
                      : "Search member..."
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 disabled:bg-slate-50"
                />

                {showMemberDropdown &&
                  form.projectId && (
                    <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">

                      {loadingMembers ? (
                        <div className="px-3 py-3 text-sm text-slate-400">
                          Loading members...
                        </div>
                      ) : filteredMembers.length ===
                        0 ? (
                        <div className="px-3 py-3 text-sm text-slate-400">
                          {members.length ===
                          0
                            ? "No PM members assigned to this project"
                            : "No matching members found"}
                        </div>
                      ) : (
                        filteredMembers.map(
                          (
                            member
                          ) => (
                            <button
                              type="button"
                              key={String(
                                member.employeeId
                              )}
                              onClick={() =>
                                selectMember(
                                  member
                                )
                              }
                              className="w-full px-3 py-2.5 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                            >

                              <div className="text-sm font-medium text-slate-700">
                                {
                                  member.name
                                }
                              </div>

                              <div className="text-xs text-slate-400">
                                {
                                  member.employeeId
                                }{" "}
                                ·{" "}
                                {
                                  member.designation
                                }
                              </div>

                            </button>
                          )
                        )
                      )}

                    </div>
                  )}

              </div>

            </div>

            <div className="mt-4">

              <label className="block mb-2 text-xs font-medium text-slate-600">
                STEPS TO REPRODUCE
              </label>

              <textarea
                name="stepsToReproduce"
                value={
                  form.stepsToReproduce
                }
                onChange={
                  handleChange
                }
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none resize-none focus:border-red-400"
                placeholder="Enter steps to reproduce the bug..."
              />

            </div>

            <div className="flex gap-2 mt-5">

              <button
                type="submit"
                disabled={
                  saving
                }
                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                {saving
                  ? "Saving..."
                  : "Submit Bug Report"}
              </button>

              <button
                type="button"
                onClick={
                  closeForm
                }
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-5 py-2.5 rounded-lg text-sm"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* COUNT ROW */}

      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">

        <span>
          {openCount} open ·{" "}
          {fixedCount} in fix ·{" "}
          {closedCount} closed
        </span>

        <button
          type="button"
          onClick={
            loadBugs
          }
          className="hover:text-slate-600"
        >
          Refresh
        </button>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">

        {loading ? (

          <div className="py-16 text-center text-sm text-slate-400">
            Loading bug reports...
          </div>

        ) : filteredBugs.length ===
          0 ? (

          <div className="py-16 text-center">

            <div className="text-slate-400 text-3xl mb-3">
              🐞
            </div>

            <p className="text-sm font-medium text-slate-700">
              {globalSearch
                ? "No matching bug reports found"
                : "No bug reports found"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {globalSearch
                ? `No bugs match "${globalSearch}"`
                : 'Click "File Bug" to create a new bug report.'}
            </p>

          </div>

        ) : (

          <table className="w-full min-w-[1100px] text-sm">

            <thead>

              <tr className="border-b border-slate-200">

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  BUG ID
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  TITLE
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  PROJECT
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  SEVERITY
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  STATUS
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  LINKED TASK
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  ASSIGNEE
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  ENVIRONMENT
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  CREATED
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBugs.map(
                (
                  bug,
                  index
                ) => {

                  const status =
                    bug.status ||
                    "Open";

                  return (

                    <tr
                      key={
                        bug.id ??
                        `${bug.bugId}-${index}`
                      }
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                    >

                      <td className="px-3 py-4 text-sm text-slate-600">
                        {
                          bug.bugId
                        }
                      </td>

                      <td className="px-3 py-4">

                        <div className="flex items-center gap-2">

                          <span className="text-emerald-500">
                            🐞
                          </span>

                          <span className="text-sm text-slate-700">
                            {
                              bug.title
                            }
                          </span>

                        </div>

                      </td>

                      <td className="px-3 py-4 text-sm text-slate-600">
                        {
                          getProjectName(
                            bug.projectId
                          )
                        }
                      </td>

                      <td className="px-3 py-4">

                        <span
                          className={`inline-flex rounded-md px-2 py-1 text-xs ${
                            bug.severity
                              ?.toLowerCase() ===
                            "critical"
                              ? "bg-red-50 text-red-500"
                              : bug.severity
                                  ?.toLowerCase() ===
                                "high"
                              ? "bg-red-50 text-red-500"
                              : bug.severity
                                  ?.toLowerCase() ===
                                "medium"
                              ? "bg-orange-50 text-orange-500"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {
                            bug.severity
                          }
                        </span>

                      </td>

                      <td className="px-3 py-4">

                        <span className="inline-flex rounded-md bg-red-50 px-2 py-1 text-xs text-red-500">
                          {
                            status
                          }
                        </span>

                      </td>

                      <td className="px-3 py-4 text-sm text-slate-600">
                        {
                          bug.linkedTaskId
                        }
                      </td>

                      <td className="px-3 py-4 text-sm text-slate-600">
                        {
                          bug.assignedTo
                        }
                      </td>

                      <td className="px-3 py-4 text-sm text-slate-600">
                        {
                          bug.environment
                        }
                      </td>

                      <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                        {
                          formatDateTime(
                            bug
                          )
                        }
                      </td>

                    </tr>

                  );
                }
              )}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default QABugReports;