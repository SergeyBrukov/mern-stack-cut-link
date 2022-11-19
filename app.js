// const express = require('express');
// const config = require('config');
// const mongoose = require('mongoose');

// const PORT = config.get('port') || 5000;

// const app = express();

// app.use('/api/auth', require('./routers/auth.routes'));

// const start = async () => {
//   try {
//     await mongoose.connect(config.get('mongoURL'));
//     app.listen(PORT, () => {
//       console.log(`App has been started on port ${PORT}`);
//     });
//   } catch (e) {
//     console.error('Server error', e.message);
//     process.exit(1);
//   }
// };
// start();

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = config.get('port') || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routers/auth.routes'));
app.use('/api/link', require('./routers/link.routes'));
app.use('/t', require('./routers/redirect.routes'));

/////
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
/////
const start = async () => {
  try {
    await mongoose.connect(config.get('mongoURL'));
    app.listen(PORT, () => {
      console.log(`This server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
