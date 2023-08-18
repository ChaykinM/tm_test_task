import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useShoppingCartStore = defineStore('shoppingCartStore ', () => {
    const positions = ref({})

    const positionsCount = computed(() => {
        return Object.keys(positions.value).length;
    })

    const addPosition = (product_id) => {
        return new Promise((resolve, reject) => {
            if (positions.value[product_id]) {
                reject('Данный товар уже добавлен в корзину');
            } else {
                positions.value[product_id] = 1;
                resolve();
            }
        })
    }

    const deletePosition = (product_id) => {
        return new Promise((resolve, reject) => {
            try {
                delete positions.value[product_id];
                resolve(); 
            } catch (error) {
                reject(error); 
            }
        })
    }

    const decreasePositionCount = (position_id) => {
        positions.value[position_id]--;
    }

    const increasePositoionCount = (position_id) => {
        positions.value[position_id]++;
    }

    const cleanPositions = () => {
        positions.value = {};
    }

    return {
        positions,
        positionsCount,
        addPosition,
        deletePosition,
        decreasePositionCount,
        increasePositoionCount,
        cleanPositions,
    };
})