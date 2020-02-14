<template>
    <div class="header">
        <!-- <tabs /> -->
        <!-- <a-input-search v-if="isNotPromocodeRoute" placeholder="Найти магазин" @change="onSearch" /> -->
    </div>
</template>
<script>
import tabs from './tabs';

export default {
    components: { tabs },

    computed: {
        isNotPromocodeRoute() {
            return this.$route.name !== 'promocodes';
        },
    },

    methods: {
        onSearch(e) {
            console.log(e.target.value);
        },
    },
};
</script>
<style lang="scss" scoped></style>
