import { Container, Typography } from "@mui/material";
import { CreateTest } from "../components/form-block/CreateTest";

function CreateTestPage() {
   return (
      <Container sx={{ pt: "50px" }}>
         <Typography align="center" variant="h4">
            You can create test here!
         </Typography>
         <Typography align="center" variant="h6" sx={{marginBottom: '40px'}}>
            For creating test please, complete form below.
         </Typography>

         <CreateTest />
      </Container>
   );
}

export default CreateTestPage;
