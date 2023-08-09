const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const tmpPath = './tmp';
const thirtyMinsAgo = Date.now() - 30 * 60 * 1000;

cron.schedule('*/30 * * * *', () => {
  fs.readdir(tmpPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(tmpPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        if (stats.isFile() && stats.mtimeMs < thirtyMinsAgo) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            console.log(`Deleted file: ${filePath}`);
          });
        }
      });
    });
  });
});
