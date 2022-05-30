<template>
    <div id="popupContainer">
        <p v-if="type === 'net_err'">Brak połączenia</p>
        <p v-else>{{ alert }}</p>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: mapState(['alert']),
  props: ['type'],
  methods: {
    setBg() {
      if (this.type === 'info') {
        const bgsection = document.getElementById('popupContainer')
        bgsection.style.background = ''
        bgsection.style.backgroundColor = '#e4eaed'
      } else if (this.type === 'net_err') {
        const bgsection = document.getElementById('popupContainer')
        bgsection.style.background = ''
        bgsection.style.backgroundColor = '#ef6868'
      }
    }
  },
  mounted() {
    this.setBg()
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
    background-color: #edeff3;;
  }

  #popupContainer{
    position: fixed;
    display: flex;
    flex-flow: column;
    background-color: #f9fbff;
    width: 200px;
    height: 50px;

    top: 10px;
    left: calc(50% - 100px);

    box-shadow: #777 3px 3px 5px;
    border-radius: 5px;
    justify-content: center;
  }

  #popupContainer p{
    font-weight: 300;
    font-size: 26px;
    align-self: center;
  }
</style>