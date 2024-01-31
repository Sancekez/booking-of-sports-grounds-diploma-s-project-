
import { Container, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom"; // Для получения параметров маршрута

function LobbyDetailsPage() {
   // Получение параметров маршрута, например, id игровой площадки
   const { lobbyId } = useParams<{ lobbyId: string }>();

   // Здесь вы можете использовать lobbyId для получения данных о конкретной игровой площадке

   return (
      <Container sx={{ pt: "50px" }}>
         <Typography align="center" variant="h4">
            Lobby Details
         </Typography>
         <Typography align="center" variant="body1" sx={{ mt: 2 }}>
            Here you can find detailed information about Lobby {lobbyId}.
         </Typography>
         <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, display: "block", margin: "0 auto" }}
         >
            Join Lobby
         </Button>
      </Container>
   );
}

export default LobbyDetailsPage;
