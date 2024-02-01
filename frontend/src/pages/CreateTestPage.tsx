import { Container, Typography } from "@mui/material";
import { CreateTest } from "../components/form-block/CreateTest";
import { PlayGround } from "../components/form-block/PlayGround";
 
function CreateTestPage() {
   return (
      <Container sx={{ pt: "50px" }}>
         <Typography align="center" variant="h4">
            Main info about playground!
         </Typography>
        
         
         <CreateTest />
      </Container>
   );
}

export default CreateTestPage;
