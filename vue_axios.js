const path = require('path')
const express = require('express')
const expressVue = require('express-vue')
const app = express()
const things = require('./model/things.js').Things;
app.use('/public', express.static('public'))


app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

//--------Body Parser ----------------------
const bodyParser = require("body-parser")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}))

// parse application/json
app.use(bodyParser.json())




app.get('/', (req, res) => {
	let scope = {
			data:  {
				selectItems : [
					{ name: '-', type: 0 },
			    { name: 'thing', type: 1 },
			    { name: 'animal', type: 2 },
			    { name: 'all', type: 3}
				]
			},
			vue: {
        components: ['display']
      },

	};
	res.render('index_axios', scope);
})

app.post('/querydata', (req, res) => {
	res.json(things.getThing(req.body.selectedType))
})


app.listen(3000, () => {
	console.log('Express server listening on port 3000');
});
