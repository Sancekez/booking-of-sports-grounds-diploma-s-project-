import { FormBlockRegister } from "../components/form-block/RegisterFormBlock";
import { Box } from "@mui/material";

function RegisterPage() {
   return (
      <Box
         sx={{padding:' 100px 0 100px'}}
      >
         <FormBlockRegister />
      </Box>
   );
}

export default RegisterPage;
