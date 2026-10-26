import type { WorkItem } from "@/content/types";
import { clients } from "./clients";
import { platforms } from "./platforms";
import { projects } from "./projects";

export const workItems: WorkItem[] = [
  ...platforms.map((item) => ({ ...item, category: "Platform" as const })),
  ...clients.map((item) => ({ ...item, category: "Client" as const })),
  ...projects.map((item) => ({ ...item, category: "Independent" as const })),
];
