const fs = require('fs');
const path = require('path');
module.exports = function(ctx) {
  let rootdir = ctx.opts.projectRoot;
  let android_dir = path.join(ctx.opts.projectRoot, 'platforms/android');

  let gradle_file = rootdir + '/resources/android/build-extras.gradle';
  let dest_gradle_file = android_dir + '/build-extras.gradle';

  if (!fs.existsSync(gradle_file)) {
    console.log(gradle_file + ' not found. Skipping');
    return;
  } else if (!fs.existsSync(android_dir)) {
    console.log(android_dir + ' not found. Skipping');
    return;
  }
  fs.createReadStream(gradle_file).pipe(fs.createWriteStream(dest_gradle_file));
  console.log('Extended Android build-extras.gradle');
};
