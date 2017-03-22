# salamander-migration
This repo maintains the migration tools and scripts for Salamander customer migration to Okta.

https://oktawiki.atlassian.net/wiki/display/eng/Salamander+Customer+Migrations

## Requirements

- [Node JS 7.6 or higher](https://nodejs.org/en/download/)
- (Note to devs: set your IDE project language version to ECMAScript 6)

## Prerequisites
To use this tool, you must have a Stormpath export unzipped on your local filesystem. The directory structure should be as follows:
```
├── home/
│   ├── {tenantId}/
│   │   ├── directories/
│   │   │   ├── {directoryId}.json
│   │   │   ├-- ....
│   │   ├── providers/
│   │   │   ├── {directoryId}.json
│   │   │   ├-- ....
│   │   ├── accounts/
│   │   │   ├── {directoryId}/
│   │   │   │   ├── {accountId}.json
│   │   │   │   ├-- ....
│   │   │   ├-- ....
│   │   ├── groups/
│   │   │   ├── {directoryId}/
│   │   │   │   ├── {groupId}.json
│   │   │   │   ├-- ....
│   │   │   ├-- ....
│   │   ├── organizations/
│   │   │   ├── {organizationId}.json
│   │   │   ├-- ....
```
> Note: Providers must match 1:1 with Directories (same filenames).

> Note: The 'accounts' and 'groups' folders should be segmented by {directoryId} so that it's possible to iterate over them by directory.

Here's a concrete example:
```
├── home/
│   ├── tenant123/
│   │   ├── directories/
│   │   │   ├── 5LInED46hB6nv9auaOrIYW.json
│   │   │   ├── 7ZBZLdnlxFsEtIs4BRpUHk.json
│   │   │   ├-- ....
│   │   ├── providers/
│   │   │   ├── 5LInED46hB6nv9auaOrIYW.json
│   │   │   ├── 7ZBZLdnlxFsEtIs4BRpUHk.json
│   │   │   ├-- ....
│   │   ├── accounts/
│   │   │   ├── 5LInED46hB6nv9auaOrIYW/
│   │   │   │   ├── 8LJuP3l2Lke9XWL4Vpie3o.json
│   │   │   │   ├-- ....
│   │   │   ├── 7ZBZLdnlxFsEtIs4BRpUHk/
│   │   │   │   ├── 4DfxGCAyrxNyiqjPQIHfHI.json
│   │   │   │   ├-- ....
│   │   ├── groups/
│   │   │   ├── 5LInED46hB6nv9auaOrIYW/
│   │   │   │   ├── 1iMYLWrjvnc833sPCBVbtU.json
│   │   │   │   ├-- ....
│   │   │   ├── 7ZBZLdnlxFsEtIs4BRpUHk/
│   │   │   │   ├── d72ghS4bBhaqzuUN6ur1g.json
│   │   │   │   ├-- ....
│   │   ├── organizations/
│   │   │   ├── 7O67Ni1CG5bo9E9NLA3kdg.json
│   │   │   ├-- ....
```

> In this example, the "stormpathBaseDir" would be `/home/tenant123`.

### To Install:
```
npm install
```

### To Run:
```
node migrate.js --stormPathBaseDir /path/to/export/data --oktaBaseUrl https://your-org.okta.com --oktaApiToken 5DSfsl4x@3Slt6
```

### Required Args

**--stormPathBaseDir (-b)** Root directory where your Stormpath tenant export data lives

- Example: `--stormPathBaseDir ~/Desktop/stormpath-exports/683IDSZVtUQewtFoqVrIEe`

**--oktaBaseUrl (-u)** Base URL of your Okta tenant

- Example: `--oktaBaseUrl https://your-org.okta.com`

**--oktaApiToken (-t)** API token for your Okta tenant (SSWS token)

- Example: `--oktaApiToken 00gdoRRz2HUBdy06kTDwTOiPeVInGKpKfG-H4P_Lij`

### Optional Args

**--customData (-d)** Strategy for importing Stormpath Account custom data. Defaults to `schema`.

- Options

  - `schema` - Add [custom user profile schema properties](http://developer.okta.com/docs/api/resources/schemas.html#user-profile-schema-property-object) for each custom data property. Use this for simple custom data objects.
  - `stringify` - Stringify the Account custom data object into one `customData` [custom user profile schema property](http://developer.okta.com/docs/api/resources/schemas.html#user-profile-schema-property-object). Use this for more complex custom data objects.
  - `exclude` - Exclude Stormpath Account custom data from the import

- Example: `--customData stringify`

**--concurrencyLimit (-c)** Max number of concurrent requests to Okta. Defaults to `100`.

- Example: `--concurrencyLimit 200`

**--logLevel (-l)** Logging level. Defaults to `info`.

- Options: `error`, `warn`, `info`, `verbose`, `debug`, `silly`
- Example: `--logLevel verbose`
