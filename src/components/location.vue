<template>
   <div>
  <form>
    <input  v-bind:class="this.msg === 'locations' ? 'selected' : '' " type="submit" value="Location" class='btn' v-on:click.stop="click" />
  </form>
</div>
</template>


<script>
export default {
   name: "Location",
  props: {
    msg: String
    
  }, 
  watch: {
    msg() {
      
    }
  },
    data() {
    return ({
      activeId: 'active-id'

    })
  },
  methods: {
    click(e) {
     e.preventDefault();
    
   this.$emit('setSearch', 'locations');

 }
}

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