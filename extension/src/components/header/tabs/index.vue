<template>
    <a-tabs :defaultActiveKey="routeName" @change="toRoute">
        <a-tab-pane v-if="showCashbackTab" tab="Кэшбэк" key="/services" />
        <a-tab-pane tab="Магазины" key="/offers" />
    </a-tabs>
</template>
<script>
import { localGet, getTabInfo } from '~/helpers';

export default {
    asyncComputed: {
        async showCashbackTab() {
            const route = await this.getRoute();
            return route === 'services';
        },

        async routeName() {
            const route = await this.getRoute();
            return `/${route}`;
        },
    },

    methods: {
        async getRoute() {
            const routes = await localGet('tabsInfo');
            const tabId = await getTabInfo('id');
            const route = routes[tabId];
            return route;
        },

        toRoute(route) {
            this.$router.push(route, () => {});
        },
    },
};
</script>
<style lang="scss" scoped>
.ant-tabs {
    max-width: fit-content;
    margin: auto;
}
</style>
