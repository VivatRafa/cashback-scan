<script>
import { localGet, getTabInfo } from '~/helpers';

export default {
    name: '',

    asyncComputed: {
        async routesByTab() {
            const routes = await localGet('tabsInfo');
            await this.changeRoute(routes);
            return routes;
        },
    },

    methods: {
        async changeRoute(routeTabs) {
            const tabId = await getTabInfo('id');
            const routeName = routeTabs[tabId];
            return this.$router.push(routeName);
        },
    },

    render() {
        return '';
    },
};
</script>
