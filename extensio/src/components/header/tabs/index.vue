<template>
    <a-tabs defaultActiveKey="/cashback" @change="toRoute">
        <a-tab-pane tab="Кэшбэк" key="/cashback"/>
        <a-tab-pane tab="Промокоды" key="/promocodes"/>
    </a-tabs>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {
                    link: '/cashback',
                    text: '',
                    routeName: '/cashback',
                },
                {
                    link: '/promocodes',
                    text: '',
                    routeName: 'promocodes',
                },
            ]
        }
    },

    computed: {
        routeName() {
            return this.$route.name;
        },

        showTabs() {
            return this.isLogin && this.routeName !== 'no-offer';
        },
    },
    
    methods: {
        toRoute(route) {
            this.$router.push(route);
        }
    }
};
</script>
<style lang="scss" scoped>
.ant-tabs {
    max-width: fit-content;
    margin: auto;
}
</style>
