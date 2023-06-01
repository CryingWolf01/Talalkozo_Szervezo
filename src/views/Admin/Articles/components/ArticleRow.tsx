import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { deleteArticle } from "../../../../shared/network/article.api";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { format } from "date-fns";

type Props = { article: any; reset: any };

const ArticleRow = ({ article, reset }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const deleteItem = async () => {
    try {
      await deleteArticle(article.id);
      enqueueSnackbar(
        t("common:notification.delete.success", {
          subject: t("article.subject"),
        }),
        {
          variant: "success",
        }
      );
      reset();
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.delete.failure", {
          subject: t("article.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };
  return (
    <Card style={{ marginTop: "10px", border: "1px solid black" }}>
      <CardHeader
        title={
          <>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h4">{article.title}</Typography>

              <Box>
                <Tooltip title={t("product.delete").toString()}>
                  <IconButton
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                    onClick={() => deleteItem()}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("product.modify").toString()}>
                  <IconButton
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                    component={Link}
                    to={`/admin/article/modify?id=${article.id}`}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">
                {format(new Date(article.date), "yyyy. MM. dd")}
              </Typography>
            </Box>
          </>
        }
      />
      <CardContent>
        <Typography variant="body1">{article.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleRow;
