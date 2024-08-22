const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const Marks = require('./models/schema')
const expressHandler = require('express-async-handler')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const PORT = 3000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './upload')
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + (file.originalname))
    }
})

const upload = multer({ storage })

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
try {
    mongoose.connect('mongodb://127.0.0.1:27017/MarkRecord')
    console.log('Database connected')
} catch (error) {
    console.log('Connection failed')
}

app.get('/marks', async (req, res) => {
    let data = await Marks.find()
    res.render('index', { data })
})

app.get('/marks/new', (req, res) => {
    res.render('new')
})

app.post('/marks', upload.single('image'), async (req, res) => {
    let data = new Marks({ name, fname, roll, rollc, dob, hindi, sans, maths, ssc, sci, eng, image, image } = req.body)
    console.log(data)
    const newData = await Marks.findOne({ roll })
    if (newData) {
        console.log('Data already saved')
        alert('Data already saved')
    } else {
        await data.save().then(() => {
            console.log('Marksheet Saved')
        }).catch((err) => {
            console.log(err)
        })
    }
    res.redirect('/marks')
})

app.get('/marks/:id', async (req, res) => {
    let { id } = req.params
    let data = await Marks.findById(id)
    console.log(data)
    res.render('show', { data })
})

app.get('/marks/:id/edit', async (req, res) => {
    let { id } = req.params
    let data = await Marks.findById(id)
    res.render('edit', { data })
})

app.put('/marks/:id', async (req, res) => {
    let { id } = req.params
    let data = { hindi, sans, maths, ssc, sci, eng } = req.body
    await Marks.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    res.redirect('/marks')
    console.log('Marksheet updated')
})

app.delete('/marks/:id', async (req, res) => {
    let { id } = req.params
    await Marks.findByIdAndDelete(id)
    res.redirect('/marks')
    console.log('Marksheet Deleted')
})

app.get('/', (req, res) => {
    res.send('Working well : <a href="/marks"> localhost:3000/marks</a>')
})

app.listen(PORT, (req, res) => {
    console.log(`Server has started on : ${PORT}`)
})