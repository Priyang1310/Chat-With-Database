import { Helmet } from 'react-helmet-async';

import Landing from 'src/sections/landing/landing';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Landing />
    </>
  );
}