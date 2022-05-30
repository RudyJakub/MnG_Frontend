<template>
      <div id="confirmContainer">
        <p>Czy na pewno chcesz się wylogować?</p>
        <div class="buttonBox">
            <button type="submit">Tak</button>
            <button type="submit">Nie</button>
        </div>
    </div>
</template>


<style>
*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }
  
  html{
    scroll-behavior: smooth;
  }
  
  body{
    background-color: #edeff3;;
  }

  #confirmContainer{
    position: fixed;
    background-color: #f9fbff;


    width: 350px;
    height: 200px;

    top: calc(50% - 100px);
    left: calc(50% - 175px);

    box-shadow: #777 3px 3px 5px;
    border-radius: 5px;
  }

  #confirmContainer p{
    font-weight: 300;
    font-size: 26px;
    text-align: center;
    margin-top: 24px;
  }

  .buttonBox button{
    padding: 10px 50px; 
    border: #232a34 solid 1px;
    background-color: #f9fbff;
    font-size: 18px;
  }

  .buttonBox{
    display: flex;
    height: 112px;
    margin: 0 20px;
    justify-content: space-around;
    align-items: center;
  }
</style>