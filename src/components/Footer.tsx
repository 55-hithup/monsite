export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(245,246,250,0.04)] py-12 mt-12 bg-[#0B0F1E]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/logo.png" alt="DevSupAi Logo" className="h-6 w-6 object-contain rounded-full border border-[rgba(245,246,250,0.08)]" />
            <span className="label-mono font-bold text-sm tracking-normal text-text-primary">
              devsup<span className="brand-gradient-text">ai</span>
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Des produits digitaux qui convertissent, pas juste qui existent.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-text-secondary">
          <a href="#" className="hover:text-text-primary transition-colors">mentions légales</a>
          <a href="#" className="hover:text-text-primary transition-colors">politique de confidentialité</a>
        </div>

        <div className="label-mono text-[10px] text-text-secondary">
          &copy; {currentYear} devsupai. all rights reserved.
        </div>
      </div>
    </footer>
  );
}
