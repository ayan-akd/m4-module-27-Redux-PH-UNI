import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

export default function Login() {

    const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<TData>({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });
  const [login] = useLoginMutation();
  type TData = {
    userId: string;
    password: string;
  };
  const onSubmit = async (data: TData) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({user: user, token: res.data.accessToken}));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" {...register("userId")} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" {...register("password")} />
        </div>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
