// Allows us to make dynamic routes like '/campaigns/<CAMPAIGN_NAME>/requests'

const routes = require('next-routes')(); //Invokes a function after requiring it (why we add the second ())

/* Parameters in routes.add():
    1. The route that the user is attempting to go to
        - When use :<NAME>, indicating a wildcard or variable
    2. The route that we want to direct the user to

    - Order of Priority is the .add() before have more priority than the .add() after
 */
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes; // Allows us to make these variable dynamic routes