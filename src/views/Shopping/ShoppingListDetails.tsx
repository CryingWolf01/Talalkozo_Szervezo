import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { getShoppingListData } from "../../shared/network/shopping-lists.api";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
  },
  data: {
    marginBottom: 24,
  },
  header: {
    fontWeight: "bold",
    fontsize: 28,
    marginBottom: 24,
    borderBottom: "1px solid #c7c7c7",
  },
  listTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const ShoppingListDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [shoppingList, setShoppingList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getShoppingListData(id ? id : "");
    setShoppingList({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="md"
      style={{
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Loading open={loading} />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography className={classes.header}>
            {t("shoppingLists.yourList")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.title}>
            {t("shoppingLists.formValues.name")}
          </Typography>
          <Typography className={classes.data}>
            {shoppingList?.name || ""}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.title}>
            {t("shoppingLists.formValues.price")}
          </Typography>
          <Typography className={classes.data}>
            {shoppingList?.price || ""} {"Ft"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.header}>
            {t("shoppingLists.listPieces")}
          </Typography>
        </Grid>
        {shoppingList?.shoppingListItems?.map((item: any) => (
          <>
            <Grid item xs={5}>
              <Typography className={classes.data}>{item.name}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography className={classes.data}>
                {item.price} {"Ft"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.data}>
                {item.quantity} {t(`common:unitType.${item.unit}`)}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  );
};

export default ShoppingListDetails;
