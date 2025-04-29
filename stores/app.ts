export const useAppStore = defineStore("app", () => {
    const modalVisible = ref(false);
    const setModalVisible = (visible: boolean) => {
        modalVisible.value = visible;
    }
    return { modalVisible, setModalVisible };
});
