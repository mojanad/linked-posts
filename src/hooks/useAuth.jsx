export const useAuth = () => {
  window.addEventListener("storage", () => {
    if (!localStorage.getItem("token")) {
      return false;
    } else {
      return true;
    }
  });
  return !!localStorage.getItem("token");
};
