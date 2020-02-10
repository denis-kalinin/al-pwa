import { expect, use } from 'chai';
import 'chai/register-should';
import chaiAsPromised from 'chai-as-promised';
import { getModule } from 'vuex-module-decorators';
// import axios, { AxiosRequestConfig } from 'axios';
// import Authentication from '@/components/auth/Authentication';
// import { IAuthProvider } from '@/components/auth/IAuthProvider';
import FirestoreAuthentication from '@/network-api/FirestoreAuthentication';
import AuthenticationStateModule from '@/store/modules/auth';
import store from '@/store';
import './mocks/storage-mock';

use(chaiAsPromised);

const credentials = { username: 'test@example.com', password: 'qwerty' };
const firestoreAuthentication = new FirestoreAuthentication();
const authState: AuthenticationStateModule = getModule(AuthenticationStateModule, store);

describe('Firestore Authentication tests', () => {
  it('getJWT() requires SingIn', () => firestoreAuthentication.getJWT()
    .should.eventually.be.rejected);

  it('getJWT() and after it failes, singIn with user/password', () => {
    const { username, password } = credentials;
    return firestoreAuthentication.getJWT()
      .catch((err) => firestoreAuthentication.authenticate(username, password))
      .should.eventually.be.fulfilled;
  });

  it('refresh token', () => {
    const { username, password } = credentials;
    return firestoreAuthentication
      // try refresh;
      .refreshAuthentication()
      // fail and authenticate
      .catch((err) => firestoreAuthentication.authenticate(username, password))
      // remove idToken
      .then((idToken) => {
        authState.setIdToken('');
        return authState.idToken;
      })
      // get new idToken
      .then((idToken) => {
        expect(authState.idToken).to.be.equal('', 'idToken is not empty in the AuthState');
        return firestoreAuthentication
          .refreshAuthentication()
          .catch((err) => {
            console.error('Refresh error', err);
            return err;
          });
      })
      // print id Token
      .then((idToken) => {
        expect(idToken).not.to.be.empty;
        console.log('NEW TOKEN!');
        return idToken;
      })
      .should.eventually.be.fulfilled;
  });
  /*
  it('Sing in with FirestoreAuthentication', (done) => {
    firestoreAuthentication.getJWT();
    const { url, data, config } = authProvider.getNewJWTRequestData(credentials);
    axios
      .post(url, data, config)
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Not 2xx response:', error.response.data);
        } else if (error.request) {
          console.log('Request error: ', error.request);
        } else {
          console.log('Error', error.message);
        }
      })
      .should.eventually
      .be.fulfilled
      .and.nested.include({ 'data.email': credentials.username }, 'Email doesn\'t match')
      .and.notify(done);
  });

  it('Sign In with Authentication', (done) => {
    Authentication.authenticate(
      credentials.username,
      credentials.password,
      authProvider,
    )
      .should.eventually.be.fulfilled
      .and.nested.include({ 'data.email': credentials.username }, 'Email doesn\'t match')
      .and.notify(done);
  });

  it('Sing In with wrong credentials', (done) => {
    Authentication.authenticate(
      credentials.username,
      'asdfg',
      authProvider,
    )
      .should.eventually.be.rejected
      .and.notify(done);

    // .catch((error) => {
    //  if (error.response) {
    //    console.log('Not 2xx response:', error.response.data);
    //    console.dir(error.response.data.error.errors);
    //  } else if (error.request) {
    //    console.log('Request error: ', error.request);
    //  } else {
    //    console.log('Error', error.message);
    //  }
    //})
  });

  it('Sing In with wrong credentials', () => Authentication
    .authenticate(credentials.username, 'asdfg', authProvider)
    .should.eventually.be.rejected);
  */
});
