import { UserDocModel } from "./user.model";
import { FileDocModel } from "./file.model";

export interface FakeApiResponseModel {
  auth: boolean;
  role: string;
  data?: MockResponseModel;
  file?: FileResponseModel;
  message?: string;
  user?: AuthResponseModel;
}

export interface MockResponseModel {
  users: PublicUserModel[];
}

export interface FileResponseModel {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
}

export interface AuthResponseModel {
  username: string;
  name: string;
  email: string;
  photoUrl: string;
  role: string;
  token: string;
}

export interface PublicUserModel {
  username: string;
  name: string;
  email: string;
  photoUrl: string;
}

export enum FakeApiResponseType {
  AUTH = 1,
  FILE = 2,
  MOCK = 3,
  ERROR = 4
}

export class FakeApiResponse {

  obj: FakeApiResponseModel;

  constructor(type: FakeApiResponseType, baseObj: any) {
    this.obj = { auth: false, role: "default" };
    switch (type) {
      case FakeApiResponseType.AUTH:
        this.userRes(baseObj);
        break;
      case FakeApiResponseType.FILE:
        this.fileRes(baseObj);
        break;
      case FakeApiResponseType.MOCK:
        this.obj.data = baseObj;
        break;
      case FakeApiResponseType.ERROR:
        this.obj.message = baseObj;
        break;
    }
  }

  userRes(baseUser: UserDocModel): void {
    this.obj.user = {
      username: baseUser.username,
      name: baseUser.name,
      email: baseUser.email,
      photoUrl: baseUser.photoUrl,
      role: baseUser.role,
      token: baseUser.token
    }
    this.obj.role = baseUser.role;
    this.obj.auth = true;
  }

  fileRes(baseFile: FileDocModel): void {
    this.obj.file = {
      id: baseFile.id,
      url: `http://localhost:9000/file/download/${baseFile.id}`,
      fileName: baseFile.fileName,
      fileSize: baseFile.fileSize
    }
  }
}

export class FakeErrorValidator {
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
      return false;
    }
  }
}
