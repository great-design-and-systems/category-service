import express from 'express';
import { GDSDatabase, GDSServer, GDSServices, GDSUtil } from 'gds-config';
const app = express();
const PORT = process.env.PORT || 5000;

import CategoryResource from './boundary/category-resource';

new GDSServices().initServices((serviceError, result) => {
    new GDSDatabase().connect((errDB) => {
        if (errDB) {
            console.error(errDB);
        } else {
            new GDSServer(app);
            new GDSUtil().getLogger(() => {
                app.listen(PORT, () => {
                    global.gdsLogger.logInfo('Express is listening to port ' + PORT);
                    new CategoryResource(app);
                });
            })
        }
    });

});

export default app;



