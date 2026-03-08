import connectPgSimple from "connect-pg-simple";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import pgPool from "./configs/database.js";
import ENV from "./configs/env.js";
import errorHandler from "./middlewares/errorHandler.js";

import notFound from "./utils/notFound.js";
import userRoute from "./routes/userRoute.js";
import addressRoute from "./routes/addressRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
// configure express
const app = express();
const pgSession = connectPgSimple(session);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// configure express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'", "js.stripe.com"],
        "script-src": ["'self'", "js.stripe.com"],
      },
    },
  }),
);
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
// passport middleware
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      createTableIfMissing: true,
      pruneSessionInterval: 60 * 15,
      ttl: 60 * 60 * 24 * 7,
    }),
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    rolling: true,
    unset: "destroy",
    cookie: {
      secure: ENV.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: true,
    },
  }),
);
app.use(express.static(path.join(__dirname, "../uploads")));
// configure express routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/addresses", addressRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
// handle errors middleware
app.use(notFound);
app.use(errorHandler);

export default app;
