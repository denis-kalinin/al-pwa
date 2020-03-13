import { IOpenIDConnect } from '@/services/security/oid/IOpenIDConnect';
import OpenIDConnectResponseType from '@/services/security/oid/OpenIDConnectResponseType';
import OpenIDConnectScopes from '@/services/security/oid/OpenIDConnectScope';
import OpenIDConnectResponseMode from '@/services/security/oid/OpenIDConnectResponseMode';
import { getNonce } from '@/services/security/SecurityUtils';
import GoogleCredentials from '@/services/security/oid/providers/google.com/GoogleCredentials';
import GoogleOidcLoginComponent from '@/services/security/oid/providers/google.com/GoogleOidcLoginComponent.vue';
import router from '@/router';

class GoogleOIDProvider implements IOpenIDConnect {
  authorizeURI = 'https://accounts.google.com/o/oauth2/v2/auth';

  redirectURI = '/oidc_login/google.com';

  clientID!: string;

  scope = [OpenIDConnectScopes.OpenID, OpenIDConnectScopes.Profile];

  responseType = OpenIDConnectResponseType.IdToken;

  responseMode = OpenIDConnectResponseMode.Fragment;

  constructor(clientID: string) {
    this.clientID = clientID;
  }

  getURL(state?: string): string {
    const { port, hostname, protocol } = window.location;
    const addPort = port ? `:${port}` : '';
    const redirUri = `${protocol}//${hostname}${addPort}${this.redirectURI}`;
    const addState = state ? `&state=${state}` : '';
    return `${this.authorizeURI}?client_id=${this.clientID}&redirect_uri=${redirUri}&scope=${this.scope.join(' ')}&response_type=${this.responseType}&response_mode=${this.responseMode}${addState}&nonce=${getNonce()}`;
  }
}
const googleOIDProvider = new GoogleOIDProvider('68264329838-mp2p3l66d22uofvjdlih3621gh05o9i1.apps.googleusercontent.com');
router.addRoutes([{
  path: googleOIDProvider.redirectURI,
  component: GoogleOidcLoginComponent,
}]);
export { googleOIDProvider, GoogleCredentials };
