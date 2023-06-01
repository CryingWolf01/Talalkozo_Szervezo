import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Article } from "../../../shared/types";
import {
  getArticleById,
  modifyArticle,
} from "../../../shared/network/article.api";
import ArticleForm from "./components/ArticleForm";

const ArticleModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<Article>();
  const { enqueueSnackbar } = useSnackbar();
  const [article, setArticle] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getArticleById(id ? id : "");
    setArticle({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitModify = async (values: Article) => {
    try {
      await modifyArticle(id ? id : "", { ...values });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("article.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("article.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Container maxWidth="md">
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
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitModify)}>
            <ArticleForm article={article} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default ArticleModify;
