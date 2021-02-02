const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');

///Creating server 
const app = express();

connectDatabase();

///enable cors
app.use(cors());

///Habilitinh JSON express
app.use(express.json({extended: true}));

///App port
const PORT = process.env.PORT || 4000;

///Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/activities', require('./routes/activities'));

app.get('/', (req, res) => {
    res.send('Hola perras');
});

app.listen(PORT, () => {
    console.log(`Server is working in port ${PORT}`);
});
