name: Autocloser
on:
  issues:
    types: [opened, edited, reopened]
jobs:
  autoclose:
    runs-on: ubuntu-latest
    steps:
    - name: Autoclose issues
      uses: arkon/issue-closer-action@v3.4
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        rules: |
          [
            {
              "type": "title",
              "regex": ".*Psst, this issue will be closed with a templated response if it isn't a documentation update request.*",
              "message": "@${issue.user.login} Hi there! It looks like you submitted an update request template without filling in the details. I'm going to close this for now, but feel free to reopen if you have a specific update request.💙🧡"
            }
          ]