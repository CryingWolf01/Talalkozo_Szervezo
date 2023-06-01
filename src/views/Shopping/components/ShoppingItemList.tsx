import { Box, Button, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormCard from "../../../components/FormCard";
import { ShoppingListData } from "../../../shared/types";
import ShoppingItemCard from "./ShoppingItemCard";

type Props = {
  shoppingList: any[];
  products: any[];
};

const defaultValue = {
  name: "",
  price: "0",
  quantity: 0,
  unit: "",
};

const ShoppingItemList = ({ shoppingList, products }: Props) => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<ShoppingListData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "shoppingListItems",
    keyName: "key",
  });

  useEffect(() => {
    if (shoppingList.length > 0) {
      shoppingList.forEach((item) => {
        append(item);
      });
    }
  }, [append, shoppingList]);

  useEffect(() => {
    let temp = 0;
    fields.forEach((field) => {
      temp += Number.parseInt(field.price);
    });
    setValue("price", temp);
  }, [fields, setValue]);

  return (
    <FormCard
      title={
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2">
            {t("shoppingLists.formValues.shoppingListItems")}
          </Typography>
        </Box>
      }
    >
      {fields.map((field, index, fields) => (
        <ShoppingItemCard
          key={field.key}
          index={index}
          item={field}
          products={products}
          fields={fields}
          setValue={setValue}
          remove={remove}
        />
      ))}
      <Box
        display="flex"
        justifyContent="center"
        style={{ marginBottom: 8 }}
        gridGap={12}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "16px 8px 8px 8px" }}
          onClick={() => append(defaultValue)}
          startIcon={<Add />}
        >
          {t("common:button.add")}
        </Button>
      </Box>
    </FormCard>
  );
};

export default ShoppingItemList;
