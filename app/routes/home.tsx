import type { Route } from "./+types/home";
import Hero from "@/components/hero";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Learning Management System" },
    { name: "description", content: "Welcome to Learning Management System!" },
  ];
}

export default function Home() {
  return <Hero />;
}
