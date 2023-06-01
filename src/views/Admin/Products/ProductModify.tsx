import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Product } from "../../../shared/types";
import {
  getProductById,
  modifyProduct,
} from "../../../shared/network/products.api";
import ProductForm from "./components/ProductForm";

const ProductModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<Product>();
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getProductById(id ? id : "");
    setProduct({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitModify = async (values: Product) => {
    try {
      await modifyProduct(id ? id : "", { ...values });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("product.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("product.subject"),
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
            <ProductForm product={product} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default ProductModify;
