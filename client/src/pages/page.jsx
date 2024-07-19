import { Helmet } from 'react-helmet-async';

import Page from 'src/sections/page/Page';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Page/>
    </>
  );
}
