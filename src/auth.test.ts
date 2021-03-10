import nock from 'nock';
import { getToken, Parameters } from './auth';

const testOrg = 'philips-test';

// Key generated via a dummy app and encoded as base64 string
const testBase64PrivateKey =
  'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBM3J3c0xiM2xzdDlYMmZGLzVvUnJkNnphbVdKYStPak1FNCtwNUFyOC9PNUltQjVRCkhCaUhaK3dUVW4ya3pNUTcvQnpqYUNDc0o1SWkxY3BvajdRR000UEZ3K1p2ZXdTNlN2c3o5RXd6dGUwRjRjSlYKOUVVODlaTmQwZ3VSdjR0bHVUbG5nYzBaSWovTmg1aFV6MHFlNXMrZ25SQlNiSWZRdExrRUhzTUZpQVp1RzV1WgpLNytRZGZUVmJQaUZKSzIwY2VZWDMrYnR5K0VvQmhrUUg4MFd3aU5JMzRhU21LcCt4b2pIelNKdjBLckI2Q2k5CmVMTWNuVzQ4QVNiajVNNG1YUXFKNG1nQ3FYUjRqUHVZZUJCWmVIMzBiZ1F1UFJGMmEyUmU3MFpEY0s3ZlB3UGUKTUQvVjRWOXFFRUVjSTQ2T2JLT1RyK1BPaC9BNnMxcFFnZ3dHWlFJREFRQUJBb0lCQVFDS3hiTEF6US9QNGxkWgo4cDA5Z2tOeXpMOWwwV0hjc3k1ekFZOVlCWUNhRmR3azZyMyt3MG1aOWZ3VDZUUkVYLzcvbFFBYVlFRGlacXBOCmlVNmNPZzJqQ3Zhc2wyWGR2NVJTSXpDN2hMNnpHbm9Qcm9UZkxFUk92UUkzVy8zeTJXY0hnRHg5SXN3R0NycUQKUU9XV1FXZS9acDByUG9BY0hvSnFGdHY2VG9lanR6UWt3bHJBbnRGTVJEVlNob3BtZ3JMREp5VjNPSFlLZVVjbAp3cTZ0WlNZYkM4MWZlYTh0MStQZzBtLzh6MGxUbUh1eUJsbzk5aEJYd2R1V1BOdExlT01FU0U3VXlFSThZaWJsCi8xdmtkQS81N0JWZThob0wzNjIwckYzNzczVnl4aVYrV096SENUcDZqMVlNaFdFQjRSdnQ5dG9SRTlSeEo5MmwKNGMrTlRxQUJBb0dCQVBkMytIcm9CMzBTNDFkNXZha1RteHc5NGRJN3M2L2FWQjdCSnNLaGVOcU94c3Mxdzl5SQpTZ2FSWTJSMXBjUHVrWGdUYVN2V0RRQjIvY0t3RFU4c0FlcGlxOHpzVGM0Zi9lMUFkNkk2dWlnQWtCR2hKTXNnCkJ5MHY3WStpMnYwZ0lPY1RucUY3cDNMc1JzQy8vam9qUnRabUtESS9vaEx3aHUvRzlaZ3BZTnJ4QW9HQkFPWnAKNm90akRxSmRVT0ZSak85eUdBMjc0UnU0ZWZycWJ0VHBaaU1QZFdxK3Iwd0puYlEyRE9YTHJVN0lQbkJIWjIvaQpZTXZLUlZGdUpsSStmUzdBUzRxa091Z2RSODNKYjRCcDkrbVRnWm5vVGhkTG56c0FNSElJVjJVZFkxZGFuUkNlCktmdUFmckpoeGt6WnVDb3VhVHkrOE9YTmRnL1MwZTFZVllub0lOcTFBb0dBTlJ3UlBzZG5QQWQrdFBwU291T3IKU1U5YWxKVHRobE1UOUptOWFNM2dzdjhyV05kTUZwdEZUODJLQ0RoYmdBWkdQLy9pZFY3MTRXQ29LMDAvUGZ1UwoyYXVkZFZoTmhteEZRZEt4R2ljQ1pxMWdQZmhZZmlOOGhzMGZiZEVrc0doaHgxWGxtSUNDT2w3TS9IYjM1NkJFCmhxVGNBWlM0Z3RvT0M0Mm1qYVpydS9FQ2dZQVpwT1FqeTB5UHFZOGM1TFNvMmF2dnExOXNkR1d2RlhSc1llV3EKTlVnK0x5YlhjYUtKc2hKUmFRL0sydUtJSUlwVW0zOW1id2F6LzJ4b2J1Z0QwZ2NXVVJ6MVJIei9YRkg2bXRDcQp3RzRHTVNLdjJRekp4a1dlQzJ1ZXAxeXRGanF3NU1tTFlrdTNrc1k5TzJZUjI4UityRW1uYWV5ZjZqalBENnZGCmczNVVtUUtCZ0ZrOFdIOW4rWk4xL1VIdGs3dW9MSlkxUks2dDhqRjlFSVBDUEZlUnFVVVFOM2JPN2NFdEVVQU4KcDB5ekdKSitIZy9hVjlKWjAvRHMvcUI5bnlXSlVzeGlGaWs1K0RPa3lRUGUrNEpOSDIwakJrNDdpeGpJWmV4NQpDQTBPR3dvMVdKdEpwcVNYUnREUC9yRWRlblBObjNiZlFKMVRlQXZabHNNUzVYM2NnbUJvCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg';

const defaultParameters: Parameters = {
  type: 'installation',
  org: 'philips-test',
  appId: 1,
  base64PrivateKey: testBase64PrivateKey,
};

function mockGetOrgInstallation(id: number, org: string): void {
  const responseCode = id < 0 ? 403 : 200;
  nock('https://api.github.com').persist().get(`/orgs/${org}/installation`).reply(responseCode, { id });
}

function mockAppInstallationToken(id: string): void {
  nock('https://api.github.com')
    .persist()
    .post(`/app/installations/${id}/access_tokens`)
    .reply(200, {
      token: 'abcdefgh12345678',
      expires_at: '2222-07-11T22:14:10Z',
      permissions: { issues: 'write' },
    });
}

describe('Auth type installation', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    mockGetOrgInstallation(47, testOrg);
    mockAppInstallationToken('47');
  });

  test('Should throw exception for invalid private key.', async () => {
    await expect(
      getToken({
        ...defaultParameters,
        base64PrivateKey: `invalid${testBase64PrivateKey}`,
      }),
    ).rejects.toThrow();
  });

  test('Create token for valid inputs.', async () => {
    const token = await getToken({
      ...defaultParameters,
    });
    expect(typeof token).toBe('string');
  });
});

describe('App not installed.', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
    mockGetOrgInstallation(-1, 'org-without-apps');
    mockAppInstallationToken('-1');
  });

  test('Should throw exception for app that is not installed..', async () => {
    await expect(
      getToken({
        ...defaultParameters,
        org: 'org-without-apps',
      }),
    ).rejects.toThrow();
  });
});

describe('Auth type 222', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    mockGetOrgInstallation(47, testOrg);
  });

  test('Should throw exception for invalid private key.', async () => {
    await expect(
      getToken({
        ...defaultParameters,
        type: 'app',
        base64PrivateKey: `invalid${testBase64PrivateKey}`,
      }),
    ).rejects.toThrow();
  });

  test('Create token for valid inputs.', async () => {
    const token = await getToken({
      ...defaultParameters,
      type: 'app',
      base64PrivateKey: testBase64PrivateKey,
    });
    expect(typeof token).toBe('string');
  });
});
