import * as core from '@actions/core';
import { context } from '@actions/github/lib/utils';
import { getToken } from './auth';

async function run(): Promise<void> {
  try {
    const authType = core.getInput('auth_type', { required: true }) as 'installation' | 'app';
    const appId = Number(core.getInput('app_id', { required: true }));
    const appBase64PrivateKey = core.getInput('app_base64_private_key', {
      required: true,
    });
    const orgInput = core.getInput('org', { required: false });
    const org = orgInput !== '' ? orgInput : context.repo.owner;

    const token = await getToken({
      appId,
      base64PrivateKey: appBase64PrivateKey,
      type: authType,
      org,
    });

    core.setOutput('token', token);
  } catch (error) {
    core.debug(error);
    core.setFailed(error.message);
  }
}

run();
