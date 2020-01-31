import axios from 'axios';
import Authentication from '@/components/auth/Authentication';

export default class TableService {
  static getTables() {
    return Authentication.getJWT()
      .then((jwt) => {
        console.log('JWT', jwt);
        return jwt;
      });
  }
}
