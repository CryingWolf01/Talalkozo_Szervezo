import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FinancesData } from "../../../shared/types";
import { useEffect, useState } from "react";
import { getAllShoppingList } from "../../../shared/network/shopping-lists.api";
import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import Loading from "../../../components/Loading";
import FinanceItemList from "./FinanceItemList";

type Props = {
  finance?: any;
};

const FinancesForm = ({ finance }: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, setValue, control } =
    useFormContext<FinancesData>();
  const [loading, setLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "financeItems",
    keyName: "key",
  });

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllShoppingList();
    remove();
    res.forEach((data) => {
      if (new Date(data.date).getMonth() === new Date().getMonth()) {
        append({ name: data.name, price: data.price });
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (finance) {
      setValue("finance", finance.finance);
    }
  }, [finance, setValue]);

  return (
    <Container maxWidth="md">
      <Loading open={loading} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <TextField
            label={t("finance.formValues.finance")}
            defaultValue={finance?.finance || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("finance", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.finance && true}
            helperText={formState.errors?.finance?.message}
          />
        </Grid>
      </Grid>
      <Grid container>
        <FinanceItemList fields={fields} append={append} />
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

export default FinancesForm;
