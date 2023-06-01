import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FinancesData } from "../../shared/types";
import { useNavigate } from "react-router-dom";
import { createFinances } from "../../shared/network/finances.api";
import { useSnackbar } from "notistack";
import { Container } from "@material-ui/core";
import FinancesForm from "./components/FinancesForm";
import { useContext } from "react";
import { AuthContext } from "../../shared/reducers/AuthContext";

const FinancesCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<FinancesData>();
  const currentDate = new Date();
  const user = useContext(AuthContext);

  const onSubmitCreate = async (values: FinancesData) => {
    try {
      await createFinances({
        ...values,
        date:
          currentDate.getMonth() + 1 < 10
            ? currentDate.getFullYear() + "-" + 0 + (currentDate.getMonth() + 1)
            : currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1),
        userId: user?.uid || "",
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("product.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
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
          <FinancesForm />
        </FormProvider>
      </form>
    </Container>
  );
};

export default FinancesCreate;
