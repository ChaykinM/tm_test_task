<template>
    <v-card color="grey-darken-1" :class="['d-flex', 'flex-column', 'ma-4', selectedClass]" height="400" :width="width" @click="toggleHandler">
        <v-img :src="`./assets/${product.cover}`" height="80%" class="align-end" cover>
            <v-card-title class="text-white">
                {{ product.name }}
            </v-card-title>
        </v-img>
        <v-chip class="ma-2 align-self-end" text-color="white" prepend-icon="mdi-star-shooting-outline">
            Цена: {{ product.price }}
        </v-chip>
    </v-card>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "ProductSelectItem",
    props: {
        product: {
            type: Object,
            required: true,
        },
        selectedClass: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            required: true,
        },
        toggleHandler: {
            type: Function,
            required: true
        }
    },
})
</script>