export interface UserBase {
  departmentName: string;
  gender: number;
  id: number;
  lastStudioId: number;
  name: string;
  phone: string;
}

export interface UserThird {
  appId: string;
  headimgurl: string;
  id: number;
  nickname: string;
  openid: string;
  phonenumber: string;
  sysUserId: number;
  thirdType: number;
}

export interface UserInfo {
  userBase: Partial<UserBase>;
  userThird: Partial<UserThird>;
}
