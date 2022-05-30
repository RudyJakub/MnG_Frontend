<template>
      <div class="messageContainer">
        <div class="messageCanvas">
            <div class="notification" @click="hide">
                <p class="userName">{{ notif.author.username }}</p>
                <p class="date">{{ notif.date_created.slice(0, 10) }}</p>
                <br>
                <p class="close">Kliknij w to pole aby zamknąć</p>
                <p class="title">{{ notif.title }}</p>
            </div>
            <div class="divider"></div>
            <div class="message">
                <p>{{ notif.content }}</p>
                <img src="https://i1.kwejk.pl/k/obrazki/2022/05/ko3D9BSmAoPRLAWp.jpg" style="margin: 15px 0 0 50%; transform: translate(-50%); max-width: 90%;">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "NotifPop",
    props: {
        notif: Object
    },
    methods: {
        hide() {
            this.$emit("hide")
        }
    }
}

</script>

<style scoped>

*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  body{
    background-color: #f4f0e8;
  }

    /* NOTIFICATIONS */

    .notification{
        padding: 15px;
    }

    .notification p{
        display: inline-block;
    }

    .userName{
        font-weight: 600;
    }

    .date{
        float: right;
        font-size: 14px;
        font-weight: 300;
    }

    .close{
        float: right;
        font-size: 13px;
        font-weight: 300;
        color: red;
    }

    .title{
        margin-top: 3px;
        display: block !important;
        color: #444;
        width: 95%;
    }

    .divider{
        height: 1px;
        width: 100%;
        background-color: #000;
        opacity: .1;
    }


    /* MESSAAGE CONTAINER */


    .messageContainer{
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0%, 0%, .7)
    }

    .messageCanvas{
        position: fixed;
        width: 90vw;
        height: 70vh;
        top: 15vh;
        left: 5vw;
        background-color: #f9fbff;
        border-radius: 5px;
    }

    .message{
        overflow-y: scroll;
        padding: 10px 15px;
        line-height: 150%;
        word-spacing: 2px;
        height: calc(70vh - 106px);
    }
</style>