type User = {
  username: string;
  email: string;
};

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<User | null>(null);
  function setUser(user: User) {
    userInfo.value = user;
  }
  function clearUser() {
    userInfo.value = null;
  }
  return { userInfo, setUser, clearUser };
});
