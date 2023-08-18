<template>
    <v-card class="my-4">
        <v-card-title>
            Карточка товара
        </v-card-title>
        <v-card-text>
            <v-carousel height="300">
                <v-carousel-item v-for="img in product.images" :src="`./assets/${img}`" :key="img" cover></v-carousel-item>
            </v-carousel>
            <div class="d-flex align-center">
                <div class="text-h6">
                    {{ product.name }}
                </div>
                <v-spacer></v-spacer>
                <v-chip class="ma-2" color="teal-darken-1" text-color="white"
                    prepend-icon="mdi-star-shooting-outline">
                    Цена: {{ product.price }}
                </v-chip>
            </div>

            <div class="text-subtitle-1">Описание</div>
            {{ product.description }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-2" variant="tonal" prepend-icon="mdi-basket">
                Корзина покупок
                <ShoppingCartDialog />
            </v-btn>
            <v-btn @click="addToShoppingCart()" color="teal-darken-2" variant="tonal" prepend-icon="mdi-plus">
                Добавить в корзину
            </v-btn>
        </v-card-actions>

    </v-card>
    <NoticeDialog />
</template>

<script>
import { defineComponent } from "vue";
import ShoppingCartDialog from "@/components/ShoppingCartDialog.vue";
import NoticeDialog from "@/components/NoticeDialog.vue";
import { useNoticeDialogStore } from "@/store/NoticeDialogStore";
import { useShoppingCartStore } from "@/store/ShoppingCartStore";

export default defineComponent({
    name: "ProductCard",
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const noticeDialogStore = useNoticeDialogStore();
        const shoppingCartStore = useShoppingCartStore();

        const addToShoppingCart = async () => {
            try {
                await shoppingCartStore.addPosition(props.product.id);
                noticeDialogStore.onOpenNoticeDialog('notice', 'Товар был успешно добавлен в корзину!');
            } catch (error) {
                noticeDialogStore.onOpenNoticeDialog('error', error);
            }
        }

        return {
            addToShoppingCart,
        }
    },
    components: { ShoppingCartDialog, NoticeDialog }
})
</script>