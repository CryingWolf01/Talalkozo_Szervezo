import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ShoppingListData } from "../../../shared/types";
import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import ShoppingItemList from "./ShoppingItemList";
import { useEffect } from "react";

type Props = {
  data?: any;
  products: any[];
};

const ShoppingListForm = ({ data, products }: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, setValue } = useFormContext<ShoppingListData>();

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("price", data.price);
    }
  }, [data, setValue]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={6}>
          <TextField
            label={t("shoppingLists.formValues.name")}
            defaultValue={data?.name || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("name", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.name && true}
            helperText={formState.errors?.name?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("shoppingLists.formValues.price")}
            defaultValue={data?.price || 0}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("price", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.price && true}
            helperText={formState.errors?.price?.message}
          />
        </Grid>
        <Grid container>
          <ShoppingItemList
            shoppingList={
              data?.shoppingListItems ? data?.shoppingListItems : []
            }
            products={products}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m={2} gridGap={8}>
        <Button color="primary" variant="text" onClick={() => history(-1)}>
          {t("common:button.cancel")}
        </Button>
        <Button type="submit" color="primary">
          {t("common:button.save")}
        </Button>
      </Box>
    </Container>
  );
};

export default ShoppingListForm;
