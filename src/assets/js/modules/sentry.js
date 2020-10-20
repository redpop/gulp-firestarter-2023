import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

export default () => {
    Sentry.init({
        dsn:
            'https://c45dcff660d146e2847ea018ca25eae0@o179721.ingest.sentry.io/5473771',
        integrations: [new Integrations.BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1,
    });
};
