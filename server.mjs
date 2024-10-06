const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// Define a Mongoose schema and model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gmail: { type: String, required: true, unique: true }, 
});

const Item = mongoose.model('Item', itemSchema);

//Post 
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json(err);
    }
});

