<template>
    <div class="aboutContainer">
        <h1>Miasto na Górze</h1>
        <p>Aplikcaja do powiadomień</p>
        <a href="https://miastonagorze.pl/"><button>Odwiedź naszą stronę!</button></a>
    </div>
</template>

<style scoped>
html{
    scroll-behavior: smooth;
}

*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
}

body{
    background-color: #e4eaed;
}

.aboutContainer{
    background-color: #f9fbff;
    width: 94%;
    height: 60vh;
    margin-top: 20vh;
    margin-left: 3%;
    box-shadow: #777 2px 2px 5px;
    position: relative;
    min-height: 450px;
    border-radius: 5px;
}

.aboutContainer h1{
    transform: translate(-50%, 30px);
    margin:0 0 60px 50%;
    text-align: center;
    font-size: 36px;
    width: 100%;
}

.aboutContainer p{
    margin-left: 5%;
    width: 90%;
    line-height: 150%;
    word-spacing: 2px;
}

button{
    border: #232a34 solid 1px;
    cursor: pointer;
    background-color: #f9fbff;
    width: 90%;
    display: inline-block;
    box-sizing: border-box;
    padding: 10px 5px;
    margin: 50px 0 0 5%;
    font-size: 18px;
}
</style>
