<template>
    <v-dialog v-model="dialogData.show" width="600px">
        <v-card>
            <v-alert v-model="dialogData.show" border="start" variant="flat" closable close-label="Close Alert"
                :color="dialogData.type == 'error' ? 'red-darken-4' : 'teal-darken-3'"
                :icon="dialogData.type == 'error' ? 'mdi-alert-circle' : 'mdi-check-circle'" prominent>
                <v-alert-title>Системное сообщение</v-alert-title>
                {{ dialogData.message }}
            </v-alert>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { computed } from "vue";
import { useNoticeDialogStore } from "@/store/NoticeDialogStore";

export default defineComponent({
    name: "NoticeDialog",

    setup() {
        const noticeDialogStore = useNoticeDialogStore();
        const dialogData = computed(() => {
            return noticeDialogStore.noticeDialog
        })
        return {
            dialogData
        }
    }
})
</script>