import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoticeDialogStore = defineStore('noticeDialogStore', () => {
    const noticeDialog = ref({
        show: false,
        type: 'notice',
        message: '',
    })

    const onOpenNoticeDialog = (type, msg) => {
        noticeDialog.value.show = true;
        noticeDialog.value.type = type;
        noticeDialog.value.message = msg;
    }

    return {
        noticeDialog,
        onOpenNoticeDialog,
    }
})