import { $, $$ } from "./dom";

/** Menu « trois lignes » pour tablette et téléphone. */
export function initMobileMenu(): void {
  const burger = $<HTMLButtonElement>("[data-burger]");
  const menu = $<HTMLElement>("[data-mobile-menu]");
  if (!burger || !menu) return;

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("menu-open", open);
  };

  burger.addEventListener("click", () => setOpen(menu.hidden));
  // Un lien choisi ferme le menu.
  $$<HTMLAnchorElement>("a", menu).forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) { setOpen(false); burger.focus(); }
  });
  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (!menu.hidden && !menu.contains(target) && !burger.contains(target)) setOpen(false);
  });
  // Repasse en mode ordinateur : on referme.
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
}

/** Marque le lien de section actif, dans le menu principal et le menu mobile. */
export function setActiveSection(id: string): void {
  $$<HTMLAnchorElement>(".main-nav .nav-link, .mobile-menu__link").forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
