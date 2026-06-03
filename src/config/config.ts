import { env } from "./env.js";

interface Config {
  port: number;
  node_env: "development" | "production" | "test";
  db_url: string;
  resend_api: string;
  base_url: string;
  admin_username: string;
  admin_password: string;
  basic_auth: boolean;
  mock_payments: boolean;
  mock_email_relay: boolean;
}

export const config: Readonly<Config> = {
  port: env.PORT,
  node_env: env.NODE_ENV,
  db_url: env.DATABASE_URL,
  resend_api: env.RESEND_API_KEY,
  base_url: env.BASE_URL,
  admin_username: env.ADMIN_USERNAME,
  admin_password: env.ADMIN_PASSWORD,
  basic_auth: env.BASIC_AUTH_ENABLED,
  mock_payments: env.MOCK_PAYMENT,
  mock_email_relay: env.MOCK_RELAY_EMAIL,
};

export const isDevelopment = config.node_env === "development";
export const isProduction = config.node_env === "production";
export const isBasicAuthEnabled = config.basic_auth === true;
export const isMockPaymentsEnabled = config.mock_payments === true;
export const isMockEmailRelayEnabled = config.mock_email_relay === true;
