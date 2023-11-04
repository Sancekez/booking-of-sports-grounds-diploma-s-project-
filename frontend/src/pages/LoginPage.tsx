import { FormBlockLogin } from "../components/form-block/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";

function LoginPage() {
   return (
      <div style={{ padding: "100px 0 20px" }}>
         <FormBlockLogin />
      </div>
   );
}

export default LoginPage;
