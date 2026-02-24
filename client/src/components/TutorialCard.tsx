import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import type { Tutorial } from "@/data/tutorials";

interface TutorialCardProps {
  tutorial: Tutorial;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Link href={`/tutorial/${tutorial.slug}`}>
      <div className="group block bg-background border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-4">
          <Calendar className="w-4 h-4" />
          <span>{tutorial.date}</span>
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
          {tutorial.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2">
          {tutorial.description}
        </p>
        
        <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto">
          Ler tutorial
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
