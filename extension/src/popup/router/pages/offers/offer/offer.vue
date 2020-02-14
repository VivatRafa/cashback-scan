<template>
    <a-card hoverable @click="toOffer(offer.id)">
        <img :src="offer.logo" slot="cover" />
        <a-card-meta :title="offer.name" />
    </a-card>
</template>

<script>
export default {
    props: {
        offer: {
            required: true,
            validator: value => typeof value === 'object' || null,
        },
    },
    methods: {
        toOffer(offerId) {
            this.$router.push({ path: `offer/${offerId}` });
        },
    },
};
</script>

<style lang="scss" scoped>
.ant-card {
    width: 166px;
    margin-bottom: 10px;
    margin-right: 10px;
    &:nth-child(even) {
        margin-right: 0;
    }
}
</style>
