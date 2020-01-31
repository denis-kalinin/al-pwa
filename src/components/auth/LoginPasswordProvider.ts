/**
 * Exports loginPasswordAuthProvider
 * ```typescript
 * import { loginPasswordAuthProvider } from './LoginPasswordProvider';
 * ```
 */

import { IAuthProvider } from './IAuthProvider';
import FirebaseAuthProvider from './FirebaseAuthProvider';

const loginPasswordAuthProvider: IAuthProvider = new FirebaseAuthProvider('AIzaSyBc3wJtqQcjk95bk9cZZI8fzZ-PcA13hlI');
export default loginPasswordAuthProvider;
