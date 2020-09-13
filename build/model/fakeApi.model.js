"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeApiResponseType;
(function (FakeApiResponseType) {
    FakeApiResponseType[FakeApiResponseType["AUTH"] = 1] = "AUTH";
    FakeApiResponseType[FakeApiResponseType["FILE"] = 2] = "FILE";
    FakeApiResponseType[FakeApiResponseType["MOCK"] = 3] = "MOCK";
    FakeApiResponseType[FakeApiResponseType["ERROR"] = 4] = "ERROR";
})(FakeApiResponseType = exports.FakeApiResponseType || (exports.FakeApiResponseType = {}));
class FakeApiResponse {
    constructor(type, baseObj) {
        this.obj = { auth: false, role: "default" };
        switch (type) {
            case FakeApiResponseType.AUTH:
                this.userRes(baseObj);
                break;
            case FakeApiResponseType.FILE:
                this.fileRes(baseObj);
                break;
            case FakeApiResponseType.MOCK:
                this.obj.mock = baseObj;
                break;
            case FakeApiResponseType.ERROR:
                this.errRes(baseObj);
                break;
        }
    }
    userRes(baseUser) {
        this.obj.user = {
            username: baseUser.username,
            name: baseUser.name,
            email: baseUser.email,
            photoUrl: baseUser.photoUrl,
            role: baseUser.role,
            token: baseUser.token
        };
        this.obj.auth = undefined;
        this.obj.role = undefined;
    }
    fileRes(baseFile) {
        this.obj.file = {
            id: baseFile.id,
            url: `/file/download/${baseFile.id}`,
            fileName: baseFile.fileName,
            fileSize: baseFile.fileSize
        };
    }
    errRes(baseError) {
        this.obj.message = baseError;
        this.obj.auth = undefined;
        this.obj.role = undefined;
    }
}
exports.FakeApiResponse = FakeApiResponse;
class FakeErrorValidator {
    constructor() {
        this.errors = [
            400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
            410, 411, 412, 413, 414, 415, 416, 417, 418, 420,
            422, 423, 424, 425, 426, 428, 429, 431, 444, 449,
            450, 451, 499, 500, 501, 502, 503, 504, 505, 506,
            507, 508, 509, 510, 511, 598, 599
        ];
    }
    validError(code) {
        try {
            if (this.errors.includes(code)) {
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
}
exports.FakeErrorValidator = FakeErrorValidator;
class FakeResponsePagination {
    constructor(baseObj, type, page, count) {
        this.page = page;
        this.count = count;
        this.nextPage = page + 1;
        this.nextPageUrl = `/mock/${type}?page=${this.nextPage}&count=${this.count}`;
        this.data = [];
        if (baseObj.length === 0) {
            this.fakePages();
        }
        else {
            this.listSelection(baseObj);
        }
    }
    listSelection(baseList) {
        if (1 > this.count || this.count > 100) {
            throw new Error();
        }
        if (1 > this.page || this.page > 100) {
            throw new Error();
        }
        const start = (this.page - 1) * this.count;
        let end = (start + this.count);
        if (start > 99) {
            throw new Error();
        }
        if (end > 99) {
            this.nextPage = undefined;
            this.nextPageUrl = undefined;
            this.count = 100 - start;
            end = 100;
        }
        this.data = baseList.slice(start, end);
    }
    fakePages() {
        if (1 > this.count || this.count > 100) {
            throw new Error();
        }
        if (1 > this.page || this.page > 1000) {
            throw new Error();
        }
        const n0 = (this.page - 1) * this.count + 1;
        const baseList = Array.from({ length: this.count }).map((value, idx) => value = { n: n0 + idx });
        if (this.page === 1000) {
            this.nextPage = undefined;
            this.nextPageUrl = undefined;
        }
        this.data = baseList;
    }
}
exports.FakeResponsePagination = FakeResponsePagination;
