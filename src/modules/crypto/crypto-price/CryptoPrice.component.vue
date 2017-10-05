<template>

    <div>
        <PayCryptoModal ref="refPayCryptoModal" :fiatValue="this.fiatValue" :fiatCurrency="this.fiatCurrency" :cryptoCurrency="this.cryptoCurrency" :cryptoValue="this.getNewPrice" :cryptoWallet="'WALLET'" />

        <router-link to="/login" :event="''" @click.native.prevent="handleShowPayCryptoModal" >
            <span>
                {{this.getNewPrice}} {{this.cryptoCurrency}}
            </span>
        </router-link>

    </div>

</template>

<script>
    import PayCryptoModal from 'modules/crypto/pay-crypto/PayCrypto.modal.vue';

    export default{

        name: "CryptoPrice",

        components:{
            'PayCryptoModal': PayCryptoModal,
        },

        props: {

            fiatValue: {default: 0},
            fiatCurrency: {default: ''},

            cryptoCurrency: {default: 'BTC'}

        },


        data() {
            return {
            }
        },


        computed: {

            getNewPrice() {
                return this.$store.getters.convertCurrency(this.fiatValue, this.fiatCurrency, this.cryptoCurrency);
            },
        },

        mounted () {

        },

        methods:{
            async handleShowPayCryptoModal(){

                if (this.$refs['refPayCryptoModal'] !== null)
                    this.$refs['refPayCryptoModal'].openPayModal();

            },
        }

    }
</script>