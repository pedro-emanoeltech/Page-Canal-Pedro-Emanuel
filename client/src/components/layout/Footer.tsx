export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Pedro Emanuel. Todos os direitos reservados.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="hover:text-foreground transition-colors cursor-pointer">Termos</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Privacidade</span>
        </div>
      </div>
    </footer>
  );
}
