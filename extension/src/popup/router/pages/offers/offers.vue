<template>
    <div class="plugin-content">
        <div class="offers-title">Магазины</div>
        <div class="offers-list">
            <offer v-for="offer in offers" :key="offer.id" :offer="offer" />
        </div>
    </div>
</template>

<script>
import { bgPage } from '~/helpers';
import offer from './offer/offer';

export default {
    components: { offer },
    data() {
        return {
            offers: [],
        };
    },

    created() {
        this.offers = bgPage.offers.getTopOffers();
    },
};
</script>

<style lang="scss" scoped>
.offers-title {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
}
.offers-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
