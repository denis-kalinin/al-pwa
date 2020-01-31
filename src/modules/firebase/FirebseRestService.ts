import axios from 'axios';

export default class FirebaseRestService {
  static firebaseConfig = {
    apiKey: 'AIzaSyBc3wJtqQcjk95bk9cZZI8fzZ-PcA13hlI',
    authDomain: 'al-pwa-firebase.firebaseapp.com',
    databaseURL: 'https://al-pwa-firebase.firebaseio.com',
    projectId: 'al-pwa-firebase',
    storageBucket: 'al-pwa-firebase.appspot.com',
    messagingSenderId: '68264329838',
    appId: '1:68264329838:web:1ae288db363ea972c65c7f',
  };

  /**
   * Gets data from Realtime DB
   * @param requestPath to be appended to `databaseURL`: `/tables/OmPYCSFswA4DwR5ImWGN.json`
   * for example
   * @returns a JSON object
   */
  public static getFromRealtimeDB(requestPath: string): Promise<any> {
    return axios
      .get(`${FirebaseRestService.firebaseConfig.databaseURL}${requestPath}`)
      .then((result) => result.data);
  }

  /**
   * Gets data from Firestore DB
   * @param requestPath to be appended to `databaseURL`: `/tables/OmPYCSFswA4DwR5ImWGN` for example
   * @returns a JSON object
   */
  public static getFromFirebaseDB(requestPath: string): Promise<any> {
    return axios
      .get(`https://firestore.googleapis.com/v1beta1/projects/${FirebaseRestService.firebaseConfig.projectId}/databases/(default)/documents/${requestPath}`)
      .then((result) => result.data);
  }
}
