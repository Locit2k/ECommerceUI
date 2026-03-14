export interface UserData {
    userID: string;
    token: string;
    refresh: string;
    recID: string;
    name: string;
    gender: string;
    birthday: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string | null;
    modifiedOn: string | null;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: UserData;
    error: any;
}
