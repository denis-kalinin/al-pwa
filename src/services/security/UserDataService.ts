import axios from 'axios';
import FirebaseConfig from '@/firestore/api/FirebaseConfig';

class UserDataService {
  public static async getUserData(idToken: string) : Promise<FirebaseUserData> {
    const res = await axios({
      method: 'post',
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup',
      params: {
        key: FirebaseConfig.apiKey,
      },
      data: {
        idToken,
      },
    });
    return res.data;
  }
}

interface FirebaseUserData {
  users: [{
    localId?: string,
    email?: string,
    displayName?: string,
    photoUrl?: string,
  }]
}

export { UserDataService, FirebaseUserData };
