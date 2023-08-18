<template>
    <v-app-bar color="primary" prominent>
        <v-toolbar-title>Витрина</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip text="Корзина покупок">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" stacked>
                    <v-badge :content="productsCount" color="success">
                        <v-icon>mdi-basket</v-icon>
                    </v-badge>
                    <ShoppingCartDialog />
                </v-btn>
            </template>
        </v-tooltip>
    </v-app-bar>
</template>

<script>
import { defineComponent } from "vue";
import { computed } from "vue";
import ShoppingCartDialog from "@/components/ShoppingCartDialog.vue";
import { useShoppingCartStore } from "@/store/ShoppingCartStore";
export default defineComponent({
    name: "HeaderBar",
    components: {
        ShoppingCartDialog,
    },
    setup() {
        const shoppingCartStore = useShoppingCartStore();
        const productsCount = computed(() => {
            return shoppingCartStore.positionsCount;
        });

        return {
            productsCount,
        }
    }
})
</script>