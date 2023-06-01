import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UNIT_TYPES } from "../../../config/constants";
import { Autocomplete } from "@mui/material";

type Props = {
  index: number;
  item: any;
  fields: any[];
  products: any[];
  remove: (index: number) => void;
  setValue: any;
};

const ShoppingItemCard = ({
  index,
  item,
  fields,
  remove,
  products,
  setValue,
}: Props) => {
  const { t } = useTranslation();

  function setShoppingListItem(value: any) {
    setValue(`shoppingListItems.${index}.name`, value.name);
    setValue(`shoppingListItems.${index}.price`, value.price);
    setValue(`shoppingListItems.${index}.quantity`, 1);
    setValue(`shoppingListItems.${index}.unit`, value.unit);
  }

  return (
    <Box marginBottom={1}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        style={{ paddingLeft: 8, paddingRight: 8 }}
      >
        <Grid item xs={3}>
          <Autocomplete
            onChange={(_, value) => {
              setShoppingListItem(value);
            }}
            defaultValue={null}
            options={products}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("shoppingLists.listItems.name")}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
        style={{ paddingLeft: 8, paddingRight: 8 }}
      >
        <Grid item xs={3}>
          <Controller
            name={`shoppingListItems.${index}.name`}
            defaultValue={item?.name || ""}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={t("shoppingLists.listItems.name")}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name={`shoppingListItems.${index}.price`}
            defaultValue={item?.price || 0}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={t("shoppingLists.listItems.price")}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name={`shoppingListItems.${index}.quantity`}
            defaultValue={item?.quantity || 1}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={t("shoppingLists.listItems.quantity")}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name={`shoppingListItems.${index}.unit`}
            defaultValue={item?.unit || ""}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label={t("shoppingLists.listItems.unit")}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {UNIT_TYPES.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {t(`common:unitType.${type}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip title={t("common:button.delete").toString()}>
            <div>
              <IconButton
                disabled={fields.length === 1}
                size="small"
                onClick={() => {
                  remove(index);
                }}
              >
                <Close />
              </IconButton>
            </div>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingItemCard;
