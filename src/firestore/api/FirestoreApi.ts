import axios, { AxiosResponse, AxiosInstance } from 'axios';
import FirebaseConfig from './FirebaseConfig';

export default class FirestoreApi {
  private static axiosInstance: AxiosInstance = axios.create({
    headers: {
      post: { // can be common or any other method
        header1: 'value1',
      },
    },
  });

  private static requestInterceptor?: number;

  private static responseInterceptor?: number;

  private static urlBase: string = `${FirebaseConfig.firestoreApiEndpoint}\
projects/${FirebaseConfig.projectId}/databases/(default)/documents/`;

  public static addAuthentication(token: string): void {
    FirestoreApi.requestInterceptor = FirestoreApi.axiosInstance.interceptors.request.use(
      (config) => {
        const newConfig = config;
        newConfig.headers.Authorization = `Bearer ${token}`;
        return newConfig;
      },
    );
  }

  public static removeAuthentication(): void {
    const interceptorNum = FirestoreApi.requestInterceptor ?? null;
    if (interceptorNum !== null) {
      FirestoreApi.axiosInstance.interceptors.request.eject(interceptorNum);
      FirestoreApi.requestInterceptor = undefined;
    }
  }

  /**
   * Function to handle unauthorized response, i.e. 403
   */
  public static set authenticationInterceptor(authenticateOnRejected: () => Promise<any>) {
    const interceptorNum = FirestoreApi.responseInterceptor ?? null;
    if (interceptorNum !== null) {
      FirestoreApi.axiosInstance.interceptors.response.eject(interceptorNum);
      FirestoreApi.responseInterceptor = undefined;
    }
    if (!authenticateOnRejected) return;
    FirestoreApi.responseInterceptor = FirestoreApi.axiosInstance.interceptors.response.use(
      undefined,
      async (err: any) => {
        const originalRequest = err.config;
        if ((err.response.status === 403 || err.response.status === 401)
              && !originalRequest.retry) {
          console.debug('%d has been intercepted', err.response.status);
          originalRequest.retry = true;
          await authenticateOnRejected();
          return FirestoreApi.axiosInstance(originalRequest);
        }
        return Promise.reject(err);
      },
    );
  }

  /**
   * Gets data from Realtime DB
   * @param requestPath to be appended to `databaseURL`: `/tables/OmPYCSFswA4DwR5ImWGN.json`
   * for example
   * @returns a JSON object
   */
  public static getFromRealtimeDB(requestPath: string): Promise<AxiosResponse<any>> {
    return FirestoreApi.axiosInstance
      .get(`${FirebaseConfig.databaseURL}${requestPath}`);
  }

  /**
   * Gets data from Firestore DB
   * @param requestPath to be appended to `databaseURL`: `/tables/OmPYCSFswA4DwR5ImWGN` for example
   * @returns a JSON object
   */
  public static getFromFirestoreDB(requestPath: string): Promise<AxiosResponse<any>> {
    console.debug('Firestore base url', FirestoreApi.urlBase);
    return FirestoreApi.axiosInstance
      .get(`${FirestoreApi.urlBase}${requestPath}`);
  }

  /**
   * Gets object by full name
   * @param name a full name of the object, e.g.
   * `projects/al-pwa-firebase/databases/(default)/documents/tables/TCVKD5tPU8rvSIhq4H7o`
   */
  public static getByNameFromFirebaseDB(name: string): Promise<AxiosResponse<any>> {
    return FirestoreApi.axiosInstance
      .get(`${FirebaseConfig.firestoreApiEndpoint}${name}`);
  }
}
