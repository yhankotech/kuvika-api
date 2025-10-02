import * as Sentry from "@sentry/node";
import { env } from "../../env/index";

//const Sentry = require("@sentry/node");

Sentry.init({
  dsn: env.SENTRY_HTTP,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});