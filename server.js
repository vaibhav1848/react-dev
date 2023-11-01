const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// mongo
mongoose.connect('mongodb+srv://root:root@cluster0.y318cp8.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const dataSchema = new mongoose.Schema({
  input1: String,
  input2: String,
  input3: String,
  input4: String,
  input5: String,
  input7: Number,
  
}, { timestamps: true }); 

const DataModel = mongoose.model('Data', dataSchema);

app.use(express.json());
app.use(cors());

app.post('/submit', async (req, res) => {
  try {
   
    const { input1, input2, input3, input4, input5, input7 } = req.body;

   
    const newData = new DataModel({
      input1,
      input2,
      input3,
      input4,
      input5,
      input7,
      
    });

    await newData.save();

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data.' });
  }
});

app.get('/recent-data', async (req, res) => {
  try {
    const recentData = await DataModel.find().sort({ createdAt: -1 }).limit(10);
    res.json(recentData);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch recent data' });
  }
});

app.get('/latest-data', async (req, res) => {
    try {
      
      const latestData = await DataModel.find().sort({ _id: -1 }).limit(10); 
      if (latestData.length > 0) {
        res.status(200).json(latestData[0]); 
      } else {
        res.status(404).json({ error: 'No data found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch the latest data' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
