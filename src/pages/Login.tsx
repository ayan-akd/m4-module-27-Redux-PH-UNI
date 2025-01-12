import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

export default function Login() {
  const { register, handleSubmit } = useForm<TData>({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });
  const [login, { data, error }] = useLoginMutation();
  console.log("data =>", data);
  console.log("error =>", error);
  type TData = {
    userId: string;
    password: string;
  };
  const onSubmit = (data: TData) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    login(userInfo);
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
