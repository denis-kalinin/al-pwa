/**
 * Error message from Firebase. For example:
 * ```json
 * {
 *    "error": {
 *      "code": 403,
 *      "message": "Missing or insufficient permissions.",
 *      "status": "PERMISSION_DENIED"
 *    }
 * }
 * ```
 */
export default class FirebaseErrorMessage {
  readonly code: Number;

  readonly message: String;

  readonly status: String;

  constructor(code: Number, message: String, status: String) {
    this.code = code;
    this.message = !message ? 'Some error' : message;
    this.status = !status ? '' : status;
  }
}
