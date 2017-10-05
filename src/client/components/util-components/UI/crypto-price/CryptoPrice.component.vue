<template>

    <span>
        {{this.getNewPrice}} {{this.cryptoCurrency}}
    </span>

</template>

<script>
    import axios from 'axios';

    export default{

        name: "CryptoPrice",

        props: {

            fiatValue: {default: 0},
            fiatCurrency: {default: ''},

            cryptoCurrency: {default: 'BTC'}

        },


        data() {
            return {
                cryptoValue: 0,
            }
        },


        computed: {

            getNewPrice() {
                return this.$store.getters.convertCurrency(this.fiatValue, this.fiatCurrency, this.cryptoCurrency);
            },
        },

        mounted () {
        },

    }
</script>