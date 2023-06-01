import { Box, Container, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductList from "./Products/ProductList";
import ArticleList from "./Articles/ArticleList";

const AdminTabs = () => {
  const { t } = useTranslation();
  const [currentTabIndex, setCurrentTabIndex] = useState(
    Number.parseInt(sessionStorage.getItem("admin-tab-index") || "0")
  );

  const handleTabChange = (e: any, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
    sessionStorage.setItem("admin-tab-index", tabIndex.toString());
  };

  return (
    <Container maxWidth="lg">
      <Tabs
        scrollButtons="auto"
        variant="scrollable"
        value={currentTabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={t("product.title")} value={0} />
        <Tab label={t("article.title")} value={1} />
      </Tabs>
      <Box pt={2}>
        {currentTabIndex === 0 && <ProductList />}
        {currentTabIndex === 1 && <ArticleList />}
      </Box>
    </Container>
  );
};

export default AdminTabs;
