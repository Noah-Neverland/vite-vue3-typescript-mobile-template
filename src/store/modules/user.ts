import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { store } from '@/store';

interface UserState {
  userInfo: UserInfo; // 用户信息
  token: string | undefined | null; // token
  studioId: number | undefined | null; // 工作室id
  hospitalId: number | undefined | null; // 渠道id
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => {
    return {
      userInfo: {
        userBase: {},
        userThird: {},
      },
      token: null,
      studioId: 21,
      hospitalId: 6,
    };
  },
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || {};
    },
    getToken(): string {
      return this.token || '';
    },
    getHospitalId(): number | null {
      return this.hospitalId || null;
    },
    getStudioId(): number | null {
      return this.studioId || null;
    },
  },
  actions: {
    // 设置用户信息
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },
    // 设置token
    setToken(info: string | undefined) {
      console.log('info===', info);
      this.token = info ?? '';
    },
    // 设置当前工作室id
    setStudioId(info: number | undefined) {
      this.studioId = info;
    },
    // 重置state
    resetState() {
      this.userInfo = {
        userBase: {},
        userThird: {},
      };
      this.token = '';
      this.studioId = null;
    },
  },
  persist: {
    key: 'app-user',
    // 存储在localstorage还是sessionStorage中
    storage: localStorage,
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
