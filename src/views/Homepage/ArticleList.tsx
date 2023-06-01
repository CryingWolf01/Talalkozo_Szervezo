import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import ArticleRow from "./ArticleRow";
import { getArticleList } from "../../shared/network/article.api";

const ArticleList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [articleList, setArticleList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getArticleList();
    setArticleList([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth="lg">
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {articleList.length === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              {articleList.length &&
                articleList.map((article) => <ArticleRow article={article} />)}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ArticleList;
