<template>
    <div class="plugin-content">
        <a-card v-if="service">
            <div class="wrap">
                <div  :style="{ backgroundColor: bgColor }" class="logo">
                    <img :src="service.logo.src">
                </div>
                <div class="info">
                    <div class="panel">
                        <div class="name">{{ service.title }}</div>
                        <a-button type="primary" @click="toServicesList"><a-icon type="close" /></a-button>
                    </div>
                    <div class="confirm">Период подтвреждения {{ service.confirmTime }}</div>
                    <div class="cashback">Кэшбэк {{ service.cashback }}</div>
                </div>
            </div>
            <a-divider type="horizontal">Категории</a-divider>
            <div class="category">
                <div class="item">
                    <div class="name">Категория 1</div>
                    <div class="value">1%</div>
                </div>
                <div class="item">
                    <div class="name">Категория 2</div>
                    <div class="value">3%</div>
                </div>
                <div class="item">
                    <div class="name">Категория 3</div>
                    <div class="value">5%</div>
                </div>
            </div>
            <a-divider type="horizontal">Уточнения от сервиса</a-divider>
                <div class="details">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum consequatur quod distinctio. Quasi fugit aliquid, recusandae voluptates sit eveniet inventore.
                </div>
            <a-divider type="horizontal" />
                <a-button type="primary" class="btn-center">Перейти на сайт</a-button>
            <a-divider type="horizontal" />
        </a-card>
    </div>
</template>

<script>
import { bgPage } from '~/helpers';

export default {
    props: {
        id: {
            required: true,
            validator: value => typeof value === 'number',
        },
    },

    data() {
        return {
            service: {},
        }
    },
    computed: {
        bgColor() {
            return this.service?.logo?.bgColor || 'none';
        }
    },

    methods: {
        toServicesList() {
            this.$router.push('/cashback');
        }
    },

    created() {
        this.service = bgPage.serviceData.getService(this.id);
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
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0;
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
