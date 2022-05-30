<template>
    <div class="notification">
        <p class="userName">{{ notif.author.username }}</p>
        <p class="date">{{ notif.date_created.slice(0, 10) }}</p>
        <p class="title">{{ notif.title }}</p>
    </div>
</template>

<script>

export default {
    name: "Notification",
    props: {
        notif: Object
    }
}

</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  
  html{
    scroll-behavior: smooth;
  }
  
  body{
    background-color: #edeff3;
  }
    .notification{
        padding: 20px 20px;
    }

        .notification p{
            
            display: inline-block;
        }

        .userName{
            font-weight: 600;
            margin-bottom: 15px;
        }

        .date{
            float: right;
            font-size: 14px;
            font-weight: 300;
        }

        .title{
            margin-top: 3px;
            display: block !important;
            color: #444;
            width: 95%;
            font-weight: 400;
        }
</style>
