<template>
    <v-container>
        <v-card>
            <v-card-text class="text-center">
                <div class="text-grey text-h1 mb-8">
                    ;(
                </div>
                <div class="text-h5">
                    Ошибка 404
                </div>
                <div class="font-weight-medium">
                    Страница не найдена
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "PageNotFound",
})

</script>