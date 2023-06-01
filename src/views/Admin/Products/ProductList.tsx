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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllProduct } from "../../../shared/network/products.api";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ProductRow from "./components/ProductRow";

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

const ProductList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllProduct();
    setProductList([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/admin/product/create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("product.create")}
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
          {productList.length === 0 ? (
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
                      {t("product.formValues.name")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("product.formValues.price")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("product.formValues.unit")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Divider className={classes.divider} />
                {productList.length &&
                  productList.map((product) => (
                    <ProductRow item={product} reset={fetchData} />
                  ))}
              </Box>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductList;
