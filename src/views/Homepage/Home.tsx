import { Container, Typography } from "@material-ui/core";
import EventList from "./EventList";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2">{"Osztálytalálkozó lehetőségek"}</Typography>
      <EventList />
    </Container>
  );
};
export default Home;
