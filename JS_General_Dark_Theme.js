export function toggleTheme() {
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("tema");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark_mode");
    } else {
      document.documentElement.classList.remove("dark_mode");
    }
  });
}
