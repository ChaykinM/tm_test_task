<template>
    <v-container>
        <ProductsSelect @selectProduct="onSelectProduct" />
        <ProductCard v-if="selectedProduct != null" :product="selectedProduct" />
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import ProductsSelect from "@/components/ProductsSelect.vue";
import ProductCard from "@/components/ProductCard.vue";

export default defineComponent({
    name: "ShowcaseView",
    components: { ProductsSelect, ProductCard },
    setup() {
        const selectedProduct = ref(null);

        const onSelectProduct = (newVal) => {
            selectedProduct.value = newVal;
        }

        return {
            selectedProduct,
            onSelectProduct,
        };
    },
})
</script>