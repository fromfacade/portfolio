import type { ComponentType } from "react";
import type { Project, ProjectDemoType } from "@/data/projects";
import GlucoRelayDemo from "./demos/GlucoRelayDemo";
import PcBuilderDemo from "./demos/PcBuilderDemo";
import SpritzDemo from "./demos/SpritzDemo";
import ProductivityDemo from "./demos/ProductivityDemo";
import TaskFlowDemo from "./demos/TaskFlowDemo";

const DEMO_COMPONENTS: Record<ProjectDemoType, ComponentType> = {
  glucorelay: GlucoRelayDemo,
  "pc-builder": PcBuilderDemo,
  spritz: SpritzDemo,
  productivity: ProductivityDemo,
  taskflow: TaskFlowDemo,
};

export default function ProjectDemo({ project }: { project: Project }) {
  if (!project.demoType) {
    return null;
  }

  const DemoComponent = DEMO_COMPONENTS[project.demoType];

  if (!DemoComponent) {
    return null;
  }

  return <DemoComponent />;
}
