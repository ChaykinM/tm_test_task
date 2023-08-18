<template>
    <v-dialog v-model="showDialog" activator="parent" width="800px">
        <v-card>
            <v-card-title class="pa-0">
                <v-toolbar color="primary">
                    <v-toolbar-title>
                        Корзина покупок
                    </v-toolbar-title>
                    <template v-slot:append>
                        <v-btn icon="mdi-close" @click="showDialog = false"></v-btn>
                    </template>
                </v-toolbar>
            </v-card-title>
            <v-card-text>
                <template v-if="shoppingCartStore.positionsCount !== 0">
                    <v-table class="d-print-table">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    Наименование
                                </th>
                                <th class="text-center">
                                    Количество
                                </th>
                                <th class="text-center">
                                    Действия
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(_, product_id) in shoppingCartStore.positions" :key="product_id">
                                <td class="text-center"> {{ products[product_id].name }}</td>
                                <td class="text-center">
                                    <v-btn class="mx-2" @click="shoppingCartStore.decreasePositionCount(product_id)"
                                        :disabled="shoppingCartStore.positions[product_id] == 1 ? true : false"
                                        variant="outlined">
                                        <v-icon size="24">mdi-minus</v-icon>
                                    </v-btn>
                                    {{ shoppingCartStore.positions[product_id] }}
                                    <v-btn class="mx-2" @click="shoppingCartStore.increasePositoionCount(product_id)"
                                        variant="outlined">
                                        <v-icon size="24">mdi-plus</v-icon>
                                    </v-btn>
                                </td>
                                <td>
                                    <div class="d-flex justify-center">
                                        <v-tooltip location="bottom">
                                            <template v-slot:activator="{ props }">
                                                <v-btn color="red-darken-3" v-bind="props" class="mx-2"
                                                    @click="onDeletePosition(product_id)">
                                                    <v-icon size="32">mdi-delete-sweep</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Удалить позицию</span>
                                        </v-tooltip>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </template>
                <v-alert v-else class="my-4" type="info">
                    Корзина пуста ;( Перейдите в витрину, чтобы выбрать товары!
                </v-alert>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="showDialog = false">Отмена</v-btn>
                <v-btn color="teal-darken-2" variant="tonal" :disabled="shoppingCartStore.positionsCount === 0"
                    @click="onPrintPositions()">
                    Распечатать позиции
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <NoticeDialog />
</template>

<script>
import { defineComponent } from "vue";
import { ref, computed } from "vue";
import { useProductsStore } from "@/store/ProductsStore";
import { useShoppingCartStore } from "@/store/ShoppingCartStore";
import NoticeDialog from "@/components/NoticeDialog.vue";
import { useNoticeDialogStore } from "@/store/NoticeDialogStore";

export default defineComponent({
    name: "ShoppingCart",
    components: { NoticeDialog },
    setup() {
        const showDialog = ref(false);
        const shoppingCartStore = useShoppingCartStore();
        const productsStore = useProductsStore();
        const noticeDialogStore = useNoticeDialogStore();

        const products = computed(() => {
            return productsStore.products;
        });

        const onDeletePosition = async (product_id) => {
            try {
                await shoppingCartStore.deletePosition(product_id);
                noticeDialogStore.onOpenNoticeDialog('notice', 'Позиция была успешно удалена!');
            } catch (error) {
                noticeDialogStore.onOpenNoticeDialog('error', error);
            }
        };

        const onPrintPositions = () => {
            window.print();
        }

        return {
            showDialog,
            products,
            shoppingCartStore,
            onDeletePosition,
            onPrintPositions,
        }
    }
})
</script>

 