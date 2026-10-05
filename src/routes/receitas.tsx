import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/receitas")({
  component: RecipesLayout,
});

function RecipesLayout() {
  return <Outlet />;
}
