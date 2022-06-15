import { HashRouter, Route, Switch } from "react-router-dom";
import { Example } from "../example/Example";
import { LandingPage } from "../landing/LandingPage";
import { CounterPage } from "../newcounter/CounterPage";
import { OrganisationsPage } from "../organisations/OrganisationsPage";

const Root = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/for/:name?" render={({ match }) => <Example name={match.params.name ?? "Stranger"} />} />
                <Route path="/new" render={({ match }) => <CounterPage name={match.params.name ?? ""} />} />
                <Route path="/organisation" render={() => <OrganisationsPage />} />
                {/* Default route */}
                <Route render={() => <LandingPage />} />
            </Switch>
        </HashRouter>
    );
};

export default Root;
