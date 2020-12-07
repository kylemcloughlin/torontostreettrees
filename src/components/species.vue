<template>
<div>
  <form>
     <input v-bind:class="this.msg === 'types' ? 'selected' : '' " type="submit" value="Species" class='btn' v-on:click.stop="click" />
  </form>
</div>
</template>


<script>
export default {
   name: "Species",
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
     
   this.$emit('setSearch', 'types');

 },
},
   watch: {
     msg() {
       
     }
   },
created() {
  
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