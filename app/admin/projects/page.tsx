import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProjectTable } from "@/components/admin/project-table";
import { fetchProjects } from "@/lib/admin/actions";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");

  // Double check role from DB to be safe
  const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
  });

  if (!user || user.role !== "admin") redirect("/dashboard");

  // Fetch all projects
  const projects = await fetchProjects();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Project Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage projects. You can create new projects and manage existing ones.
        </p>
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
}
