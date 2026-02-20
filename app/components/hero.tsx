import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, LayoutDashboardIcon, LayoutTemplateIcon } from "lucide-react";
import { BackgroundPattern } from "@/components/background-pattern";
import { Link } from "react-router";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-5xl">
        <Badge variant="secondary" className="rounded-full py-1 border-border">
          Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-bold tracking-tight">
          Learning Management System
        </h1>
        <p className="mt-6 md:text-lg text-foreground/80">
          Aplikasi Pembelajaran Bidang Digitalisasi PLN 2
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base" asChild>
            <Link to="/auth/login">
              Mulai Belajar <ArrowUpRight className="h-5! w-5!" />
            </Link>
          </Button>
          <Button size="lg" className="rounded-full text-base" asChild>
            <Link to="/dashboard">
              Dashboard <LayoutDashboardIcon className="h-5! w-5!" />
            </Link>
          </Button>
          {/* <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="h-5! w-5!" /> Watch Demo
          </Button> */}
        </div>
      </div>
    </div>
  );
}
