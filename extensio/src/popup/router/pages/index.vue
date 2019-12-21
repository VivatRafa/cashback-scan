<script>
import { localGet, getTabInfo } from '~/helpers';

export default {
    name: '',

    asyncComputed: {
        async routesByTab() {
            const routes = await localGet('routesByTab');
            await this.changeRoute(routes);
            return routes;
        },
    },

    methods: {
        async changeRoute(routeTabs) {
            const tabId = await getTabInfo('id');
            const routeName = routeTabs[tabId] || 'cashback';
            return this.$router.push('cashback');
        },
    },

    render() {
        return '';
    },
};
</script>
