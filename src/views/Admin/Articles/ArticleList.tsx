import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getArticleList } from "../../../shared/network/article.api";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import ArticleRow from "./components/ArticleRow";

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
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/admin/article/create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("article.create")}
          </Button>
        </Box>
      </Box>
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
                articleList.map((article) => (
                  <ArticleRow article={article} reset={fetchData} />
                ))}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ArticleList;
