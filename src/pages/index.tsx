import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * This page is needed because Docusaurus complains if there is no index page.
 * The client-side redirect is here as a fallback, as Vercel should handle the redirect. See vercel.json.
 */
export default function Home() {
  return <Redirect to="/gentle-intro-dao-governance" />;
}
