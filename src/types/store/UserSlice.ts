export default interface UserSlice {
  authStatus: number; // 0:unauth, 1:logging-in 2:authed
  setAuthStatus: (status: number) => void;
}
