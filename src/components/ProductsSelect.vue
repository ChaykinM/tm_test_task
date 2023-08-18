<template>
    <v-card class="my-4">
        <v-card-text>
            <div class="d-flex justify-space-between align-center">
                <div class="font-weight-medium">
                    Количество товаров: <v-chip color="primary">
                        {{ productsStore.productsCount }}
                    </v-chip>
                </div>
                <v-btn @click="onReloadProducts()" :loading="productsStore.loading"
                    prepend-icon="mdi-download-circle-outline" color="teal-darken-2"> Обновить </v-btn>
            </div>
            <v-sheet v-if="productsStore.productsCount != 0" class="mx-auto">
                <v-item-group v-if="productsStore.productsCount <= 3" v-model="selectProduct" selected-class="bg-primary"
                    class="d-flex">
                    <v-item v-for="product in productsStore.products" :key="product.id" v-slot="{ toggle, selectedClass }"
                        :value="product.id">
                        <ProductSelectItem v-bind="{ toogle, selectedClass }" :product="product"
                            :selected-class="selectedClass" width="100%" :toggle-handler="toggle" />
                    </v-item>
                </v-item-group>
                <v-slide-group v-if="productsStore.productsCount > 3" v-model="selectProduct" class="pa-4"
                    selected-class="bg-primary" show-arrows>
                    <v-slide-group-item v-for="product in productsStore.products" :key="product.id"
                        v-slot="{ toggle, selectedClass }" :value="product.id">
                        <ProductSelectItem v-bind="{ toogle, selectedClass }" :product="product"
                            :selected-class="selectedClass" width="300" :toggle-handler="toggle" />
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
            <v-alert v-else-if="productsStore.productsCount === 0 && productsStore.loading" class="my-4" type="info">
                Загрузка карточек продуктов...
            </v-alert>
            <v-alert v-else class="my-4" type="error">
                При загрузке карточек продуктов возникла ошибка ;(
            </v-alert>
        </v-card-text>
    </v-card>
</template>

<script>
import { defineComponent } from "vue";
import { ref, onMounted, watch } from "vue";
import { useProductsStore } from "@/store/ProductsStore";
import { useShoppingCartStore } from "@/store/ShoppingCartStore";
import ProductSelectItem from "./ProductSelectItem.vue";

export default defineComponent({
    name: "ShowcaseView",
    emits: ["selectProduct"],
    setup(_, { emit }) {
        const productsStore = useProductsStore();
        const shoppingCartStore = useShoppingCartStore();
        const selectProduct = ref(null);
        const window = ref(0);
        watch(selectProduct, (newVal) => {
            emit('selectProduct', productsStore.products[newVal]);
        });
        onMounted(async () => {
            productsStore.getProducts();
        });
        const onReloadProducts = () => {
            selectProduct.value = null;
            productsStore.getProducts();
            shoppingCartStore.cleanPositions();
        };
        return {
            productsStore,
            selectProduct,
            window,
            onReloadProducts,
        };
    },
    components: { ProductSelectItem }
})
</script>