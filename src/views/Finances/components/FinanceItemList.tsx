import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FinancesData } from "../../../shared/types";
import { useEffect } from "react";
import FormCard from "../../../components/FormCard";
import { Box, Button, Typography } from "@material-ui/core";
import FinanceItemCard from "./FinanceItemCard";
import { Add } from "@material-ui/icons";

type Props = {
  fields: any[];
  append: any;
};

const defaultValue = {
  name: "",
  price: "0",
};

const FinanceItemList = ({ fields, append }: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext<FinancesData>();

  useEffect(() => {
    let temp = 0;
    fields.forEach((field) => {
      temp += Number.parseInt(field.price);
    });
    setValue("finance", temp);
  }, [fields, setValue]);

  return (
    <FormCard
      title={
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2">
            {t("finance.formValues.financeListItems")}
          </Typography>
        </Box>
      }
    >
      {fields.map((field, index, fields) => (
        <FinanceItemCard
          key={field.key}
          index={index}
          item={field}
          fields={fields}
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

export default FinanceItemList;
