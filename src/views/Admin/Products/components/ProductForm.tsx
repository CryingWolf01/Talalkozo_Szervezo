import { useTranslation } from "react-i18next";
import { Product } from "../../../../shared/types";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { UNIT_TYPES } from "../../../../config/constants";

type Props = {
  product?: any;
};

const ProductForm = ({ product }: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, setValue } = useFormContext<Product>();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("unit", product.unit);
    }
  }, [product, setValue]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={4}>
          <TextField
            label={t("product.formValues.name")}
            defaultValue={product?.name || ""}
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
        <Grid item xs={4}>
          <TextField
            label={t("product.formValues.price")}
            defaultValue={product?.price || 0}
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
        <Grid item xs={4}>
          <TextField
            label={t("product.formValues.unit")}
            select
            defaultValue={product?.unit || UNIT_TYPES[0]}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("unit", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.unit && true}
            helperText={formState.errors?.unit?.message}
          >
            {UNIT_TYPES.map((type, index) => (
              <MenuItem key={index} value={type}>
                {t(`common:unitType.${type}`)}
              </MenuItem>
            ))}
          </TextField>
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

export default ProductForm;
