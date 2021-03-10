import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

export interface Parameters {
  type: 'installation' | 'app';
  appId: number;
  base64PrivateKey: string;
  org: string;
}

export const getAppToken = async (key: string, id: number): Promise<string> => {
  const authAuth = createAppAuth({
    appId: id,
    privateKey: key,
  });
  const auth = await authAuth({
    type: 'app',
  });

  return auth.token;
};

export const getAppInstallationToken = async (privateKey: string, appId: number, org: string): Promise<string> => {
  const appToken = await getAppToken(privateKey, appId);
  const octokit = new Octokit({ auth: appToken });

  try {
    const installationId = await octokit.apps.getOrgInstallation({
      org,
    });
    const authAuthInstallation = createAppAuth({
      appId,
      privateKey,
      installationId: installationId.data.id,
    });

    const auth = await authAuthInstallation({
      type: 'installation',
    });

    return auth.token;
  } catch (e) {
    throw new Error(`Cannot find installation for app with id: ${appId}. Did you installed your app in a repo?`);
  }
};

export const getToken = async (parameters: Parameters): Promise<string | undefined> => {
  let token = undefined;

  const privateKey = Buffer.from(parameters.base64PrivateKey, 'base64').toString();
  switch (parameters.type) {
    case 'installation': {
      token = await getAppInstallationToken(privateKey, parameters.appId, parameters.org);
      break;
    }
    case 'app': {
      token = await getAppToken(privateKey, parameters.appId);
      break;
    }
  }
  return token;
};
