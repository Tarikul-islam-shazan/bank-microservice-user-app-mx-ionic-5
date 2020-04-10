const fs = require('fs'),
  path = require('path'),
  moment = require('moment'),
  xml2js = require('xml2js');

module.exports = function(ctx) {
  let environment = ctx.build.configuration;
  if (environment) {
    if (environment === 'production') {
      environment = 'prod';
    }
    // copy and replace google service json file to root
    copyFiles(`google-service-files/${environment}`, './', ['google-services.json', 'GoogleService-Info.plist']);
    // update config.xml and semantic-versioning.json file based on selected environment.
    // update properties [appVersion, releaseDate, Hostname preference->iOS cookies]
    writeAppBuildVersion(environment);
  }
};

function copyFiles(srcDir, destDir, files) {
  files.map(f => {
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  });
  console.log('Google json files copied to Root');
}

function writeAppBuildVersion(environment) {
  // writing app version number and release data in config.xml from semantic-versioning.json
  // writing config.xml Hostname preference based on selected environment
  let semanticFileName = 'semantic-versioning.json';
  let semanticFilePath = path.normalize(path.resolve(`./src/environments/${semanticFileName}`));
  let configFileName = 'config.xml';
  let configFilePath = path.normalize(path.resolve(`./${configFileName}`));
  let parser = new xml2js.Parser();
  fs.readFile(semanticFilePath, { encoding: 'utf8' }, function(err, versioning) {
    if (err) throw err;
    let semanticVersioning = JSON.parse(versioning);
    let appVersion = semanticVersioning.appVersion;
    let major = parseInt(appVersion.split('.')[0]);
    let minor = parseInt(appVersion.split('.')[1]);
    let patch = parseInt(appVersion.split('.')[2]);
    if (semanticVersioning.major) {
      major++;
    }
    if (semanticVersioning.minor) {
      minor++;
    }
    if (semanticVersioning.patch) {
      patch++;
    }
    let newAppVersion = `${major}.${minor}.${patch}`;
    semanticVersioning.appVersion = newAppVersion;
    semanticVersioning.releaseDate = moment().format('MMMM DD, YYYY');
    fs.writeFile(semanticFilePath, JSON.stringify(semanticVersioning, null, 2), err => {
      if (err) throw err;
      modifyConfigFile();
    });

    function modifyConfigFile() {
      fs.readFile(configFilePath, { encoding: 'utf8' }, function(err, data) {
        if (err) throw err;
        parser.parseString(data, function(err, result) {
          if (err) throw err;
          result.widget.$['version'] = semanticVersioning.appVersion;
          let uppdateiOSHostName = result.widget.platform.find(element => {
            return element.$.name === 'ios';
          });
          const domainHostname = getDomainHostname();
          if (domainHostname) {
            uppdateiOSHostName.preference = [{ $: { name: 'Hostname', value: domainHostname } }];
          }
          rewriteConfig(result);
        });
      });
    }

    function getDomainHostname() {
      let envFile = path.normalize(path.resolve(`./src/environments/environment.${environment}.ts`));
      let srcContent = fs.readFileSync(envFile, 'utf8');
      let result = srcContent.match(/serviceUrl.*?\,/);
      if (result && result[0]) {
        let extractURL = result[0].match(/'.*?\'/);
        if (extractURL && extractURL[0]) {
          let extractDomainName = extractURL[0].replace(/^'|'$/g, '').match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
          if (extractDomainName && extractDomainName[1]) {
            return extractDomainName[1];
          }
        }
      }
      return false;
    }

    function rewriteConfig(result) {
      fs.writeFile(configFilePath, buildXML(result), { encoding: 'utf8' }, function(err) {
        if (err) throw err;
        console.log('App version and release date updated and save to config xml and environment file');
      });
    }

    function buildXML(obj) {
      let builder = new xml2js.Builder();
      let x = builder.buildObject(obj);
      return x.toString();
    }
  });
}
