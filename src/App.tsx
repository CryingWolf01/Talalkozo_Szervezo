import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LayoutLoading from "./components/LayoutLoading";
import supportedLocales from "./config/supportedLocales";
import Home from "./views/Homepage/Home";
import Login from "./views/Login/Login";
import PageNotFound from "./views/PageNotFound";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import ShoppingLists from "./views/Shopping/ShoppingLists";
import AdminTabs from "./views/Admin/AdminTabs";
import FinancesList from "./views/Finances/FinancesList";
import ShoppingListCreate from "./views/Shopping/ShoppingListCreate";
import ShoppingListModify from "./views/Shopping/ShoppingListModify";
import ShoppingListDetails from "./views/Shopping/ShoppingListDetails";
import FinancesCreate from "./views/Finances/FinancesCreate";
import FinancesModify from "./views/Finances/FinancesModify";
import FinancesDetails from "./views/Finances/FinancesDetails";
import ProductCreate from "./views/Admin/Products/ProductCreate";
import ProductModify from "./views/Admin/Products/ProductModify";
import ArticleCreate from "./views/Admin/Articles/ArticleCreate";
import ArticleModify from "./views/Admin/Articles/ArticleModify";

initializeApp(firebaseConfig);

function App() {
  const { i18n } = useTranslation();
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={supportedLocales[i18n.language]}
    >
      <Suspense fallback={<LayoutLoading />}>
        <Layout>
          <Routes>
            {/*Default Routes*/}
            <Route element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/*ShoppingList Routes*/}
            <Route path="/shopping-lists" element={<ShoppingLists />} />
            <Route
              path="/shopping-lists/create"
              element={<ShoppingListCreate />}
            />
            <Route
              path="/shopping-lists/modify"
              element={<ShoppingListModify />}
            />
            <Route
              path="/shopping-lists/details"
              element={<ShoppingListDetails />}
            />
            {/*Finaces Routes*/}
            <Route path="/finances" element={<FinancesList />} />
            <Route path="/finances/create" element={<FinancesCreate />} />
            <Route path="/finances/modify" element={<FinancesModify />} />
            <Route path="/finances/details" element={<FinancesDetails />} />
            {/*Admin Routes*/}
            <Route path="/admin" element={<AdminTabs />} />
            <Route path="/admin/product/create" element={<ProductCreate />} />
            <Route path="/admin/product/modify" element={<ProductModify />} />
            <Route path="/admin/article/create" element={<ArticleCreate />} />
            <Route path="/admin/article/modify" element={<ArticleModify />} />
          </Routes>
        </Layout>
      </Suspense>
    </MuiPickersUtilsProvider>
  );
}

export default App;
