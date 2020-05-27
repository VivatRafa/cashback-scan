<template>
    <div class="plugin-content">
        <a-card v-if="service">
            <div class="wrap">
                <div class="logo" :class="['logo', { black: darkLogoService.includes(service.name) }]">
                    <img :src="service.logo" />
                </div>
                <div class="info">
                    <div class="panel">
                        <div class="name">{{ service.name }}</div>
                        <a-button type="primary" @click="toServicesList">
                            <a-icon type="close" />
                        </a-button>
                    </div>
                    <div class="confirm">Период подтвреждения: {{ service.offer.confirmTime || 'уточняем' }}</div>
                    <div class="cashback">Кэшбэк (до) {{ addSignToString(service.offer.cashback, service.offer.rateSymbol) }}</div>
                </div>
            </div>
            <a-divider type="horizontal">Категории</a-divider>
            <div class="category">
                <div class="item" v-for="rate in service.offer.rates" :key="rate.name">
                    <div class="name" v-html="rate.name"></div>
                    <div class="value">{{ rate.value }}</div>
                </div>
            </div>
            <div v-if="service.offer.conditions">
                <a-divider type="horizontal">Уточнения от сервиса</a-divider>
                <div class="details" v-html="service.offer.conditions"></div>
            </div>
            <a-divider type="horizontal" />
            <a-button type="primary" @click="openWebVersion(service.referalLink)" class="btn-center">Перейти на сайт</a-button>
            <a-divider type="horizontal" />
        </a-card>
    </div>
</template>

<script>
import { bgPage, addSignToString, getConfigModule, openWebVersion } from '~/helpers';

const { darkLogoService } = getConfigModule('common');

export default {
    props: {
        serviceOfferId: {
            required: true,
            validator: value => typeof value === 'number',
        },
    },

    data() {
        return {
            service: null,
            darkLogoService,
        };
    },

    methods: {
        addSignToString,
        openWebVersion,
        toServicesList() {
            this.$router.push('/services');
        },
    },

    created() {
        const { offer, serviceOffer } = bgPage.offers.getServiceOffer(this.serviceOfferId) || {};
        if (!offer || !serviceOffer) return;
        const service = bgPage.services.getService(serviceOffer.serviceId);
        if (!service) return;
        const { cashback, rates, confirmTime, conditions } = serviceOffer || {};
        const { rateSymbol } = offer;
        this.service = {
            ...service,
            offer: { cashback, rates, confirmTime, rateSymbol, conditions },
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
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        img {
            max-width: 90%;
        }
        &.black {
            background-color: #000;
        }
    }
    .info {
        width: 100%;
        .panel {
            display: flex;
            .name {
                font-weight: 400;
                font-size: 16px;
            }
            .ant-btn {
                margin-left: auto;
                padding: 0;
                width: 24px;
                height: 24px;
            }
        }
        .confirm {
            font-size: 12px;
            margin: 5px 0;
        }
        .cashback {
            font-weight: 500;
            font-size: 20px;
        }
    }
}

.category {
    .item {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #e8e8e8;
        &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
        }
    }
    .name {
        width: 100%;
    }
    .value {
        max-width: 85px;
        width: 100%;
        padding-left: 10px;
        text-align: center;
        font-size: 18px;
    }
}
.details {
    font-size: 14px;
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
