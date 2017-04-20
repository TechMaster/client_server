<template>
    <div id="app">
        <div class="container">
          <div class="row">
            <h1 class="text text-center text-success">Vue Express</h1>
            <hr/>
            <select v-model="selected" name="selectOpt" v-on:change="getList()" class="form-control">
                <option v-for="item in selectItems" :value="item.type">{{ item.name }}</option>
            </select>
            <div>
                <h3 class="text-center text-danger">Selected: {{selected}}</h3>
                <display :things="things" class="center-block col-md-12" ></display>
            </div>
          </div>
        </div>
    </div>
</template>
<script>

	export default {
		data() {
			return {
				selected: 0,
				things: [],
				errorMsg: '',
        thing : {
          border : '1px solid red'
        },
        animal : {
          border  :'1px solid green'
        }

			}
		},

		methods: {
			getList() {
				axios.post('/querydata', {
					selectedType: this.selected
				}).then(response => {
					console.log(response)
					this.things = response.data
				}).catch(error => {
					this.errorMsg = 'No user or no location'
					this.things = []
				})
			}
		}
	}
</script>
<style lang="css">
</style>
