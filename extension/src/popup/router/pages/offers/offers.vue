<template>
    <div class="plugin-content">
        Магазинчики
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
        console.log(this.offers);
    },
};
</script>

<style lang="scss" scoped>
.offers-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
