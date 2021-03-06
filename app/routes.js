// @flow
import * as React from "react";
import { Switch, Route, Redirect, type Match } from "react-router-dom";
import Archive from "scenes/Archive";
import Collection from "scenes/Collection";
import Dashboard from "scenes/Dashboard";
import KeyedDocument from "scenes/Document/KeyedDocument";
import DocumentNew from "scenes/DocumentNew";
import Drafts from "scenes/Drafts";
import Error404 from "scenes/Error404";
import Login from "scenes/Login";
import Search from "scenes/Search";
import Settings from "scenes/Settings";
import Details from "scenes/Settings/Details";
import Events from "scenes/Settings/Events";
import Export from "scenes/Settings/Export";
import Groups from "scenes/Settings/Groups";
import Notifications from "scenes/Settings/Notifications";
import People from "scenes/Settings/People";
import Security from "scenes/Settings/Security";
import Shares from "scenes/Settings/Shares";
import Slack from "scenes/Settings/Slack";
import Tokens from "scenes/Settings/Tokens";
import Zapier from "scenes/Settings/Zapier";
import Starred from "scenes/Starred";
import Templates from "scenes/Templates";
import Trash from "scenes/Trash";

import Authenticated from "components/Authenticated";
import Layout from "components/Layout";
import SocketProvider from "components/SocketProvider";
import { matchDocumentSlug as slug } from "utils/routeHelpers";

const NotFound = () => <Search notFound />;
const RedirectDocument = ({ match }: { match: Match }) => (
  <Redirect
    to={
      match.params.documentSlug ? `/doc/${match.params.documentSlug}` : "/home"
    }
  />
);

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/create" component={Login} />
      <Route exact path="/share/:shareId" component={KeyedDocument} />
      <Authenticated>
        <SocketProvider>
          <Layout>
            <Switch>
              <Redirect from="/dashboard" to="/home" />
              <Route path="/home/:tab" component={Dashboard} />
              <Route path="/home" component={Dashboard} />
              <Route exact path="/starred" component={Starred} />
              <Route exact path="/starred/:sort" component={Starred} />
              <Route exact path="/templates" component={Templates} />
              <Route exact path="/templates/:sort" component={Templates} />
              <Route exact path="/drafts" component={Drafts} />
              <Route exact path="/archive" component={Archive} />
              <Route exact path="/trash" component={Trash} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/settings/details" component={Details} />
              <Route exact path="/settings/security" component={Security} />
              <Route exact path="/settings/people" component={People} />
              <Route exact path="/settings/people/:filter" component={People} />
              <Route exact path="/settings/groups" component={Groups} />
              <Route exact path="/settings/shares" component={Shares} />
              <Route exact path="/settings/tokens" component={Tokens} />
              <Route exact path="/settings/events" component={Events} />
              <Route
                exact
                path="/settings/notifications"
                component={Notifications}
              />
              <Route
                exact
                path="/settings/integrations/slack"
                component={Slack}
              />
              <Route
                exact
                path="/settings/integrations/zapier"
                component={Zapier}
              />
              <Route exact path="/settings/export" component={Export} />
              <Route
                exact
                path="/collections/:id/new"
                component={DocumentNew}
              />
              <Route
                exact
                path="/collections/:id/:tab"
                component={Collection}
              />
              <Route exact path="/collections/:id" component={Collection} />
              <Route exact path={`/d/${slug}`} component={RedirectDocument} />
              <Route
                exact
                path={`/doc/${slug}/history/:revisionId?`}
                component={KeyedDocument}
              />
              <Route
                exact
                path={`/doc/${slug}/edit`}
                component={KeyedDocument}
              />
              <Route path={`/doc/${slug}`} component={KeyedDocument} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/search/:term" component={Search} />
              <Route path="/404" component={Error404} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </SocketProvider>
      </Authenticated>
    </Switch>
  );
}
