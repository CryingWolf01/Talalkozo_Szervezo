import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

type Props = { article: any };

const ArticleRow = ({ article }: Props) => {
  return (
    <Card style={{ marginTop: "10px", border: "1px solid black" }}>
      <CardHeader
        title={
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography>{article.title}</Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography>{article.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleRow;
