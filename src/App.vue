<template>
  <div id="app">
    <Header msg="trees App" v-on:backBtn="backBtn" v-bind:show="this.back" />
    <div class="home-page">
      <h1>Toronto's Street Tree Database</h1>
      <h3
        class="secondary-info"
      >The Urban Forest Department’s compiled inventory of City and privately-owned Street Trees.</h3>
      <VueSlideUpDown :active="error" :duration="500">
        <div class="error" ref="error">
          <h3 class="error-message">{{this.errorMes}}</h3>
        </div>
      </VueSlideUpDown>
    </div>
      <VueSlideUpDown :active="this.loaded" :duration="500">
        <Loader/>
      </VueSlideUpDown> 
    
    <div  v-if="formShow" v-bind:class="this.loadingHelper ? 'isLoaded' : '' ">
      <div class="form-holder">
        <div class="button-bar">
          <Species v-bind:msg="this.msg" v-on:setSearch="setSearch" />
          <Location v-bind:msg="this.msg" v-on:setSearch="setSearch" />
          <Diameter v-bind:msg="this.msg" v-on:setSearch="setSearch" />
        </div>
        <SearchBar
          v-bind:search="this.baseSearch"
          msg="location"
          v-on:setTrees="setTrees"
          v-on:isLoaded="isLoaded"
          v-on:outputError="outputError"
        />
      </div>
    </div>

    <div class="output-holder" v-show="formShow === false">
      <Map
        v-bind:markerTrees="this.searchedTrees"
        v-bind:searched="this.baseSearch"
        v-bind:infoPanelTree="this.InfoPanelTree"
      />
      <InfoPanel
        v-if="formShow === false"
        v-bind:outputTrees="this.searchedTrees"
        v-bind:searched="this.baseSearch"
        v-bind:total="this.total"
        v-bind:postID="this.postID"
        v-on:panelClick="panelClick"
        v-on:moreTrees="moreTrees"
      />
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Location from "./components/location";
import Diameter from "./components/diameter";
import SearchBar from "./components/SearchBar";
import Species from "./components/species";
import Map from "./components/map";
import InfoPanel from "./components/infoPanel";
import VueSlideUpDown from "vue-slide-up-down";
import Loader from './components/loader';
export default {
  name: "App",
  components: {
    Header,
    Location,
    Diameter,
    SearchBar,
    Species,
    Map,
    InfoPanel,
    VueSlideUpDown,
    Loader
  },
  methods: {
    outputError(x) {
      this.errorMes = x;
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    },
    moreTrees(array) {
      this.searchedTrees = [...this.searchedTrees, ...array];
    },
    panelClick(tree) {
      this.InfoPanelTree = tree;
    },
    setSearch(x) {
      if (x === "types") {
        this.baseSearch = x;
        this.msg = x;
      } else if (x === "locations") {
        this.baseSearch = x;
        this.msg = x;
      } else {
        this.baseSearch = x;
        this.msg = x;
      }
    },
    isLoaded(x){
   
  if(this.loadingHelper === true && this.loaded === true) {
    this.loaded = x;
  return  setTimeout(() => {
   this.loadingHelper = false;
 }, );

  }
    },
    setTrees(x) {
      this.searchedTrees = x.data;
      this.total = x.total;
      this.postID = x.postID;
      this.back = true;
      return (this.formShow = false);
    },
    backBtn(x) {
      if (x === true) {
        this.back = false;

        this.output = "";
        return (this.formShow = x);
      }
    }
  },
  created() {},
  data() {
    return {
      baseTrees: [],
      baseSearch: "types",
      searchedTrees: [],
      msg: "types",
      formShow: true,
      back: false,
      InfoPanelTree: {},
      errorMes: "",
      error: false,
      total: null,
      postID: 0,
      loaded: true,
      loadingHelper: true
    };
  }
};
</script>

<style>
@font-face {
  font-family: 'Roboto';
  src: url(assets/fonts/Roboto-Medium.ttf),
   url(assets/fonts/Roboto-Medium.ttf)  format('truetype');/* Safari, Android, iOS */
  font-style: normal;
  font-weight: 100;
}
@font-face {
  font-family: 'Roboto';
  src: url(assets/fonts/Roboto-Medium.ttf),
   url(assets/fonts/Roboto-Medium.ttf)  format('truetype');
  font-style: normal;
  font-weight: 100;
}
@font-face {
  font-family: 'PT Sans';
  src: url(assets/fonts/PTSans-Regular.ttf),
   url(assets/fonts/PTSans-Regular.ttf)  format('truetype');
  font-style: normal;
  font-weight: 100;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f1ffe7;
  font-family: "Roboto", sans-serif;
  transition: 3ms;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #292f36;
  margin: 0;
  padding: 0;
}
.isLoaded {
visibility: hidden;
}
.form-holder {
  width: 100%;
  max-width: 40em;
  position: relative;
  top: 3em;
  display: flex;
  margin: auto;
  width: 65%;
  height: 14em;
  background-color: #b7b5b3;
  border-top: 5px solid #44cf6c;
  padding-bottom: 10px;
  border-top-right-radius: 1em;
  border-bottom-left-radius: 1em;
}
.secondary-info {
  color: #888;
}
.home-page {
  text-align: center;

  width: 100%;
}

.error {
  background-color: #ed1c24;
  color: white;
  max-width: 27em;
  height: 7em;
  margin: auto;
  border-radius: 6px;
  border: 3px solid #ed1c50;
  opacity: 0.8;
}
.error-message {
  padding-top: 1em;
  opacity: 0.8;
}
.button-bar {
  width: 100%;
  display: flex;
  height: 2.5em;
  border-top-right-radius: 1em;

  background-color: #292f36;
}
.btn {
  border: none;
  background-color: #999;
  border-radius: 2em;
  margin-left: 2em;
  height: 40px;
  opacity: 0.6;
  transition: 0.2s;
  width: 100%;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.btn:hover {
  opacity: 1;
}
.btn-helper {
  border-top: 1.5px solid grey;
  width: 47%;
  height: 0px;
  position: absolute;
  top: 2.45em;
  left: 12.25em;
}
.output-holder {
  width: 100%;
  position: relative;
  top: 1em;
  display: flex;
  margin: auto;
}

@media only screen and (max-width: 1250px) {
  .btn-helper {
    width: 70%;
  }
  .output-holder {
    display: flex;
    flex-direction: column;
  }
  .type-select {
    top: 3.2em !important;
  }
  .map-div {
    width: 93%;
    overflow: hidden;
    height: 41em;
  }
  .info-panel-div {
    margin-top: 1em !important;
    max-height: 82em !important;
    max-width: 70em !important;
    width: 94% !important;
  }
  .title-holder {
    width: 100% !important;
    max-width: 70em !important;
    height: 14.4em !important;;
    max-height: 15em !important;
  }
  .vue-map-container {
    width: 880px !important;
    height: 600px !important;
  }
}

@media only screen and (max-width: 950px) {
  .vue-map-container {
    width: 780px !important;
  }
  .location-input {
    min-width: 17em !important;
  }

  .selected-location {
    min-width: 21em !important;
  }
  .suggestion-container {
    max-width: 27em !important;
  }
}

@media only screen and (max-width: 850px) {
  .vue-map-container {
    width: 680px !important;
  }
  .location-input {
    min-width: 15em !important;
  }
  .selected-location {
    min-width: 19em !important;
  }
  .suggestion-container {
    max-width: 20em !important;
  }
  .diameter-title {
    margin-left: 6em !important;
  }
  .diameter-input {
    width: 2.2em !important;
  }
}

@media only screen and (max-width: 750px) {
  .btn-helper {
    width: 61%;
  }

  .vue-map-container {
    width: 580px !important;
    transition: 25ms !important;
  }

  .location-input {
    min-width: 12em !important;
    transition: 25ms !important;
  }
  .selected-location {
    min-width: 15em !important;
  }
  .suggestion-container {
    max-width: 20em !important;
  }
  .diameter-input {
    width: 1.2em !important;
  }
  .diameter-title {
    margin-left: 0em !important;
  }
  .plus {
    right: 4em !important;
  }
  .minus {
    right: 0.7em !important;
  }
}

@media only screen and (max-width: 650px) {
  .vue-map-container {
    width: 480px !important;
  }
  .location-input {
    min-width: 10em !important;
  }
  .location-select-holder {
    margin-left: 2em !important;
  }
  .selected-location {
    min-width: 13em !important;
  }
  .suggestion-container {
    left: 1.7em !important;
  }
.sub-title {
  width: 100% !important;
  text-align: center;
}
 .location-input {
    width: 91% !important;
  }
.location-select-holder {
    width: 91% !important;
  }
}

@media only screen and (max-width: 550px) {
  .btn {
    margin-left: 1em !important;
  }
  .form-holder {
    width: 80% !important;
  }
  .vue-map-container {
    width: 380px !important;
  }
  .location-input {
    min-width: 5em !important;
  }
  .selected-location {
    min-width: 11em !important;
  }
}
@media only screen and (max-width: 414px) {
  .vue-map-container {
    width: 334px !important;
  }

  .type-select {
    top: 2em !important;
    right: 1.5em !important;
  }
  .location-select-holder {
    margin-left: 1em !important;
  }
  .location-input {
    min-width: 3em !important;
  }
  .selected-location {
    min-width: 9em !important;
    margin-left: 1em !important;
  }
}
@media only screen and (max-width: 375px) {
  .btn-helper {
    width: 42%;
  }
  .location-input {
    width: 91% !important;
  }
.location-select-holder {
    width: 91% !important;
  }
  .vue-map-container {
    width: 350px !important;
  }
  .location-select-holder {
    /* margin-left: 0.5em !important; */
  }
 
}
</style>
