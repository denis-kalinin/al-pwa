import { expect, use } from 'chai';
import 'chai/register-should';
import chaiAsPromised from 'chai-as-promised';
import Authentication from '@/components/auth/Authentication';
import authProvider from '@/components/auth/LoginPasswordProvider';
import FirestoreApi from '@/network-api/FirestoreApi';

use(chaiAsPromised);

describe('Axios intercepter', () => {
  it('fetch tables', () => FirestoreApi
    .getFromFirebaseDB('tables')
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .should.eventually.be.fulfilled);
});
