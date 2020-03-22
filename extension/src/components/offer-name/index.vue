<template>
    <div class="offer-name" v-if="offerName">{{ offerName }}</div>
</template>

<script>
import { getTabInfo, bgPage } from '~/helpers';

export default {
    data() {
        return {
            offerName: null,
        };
    },

    asyncComputed: {
        async offerName() {
            const url = await getTabInfo('url');
            return bgPage.offers.getOffer(url, 'name');
        },
    },
};
</script>

<style lang="scss" scoped>
.offer-name {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
}
</style>
