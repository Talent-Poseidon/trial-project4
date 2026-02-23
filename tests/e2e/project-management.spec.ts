// tests/e2e/project-management.spec.ts

import { test, expect } from '@playwright/test';

const projectData = {
  name: 'New Project',
  startDate: '2023-10-01',
  endDate: '2023-12-31',
};

const apiUrl = '/api/projects';

// Helper function to create a project via API
async function createProject(page, data) {
  await page.request.post(apiUrl, {
    data,
  });
}

test.describe('Project Management API', () => {
  test('should fetch the list of projects', async ({ request }) => {
    const response = await request.get(apiUrl);
    expect(response.ok()).toBeTruthy();
    const projects = await response.json();
    expect(Array.isArray(projects)).toBeTruthy();
  });

  test('should create a new project', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: projectData,
    });
    expect(response.ok()).toBeTruthy();
    const project = await response.json();
    expect(project.name).toBe(projectData.name);
  });

  test('should handle missing fields error', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: { name: 'Incomplete Project' },
    });
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toBe('Missing required fields');
  });

  test('should return unauthorized for unauthenticated requests', async ({ request }) => {
    // Simulate an unauthenticated request by not providing session cookies
    const response = await request.get(apiUrl, {
      headers: {
        'Authorization': '', // No auth header
      },
    });
    expect(response.status()).toBe(401);
    const error = await response.json();
    expect(error.message).toBe('Unauthorized');
  });
});
