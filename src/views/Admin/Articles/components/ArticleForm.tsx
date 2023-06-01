import { useFormContext } from "react-hook-form";
import { Article } from "../../../../shared/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Container, Grid, TextField } from "@material-ui/core";

type Props = { article?: any };

const ArticleForm = ({ article }: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, setValue } = useFormContext<Article>();

  useEffect(() => {
    if (article) {
      setValue("title", article.title);
      setValue("description", article.description);
    }
  }, [article, setValue]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={t("article.formValues.title")}
            defaultValue={article?.title || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("title", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.title && true}
            helperText={formState.errors?.title?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("article.formValues.description")}
            defaultValue={article?.description || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("description", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            multiline
            rows={3}
            error={formState.errors.description && true}
            helperText={formState.errors?.description?.message}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m={2} gridGap={8}>
        <Button color="primary" variant="text" onClick={() => history(-1)}>
          {t("common:button.cancel")}
        </Button>
        <Button type="submit" color="primary">
          {t("common:button.save")}
        </Button>
      </Box>
    </Container>
  );
};

export default ArticleForm;
