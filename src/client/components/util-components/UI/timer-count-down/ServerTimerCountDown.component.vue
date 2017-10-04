<template>

    <div>
        time left:
        <b>{{60-this.getCountDownSeconds}}s</b>
    </div>

</template>

<script>

    export default{

        name: "ServerTimerCountDown",

        data() {
            return {
                countDown: '',
                now: 0,
            }
        },

        computed:{

            getCountDownSeconds(){
                return Math.floor(this.countDown/1000)
            }

        },

        mounted () {

            if (!this.$isServer){
                window.setInterval(() => {

                    this.countDownSeconds()

                },1000);
                this.countDownSeconds()
            }
        },

        methods:{

            countDownSeconds(){
                let diff = this.$store.state.global.timeServer - this.$store.state.global.timeClient;
                diff %= (1000 * 60); // only for the seconds

                this.now = (new Date()).getTime();
                this.now %=  (1000 * 60); // only for the seconds

                this.countDown = this.now -  diff;
            }

        },

    }

</script>