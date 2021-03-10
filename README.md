# App token action

A GitHub action that obtains a token for an app authorization which can used instead of a personal access token (PAT) for example. Currently the *app* and *installation* scope are supported. For more details check out the GitHub App authentication [docs](https://docs.github.com/en/free-pro-team@latest/developers/apps/authenticating-with-github-apps)

Before the action can be used the APP has to be installed on the subject repository or in the organization scope.


## Inputs

| parameter              | description                                                   | required | default |
| ---------------------- | ------------------------------------------------------------- | -------- | ------- |
| app_id                 | Application ID                                                | `true`   |         |
| app_base64_private_key | Application SSH private key as base64                         | `true`   |         |
| auth_type              | Authorization type, either app or installation                | `false`  | app     |
| org                    | Name of the org, if not provided will be read from the event. | `false`  |         |


## Outputs

| parameter | description       |
| --------- | ----------------- |
| token     | Application token |


## Runs

This action is an `node12` action.

### Example

Below an example snippet how to use the action.

```yml
job:
  name: Get App token
  id: get_token
  runs-on: self-hosted
  steps:
    - uses: philips-software/app-token-action@<version>
      with:
        app_id: ${{ secrets.APP_ID }}
        app_base64_private_key: ${{ secrets.APP_BASE64_PRIVATE_KEY }}
        auth_type: installation
    - uses: a-next-action
      with:
        token: ${{ steps.get_token.outputs.token }}

```

## Development

Standard commands such as lint, test and build are available via yarn. Check [package.json] for more details.

### Test locally

Running locally requires you hav have an app in your org that is installed on one or more repositories. To run the local ensure you have set the environment variables:

- `INPUT_AUTH_TYPE` : `app` or `token`
- `INPUT_APP_ID` and `INPUT_APP_BASE64_PRIVATE_KEY`: The app id and app ssh key. 
-`INPUT_ORG`: The org in which the app is installed.


**Example:**

```bash
export INPUT_ORG=philips-software
export INPUT_APP_ID=1234
export INPUT_AUTH_TYPE=installation
export INPUT_APP_BASE64_PRIVATE_KEY=$(cat my.pem | base64)
yarn watch
```

## Contribution

We welcome contributions, please checkout the [contribution guide](CONTRIBUTING.md). 


## License

This project are released under the [MIT License](./LICENSE).

## Philips Forest

This module is part of the Philips Forest.

```
                                                     ___                   _
                                                    / __\__  _ __ ___  ___| |_
                                                   / _\/ _ \| '__/ _ \/ __| __|
                                                  / / | (_) | | |  __/\__ \ |_
                                                  \/   \___/|_|  \___||___/\__|

                                                                            CI
```