import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ShoppingListData } from "../../shared/types";
import { createShoppingList } from "../../shared/network/shopping-lists.api";
import { Box, CircularProgress, Container } from "@material-ui/core";
import ShoppingListForm from "./components/ShoppingListForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/reducers/AuthContext";
import { format } from "date-fns";
import { getAllProduct } from "../../shared/network/products.api";

const ShoppingListCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<ShoppingListData>();
  const user = useContext(AuthContext);
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

  const onSubmitCreate = async (values: ShoppingListData) => {
    try {
      await createShoppingList({
        ...values,
        userId: user ? user.uid : "",
        date: format(new Date(), "yyyy-MM-dd"),
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("shoppingLists.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("shoppingLists.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
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
          <form onSubmit={form.handleSubmit(onSubmitCreate)}>
            <ShoppingListForm products={productList} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default ShoppingListCreate;
