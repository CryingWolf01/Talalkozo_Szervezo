import { Container, Typography } from "@material-ui/core";
import ArticleList from "./ArticleList";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2">{"Aktuális híreink"}</Typography>
      <ArticleList />
    </Container>
  );
};
export default Home;
