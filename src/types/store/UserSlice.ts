export default interface UserSlice {
  authStatus: number; // 0:unauth, 1:logging-in 2:authed
  setAuthStatus: (status: number) => void;
  getAuthStatusFromStorage: () => void;
  logout: () => Promise<void>;
}

export interface LoginStatusStorage {
  status: number;
  time: number;
}
