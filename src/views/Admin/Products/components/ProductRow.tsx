import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { deleteProduct } from "../../../../shared/network/products.api";
import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";

type Props = {
  item: any;
  reset: any;
};

const ProductRow = ({ item, reset }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const deleteItem = async () => {
    try {
      await deleteProduct(item.id);
      enqueueSnackbar(
        t("common:notification.delete.success", {
          subject: t("product.subject"),
        }),
        {
          variant: "success",
        }
      );
      reset();
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.delete.failure", {
          subject: t("product.subject"),
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
          <Typography color="secondary">{item.price}</Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {t(`common:unitType.${item.unit}`)}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={3}
          style={{ marginTop: "10px" }}
          justifyContent="flex-end"
        >
          <Tooltip title={t("product.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/admin/product/modify?id=${item.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductRow;
