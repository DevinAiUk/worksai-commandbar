export const APP_DB_CONFIG = {
  schema: "worksai_hub",
  appSlug: "worksai-commandbar",
  subdomain: "commandbar.worksai.org",
  mcpEndpoint: "https://commandbar.worksai.org/api/mcp",
  aiEndpoint: "https://commandbar.worksai.org/api/ai/analyze",
  mcpTools: ["commandbar.rank_commands", "commandbar.evaluate_expression", "commandbar.expand_macro"]
} as const;
