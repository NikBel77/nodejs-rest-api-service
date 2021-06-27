import config from './common/config';
import app from './app';
import dbConnect from './utils/connect';

dbConnect()
    .then(() => {
        console.log('Connected');
        app.listen(config.PORT, () =>
            console.log(`App is running on http://localhost:${config.PORT}`)
        );
    })
    .catch((err) => {
        console.error('Connection failed')
        console.error(err)
    })

