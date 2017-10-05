<template>

    <div>
        time left:
        <b>
            <span v-if="this.getCountDownSeconds != 666" :style="'color: '+ (getCountDownSeconds < 10 ? 'red' : 'black') ">
                {{this.getCountDownSeconds}}s
            </span>
            <span v-else>
                -
            </span>
        </b>
    </div>

</template>

<script>

    export default{

        name: "ServerTimerCountDown",

        //@onCountDown,

        data() {
            return {
                countDown: 666,
                now: 0,
            }
        },

        computed:{

            getCountDownSeconds(){
                return Math.floor(this.countDown/1000)
            },

        },

        mounted () {

            if (!this.$isServer){
                window.setInterval(() => {

                    this.countDownSecondsServer()

                },1000);
                this.countDownSecondsServer()
            }
        },

        methods:{

            countDownSecondsServer(){
                this.now = (new Date()).getTime();

                let countDown = (this.now - this.$store.state.crypto.currenciesLastTimestamp);

                this.countDown = (60*1000) - countDown;

            },


            countDownSecondsServer(){
                let diff = this.$store.state.global.timeServer - this.$store.state.global.timeClient;
                diff %= (1000 * 60); // only for the seconds

                this.now = (new Date()).getTime();
                this.now %=  (1000 * 60); // only for the seconds

                let countDown = (this.now -  diff);

                this.countDown = (61*1000) - countDown;

                if ((this.countDown < 5) || (this.countDown > 55)){
                    this.$emit('onCountDown',this.countDown);
                }

            }



        },

    }

</script>