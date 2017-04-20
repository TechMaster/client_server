/*
 * Created by Linh Ngo in 17/04/2017
 */
var path = require('path')
var express = require('express')
var expressVue = require('express-vue')
const bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/public', express.static(__dirname + '/public'));
app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    defaultLayout: 'layout'
});

const things = require('./model/thing.js').allthings;

const selectItems = [
    { name: '-Select option-', type: 0 },
    { name: 'thing', type: 1 },
    { name: 'animal', type: 2 },
    { name: 'all', type: 3 }
];

var exampleMixin = {
    methods: {
        showImg: function (type) {
            let selectedOpt = parseInt(type);
            switch (selectedOpt) {
                case 1:
                    return this.images.filter(thing => thing.type === 1);
                case 2:
                    return this.images.filter(thing => thing.type === 2);
                case 3:
                    return this.images;
                default:
                    return [];
            }
        }
    }
}
//
app.get('/', (req, res) => {
    let scope = {
        data: {
            title: 'Demo Vue',
            selected: 0,
            selectItems: selectItems,
            images: things
        },
        vue: {
            mixins: [exampleMixin]
        }
    }
    res.render('index', scope);
})

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});
