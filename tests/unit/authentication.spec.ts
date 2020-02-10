import { expect, use } from 'chai';
import 'chai/register-should';
import chaiAsPromised from 'chai-as-promised';
import axios, { AxiosRequestConfig } from 'axios';
import Authentication from '@/components/auth/Authentication';
import { IAuthProvider } from '@/components/auth/IAuthProvider';
import FirebaseAuthProvider from '@/components/auth/FirebaseAuthProvider';

use(chaiAsPromised);

const authProvider: IAuthProvider = new FirebaseAuthProvider('AIzaSyBc3wJtqQcjk95bk9cZZI8fzZ-PcA13hlI');
const credentials = { username: 'test@example.com', password: 'qwerty' };

describe('Firebase Authentication tests', () => {
  it('Sing in with IAuthProvider', (done) => {
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
  /*
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
  */
  it('Sing In with wrong credentials', () => Authentication
    .authenticate(credentials.username, 'asdfg', authProvider)
    .should.eventually.be.rejected);
});
