export class HttpErrorValidator {

  errors: number[] = [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
    410, 411, 412, 413, 414, 415, 416, 417, 418, 420,
    422, 423, 424, 425, 426, 428, 429, 431, 444, 449,
    450, 451, 499, 500, 501, 502, 503, 504, 505, 506,
    507, 508, 509, 510, 511, 598, 599
  ];

  validError(code: number): boolean {
    try {
      if (this.errors.includes(code)) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export interface FakeApiErrorModel {
  status: number;
  message: string;
}
