const yargs = require('yargs');
const util = require('util');
const fs = require('fs');

var argv = yargs.usage('\nMigration tool to import Stormpath data into an Okta tenant\n\n' +
           'Usage:\n\t$0 --stormPathBaseDir {/path/to/export/data} --oktaBaseUrl {https://your-org.okta.com} --oktaApiToken {token}',
        {
            stormPathBaseDir: {
                description: 'Root directory where Stormpath export data lives',
                required: true,
                alias: 'b'
            },
            oktaBaseUrl: {
                 description: 'Base URL of your Okta tenant',
                 required: true,
                 alias: 'u'
            },
            oktaApiToken: {
                 description: 'API token for your Okta tenant (SSWS token)',
                required: true,
                alias: 't'
            }
        }
    )
    .example('\t$0 --stormPathBaseDir /path/to/export/data --oktaBaseUrl https://your-org.okta.com --oktaApiToken 5DSfsl4x@3Slt6', '')
    .check(function(argv, aliases) {
        if (!fs.existsSync(argv.stormPathBaseDir)) {
            return '"' + argv.stormPathBaseDir + '" is not a valid stormpath base directory.'
        }
        return true;
    })
    .argv;

//Configure globals:
global.stormPathBaseDir = argv.stormPathBaseDir;
global.oktaBaseUrl = argv.oktaBaseUrl;
global.oktaApiToken = argv.oktaApiToken;
global.oktaApiHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': util.format('SSWS %s', global.oktaApiToken)
};

//Run migration business logic:
require('./migrators/migrateDirectories');

//TODO:
//require('./migrators/migrateGroups');
//require('./migrators/migrateApplications');
//require('./migrators/migrationOrganizations');
//require('./migrators/migratePolicies');
