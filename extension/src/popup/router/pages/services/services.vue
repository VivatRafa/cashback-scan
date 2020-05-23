<template>
    <div class="plugin-content">
        <offer-name />
        <div>
            <service v-for="service in services" :service="service" :key="service.id" />
        </div>
    </div>
</template>

<script>
import { openWebVersion, getTabInfo, bgPage } from '~/helpers';
import service from './service/service';
import offerName from '~/components/offer-name';

export default {
    components: { service, offerName },

    data() {
        return {
            services: [],
            offerName: null,
        };
    },

    asyncComputed: {
        url() {
            return getTabInfo('url').then(url => url);
        },
    },

    watch: {
        url(newValue) {
            if (newValue) this.getServiceOfferData(newValue);
        },
    },

    methods: {
        async getServiceOfferData(url) {
            const { offer, serviceOffers } = (await bgPage.offers.getServiceOffersAndOfferBy({ url })) || {};

            if (!offer || !serviceOffers) return null;

            const serviceIds = serviceOffers.map(({ serviceId }) => serviceId);
            const services = bgPage.services.getServicesByIds(serviceIds);

            this.services = services.map(service => {
                let tempService = { ...service };
                serviceOffers.forEach(serviceOffer => {
                    if (service.id === serviceOffer.serviceId) {
                        const { id: serviceOfferId, cashback, confirmTime, rates } = serviceOffer;
                        const { id: offerId, rateSymbol } = offer;
                        const isRatesMoreThanOne = rates?.length > 1;
                        tempService = {
                            ...tempService,
                            offer: { cashback, confirmTime, rateSymbol, isRatesMoreThanOne },
                            serviceOfferId,
                        };
                    }
                });
                return tempService;
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
