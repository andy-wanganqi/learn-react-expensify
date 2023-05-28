const path = require('path');
const express = require('express');
const app = express();
const dist = path.join(__dirname, '../dist');

const assetsExtensions = ['.js', '.css', '.png', '.map'];

app.use(express.static(dist));
app.get('*', (req, res) => {
  if (assetsExtensions.find(a => req.originalUrl.endsWith(a))) {
    const filename = req.originalUrl.split('/').pop();
    console.log(filename);
    res.sendFile(path.join(dist, filename));
  } else {
    res.sendFile(path.join(dist, 'index.html'));
  }
});
app.listen(3000, () => {
  console.log('Server is running.');
});
