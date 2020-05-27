<template>
    <div class="plugin-content">
        <!-- <div class="offers-title">Магазины</div> -->
        <a-auto-complete class="search-input" @search="onSearch" @select="onSelect" placeholder="Начните вводить (минимум 2 символа)">
            <template slot="dataSource">
                <a-select-option v-for="opt in filteredOffers" :key="opt.label" :value="opt.value">
                    {{ opt.label }}
                </a-select-option>
            </template>
            <a-input>
                <a-icon slot="suffix" type="search" class="certain-category-icon" />
            </a-input>
        </a-auto-complete>
        <div class="offers-list">
            <offer v-for="offer in offers" :key="offer.id" :offer="offer" />
        </div>
    </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { bgPage } from '~/helpers';
import offer from './offer/offer';

export default {
    components: { offer },
    data() {
        return {
            offers: [],
            filteredOffers: [],
        };
    },

    methods: {
        onSearch: throttle(function onSearch(value) {
            if (value?.length > 1) {
                this.filteredOffers = bgPage.offers.search(value) || [];
            } else this.filteredOffers = [];
            return value;
        }, 100),

        onSelect(val) {
            if (!val) return '';
            this.$router.push({ path: `offer/${val}` });
        },
    },

    created() {
        this.offers = bgPage.offers.getTopOfferFromCache();
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
.search-input {
    width: 100%;
    margin-bottom: 15px;
}
</style>
