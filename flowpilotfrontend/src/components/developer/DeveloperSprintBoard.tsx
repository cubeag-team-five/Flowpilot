import React, { useEffect, useState } from "react";

interface SprintCard {
  databaseId: number;
  id: string;
  title: string;
  member: string;
  assigneeName?: string;
  points: number;
  status?: string;
  isMyTask?: boolean;
  completed?: boolean;
}

interface SprintColumn {
  title: string;
  count: number;
  cards: SprintCard[];
}

interface SprintBoardResponse {
  projectId?: number;
  sprintName?: string;
  columns: SprintColumn[];
}

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:8080"
}/api/developer/sprint-board`;

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken")
  );
};

const DeveloperSprintBoard: React.FC = () => {
  const [columns, setColumns] = useState<SprintColumn[]>([]);
  const [sprintName, setSprintName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSprintBoard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      /*
       * Optional:
       * If you store these values in localStorage,
       * they will be sent to the backend.
       */
      const projectId = localStorage.getItem("projectId");
      const developerName = localStorage.getItem("developerName");

      const params = new URLSearchParams();

      if (projectId) {
        params.append("projectId", projectId);
      }

      if (developerName) {
        params.append("developerName", developerName);
      }

      const queryString = params.toString();

      const response = await fetch(
        `${API_URL}${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          headers: {
            ...(token
              ? { Authorization: `Bearer ${token}` }
              : {}),
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "Session expired. Please log in again."
          );
        }

        throw new Error(
          `Failed to load sprint board (${response.status})`
        );
      }

      const data: SprintBoardResponse = await response.json();

      setSprintName(data.sprintName || "Current Sprint");

      /*
       * Backend se columns array nahi aaya
       * to empty array set karo.
       */
      setColumns(
        Array.isArray(data.columns)
          ? data.columns
          : []
      );

    } catch (error) {
      console.error(
        "Error loading sprint board:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load sprint board."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSprintBoard();
  }, []);

  /*
   * Loading UI
   */
  if (loading) {
    return (
      <div className="w-full">
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400">
          Loading sprint board...
        </div>
      </div>
    );
  }

  /*
   * Error UI
   */
  if (error) {
    return (
      <div className="w-full">
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchSprintBoard}
            className="mt-4 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Info Banner */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-teal-100 bg-teal-50/70 px-4 py-2.5 text-sm text-gray-400">
        <span>
          💡 Your tasks are highlighted. Other tasks shown for visibility.
        </span>

        {sprintName && (
          <span className="font-semibold text-teal-600">
            {sprintName}
          </span>
        )}
      </div>

      {/* Board */}
      <div className="overflow-x-auto pb-3">
        <div className="grid min-w-[1080px] grid-cols-5 gap-1">

          {columns.map((column) => (
            <div
              key={column.title}
              className="min-h-[380px] rounded-2xl border border-gray-100 bg-white/60 p-2.5"
            >

              {/* Column Header */}
              <div className="px-2 py-5">
                <h3
                  className={`text-sm font-semibold ${
                    column.title === "In Progress"
                      ? "text-orange-500"
                      : column.title === "Code Review"
                      ? "text-violet-400"
                      : column.title === "Testing"
                      ? "text-teal-400"
                      : column.title === "Done"
                      ? "text-emerald-500"
                      : "text-slate-500"
                  }`}
                >
                  {column.title} ({column.count})
                </h3>
              </div>

              {/* Cards */}
              <div className="space-y-1">

                {column.cards.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center text-xs text-gray-400">
                    No tasks
                  </div>
                )}

                {column.cards.map((card) => {
                  const highlighted =
                    card.isMyTask === true;

                  const completed =
                    card.completed === true;

                  return (
                    <div
                      key={card.databaseId ?? card.id}
                      className={`rounded-xl border bg-white p-2 transition-all duration-100 hover:-translate-y-[1px] hover:shadow-md ${
                        highlighted
                          ? completed
                            ? "border-emerald-300"
                            : "border-orange-300"
                          : "border-gray-100"
                      }`}
                    >

                      {/* My Task Label */}
                      {highlighted && (
                        <div className="mb-1 text-[10px] font-semibold tracking-wide text-teal-400">
                          MY TASK
                        </div>
                      )}

                      {/* Task Code */}
                      <div className="font-mono text-[11px] text-gray-500">
                        {card.id}
                      </div>

                      {/* Task Title */}
                      <div
                        className={`mt-1 pr-5 text-xs ${
                          highlighted
                            ? "font-semibold text-gray-900"
                            : "font-normal text-gray-400"
                        }`}
                      >
                        {card.title}
                      </div>

                      {/* Bottom Information */}
                      <div className="mt-2 flex items-center justify-between">

                        {/* Developer Initials */}
                        <span
                          className={`text-[10px] ${
                            highlighted
                              ? "text-gray-400"
                              : "text-gray-300"
                          }`}
                          title={card.assigneeName || ""}
                        >
                          {card.member || "Unassigned"}
                        </span>

                        {/* Story Points */}
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                            highlighted
                              ? "bg-gray-50 text-gray-700"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {card.points ?? 0}p
                        </span>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* No Board Data */}
      {columns.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
          No sprint board data found.
        </div>
      )}
    </div>
  );
};

export { DeveloperSprintBoard };
export default DeveloperSprintBoard;