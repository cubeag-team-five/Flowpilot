import React, { useState, useEffect } from 'react';
import { FiClock, FiPlus, FiEdit2, FiX, FiFolder } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS, type StatusKey } from './scrumUI';

interface BoardTask {
  id?: number;
  taskCode: string;
  title: string;
  who: string;
  assigneeName?: string;
  points: number;
  columnStatus?: string;
  ageDays?: number;
  isStuck?: boolean;
}

interface BoardColumn {
  name: string;
  tone: StatusKey;
  taskCount?: number;
  pointsCount?: number;
  tasks: BoardTask[];
}

interface PMProject {
  id: number;
  projectName?: string;
  projectCode?: string;
  name?: string;
  code?: string;
  status?: string;
}

const STUCK_AFTER_DAYS = 3;

export const ScrumBoard: React.FC = () => {
  const [projects, setProjects] = useState<PMProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [sprintName, setSprintName] = useState<string>('Sprint 12');
  const [sprintGoal, setSprintGoal] = useState<string>('Deliver Core Module API & Dashboard UI');
  const [columns, setColumns] = useState<BoardColumn[]>([
    { name: 'Backlog', tone: 'idle', tasks: [] },
    { name: 'To do', tone: 'idle', tasks: [] },
    { name: 'In progress', tone: 'active', tasks: [] },
    { name: 'Code review', tone: 'plan', tasks: [] },
    { name: 'Testing', tone: 'test', tasks: [] },
    { name: 'Done', tone: 'done', tasks: [] }
  ]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  // Modals
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<BoardTask | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    who: 'MK',
    assigneeName: 'Mihir Khatri',
    points: 3,
    columnStatus: 'Backlog'
  });

  const [showSprintModal, setShowSprintModal] = useState<boolean>(false);
  const [tempSprintName, setTempSprintName] = useState<string>('');
  const [tempSprintGoal, setTempSprintGoal] = useState<string>('');

  // Fetch Projects from PM endpoint
  useEffect(() => {
    fetch('http://localhost:8080/api/pm/projects')
      .then(res => res.json())
      .then((data: PMProject[]) => {
        if (Array.isArray(data)) {
          setProjects(data);
          if (data.length > 0 && selectedProjectId === null) {
            setSelectedProjectId(data[0].id);
          }
        }
      })
      .catch(err => console.error('Failed to fetch PM projects:', err));
  }, []);

  // Fetch Scrum Board Data
  const loadBoardData = (projectId: number | null) => {
    const url = projectId
      ? `http://localhost:8080/api/scrummaster/board?projectId=${projectId}`
      : 'http://localhost:8080/api/scrummaster/board';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.sprintName) setSprintName(data.sprintName);
          if (data.sprintGoal) setSprintGoal(data.sprintGoal);
          if (data.totalTasks !== undefined) setTotalTasks(data.totalTasks);
          if (data.totalPoints !== undefined) setTotalPoints(data.totalPoints);
          if (data.columns && Array.isArray(data.columns)) {
            setColumns(data.columns);
          }
        }
      })
      .catch(err => console.error('Failed to fetch scrum board:', err));
  };

  useEffect(() => {
    loadBoardData(selectedProjectId);
  }, [selectedProjectId]);

  const handleOpenCreateTask = () => {
    setEditingTask(null);
    setTaskForm({
      title: '',
      who: 'SR',
      assigneeName: 'Sneha Rao',
      points: 3,
      columnStatus: 'Backlog'
    });
    setShowTaskModal(true);
  };

  const handleOpenEditTask = (task: BoardTask) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      who: task.who || 'MK',
      assigneeName: task.assigneeName || 'Mihir Khatri',
      points: task.points || 3,
      columnStatus: task.columnStatus || 'Backlog'
    });
    setShowTaskModal(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && editingTask.id) {
      // PUT update
      fetch(`http://localhost:8080/api/scrummaster/board/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskForm,
          projectId: selectedProjectId
        })
      })
        .then(() => {
          setShowTaskModal(false);
          loadBoardData(selectedProjectId);
        })
        .catch(err => console.error('Failed to update task:', err));
    } else {
      // POST create
      fetch('http://localhost:8080/api/scrummaster/board/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskForm,
          projectId: selectedProjectId
        })
      })
        .then(() => {
          setShowTaskModal(false);
          loadBoardData(selectedProjectId);
        })
        .catch(err => console.error('Failed to create task:', err));
    }
  };

  const handleOpenSprintModal = () => {
    setTempSprintName(sprintName);
    setTempSprintGoal(sprintGoal);
    setShowSprintModal(true);
  };

  const handleSaveSprint = (e: React.FormEvent) => {
    e.preventDefault();
    setSprintName(tempSprintName);
    setSprintGoal(tempSprintGoal);
    setShowSprintModal(false);
  };

  // HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, task: BoardTask) => {
    if (!task.id) return;
    e.dataTransfer.setData('taskId', String(task.id));
    e.dataTransfer.setData('sourceColumn', task.columnStatus || '');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnName: string) => {
    e.preventDefault();
    const taskIdStr = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (!taskIdStr || sourceColumn === targetColumnName) return;

    const taskId = Number(taskIdStr);

    // Optimistic UI update
    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.name === sourceColumn) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        }
        if (col.name === targetColumnName) {
          const movedTask = columns
            .flatMap((c) => c.tasks)
            .find((t) => t.id === taskId);
          if (movedTask) {
            const updatedTask = { ...movedTask, columnStatus: targetColumnName, ageDays: 0 };
            return { ...col, tasks: [...col.tasks, updatedTask] };
          }
        }
        return col;
      })
    );

    // Call backend API to persist task movement
    fetch(`http://localhost:8080/api/scrummaster/board/tasks/${taskId}/move?targetColumn=${encodeURIComponent(targetColumnName)}`, {
      method: 'PATCH'
    })
      .then(() => loadBoardData(selectedProjectId))
      .catch((err) => {
        console.error('Failed to move task:', err);
        loadBoardData(selectedProjectId);
      });
  };

  return (
    <div>
      {/* Top Header Controls: Project Selector & Sprint Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <FiFolder className="text-emerald-600" size={20} />
          <div>
            <label htmlFor="project-select" className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
              PM Project
            </label>
            <select
              id="project-select"
              value={selectedProjectId || ''}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="mt-0.5 block w-56 rounded-lg border border-slate-300 bg-white py-1.5 px-2.5 text-sm font-medium text-slate-800 shadow-xs focus:border-emerald-500 focus:outline-none"
            >
              {projects.length === 0 ? (
                <option value="">Default Project</option>
              ) : (
                projects.map((p) => {
                  const name = p.projectName || p.name || `Project #${p.id}`;
                  const code = p.projectCode || p.code || 'PRJ';
                  return (
                    <option key={p.id} value={p.id}>
                      {name} ({code})
                    </option>
                  );
                })
              )}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenSprintModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <FiEdit2 size={14} /> Adjust Sprint
          </button>
          <button
            type="button"
            onClick={handleOpenCreateTask}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <FiPlus size={16} /> Assign / New Task
          </button>
        </div>
      </div>

      {/* Board Subheader */}
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div>
          <h2 className={`${TYPE.title} text-slate-900`}>{sprintName} Board</h2>
          <p className="text-xs text-slate-500 mt-0.5">Goal: {sprintGoal}</p>
        </div>
        <span className={`${TYPE.meta} text-slate-500 tabular-nums`}>
          {totalTasks} tasks · {totalPoints} points
        </span>
      </div>

      {/* Kanban Columns */}
      <div
        className="flex items-start gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1
          lg:grid lg:grid-cols-6 lg:items-stretch lg:overflow-x-visible lg:mx-0 lg:px-0 lg:pb-0"
      >
        {columns.map((col) => {
          const colPoints = col.tasks.reduce((n, t) => n + (t.points || 0), 0);

          return (
            <section
              key={col.name}
              aria-label={col.name}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.name)}
              className="snap-start shrink-0 w-[78vw] sm:w-[280px] lg:w-auto
                bg-slate-50/80 border border-slate-200/70 rounded-2xl p-3 min-h-[320px] transition-colors hover:border-emerald-300/60"
            >
              <header className="flex items-center gap-2 mb-3 px-0.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS[col.tone].rail}`} aria-hidden="true" />
                <h3 className={`${TYPE.eyebrow} ${STATUS[col.tone].text} truncate`}>{col.name}</h3>
                <span className={`${TYPE.meta} text-slate-400 tabular-nums ml-auto shrink-0`}>
                  {col.tasks.length} · {colPoints}p
                </span>
              </header>

              <ul className="space-y-2 min-h-[260px]">
                {col.tasks.map((task) => {
                  const stuck = task.isStuck || (task.ageDays ?? 0) >= STUCK_AFTER_DAYS;

                  return (
                    <li key={task.id || task.taskCode}>
                      <article
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onClick={() => handleOpenEditTask(task)}
                        className={`${SURFACE.card} ${SURFACE.padTight} relative overflow-hidden
                          hover:border-emerald-400 hover:shadow-md active:opacity-60 transition-all cursor-grab active:cursor-grabbing`}
                      >
                        {stuck && (
                          <span className="absolute inset-y-0 left-0 w-[3px] bg-rose-500" aria-hidden="true" />
                        )}

                        <div className="flex items-center justify-between gap-2">
                          <span className={`${TYPE.code} text-slate-400`}>{task.taskCode}</span>
                          <span className={`${TYPE.meta} font-semibold text-slate-500 tabular-nums`}>
                            {task.points}p
                          </span>
                        </div>

                        <h4 className={`${TYPE.body} font-medium text-slate-900 leading-snug mt-1.5`}>
                          {task.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-3">
                          <span
                            className={`w-6 h-6 rounded-full shrink-0 grid place-items-center
                              ${TYPE.code} font-semibold bg-emerald-100 text-emerald-700`}
                            title={task.assigneeName || task.who}
                          >
                            {task.who}
                          </span>

                          {task.ageDays !== undefined && (
                            <span
                              className={`${TYPE.meta} inline-flex items-center gap-1 ml-auto font-medium
                                ${stuck ? STATUS.blocked.text : 'text-slate-400'}`}
                            >
                              <FiClock size={11} aria-hidden="true" />
                              {task.ageDays}d
                              {stuck && <span className="sr-only"> — stuck in this column</span>}
                            </span>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Task Assign / Create / Edit Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTask ? `Edit Task (${editingTask.taskCode})` : 'Assign New Task'}
              </h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                  placeholder="Enter task title"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Assignee Initials</label>
                  <input
                    type="text"
                    required
                    value={taskForm.who}
                    onChange={e => setTaskForm({ ...taskForm, who: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                    placeholder="e.g. MK, SR, KD"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Story Points</label>
                  <input
                    type="number"
                    min="1"
                    max="21"
                    required
                    value={taskForm.points}
                    onChange={e => setTaskForm({ ...taskForm, points: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Column Status</label>
                <select
                  value={taskForm.columnStatus}
                  onChange={e => setTaskForm({ ...taskForm, columnStatus: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Backlog">Backlog</option>
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Code review">Code review</option>
                  <option value="Testing">Testing</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Sprint Modal */}
      {showSprintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Adjust Sprint Settings</h3>
              <button
                onClick={() => setShowSprintModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSprint} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sprint Name</label>
                <input
                  type="text"
                  required
                  value={tempSprintName}
                  onChange={e => setTempSprintName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sprint Goal</label>
                <textarea
                  rows={3}
                  required
                  value={tempSprintGoal}
                  onChange={e => setTempSprintGoal(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSprintModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-xs"
                >
                  Save Sprint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

