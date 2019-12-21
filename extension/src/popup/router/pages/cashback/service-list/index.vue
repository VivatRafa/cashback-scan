<template>
    <div>
        <service v-for="service of services"  :service="service" :key="service.id" />
    </div>
</template>

<script>
import service from './service';

export default {
    components: { service },

    props: {
        services: {
            required: true,
            validator: value => Array.isArray(value),
        }
    },

    data() {
        return {

        }
    },
    computed: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
</style>
