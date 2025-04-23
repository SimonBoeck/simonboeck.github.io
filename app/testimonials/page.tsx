import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Testimonials</h1>
      <div>
        {projects.map((project, index) => (
          <div className="w-full flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0  mb-10">
            <div className="mb-2">
              <h2 className="text-black dark:text-white">{project.name}</h2>
              <h3 className="text-black dark:text-white">{project.title} - {project.company}</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
