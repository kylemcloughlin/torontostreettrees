<template>
  <div class="map-div" v-show="this.makeMarkers === true ">
    <GmapMap
      :center="{lat:43.6832, lng:-79.3832}"
      :zoom="12"
      style="width:640px; height:360px; margin: 32px auto"
    >
      <GmapMarker
        v-for="(tree, index) in this.newMarkerTrees"
        v-bind:index="index"
        v-bind:key="tree.id"
        v-bind:position="{lat:tree.long, lng:tree.lat}"
        :clickable="true"
        
        @click="openWindow(tree)"
        :icon="{ url: require('../assets/treeMarker.png')}"
      />

      <gmap-info-window
        @closeclick="windowOpen=false"
        :opened="windowOpen"
        :position="infoWindow"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
      >
        <h3>
          {{this.infoTree.common_name}}
          <i>{{this.infoTree.botanical_name}}</i>
        </h3>
        <h4>{{this.infoTree.address}} {{this.infoTree.name}}</h4>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>
<script>
export default {
  name: "map",
  props: {
    markerTrees: Array,
    searched: String,
    infoPanelTree: Object
  },
  data() {
    return {
      makeMarkers: false,
      infoWindow: { lat: 0, lng: 0 },
      windowOpen: false,
      newMarkerTrees: [],
      infoTree: {}
    };
  },
  watch: {
    markerTrees() {
this.newMarkerTrees = this.markerTrees.filter(tree =>{
  return tree.lat !== null;
})
      this.makeMarkers = true;
    },
    infoPanelTree() {
      this.openWindow(this.infoPanelTree);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  },
  methods: {
    openWindow(tree) {
      this.infoWindow = { lat: tree.long, lng: tree.lat };
      this.infoTree = tree;
      this.windowOpen = true;
    }
  },
  created() {}
};
</script>
<style>
.map-div {
  width: 53%;
  height: 26em;
  margin: auto;
  border: none;
  border-top: #44cf6c 5px solid;
  background-color: #b7b5b3;

  border-top-right-radius: 1em;
  border-bottom-left-radius: 1em;
}
</style>