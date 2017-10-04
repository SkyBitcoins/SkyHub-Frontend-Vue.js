<template>

    <div>
        {{this.altcoinValue}} {{this.altcoinCurrency}}
    </div>

</template>

<script>
    import axios from 'axios';

    export default{

        name: "AltcoinsPrice",

        props: {

            fiatValue: {default: 0},
            fiatCurrency: {default: ''},

            altcoinCurrency: {default: 'btc'}

        },


        data() {
            return {
                altcoinValue: 0,
            }
        },

        mounted () {

            if (!this.$isServer){
                window.setInterval(() => {

                    this.calculatePrice()

                },1000);
                this.calculatePrice()
            }
        },

        methods:{

            async calculatePrice(){


                try {

                    if (this.altcoinCurrency === 'btc'){
                        let res = await axios.get("https://blockchain.info/tobtc?currency="+this.fiatCurrency+"&value="+this.fiatValue);
                        res = res.data;

                        this.altcoinValue = res
                    }



                }
                catch(Exception){
                    console.log("Geo IP rejected ",Exception.toString());
                }


            }

        },

    }
</script>