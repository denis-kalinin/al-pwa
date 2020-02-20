import { expect, use } from 'chai';
import 'chai/register-should';
import chaiAsPromised from 'chai-as-promised';
// import './mocks/storage-mock';
import FirestoreUserService from '@/firestore/FirestoreUserService';
import EventBus from '@/services/eventbus';

use(chaiAsPromised);

const isDebugMode : boolean = false;
const firestoreUserService = new FirestoreUserService();
const credentials = { username: 'test@example.com', password: 'qwerty' };

console.debug = (message?: any, ...args:[any]) : void => {
  if (isDebugMode) console.log(message, ...args);
};

describe('Firestore Authentication tests', () => {
  beforeEach(() => {
    EventBus.$off('firestore-auth-request');
    EventBus.$off('firestore-auth-credentials');
  });

  it(
    'getJWT() => wait credentials for 3s',
    (done) => {
      setTimeout(done, 3000);
      firestoreUserService.getJWT()
        .then(() => { throw new Error('Expected to be completed by timeout'); });
    },
  ).timeout(5000);

  it(
    'getJWT() => wrong credentials => fail',
    () => {
      const wrongCredentials = { username: 'fail@example.com', password: 'qwertyyy' };
      EventBus.$on(
        'firestore-auth-request',
        () => EventBus.$emit('firestore-auth-credentials', wrongCredentials),
      );
      firestoreUserService.getJWT().should.eventually.be.rejected;
    },
  );

  it(
    'getJWT() => provide credentials => logout()',
    (done) => {
      EventBus.$on(
        'firestore-auth-request',
        () => EventBus.$emit('firestore-auth-credentials', credentials),
      );
      firestoreUserService.getJWT()
        .catch(() => {
          throw new Error('empty refresh token, but we expect it');
        })
        .then((refreshToken) => {
          console.debug('RefreshToken OK');
          expect(refreshToken).not.to.be.empty;
          firestoreUserService.logout().should.eventually.be.fulfilled;
          done();
        });
    },
  );

  it('login() => logout()', async () => {
    await firestoreUserService.login(credentials).should.eventually.be.fulfilled;
    await firestoreUserService.logout().should.eventually.be.fulfilled;
  });

  it(
    'login() => logout(false) => refreshAuthentication()',
    async () => {
      await firestoreUserService.login(credentials).should.eventually.be.fulfilled;
      const refToken1 = firestoreUserService.refreshToken;
      expect(refToken1, 'refToken1 is null').not.to.be.null;
      await firestoreUserService.logout(false).should.eventually.be.fulfilled;
      const refToken2 = firestoreUserService.refreshToken;
      expect(refToken2, 'refToken2 is null').not.to.be.null;
      if (refToken2) {
        FirestoreUserService.refreshAuthentication(refToken2)
          .should.eventually.be.fulfilled;
      } else {
        throw new Error('refToken is null');
      }
    },
  );

  it('login() => logout() => getJWT() : should wait for input 3s', (done) => {
    firestoreUserService.login(credentials)
      .then(() => firestoreUserService.logout())
      .then(() => setTimeout(done, 3000))
      .then(() => firestoreUserService.getJWT());
  }).timeout(5000);
});
