<template>
<div class="container-cool">
	<div id="list panel panel-default">

		<div class="list-group">
			<a class="list-group-item" v-for="item in items" @click="load(item)">
			
					{{item}}
			</a>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">Form</div>
			<div class="panel-body">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" class="form"></vue-form-generator>
			<!-- 	<div class="btn-group"> -->
					

					<div v-if="alert == 'error'" class="alert alert-danger">
						<string>{{error.error}}</string> {{error.msg}}
					</div>
					<div v-else-if="alert == 'success'" class="alert alert-success">
						{{error.msg}}
					</div>

					<button type="button" class="btn btn-default" @click="save">
						Запиши
					</button>
					<button type="button" class="btn btn-default" @click="clear">
						Нов
					</button>

	
				<!-- </div> -->
			</div>
		</div>
	</div>
</div>

</template>

<script>
import VueFormGenerator from "vue-form-generator"
import moment from "moment"
let schema
let curr_db
// Vue.use(VueFormGenerator);

export default {
	components: {
		VueFormGenerator: VueFormGenerator.component
	},
	async mounted() {
		try{
			schema = this.$pouchDB.schema()
			 
			console.log("Loading admin UI", this)
			if(this.$route.params.db){
				curr_db = this.$pouchDB[this.$route.params.db]()
				let object = await schema.get(this.$route.params.db)
				
				let {rows} = await curr_db.allDocs()
				let ids = rows.map(r => r.id).filter(r => !r.startsWith("_"))
				
				//let first = await curr_db.get(ids[0])

				// console.log(schema, first)
				this.schema = object.schema
				this.load(ids[0])
				
				this.items = ids
			//	this.success("Упсешно зареди")
			}
		}catch(err){
			this.error(err)
		}

		this.$emit("bg", "#FFF")

	},
	methods: {
		async load(id){
			this.model = await curr_db.get(id)

		},
		clear() {
			this.model = {
				_id: moment().toISOString()
			}
		},
		async save(){
			try{
				let res = await curr_db.put(this.model)
				console.log(res)
				//this.load(this.model._id)
				this.model._rev = res.rev
				this.success("Упсешно съхранихте")
			}catch(err){
				this.error(err)
			}
		},
		error(err){
			this.alert = "error" 
			this.error.msg = err.reason
			this.error.error = err.error
		},
		success(msg){
			this.alert = "success" 
			this.error.msg = msg
		}
	},
	data:() =>{ 
		return {
			model: {},
			formOptions: {
				validateAfterLoad: true,
				validateAfterChanged: true
			},
			schema: {},
			items: [],
			error: {
				open: false
			},
			alert: ""
		}
	}
}

</script>

<style lang="stylus">

// @import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
@import "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css"

.container-cool
	display: flex
	> *
		margin 10px
	
.panel
	flex 4
	// border none
	
.form .vue-form-generator
	border none

#list
	flex 1
	

</style>
