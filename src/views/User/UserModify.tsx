import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { User } from "../../shared/types";
import { getUserById, modifyUser } from "../../shared/network/users.api";
import UserForm from "./components/UserForm";

const UserModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<User>();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getUserById(id ? id : "");
    setUser({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitModify = async (values: User) => {
    try {
      await modifyUser(id ? id : "", { ...values });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("article.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("article.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
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
            <UserForm user={user} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default UserModify;
