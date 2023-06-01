import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getAllShoppingList } from "../../shared/network/shopping-lists.api";
import ShoppingListRow from "./components/ShoppingListRow";

const useStyles = makeStyles({
  toolListTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const ShoppingLists = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllShoppingList();
    setShoppingList([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/shopping-lists/create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("shoppingLists.create")}
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
          {shoppingList.length === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("shoppingLists.formValues.name")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("shoppingLists.formValues.date")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("shoppingLists.formValues.price")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Divider className={classes.divider} />
                {shoppingList.length &&
                  shoppingList.map((shoppingList) => (
                    <ShoppingListRow item={shoppingList} reset={fetchData} />
                  ))}
              </Box>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ShoppingLists;
