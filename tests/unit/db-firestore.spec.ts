import { expect, use } from 'chai';
import 'chai/register-should';
import chaiAsPromised from 'chai-as-promised';
import FirestoreApi from '@/network-api/FirestoreApi';

use(chaiAsPromised);

describe('Firestore DB Test [Tables]', () => {
  it('handle valid results', () => FirestoreApi
    .getFromFirebaseDB('tables')
    .then((result) => result.data.documents)
    .should.eventually.be.fulfilled
    .and
    .not.be.empty);

  it('handle invalid (empty) results', () => FirestoreApi
    .getFromFirebaseDB('tabless')
    .then((result) => result.data)
    .should.eventually.be.fulfilled
    .and
    .be.empty);
});

describe('Firestore fetch document', () => {
  it('existing document', () => FirestoreApi
    .getFromFirebaseDB('tables')
    .then((result) => result.data.documents[0].name)
    .then((name) => FirestoreApi.getByNameFromFirebaseDB(name))
    .then((result) => {
      const name = `${result.data.name}/${result.data.fields.collection.stringValue}`;
      return name;
    })
    .then((name) => FirestoreApi.getByNameFromFirebaseDB(name))
    .then((result) => {
      const docs = result.data.documents;
      return docs;
    })
    .should.eventually.be.fulfilled
    .and
    .not.be.empty);
});
