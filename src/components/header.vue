<template>
    <div class='header'>
    <img class='img' src="../assets/treeMarker.png"/>
    <h2>Toronto's Street Trees</h2>
       <input v-if="this.clicked === false" type="submit" class='back-btn' value="back"  v-on:click.stop="backClick"/>
    </div>
</template>


<script>
export default {
   name: "Header",
  props: {
    
    show: Boolean
  },
  data() {
    return{
      clicked: true
    }
  },
  watch: {
    show() {
      
     this.clicked = true;
     if (this.show ===  true ) {
       this.clicked = false;

     }
    },
  },
    methods: {
      backClick(e) {
      e.preventDefault();
       this.clicked = true;
       
         this.$emit('backBtn', true)
        

      }
    }
  


}
</script>
<style scoped>
  .header{
    background: #292f36;
    color: #fff;
    text-align: center;
    padding: 10px;
    height: 5em;
  }
  .header a {
    color: #fff;
    padding-right: 5px; 
  }

.header h2 {
  position: absolute;
  top: 29px;
  font-family: 'PT Sans', sans-serif;
  left: 1.7em;

}
  .back-btn {
    position: relative;
    width: 4em;
    height: 4em;
    left: 44%;
    top: 1.5em;
    color: white;
    background-color: transparent;
    border: white solid 1px;
    border-radius: 4em;
    opacity: .7;
    transition: 3ms;
    box-shadow: 0px 0.5px 2px 0px;
  }
  .back-btn:hover{
    opacity: 1;
    background-color: white;
    color: #292f36;
    /* box-shadow: 0px 0.5px 2px 0px; */



  }
  .img {
    position: absolute;
    left: .3em;
    top: 3em;
    /* width: 3em; */
  }
</style>
