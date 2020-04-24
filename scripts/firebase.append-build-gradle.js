const fs = require('fs');
const path = require('path');
module.exports = function(ctx) {
  let rootdir = ctx.opts.projectRoot;
  let android_dir = path.join(ctx.opts.projectRoot, 'platforms/android');

  let inject_gradle_file = rootdir + '/resources/android/append-build.gradle';
  let dest_gradle_file = android_dir + '/build.gradle';
  if (!fs.existsSync(inject_gradle_file)) {
    console.log(inject_gradle_file + ' not found. Skipping');
    return;
  } else if (!fs.existsSync(android_dir)) {
    console.log(android_dir + ' not found. Skipping');
    return;
  }
  fs.appendFileSync(dest_gradle_file, fs.readFileSync(inject_gradle_file).toString());
  console.log('Extended Android build.gradle');
};
