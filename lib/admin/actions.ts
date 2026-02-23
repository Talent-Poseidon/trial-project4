// lib/admin/actions.ts

export async function createProject(name: string, startDate: Date, endDate: Date) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, startDate, endDate }),
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return response.json();
}

export async function fetchProjects() {
  const response = await fetch('/api/projects', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}
