import { CustomError } from "./custom";

export class NotAuthorizeError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorize");
    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }

  serializeError() {
    return [
      {
        message: "Not Authorize",
      },
    ];
  }
}
