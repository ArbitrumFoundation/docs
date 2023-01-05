# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

#### Glossary CMS

- glossary entries are published and maintained via Notion-as-a-CMS
- this page is the source content for generated glossary html -> https://www.notion.so/arbitrum/Glossary-CMS-0718756f84b44dcfa8907a72854550cf 
- we generally don't modify the glossary markdown/html on source control - instead, we make changes in notion
- we're using a remote github action to run a piece of typescript that pulls content from notion, generates quicklook-enabled HTML, and issues a PR with these changes 
- if you're reviewing a PR and notice issues related to the script or content, you can make your fix and then rerun the script from the branch you're using.
- the default config for the action is to just replace the open pr with a new one when it runs
- you can select a different branch to run the workflow from so it's easier to iterate on the action
- to run locally, setup a `.env` file inside the notion-docs folder. The format is like an INI file.
- the github action is using a package called dotenv which autoloads that and then process.env.NOTION_TOKEN is defined in the file
- in it you can put NOTION_TOKEN=secret_ask_via_content_os_channel_in_slack in the with NOTION_TOKEN defined and run `yarn update-glossary` in the notion-docs it should work
- if you see `'ts-node' is not recognized as an internal or external command`....