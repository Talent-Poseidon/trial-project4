// components/admin/project-table.tsx

import { useEffect, useState } from "react";
import { Button, TextInput, Table } from "@mantine/core";
import { fetchProjects } from "@/lib/admin/actions";

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TextInput
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          size="sm"
          className="sm:w-64"
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
