export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("authToken").value;
  if (!token) {
    return navigateTo("/login");
  }
});
