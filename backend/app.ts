import mongoose from 'mongoose';
import app from './src/server';

const db = mongoose.connection;

// connect db
mongoose.connect('mongodb://localhost/project-managment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose depcrecated this function
mongoose.set('useFindAndModify', false);

db.once('open', () => {
    console.log('MongoDB connected');
});

db.on('error', (err) => {
    console.error(`MongoDB Error → ${err.message}`);
});

// start the app
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
