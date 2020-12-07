<template>
  <div>

    <form @submit="searchTree">
      <div id="search-holder">
        <div class="type-select-holder" v-if="this.search ===  'types'">
          <h3>Search By Speices:</h3>
          <select class="type-select" v-model="output">
            <option
              v-bind:key="tree.id"
              v-for="(tree, index) in trees"
              v-bind:value="index"
            >{{tree.common_name}} {{tree.botanical_name}} ttl: {{tree.total}}</option>
          </select>
        </div>
        <div v-else-if="this.search === 'locations' ">
          <div class="sub-title">
            <h3>Search By Location's:</h3>
          </div>

          <div class="location-select-holder">
            <input
              class="location-input"
              v-show="selected === false"
              type="text"
              placeholder=" Search location here..."
              v-model="output"
              @keyup="autocomplete"
            />

            <div class="selected-location" v-if="selected === true">
              <a class="x" @click="selected = false, output = ''">X</a>
              <h3>{{location.name}}</h3>
            </div>
          </div>
        </div>

        <div v-else>
          <h3 class="diameter-title">Search By Diameter at Breast height:</h3>

          <label class="diameter-label" id="label">
            <input class="diameter-input" type="number" v-model="numOutput" />
            inches
          </label>

          <button class="plus" v-show="this.numOutput < 124" v-on:click.prevent="plus">+</button>
          <button class="minus" v-show="this.numOutput > 0" v-on:click.prevent="minus">-</button>
        </div>
      </div>
      <input type="submit" value="submit" id="submit" class="btn" @submit.prevent="searchTree" />
    </form>
    <div class="suggestion-container" v-if="this.output.length > 0" v-show="selected === false">
      <div
        v-for="(tree, index) in suggestions.slice(0,9)"
        v-bind:class="tree.id === id ? 'in-focus' : '' "
        v-bind:key="tree.id"
        v-bind:value="tree.id"
        @click="help(tree, index)"
        class="suggestion-div"
      >
        <h2>{{tree.name}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      trees: [],
      dataSelect: "Location",
      output: "",
      numOutput: 3,
      suggestions: [],
      selected: false,
      location: {},
      focusCounter: -1,
      id: null,
      indexHelper: null
    };
  },
  props: {
    search: String,
    select: String
  },
  methods: {
    searchTree(e) {

      e.preventDefault();

      let conditonialOutput;
      let ttl;
      let filterList;
      let get = false
      let errorMessage = "";

      switch (this.search) {
        case "diameters":
          conditonialOutput = this.numOutput;
          filterList = this.trees.filter(tree => {
            if (tree.dbh_trunk === this.numOutput) {
              return tree;
            }
          });
          ttl = filterList[0].total;
          get = true;
          break;
        case "locations":
          if (!this.suggestions.includes(this.location)) {
            errorMessage = "Error: Location not in data base, try another!";
          } else {
            conditonialOutput = this.num0utput;
            ttl = this.suggestions[this.indexHelper].total;
            get = true;
          }

          break;
        case "types":
          if (this.output === "") {
            errorMessage = "Error: empty search, try another!";
          } else {
            conditonialOutput = this.trees[this.output].id;
            ttl = this.trees[this.output].total;
            get = true;
          }
          break;

        default:
          get = true;

          break;
      }

      if (get) {
        this.$http.plain
          .get(`/${this.search}/${conditonialOutput}`)
          .then(response =>
            this.$emit("setTrees", {
              data: response.data,
              total: ttl,
              postID: conditonialOutput
            })
          )
          .catch(err => console.log(":(", err));
      } else {
        this.$emit("outputError", errorMessage);
      }
    },
    getTrees() {
      if (this.search === "types" || this.search === "diameters") {
        this.$http.plain
          .get(`/${this.search}`)
          .then(response => (this.trees = response.data))
          .catch(err => console.log(":(", err));
      }
    },
    plus() {
      this.numOutput++;
    },
    minus() {
      this.numOutput--;
    },
    autocomplete(e) {
      if (
        e.which === 40 &&
        this.suggestions.length > 0 &&
        this.focusCounter < 9
      ) {
        this.focusCounter = this.focusCounter + 1;
        this.id = this.suggestions[this.focusCounter].id;
      } else if (
        e.which === 38 &&
        this.suggestions.length > 0 &&
        this.focusCounter > 0
      ) {
  
        this.focusCounter = this.focusCounter - 1;
        this.id = this.suggestions[this.focusCounter].id;
      } else if (e.which === 13 && this.suggestions.length > 0) {
        this.help(this.suggestions[this.focusCounter]);
       
      } else {
        if (this.output.length >= 3) {
    
          this.getSuggestions();
        }
    
        if (this.output.length < 2) {
          this.suggestions = [];
        }
     
      }
    },
    help(value, x) {
      this.indexHelper = x;
      this.location = value;
      this.selected = true;
      this.num0utput = value.id;
    },
    getSuggestions() {
      this.suggestions = [];
      this.$http.plain
        .get(`/${this.search}?autocomplete=true&output=${this.output}`)
        .then(async response => {
          if (response.status === 200) {
            this.suggestions = await response.data;
          }
        })
        .catch(err => console.log(":(", err));

    }
  },

  watch: {
    search() {
      this.getTrees();
      this.output = "";
      this.suggestions = [];
      if (this.search === "locations") {
        this.trees = [];
      }
    }
  },

  created() {
    this.getTrees();

    this.dataSelect = this.search;
  }
};
</script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#search-holder {
  display: flex;
  width: 100%;
  position: absolute;

  top: 3em;
  left: 0em;

}
.diameter-title {
  text-align: center;
  margin-left: 9em;
}
.diameter-label {
  position: absolute;

  top: 2em;
}
#label {
  font-size: 24px;
  font-weight: bold;
}
.diameter-input {
  border: none;
  background-color: transparent;
  text-align: right;
  font-size: 3em;
  width: 3em;
  opacity: 0.5;
}
.diameter-input:focus {
  appearance: none;
  outline: none;
  color: #157a6e;
  opacity: 1;
}
.diameter-input::-webkit-outer-spin-button,
.diameter-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.plus {
  position: absolute;
  width: 3em;
  height: 2em;
  top: 5em;
  right: 11.5em;
  border-bottom-left-radius: 1em;
  border-top-left-radius: 1em;
  border: solid 3px #44cf6c;
  background-color: #44cf6c;
  font-size: 1em;
  opacity: 0.5;
  transition: 3ms;
}
.plus:hover {
  opacity: 1;
  transition: 3ms;
  background-color: transparent;
  /* color: #44CF6C; */
}
.plus:focus {
  outline: none;
}
.minus {
  position: absolute;
  width: 3em;
  height: 2em;
  right: 8em;
  top: 5em;
  border-bottom-right-radius: 1em;
  border-top-right-radius: 1em;
  border: solid 3px #44cf6c;
  background-color: transparent;

  font-size: 1em;
  opacity: 0.5;
  transition: 3ms;
  font-weight: bold;
}
.minus:hover {
  opacity: 1;
  background-color: #44cf6c;
  transition: 3ms;
}
.minus:focus {
  outline: none;
}

.type-select-holder {
  width: 100%;
  display: block;
  text-align: center;
  margin: 3em;
  margin-top: 0;
}
.type-select {
  width: 100%;
  background: #222;
  color: #fff;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.2em;
}
.type-select:focus {
  outline: none;
}
#submit {
  position: absolute;
  right: 1em;
  top: 14.4em;
  height: 2.3em;
  width: 6em;
  border-radius: 0.5em;
  color: white;
  background-color: #157a6e;

}
.sub-title {
  width: 120%;
  text-align: center;
}

.location-select-holder {
  width: 100%;
  display: block;
  text-align: center;
  margin: 3em;
  margin-top: 0;
}
.location-input {
  width: 98%;
  min-width: 19em;
  border: none;
  border-radius: 1.3em;
  font-size: 1.3em;
  padding: 0.2em;
  background: #222;
  color: #fff;
  padding-left: 0.4em;
}
.location-input:focus {
  outline: none;
}
.selected-location {
  min-width: 23em;
  padding: 0.3em;
  text-align: center;
  margin: none;
  background-color: #222;
  color: #fff;
  position: relative;
  top: -1em;
  border-radius: 2em;
}

.x {
  float: right;
  margin-right: 0.5em;
  margin-top: 0.25em;
}
.suggestion-div {
  background: #222;
  padding: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 15px;
  color: #fff;
  border-top: 1px solid #666;
  cursor: pointer;
  opacity: 0.75;
  transition: 0.25s;
}
.suggestion-div:hover {
  opacity: 1;
}
.in-focus {
  opacity: 1;
}
.suggestion-container {
  position: absolute;
  left: 4em;
  top: 8.5em;
  width: 80%;
  max-width: 29.99em;
}
</style>