import axios, { AxiosResponse, AxiosInstance } from 'axios';
// import { IAuthProvider } from '@/components/auth/IAuthProvider';
import FirestoreAuthentication from './FirestoreAuthentication';

const firebaseConfig = {
  apiKey: 'AIzaSyBc3wJtqQcjk95bk9cZZI8fzZ-PcA13hlI',
  authDomain: 'al-pwa-firebase.firebaseapp.com',
  databaseURL: 'https://al-pwa-firebase.firebaseio.com',
  projectId: 'al-pwa-firebase',
  storageBucket: 'al-pwa-firebase.appspot.com',
  messagingSenderId: '68264329838',
  appId: '1:68264329838:web:1ae288db363ea972c65c7f',
  firestoreApiEndpoint: 'https://firestore.googleapis.com/v1beta1/',
};

const axiosInstance = axios.create({
  headers: {
    post: { // can be common or any other method
      header1: 'value1',
    },
  },
});

const firestoreAuthentication = new FirestoreAuthentication();

axiosInstance.interceptors.response.use(undefined, (err) => {
  const originalRequest = err.config;
  console.log('Inercepting');
  if (err.response.status === 403 && !originalRequest.retry) {
    originalRequest.retry = true;
    console.log('Authentication required...');
    return firestoreAuthentication
      .authenticate('test@example.com', 'qwerty')
      .then((idToken) => {
        console.log('idToken set', idToken);
        axiosInstance.interceptors.request.use((config) => {
          const newConfig = config;
          if (idToken) {
            newConfig.headers.Authorization = `Bearer ${idToken}`;
          } else {
            delete newConfig.headers.Autherization;
          }
          return newConfig;
        });
        return axiosInstance(originalRequest);
      });
  }
  return Promise.reject(err);
});


export default class FirestoreApi {
  /**
   * Instance of axios for Firestore  API
   */
  static get axios() : AxiosInstance {
    return axiosInstance;
  }

  /**
   * Sets JWT token to axios interceptor as `Bearer` in `Authrization` HTTP header.
   * @param jwt if jwt `undefined` then `Autherization` HTTP header is dismantled.
   */
  public static setJWT(jwt? : string) : void {
    FirestoreApi.axios.interceptors.request.use((config) => {
      const newConfig = config;
      if (jwt) {
        newConfig.headers.Authorization = `Bearer ${jwt}`;
      } else {
        delete newConfig.headers.Autherization;
        /*
        const updatedHeaders = Object.keys(config.headers)
          .filter((key) => key !== 'Authorization')
          .reduce((result, currKey) => ({
            ...result,
            [currKey]: config.headers[currKey],
          }), {});
        newConfig.headers = updatedHeaders;
        */
      }
      return newConfig;
    });
  }

  /**
   * Gets data from Realtime DB
   * @param requestPath to be appended to `databaseURL`: `/tables/OmPYCSFswA4DwR5ImWGN.json`
   * for example
   * @returns a JSON object
   */
  public static getFromRealtimeDB(requestPath: string): Promise<AxiosResponse<any>> {
    return axiosInstance
      .get(`${firebaseConfig.databaseURL}${requestPath}`);
  }

  /**
   * Gets data from Firestore DB
   * @param requestPath to be appended to `databaseURL`: `/tables/OmPYCSFswA4DwR5ImWGN` for example
   * @returns a JSON object
   */
  public static getFromFirebaseDB(requestPath: string): Promise<AxiosResponse<any>> {
    return axiosInstance
      .get(`${firebaseConfig.firestoreApiEndpoint}projects/${firebaseConfig.projectId}/databases/(default)/documents/${requestPath}`);
  }

  /**
   * Gets object by full name
   * @param name a full name of the object, e.g.
   * `projects/al-pwa-firebase/databases/(default)/documents/tables/TCVKD5tPU8rvSIhq4H7o`
   */
  public static getByNameFromFirebaseDB(name: string): Promise<AxiosResponse<any>> {
    return axiosInstance
      .get(`${firebaseConfig.firestoreApiEndpoint}${name}`);
  }
}
