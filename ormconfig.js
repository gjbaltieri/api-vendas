module.exports = {
  type: `postgres`,
  host: `${process.env.PG_HOST}`,
  port: `${process.env.PG_PORT}`,
  username: `${process.env.PG_USERNAME}`,
  password: `${process.env.PG_PASSWORD}`,
  database: `${process.env.PG_DATABASE}`,
  entities: [`${process.env.PG_ENTITIES}`],
  migrations: [`${process.env.PG_MIGRATIONS}`],
  cli: { migrationsDir: `${process.env.PG_MIGRATIONS_DIR}` }
}
