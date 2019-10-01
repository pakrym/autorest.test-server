const { exec } = require('child_process');
const { writeFileSync, readFileSync } = require('fs');

const project = JSON.parse(readFileSync(`${__dirname}/../package.json`));
const location = `${__dirname}/..`;
process.chdir(location);

if( process.argv.indexOf('--reset') > 0) {
  const origJson = JSON.stringify(project, null, 2);

  // update the third digit
  const verInfo = project.version.split('.');
  verInfo[2] = 0;
  project.version = verInfo.join('.');

  // write the file if it's changed
  const newJson = JSON.stringify(project, null, 2);
  if (origJson !== newJson) {
    console.log(`Writing project '@autorest/test-server' version to '${project.version}' in '${location}'`);
    writeFileSync(`${location}/package.json`, newJson)
  }
  process.exit();
}

exec(`git rev-list --parents HEAD --count --full-history .`, { cwd: location }, (o, stdout) => {
  const patch = (parseInt(stdout.trim()) + (Number(project.patchOffset) || 0));
 
  const origJson = JSON.stringify(project, null, 2);

  // update the third digit
  const verInfo = project.version.split('.');
  verInfo[2] = patch;
  project.version = verInfo.join('.');

  // write the file if it's changed
  const newJson = JSON.stringify(project, null, 2);
  if (origJson !== newJson) {
    console.log(`Writing project '@autorest/test-server' version to '${project.version}' in '${location}'`);
    writeFileSync(`${location}/package.json`, newJson)
  }
});
