import { AppRoot, ContentWrapper } from "./App.styles";

import { DataTable } from "../components/DataTable/";

export const App = () => {
  return (
    <AppRoot>
      <ContentWrapper>
        <DataTable />
      </ContentWrapper>
    </AppRoot>
  );
};
