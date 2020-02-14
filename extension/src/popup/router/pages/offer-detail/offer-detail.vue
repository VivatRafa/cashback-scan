<template>
    <div class="plugin-content">
        <a-card v-if="offer">
            <div class="wrap">
                <div class="logo">
                    <img :src="offer.logo" />
                </div>
                <div class="info">
                    <div class="panel">
                        <div class="name">{{ offer.name }}</div>
                        <a-button type="primary" @click="toOffersList">
                            <a-icon type="close" />
                        </a-button>
                    </div>
                    <!-- Указать самый большой кэшбэк и самый
                     маленький период подтверждения -->
                </div>
            </div>
            <a-divider type="horizontal">Кэшбэк сервисов</a-divider>
            <div class="service">
                <div class="item" v-for="service in offer.services" :key="service.name">
                    <div class="name">{{ service.name }}</div>
                    <div class="value">{{ addSignToString(service.cashback, offer.rateSymbol) }}</div>
                </div>
            </div>
            <a-divider type="horizontal" />
            <a-button type="primary" class="btn-center">Перейти на сайт</a-button>
            <a-divider type="horizontal" />
        </a-card>
    </div>
</template>

<script>
import { bgPage, addSignToString } from '~/helpers';

export default {
    props: {
        offerId: {
            required: true,
            validator: value => typeof value === 'number',
        },
    },

    data() {
        return {
            offer: null,
        };
    },

    computed: {},

    methods: {
        addSignToString,
        toOffersList() {
            this.$router.push('/offers');
        },
    },

    async created() {
        const { offer, serviceOffers } = (await bgPage.offers.getServiceOffersAndOfferBy({ id: this.offerId })) || {};
        if (!offer || !serviceOffers) return;

        const serviceIds = serviceOffers.map(({ serviceId }) => serviceId);
        const services = bgPage.services.getServicesByIds(serviceIds);

        this.offer = {
            ...offer,
            services: serviceOffers.map(serviceOffer => {
                let name = '';
                let cashback = 0;
                services.forEach(service => {
                    if (serviceOffer.serviceId === service.id) {
                        name = service.name;
                        cashback = serviceOffer.cashback;
                    }
                });
                return { name, cashback };
            }),
        };
    },
};
</script>

<style lang="scss" scoped>
.ant-card {
    margin-bottom: 10px;
}
/deep/ .ant-card-body {
    padding: 10px;
}
.wrap {
    display: flex;
    color: #010101;
    .logo {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        img {
            max-width: 90%;
        }
    }
    .info {
        width: 100%;
        .panel {
            display: flex;
            .name {
                font-weight: 500;
                font-size: 20px;
            }
            .ant-btn {
                margin-left: auto;
                padding: 0;
                width: 24px;
                height: 24px;
            }
        }
    }
}

.service {
    .item {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #e8e8e8;
        &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
        }
        div {
            width: 50%;
        }
    }
}
.ant-btn {
    font-size: 12px;
}
.btn-center {
    margin: auto;
    display: block;
}
.ant-divider-horizontal.ant-divider-with-text {
    font-size: 14px;
}
</style>
