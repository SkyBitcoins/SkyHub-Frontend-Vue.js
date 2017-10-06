<template>

    <div>
        <PayCryptoModal ref="refPayCryptoModal" :fiatValue="this.fiatValue" :fiatCurrency="this.fiatCurrency" :cryptoCurrency="this.cryptoCurrency" :cryptoValue="this.getNewPrice" :cryptoWallet="this.cryptoWallet" />


        <router-link to="/login" :event="''" @click.native.prevent="handleShowPayCryptoModal" >
            <span>
                <b>
                    {{this.getNewPrice}} {{this.cryptoCurrency}}
                </b>
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

            productId: {default: ''},

            cryptoCurrency: {default: 'BTC'}

        },


        data() {
            return {
                cryptoWallet : '',
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

                if (this.$refs['refPayCryptoModal'] !== null){
                    this.getCryptoWallet();

                    this.$refs['refPayCryptoModal'].openPayModal();
                }

            },

            async getCryptoWallet(){

                if (this.cryptoWallet === ''){
                    let answer = await this.$store.dispatch('CRYPTO_NEW_CRYPTO_WALLET',{productId: this.productId, cryptoCurrency:this.cryptoCurrency });

                    this.cryptoWallet = answer.cryptoWallet.address;
                }

            }
        }

    }
</script>