/**
 * API access for the Scrum Master section.
 *
 * Teammates repeat the base URL and auth header in every component; keeping
 * them here means the five Scrum Master pages stay consistent and there is one
 * place to change when the API moves off localhost.
 */

const BASE_URL = 'http://localhost:8080/api/scrummaster';

const authHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

/** Reads the backend's message so the UI can show why something failed. */
const readError = async (response: Response, fallback: string): Promise<string> => {
  try {
    const body = await response.json();
    return body?.message || fallback;
  } catch {
    return fallback;
  }
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, { ...init, headers: authHeaders() });
  } catch {
    throw new Error('Cannot reach the server. Is the backend running on port 8080?');
  }

  if (!response.ok) {
    throw new Error(await readError(response, `Request failed (${response.status})`));
  }

  return response.json() as Promise<T>;
};

// ============================================
// TYPES — mirror the backend DTOs
// ============================================

export type TaskStatus =
  | 'BACKLOG'
  | 'TODO'
  | 'IN_PROGRESS'
  | 'CODE_REVIEW'
  | 'TESTING'
  | 'DONE';

export interface Member {
  id: number;
  name: string | null;
  email: string;
  role: string;
  initials: string;
}

export type SprintStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

export interface Sprint {
  id: number;
  sprintNumber: number;
  name: string;
  goal: string | null;
  startDate: string | null;
  endDate: string | null;
  status: SprintStatus;
  committedPoints: number | null;
  taskCount: number;
  totalPoints: number;
}

export interface CompleteResult {
  completedSprintId: number;
  completedPoints: number;
  carriedTaskCount: number;
  carriedToSprintId: number | null;
}

export interface BoardCard {
  id: number;
  taskKey: string;
  title: string;
  assigneeName: string | null;
  assigneeInitials: string;
  storyPoints: number;
  status: TaskStatus;
  daysInColumn: number;
}

export interface BoardColumn {
  status: TaskStatus;
  label: string;
  taskCount: number;
  totalPoints: number;
  cards: BoardCard[];
}

export interface BoardResponse {
  sprintId: number;
  sprintName: string;
  totalTasks: number;
  totalPoints: number;
  columns: BoardColumn[];
}

export interface Ceremony {
  name: string;
  when: string;
  tone: string;
}

export interface DashboardResponse {
  sprintId: number;
  sprintNumber: number;
  sprintName: string;
  goal: string;
  status: string;
  daysRemaining: number;
  totalDays: number;
  tasksDone: number;
  tasksTotal: number;
  percentComplete: number;
  pointsDone: number;
  pointsTotal: number;
  committedPoints: number | null;
  blockerCount: number;
  ceremonies: Ceremony[];
}

// ============================================
// CALLS
// ============================================

export const fetchDashboard = () => request<DashboardResponse>('/dashboard');

export const fetchBoard = () => request<BoardResponse>('/board');

export const moveTask = (taskId: number, status: TaskStatus) =>
  request<BoardCard>(`/board/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });

// ============================================
// SPRINT LIFECYCLE
// ============================================

export const fetchSprints = () => request<Sprint[]>('/sprints');

export const createSprint = (body: {
  name: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
}) => request<Sprint>('/sprints', { method: 'POST', body: JSON.stringify(body) });

export const startSprint = (sprintId: number) =>
  request<Sprint>(`/sprints/${sprintId}/start`, { method: 'POST' });

export const completeSprint = (sprintId: number, carryTo?: number) =>
  request<CompleteResult>(
    `/sprints/${sprintId}/complete${carryTo ? `?carryTo=${carryTo}` : ''}`,
    { method: 'POST' }
  );

export const deleteSprint = (sprintId: number) =>
  request<{ success: boolean }>(`/sprints/${sprintId}`, { method: 'DELETE' });

// ============================================
// TASKS
// ============================================

export const fetchMembers = () => request<Member[]>('/tasks/members');

export const createTask = (body: {
  title: string;
  storyPoints?: number;
  assigneeId?: number | null;
  sprintId?: number | null;
  status?: TaskStatus;
}) => request<BoardCard>('/tasks', { method: 'POST', body: JSON.stringify(body) });

export const updateTask = (
  taskId: number,
  body: {
    title?: string;
    storyPoints?: number;
    assigneeId?: number;
    unassign?: boolean;
    sprintId?: number;
    status?: TaskStatus;
  }
) => request<BoardCard>(`/tasks/${taskId}`, {
  method: 'PATCH',
  body: JSON.stringify(body)
});

export const deleteTask = (taskId: number) =>
  request<{ success: boolean }>(`/tasks/${taskId}`, { method: 'DELETE' });
