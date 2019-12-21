<template>
    <div class="plugin-content">
        <offer-name />
        <service-list :services="services" />
    </div>
</template>

<script>
import { openWebVersion, getTabInfo, bgPage } from '~/helpers';
import serviceList from './service-list';
import offerName from '~/components/offer-name';

export default {
    components: { serviceList, offerName },

    data() {
        return {
            services: [],
            offerName: null,
        }
    },

    // Почему то работает
    asyncComputed: {
        url() {
            return getTabInfo('url').then(url => url);
        },
    },
    
    watch: {
        url(newValue) {
            if (newValue) {
                this.getOfferName(newValue);
                this.getServiceData(newValue);
            };
        },
    },

    methods: {
        getOfferName(link) {
            const offer = bgPage.offers.getOfferByService('backit', link);
            this.offerName = offer?.attributes?.name;
        },

        async getServiceData(url) {
            this.services = await bgPage.serviceData.getData(url);
            
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
