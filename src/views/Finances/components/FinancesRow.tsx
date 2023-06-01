import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Assignment, Delete, Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { deleteShoppingList } from "../../../shared/network/shopping-lists.api";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import { hu } from "date-fns/locale";

type Props = {
  item: any;
  reset: any;
};

const FinancesRow = ({ item, reset }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const deleteItem = async () => {
    try {
      await deleteShoppingList(item.id);
      enqueueSnackbar(
        t("common:notification.delete.success", {
          subject: t("finance.subject"),
        }),
        {
          variant: "success",
        }
      );
      reset();
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.delete.failure", {
          subject: t("finance.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ height: "40px" }}>
        <Grid item xs={5} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {format(new Date(item.date), "yyyy. LLLL", { locale: hu })}
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{item.finance + " Ft"}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={3}
          style={{ marginTop: "10px" }}
          justifyContent="flex-end"
        >
          <Tooltip title={t("finance.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/finances/modify?id=${item.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("finance.details").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/finances/details?id=${item.id}`}
            >
              <Assignment />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("finance.delete").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              onClick={() => deleteItem()}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancesRow;
