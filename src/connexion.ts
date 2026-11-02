import { $, $$, setYear } from "./lib/dom";
import { initAuthForms, resetFormView } from "./lib/auth-forms";
import { initMobileMenu } from "./lib/header";

type View = "connexion" | "inscription" | "mot-de-passe-oublie";

const TITLES: Record<View, string> = {
  "connexion": "Connexion — entreprenant.ga",
  "inscription": "Créer un compte — entreprenant.ga",
  "mot-de-passe-oublie": "Mot de passe oublié — entreprenant.ga",
};

function currentView(): View {
  const hash = window.location.hash.slice(1);
  return hash === "inscription" || hash === "mot-de-passe-oublie" ? hash : "connexion";
}

/** Affiche la vue correspondant à l’ancre de l’URL (#inscription, #mot-de-passe-oublie). */
function showView(focus: boolean): void {
  const view = currentView();
  $$<HTMLFormElement>("form[data-view]").forEach((form) => {
    const visible = form.dataset.view === view;
    if (visible && form.hidden) resetFormView(form);
    form.hidden = !visible;
  });
  document.title = TITLES[view];
  if (focus) $<HTMLInputElement>(`form[data-view="${view}"] input`)?.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMobileMenu();
  initAuthForms();
  showView(false);
  window.addEventListener("hashchange", () => {
    showView(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
