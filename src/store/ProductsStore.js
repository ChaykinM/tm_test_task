import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { items } from "@/mocks/items";

export const useProductsStore = defineStore('productsStore', () => {
    const loading = ref(false);
    const products = ref({});

    const productsCount = computed(() => {
        return Object.keys(products.value).length;
    })

    const getProducts = () => {
        // промоделируем асихронный запрос к серверу 
        loading.value = true;
        products.value = {};
        return new Promise((resolve) => {
            setTimeout(() => {
                const count = Math.floor(Math.random() * 10) + 1;
                let i = 0;
                while (i < count) {
                    let randomItem = getRandomItem();
                    if (products.value[randomItem.id] === undefined) {
                        products.value[randomItem.id] = randomItem;
                        i++;
                    }
                }
                loading.value = false;
                resolve();
            }, 1000)
        })
    }

    const getRandomItem = () => {
        return items[Math.floor(Math.random() * items.length)];
    }

    return {
        products,
        loading,
        productsCount, 
        getProducts,
    }
})