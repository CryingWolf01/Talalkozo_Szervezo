import { Box, Grid, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props = {
  index: number;
  item: any;
  fields: any[];
};

const FinanceItemCard = ({ index, item, fields }: Props) => {
  const { t } = useTranslation();

  return (
    <Box marginBottom={1}>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
        style={{ paddingLeft: 8, paddingRight: 8 }}
      >
        <Grid item xs={6}>
          <Controller
            name={`financeItems.${index}.name`}
            defaultValue={item?.name || ""}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={t("finance.financeItems.name")}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name={`financeItems.${index}.price`}
            defaultValue={item?.price || 0}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={t("finance.financeItems.price")}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinanceItemCard;
