import OpenIDConnectScope from '@/services/security/oid/OpenIDConnectScope';
import OpenIDConnectResponseType from '@/services/security/oid/OpenIDConnectResponseType';
import OpenIDConnectResponseMode from '@/services/security/oid/OpenIDConnectResponseMode';
/**
 * OpenID provider interface
 */
export interface IOpenIDConnect {
  readonly authorizeURI: string;

  readonly redirectURI: string;

  readonly clientID: string;

  readonly scope: OpenIDConnectScope[];

  readonly responseType: OpenIDConnectResponseType;

  readonly responseMode: OpenIDConnectResponseMode;

  /**
   * Gets URL for authentication
   * @param state The state is an optional value that is carried through the whole flow and returned
   * to the client.
   *
   * It's common to use state to store an anti-forgery token that can be verified after the login
   * flow is complete. Another common use is storing the location the user should be redirected to
   * after logging in.
   */
  getURL(state?: string): string;

}
