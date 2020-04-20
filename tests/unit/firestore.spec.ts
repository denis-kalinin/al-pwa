import { expect, use } from 'chai';
import 'chai/register-should';
import chaiAsPromised from 'chai-as-promised';
// import './mocks/storage-mock';
import FirestoreUserService from '@/services/firestore/FirestoreUserService';
import FirestoreApi from '@/services/firestore/api/FirestoreApi';
import EventBus from '@/services/eventbus';

use(chaiAsPromised);

const isDebugMode : boolean = true;
const firestoreUserService = new FirestoreUserService();
const credentials = { username: 'test@example.com', password: 'qwerty' };

console.debug = (message?: any, ...args:[any]) : void => {
  if (isDebugMode) console.log(message, ...args);
};

describe('Firestore tests', () => {
  it('fetch data', (done) => {
    EventBus.$on(
      'firestore-auth-request',
      () => EventBus.$emit('firestore-auth-credentials', credentials),
    );
    FirestoreApi.getFromFirestoreDB('tables')
      .then((response) => {
        console.log('Firestore response', response);
        done();
      });
  }).timeout(7000);
});
