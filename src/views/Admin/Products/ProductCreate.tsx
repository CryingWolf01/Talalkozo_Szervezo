import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Product } from "../../../shared/types";
import { createProduct } from "../../../shared/network/products.api";
import ProductForm from "./components/ProductForm";

const ProductCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<Product>();

  const onSubmitCreate = async (values: Product) => {
    try {
      await createProduct({
        ...values,
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("product.subject"),
        }),
        {
          variant: "success",
        }
      );
      //history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("product.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={form.handleSubmit(onSubmitCreate)}>
        <FormProvider {...form}>
          <ProductForm />
        </FormProvider>
      </form>
    </Container>
  );
};

export default ProductCreate;
