import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Assignment, Delete, Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { deleteShoppingList } from "../../../shared/network/shopping-lists.api";
import { useSnackbar } from "notistack";
import { format } from "date-fns";

type Props = {
  item: any;
  reset: any;
};

const ShoppingListRow = ({ item, reset }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const deleteItem = async () => {
    try {
      await deleteShoppingList(item.id);
      enqueueSnackbar(
        t("common:notification.delete.success", {
          subject: t("shoppingLists.subject"),
        }),
        {
          variant: "success",
        }
      );
      reset();
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.delete.failure", {
          subject: t("shoppingLists.subject"),
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
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{item.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {format(new Date(item.date), "yyyy. MM. dd")}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{item.price}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={3}
          style={{ marginTop: "10px" }}
          justifyContent="flex-end"
        >
          <Tooltip title={t("shoppingLists.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/shopping-lists/modify?id=${item.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("shoppingLists.details").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/shopping-lists/details?id=${item.id}`}
            >
              <Assignment />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("shoppingLists.delete").toString()}>
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

export default ShoppingListRow;
