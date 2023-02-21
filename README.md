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

#### Glossary & FAQ CMS

- Glossary and FAQ entries are published and maintained via Notion-as-a-CMS.
  - The Notion page that contains the source content for generated Glossary HTML -> https://www.notion.so/arbitrum/Glossary-CMS-0718756f84b44dcfa8907a72854550cf
  - The Notion page that contains the source content for generated FAQ HTML -> https://www.notion.so/arbitrum/Governance-FAQ-fbfc0a81d99b46eca2cbc30c51752af0
- We generally don't modify the glossary markdown/html directly - instead, we make changes to one of the above Notion pages - treating notion as "content source control" for our glossary.
- We're using a Github action to run a piece of typescript that pulls content from the above Notion databases, generates HTML, and issues a PR with the latest content (if source and target are different).
- If you're reviewing a PR and notice issues related to the script or content, you can make your fix (if content, update in Notion) and then rerun the script from the branch you're using.
- The default config for the action is to just replace the open pr with a new one when it runs
- To run locally:
  - setup a `.env` file inside the notion-docs folder. The format is like an INI file.
  - the github action is using a package called dotenv which autoloads that and then process.env.NOTION_TOKEN is defined in the file
  - in it you can put NOTION_TOKEN=secret_ask_via_content_os_channel_in_slack in the with NOTION_TOKEN defined
  - run `yarn update:all` in the `notion-docs` folder and both FAQ and Glossary will be updated
- To run remotely:
  - you need to manually trigger the action
  - to trigger the action you go to https://github.com/CoolChainCo/docs/actions/workflows/update-glossary.yaml and then hit the "run workflow" button
  - you can select a different branch to run the workflow from so it's easier to iterate on the action
- FINAL-TODO: clean this up, prep for launch