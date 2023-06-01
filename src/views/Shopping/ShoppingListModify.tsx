import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingListData } from "../../shared/types";
import { Container, Box, CircularProgress } from "@material-ui/core";
import ShoppingListForm from "./components/ShoppingListForm";
import {
  getShoppingListData,
  modifyShoppingList,
} from "../../shared/network/shopping-lists.api";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../shared/network/products.api";

const ShoppingListModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<ShoppingListData>();
  const { enqueueSnackbar } = useSnackbar();
  const [shoppingList, setShoppingList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getShoppingListData(id ? id : "");
    setShoppingList({ ...res });
    const res2 = await getAllProduct();
    setProductList([...res2]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitModify = async (values: ShoppingListData) => {
    try {
      await modifyShoppingList(id ? id : "", { ...values });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("shoppingLists.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("shoppingLists.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <>
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
              <ShoppingListForm data={shoppingList} products={productList} />
            </form>
          </FormProvider>
        )}
      </Container>
    </>
  );
};

export default ShoppingListModify;
