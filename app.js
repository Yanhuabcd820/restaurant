const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//******* */
app.use(express.static('public'))
//******* */

const restaurantList = require('./restaurant.json')

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantChosen = restaurantList.results.find((restaurant) => {
    return restaurant.id.toString() === req.params.restaurantId
  })
  res.render('show', { restaurant: restaurantChosen })
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantFilter = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log(restaurantFilter)


  res.render('index', { restaurant: restaurantFilter, keyword: keyword, })
})

app.listen(port, () => {
  console.log(`the web is running http://localhost:${port}`)
})