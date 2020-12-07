<template>
<div>
  <form>
     <input  v-bind:class="this.msg === 'diameters' ? 'selected' : '' " type="submit" value="Diameter" class='btn' v-on:click.stop="click" />
  </form>
</div>
</template>


<script>
export default {
   name: "Diameter",
  props: {
    msg: String
  }, 
    data() {
    return ({
      activeId: 'active-id'

    })
  },
  methods: {
    click(e) {
     e.preventDefault();
     
   this.$emit('setSearch', 'diameters');

 }
},
 watch:{
            msg(){
              

            }
  },

}
</script>
<style scoped>
.selected {
  transition: .2s;
  background-color: #157a6e;
  color: white;
  opacity: 1;
}

</style>