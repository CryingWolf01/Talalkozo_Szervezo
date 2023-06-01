import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Article } from "../../../shared/types";
import { createArticle } from "../../../shared/network/article.api";
import ArticleForm from "./components/ArticleForm";
import { format } from "date-fns";

const ArticleCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<Article>();

  const onSubmitCreate = async (values: Article) => {
    try {
      await createArticle({
        ...values,
        date: format(new Date(), "yyyy-MM-dd"),
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("article.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("article.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={form.handleSubmit(onSubmitCreate)}>
        <FormProvider {...form}>
          <ArticleForm />
        </FormProvider>
      </form>
    </Container>
  );
};

export default ArticleCreate;
