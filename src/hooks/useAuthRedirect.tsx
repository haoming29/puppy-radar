import { LOGIN_PAGE } from "@/configs";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";

const useAuthRedirect = () => {
  const router = useRouter();
  const logout = useStore((state) => state.logout);

  const redirect = () => {
    logout();
    router.push(LOGIN_PAGE);
  };
  return redirect;
};

export default useAuthRedirect;
