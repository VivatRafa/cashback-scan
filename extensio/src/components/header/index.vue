<template>
    <div class="header">
        <tabs/>
        <a-input-search placeholder="Найти магазин" @change="onSearch" />
    </div>
</template>
<script>
import tabs from './tabs';
export default {
    components: { tabs },
    data() {
        return {
        }
    },

    methods: {
        onSearch(e) {
            console.log(e.target.value);
        }
    }
};
</script>
<style lang="scss" scoped></style>
