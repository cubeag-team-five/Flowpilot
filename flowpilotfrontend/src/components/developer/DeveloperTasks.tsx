import React, { useEffect, useMemo, useState } from "react";

type TaskStatus = "To Do" | "In Progress" | "Done";
type TaskPriority = "High" | "Medium";

interface Task {
  id: number;
  taskId: string;
  priority: TaskPriority;
  title: string;
  details: string;
  status: TaskStatus;
  storyPoints: number;
  projectId: number | null;
  projectName: string;
}

const filterOptions = ["All", "To Do", "In Progress", "Done"] as const;

const DeveloperTasks: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeFilter, setActiveFilter] =
    useState<(typeof filterOptions)[number]>("All");


  /*
   * ==========================================
   * FETCH REAL TASKS FROM BACKEND
   * ==========================================
   */
  const fetchTasks = async () => {

    try {

      setLoading(true);
      setError("");

      /*
       * Change "token" if your project uses
       * another localStorage key.
       */
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/developer/tasks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (!response.ok) {

        throw new Error(
          `Failed to fetch tasks. Status: ${response.status}`
        );
      }

      const data: Task[] = await response.json();

      setTasks(data);

    } catch (err) {

      console.error("Failed to fetch tasks:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch tasks."
      );

    } finally {

      setLoading(false);
    }
  };


  /*
   * FETCH WHEN COMPONENT LOADS
   */
  useEffect(() => {

    fetchTasks();

  }, []);


  /*
   * OPTIONAL REAL-TIME REFRESH
   *
   * Every 10 seconds database se latest
   * data fetch hoga.
   */
  useEffect(() => {

    const interval = setInterval(() => {

      fetchTasks();

    }, 10000);

    return () => clearInterval(interval);

  }, []);


  /*
   * FILTER TASKS
   */
  const filteredTasks = useMemo(() => {

    if (activeFilter === "All") {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === activeFilter
    );

  }, [tasks, activeFilter]);


  return (
    <div className="w-full">

      {/* Filter Tabs */}
      <div className="mb-5 flex flex-wrap items-center gap-2">

        {filterOptions.map((filter) => {

          const active = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border-teal-100 bg-teal-50 text-teal-700 shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-teal-200 hover:bg-teal-50"
              }`}
            >
              {filter}
            </button>
          );
        })}

      </div>


      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">
          Loading real tasks...
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-500">

          {error}

          <button
            type="button"
            onClick={fetchTasks}
            className="ml-3 rounded-lg border border-red-200 bg-white px-3 py-1 text-xs font-semibold"
          >
            Retry
          </button>

        </div>
      )}


      {/* Task List */}
      {!loading && !error && (
        <div className="space-y-3">

          {filteredTasks.map((task) => (

            <div
              key={task.id}
              className="group rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-[0_3px_15px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md"
            >

              <div className="flex items-start gap-3">

                {/* Left Icon */}
                <div
                  className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:flex ${
                    task.status === "Done"
                      ? "bg-emerald-50"
                      : task.status === "To Do"
                      ? "bg-gray-50"
                      : "bg-orange-50"
                  }`}
                >

                  {task.status === "Done" ? (
                    <span className="text-lg text-emerald-500">✓</span>
                  ) : task.status === "To Do" ? (
                    <span className="text-lg text-orange-500">▤</span>
                  ) : (
                    <span className="text-lg text-orange-500">ϟ</span>
                  )}

                </div>


                {/* Main Content */}
                <div className="min-w-0 flex-1">

                  <div className="mb-1 flex flex-wrap items-center gap-2">

                    {/* REAL TASK CODE */}
                    <span className="font-mono text-xs text-gray-400">
                      {task.taskId}
                    </span>

                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        task.priority === "High"
                          ? "bg-red-50 text-red-500"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      {task.priority}
                    </span>

                  </div>


                  {/* REAL TASK TITLE */}
                  <h3 className="text-[14px] font-bold text-gray-900 sm:text-[16px]">
                    {task.title}
                  </h3>


                  {/* REAL PROJECT + DETAILS */}
                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    {task.details}
                  </p>

                </div>


                {/* Right Content */}
                <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-5">

                  {/* REAL STATUS */}
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                      task.status === "In Progress"
                        ? "border border-orange-100 bg-orange-50 text-orange-500"
                        : task.status === "Done"
                        ? "border border-emerald-100 bg-emerald-50 text-emerald-500"
                        : "border border-gray-100 bg-gray-50 text-slate-400"
                    }`}
                  >
                    {task.status}
                  </span>


                  {/* REAL STORY POINTS */}
                  <span className="text-xs font-semibold text-teal-400 sm:text-sm">
                    {task.storyPoints} SP
                  </span>

                </div>

              </div>

            </div>
          ))}


          {filteredTasks.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-400">
              No tasks assigned to you.
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export { DeveloperTasks };
export default DeveloperTasks;