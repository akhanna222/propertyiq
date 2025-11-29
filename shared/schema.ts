import { pgTable, text, serial, integer, bigint, decimal, jsonb, timestamp, varchar, index, boolean as pgBoolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  eircode: text("eircode").notNull().unique(),
  locationDetails: jsonb("location_details"),
  scenicAccess: jsonb("scenic_access"),
  traffic: jsonb("traffic"),
  propertyMetrics: jsonb("property_metrics"),
  familyLifestyle: jsonb("family_lifestyle"),
  investmentOutlook: jsonb("investment_outlook"),
  localEvents: jsonb("local_events"),
  recentNews: jsonb("recent_news"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enhanced comprehensive property analysis schema matching AI output
export const commuteAndDistanceSchema = z.object({
  distance_to_dublin: z.string().optional(),
  commute_public_transport: z.string().optional(),
  commute_car: z.string().optional(),
  airport_proximity: z.string().optional(),
  walkability_score: z.string().optional(),
}).optional();

export const safetySchema = z.object({
  crime_rates: z.string().optional(),
  neighbourhood_safety: z.string().optional(),
  emergency_services: z.string().optional(),
  lighting_and_security: z.string().optional(),
}).optional();

export const floodAndCoastalSchema = z.object({
  flood_risk: z.string().optional(),
  coastal_erosion: z.string().optional(),
  sea_level_rise: z.string().optional(),
  drainage_systems: z.string().optional(),
}).optional();

export const housePricesSchema = z.object({
  current_market_value: z.string().optional(),
  price_trends: z.string().optional(),
  comparable_sales: z.string().optional(),
  market_predictions: z.string().optional(),
}).optional();

export const educationSchema = z.object({
  primary_schools: z.string().optional(),
  secondary_schools: z.string().optional(),
  third_level_access: z.string().optional(),
  school_performance: z.string().optional(),
}).optional();

export const retailAndLeisureSchema = z.object({
  shopping_centres: z.string().optional(),
  restaurants_cafes: z.string().optional(),
  sports_facilities: z.string().optional(),
  entertainment_venues: z.string().optional(),
}).optional();

export const investmentAndRentalSchema = z.object({
  rental_market_overview: z.string().optional(),
  rental_yield_and_resale: z.string().optional(),
  new_developments: z.string().optional(),
}).optional();

export const familyAndLifestyleSchema = z.object({
  school_quality: z.string().optional(),
  community_feel: z.string().optional(),
  healthcare_access: z.string().optional(),
  shops_and_amenities: z.string().optional(),
}).optional();

export const financialAndRegulatorySchema = z.object({
  property_tax_band: z.string().optional(),
  ber_rating: z.string().optional(),
  management_fees: z.string().optional(),
  zoning_and_restrictions: z.string().optional(),
}).optional();

export const infrastructureAndUtilitiesSchema = z.object({
  broadband_and_mobile: z.string().optional(),
  water_and_sewerage: z.string().optional(),
  waste_collection: z.string().optional(),
}).optional();

export const otherConsiderationsSchema = z.object({
  noise_levels: z.string().optional(),
  parking_and_traffic: z.string().optional(),
  protected_status: z.string().optional(),
  mica_or_pyrite_risk: z.string().optional(),
}).optional();

export const summaryDataSourcesSchema = z.object({
  commute_and_distance: z.string().optional(),
  safety: z.string().optional(),
  flood_and_coastal: z.string().optional(),
  house_prices: z.string().optional(),
  schools: z.string().optional(),
  amenities_and_shops: z.string().optional(),
  lpt_and_ber: z.string().optional(),
  broadband_and_utilities: z.string().optional(),
  other_metrics: z.string().optional(),
}).optional();

// Legacy schemas for backward compatibility
export const locationDetailsSchema = z.object({
  distance_to_dublin2_km: z.number().optional(),
  car_commute_minutes: z.object({
    peak: z.number(),
    off_peak: z.number(),
  }).optional(),
  dart_commute_minutes: z.number().optional(),
  bus_routes: z.array(z.string()).optional(),
  nearest_train_station: z.object({
    name: z.string(),
    distance_km: z.number(),
  }).optional(),
  nearby_hospitals: z.array(z.string()).optional(),
  source: z.string().optional(),
}).optional();

export const scenicAccessSchema = z.object({
  beach_distance_km: z.number().optional(),
  mountain_distance_km: z.number().optional(),
  scenic_views: z.array(z.string()).optional(),
  source: z.string().optional(),
}).optional();

export const trafficSchema = z.object({
  avg_daily_commute_minutes: z.number().optional(),
  dublin_congestion: z.object({
    delay_seconds_per_10km: z.number(),
    time_lost_per_year_hours: z.number(),
    financial_loss_per_driver_eur: z.number(),
  }).optional(),
  source: z.string().optional(),
}).optional();

export const propertyMetricsSchema = z.object({
  latest_sale_price_eur: z.number().nullable().optional(),
  last_sale_date: z.string().nullable().optional(),
  ber_rating: z.string().optional(),
  lpt_band: z.string().optional(),
  management_fee: z.string().optional(),
  source: z.string().optional(),
}).optional();

const amenityDetailSchema = z.object({
  name: z.string(),
  type: z.string().optional(),
  distance_km: z.number().optional(),
  rating: z.string().optional(),
});

const amenityCategorySchema = z.object({
  count: z.number().optional(),
  details: z.array(amenityDetailSchema).optional(),
});

export const familyLifestyleSchema = z.object({
  // Overview fields
  school_quality: z.string().optional(),
  community_feel: z.string().optional(),
  healthcare_access: z.string().optional(),
  shops_and_amenities: z.string().optional(),
  recreation_and_leisure: z.string().optional(),
  creches_and_childcare: z.string().optional(),
  community_sentiment_and_online_forum_summary: z.string().optional(),
  
  // Structured amenity data with counts and distances
  schools: amenityCategorySchema.optional(),
  healthcare: amenityCategorySchema.optional(),
  shops: amenityCategorySchema.optional(),
  recreation: amenityCategorySchema.optional(),
  creches: amenityCategorySchema.optional(),
  
  // Legacy array fields for backward compatibility
  parks: z.array(z.string()).optional(),
  clinics: z.array(z.string()).optional(),
  gyms: z.array(z.string()).optional(),
  cafes: z.array(z.string()).optional(),
  amenities_nearby: z.array(z.string()).optional(),
  source: z.string().optional(),
}).optional();

export const investmentOutlookSchema = z.object({
  house_price_index: z.record(z.string(), z.number()).optional(),
  new_projects: z.array(z.string()).optional(),
  rental_yield_percent: z.number().optional(),
  source: z.string().optional(),
}).optional();

export const localEventSchema = z.object({
  name: z.string(),
  date: z.string(),
  type: z.string(),
  description: z.string(),
  source: z.string().optional(),
});

export const recentNewsSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  source: z.string(),
});

// New comprehensive analysis schemas for the structured JSON format
export const commuteTimeSchema = z.object({
  peak_hours: z.string(),
  off_peak_hours: z.string(),
  public_transport: z.string(),
  key_roads: z.string(),
});

export const distanceMetricsSchema = z.object({
  city_centre: z.string(),
  airport: z.string(),
  hospital: z.string(),
  shopping: z.string(),
  schools_and_childcare: z.string(),
});

export const transportAccessibilitySchema = z.object({
  walkability: z.string(),
  cycling_lanes: z.string(),
  park_and_ride: z.string(),
});

export const locationAndPropertyMetricsSchema = z.object({
  commute_time: commuteTimeSchema.optional(),
  distance_metrics: distanceMetricsSchema.optional(),
  transport_accessibility: transportAccessibilitySchema.optional(),
});

export const safetyAndSecuritySchema = z.object({
  crime_rates: z.string(),
  flood_risk: z.string(),
  coastal_erosion: z.string().optional(),
  rivers: z.string().optional(),
});

export const investmentAndTrendsSchema = z.object({
  house_price_trends: z.string(),
  rental_yield_and_resale: z.string(),
  new_developments: z.string(),
});

export const familyAndLifestyleNewSchema = z.object({
  school_quality: z.string(),
  community_feel: z.string(),
  healthcare_access: z.string(),
  shops_and_amenities: z.string(),
});

export const financialAndRegulatoryNewSchema = z.object({
  property_tax_band: z.string(),
  ber_rating: z.string(),
  management_fees: z.string(),
  zoning_and_restrictions: z.string(),
});

export const infrastructureAndUtilitiesNewSchema = z.object({
  broadband_and_mobile: z.string(),
  water_and_sewerage: z.string(),
  waste_collection: z.string(),
});

export const otherConsiderationsNewSchema = z.object({
  noise_levels: z.string(),
  parking_and_traffic: z.string(),
  protected_status: z.string(),
  mica_or_pyrite_risk: z.string(),
});

export const summaryDataSourcesNewSchema = z.object({
  commute_and_distance: z.string(),
  safety: z.string(),
  flood_and_coastal: z.string(),
  house_prices: z.string(),
  schools: z.string(),
  amenities_and_shops: z.string(),
  lpt_and_ber: z.string(),
  broadband_and_utilities: z.string(),
  other_metrics: z.string(),
});

// Enhanced comprehensive analysis schemas (new structure)
export const enhancedLocationMetricsSchema = z.object({
  commute_time: z.string(),
  distance_metrics: z.string(),
  transport_accessibility: z.string(),
  detailed_transport_info: z.object({
    bus_routes: z.string(),
    bus_frequency: z.string(),
    dart_luas_access: z.string(),
    cycling_infrastructure: z.string(),
    motorway_access: z.string(),
    airport_connections: z.string(),
    park_and_ride: z.string(),
    future_transport_plans: z.string(),
  }).optional(),
  overall_area_score: z.number(),
  score_breakdown: z.object({
    safety_score: z.number(),
    investment_score: z.number(),
    lifestyle_score: z.number(),
    transport_score: z.number(),
    amenities_score: z.number(),
  }),
});

export const enhancedSafetySecuritySchema = z.object({
  crime_rates: z.string(),
  detailed_crime_breakdown: z.string(),
  recent_local_news: z.string(),
  flood_risk_and_natural_hazards: z.string(),
  mica_or_pyrite_risk: z.string(),
  fire_safety_risks: z.string(),
  alarm_system_requirements: z.string(),
  coastal_erosion_risk: z.string(),
  landslide_or_subsidence_risk: z.string(),
  radon_gas_levels: z.string(),
  emergency_services_response_time: z.string(),
  neighbourhood_watch_presence: z.string(),
  anti_social_behaviour_hotspots: z.string(),
  burglary_prevention_measures: z.string(),
  road_safety_concerns: z.string(),
});

export const enhancedInvestmentTrendsSchema = z.object({
  house_price_trends: z.string(),
  median_house_price: z.string(),
  average_house_price: z.string(),
  year_on_year_price_growth: z.string(),
  average_house_pricing_by_year: z.object({
    "2025": z.string(),
    "2024": z.string(), 
    "2023": z.string(),
    "2022": z.string(),
    "2021": z.string(),
  }).optional(),
  rental_pricing: z.object({
    "2_bed": z.string(),
    "3_bed": z.string(),
    "4_bed": z.string(),
    rental_yoy_increase: z.string(),
  }).optional(),
  rental_yield_and_resale_potential: z.string(),
  new_developments_nearby: z.string(),
  market_sentiment_and_regional_comparison: z.string(),
  planning_applications_and_infrastructure_upgrades: z.string(),
});

export const enhancedFamilyLifestyleSchema = z.object({
  school_quality: z.string(),
  community_feel: z.string(),
  community_sentiment_and_online_forum_summary: z.string(),
  healthcare_access: z.string(),
  shops_and_amenities: z.string(),
  recreation_and_leisure: z.string(),
});

export const enhancedFinancialRegulatorySchema = z.object({
  local_property_tax_band: z.string(),
  ber_rating: z.string(),
  management_fees: z.string(),
  zoning_and_restrictions: z.string(),
  developer_reputation_and_previous_issues: z.string(),
});

export const enhancedInfrastructureUtilitiesSchema = z.object({
  broadband_and_mobile_coverage: z.string(),
  water_and_sewerage: z.string(),
  waste_collection: z.string(),
  transport_future_plans: z.string(),
});

export const enhancedOtherConsiderationsSchema = z.object({
  noise_levels: z.string(),
  parking_and_traffic: z.string(),
  protected_status: z.string(),
  historical_events_or_incidents: z.string(),
  known_material_issues: z.string(),
});

export const enhancedDataSourcesSchema = z.object({
  commute_and_distance: z.string(),
  crime_and_safety: z.string(),
  local_news_sources: z.string(),
  house_prices: z.string(),
  schools: z.string(),
  community_and_forums: z.string(),
  lpt_and_ber: z.string(),
  broadband_and_utilities: z.string(),
  planning_and_zoning: z.string(),
  structural_defects_and_material_issues: z.string(),
  other_metrics: z.string(),
});

// Complete Enhanced Property Data Schema
export const propertyDataSchema = z.object({
  address: z.string(),
  eircode: z.string(),
  county: z.string().optional(),
  daft_search_links: z.object({
    search_url: z.string(),
    sale_url: z.string(),
    rent_url: z.string(),
    search_terms: z.string(),
  }).optional(),
  // Enhanced comprehensive analysis structure (latest format)
  location_and_property_metrics: enhancedLocationMetricsSchema.optional(),
  safety_and_security: enhancedSafetySecuritySchema.optional(),
  investment_potential_and_area_trends: enhancedInvestmentTrendsSchema.optional(),
  family_and_lifestyle_suitability: enhancedFamilyLifestyleSchema.optional(),
  financial_and_regulatory_aspects: enhancedFinancialRegulatorySchema.optional(),
  infrastructure_and_utilities: enhancedInfrastructureUtilitiesSchema.optional(),
  other_considerations: enhancedOtherConsiderationsSchema.optional(),
  summary_data_sources: enhancedDataSourcesSchema.optional(),
  current_news_links: z.array(z.object({
    title: z.string(),
    url: z.string(),
    date: z.string(),
    source: z.string(),
  })).optional(),
  // Previous comprehensive analysis structure (legacy)
  investment_and_trends: investmentAndTrendsSchema.optional(),
  family_and_lifestyle: familyAndLifestyleNewSchema.optional(),
  financial_and_regulatory: financialAndRegulatoryNewSchema.optional(),
  summary_data_sources_old: summaryDataSourcesNewSchema.optional(),
  // Previous comprehensive analysis sections
  commute_and_distance: commuteAndDistanceSchema.optional(),
  safety: safetySchema.optional(),
  flood_and_coastal: floodAndCoastalSchema.optional(),
  house_prices: housePricesSchema.optional(),
  education: educationSchema.optional(),
  retail_and_leisure: retailAndLeisureSchema.optional(),
  investment_and_rental: investmentAndRentalSchema.optional(),
  family_lifestyle: familyLifestyleSchema.optional(),
  // Legacy fields for backward compatibility
  location_details: locationDetailsSchema.optional(),
  scenic_access: scenicAccessSchema.optional(),
  traffic: trafficSchema.optional(),
  property_metrics: propertyMetricsSchema.optional(),
  investment_outlook: investmentOutlookSchema.optional(),
  local_events: z.array(localEventSchema).optional(),
  recent_news: z.array(recentNewsSchema).optional(),
  daft_data_available: z.boolean().optional(),
  daft_source_info: z.string().optional(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with subscription model
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password"), // For email/password auth
  name: varchar("name"), // Full name for simplified signup
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  address: text("address"), // User's saved address
  propertyAreaInterested: text("property_area_interested"), // Area of property interest
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status"),
  subscriptionPlan: varchar("subscription_plan").default("free"),
  usageCount: integer("usage_count").default(0),
  usageResetDate: timestamp("usage_reset_date"),


  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// PropertyRegister.ie historical data table
export const propertyRegisterData = pgTable("property_register_data", {
  id: serial("id").primaryKey(),
  saleDate: timestamp("sale_date").notNull(),
  address: text("address").notNull(),
  county: varchar("county", { length: 50 }).notNull(),
  eircode: varchar("eircode", { length: 10 }),
  price: bigint("price", { mode: "number" }).notNull(), // Price in cents to avoid floating point issues
  notFullMarketPrice: varchar("not_full_market_price", { length: 5 }).default("No"),
  vatExclusive: varchar("vat_exclusive", { length: 5 }).default("No"),
  description: text("description"),
  propertySizeDescription: text("property_size_description"),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_property_register_eircode").on(table.eircode),
  index("idx_property_register_county").on(table.county),
  index("idx_property_register_year").on(table.year),
  index("idx_property_register_address").on(table.address),
]);

// User searches table to store search history and analytics
export const userSearches = pgTable("user_searches", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  address: text("address").notNull(),
  eircode: varchar("eircode", { length: 10 }),
  searchResults: jsonb("search_results"), // Store the complete property analysis
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_user_searches_user_id").on(table.userId),
  index("idx_user_searches_address").on(table.address),
  index("idx_user_searches_created_at").on(table.createdAt),
]);

// Section feedback table to store user feedback on each analysis section
export const sectionFeedback = pgTable("section_feedback", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  propertyAddress: text("property_address").notNull(),
  propertyEircode: varchar("property_eircode", { length: 10 }),
  sectionName: varchar("section_name", { length: 100 }).notNull(), // e.g., "location_and_property_metrics", "safety_and_security", etc.
  feedbackText: text("feedback_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_section_feedback_user_id").on(table.userId),
  index("idx_section_feedback_property").on(table.propertyAddress, table.propertyEircode),
  index("idx_section_feedback_section").on(table.sectionName),
  index("idx_section_feedback_created_at").on(table.createdAt),
]);

// User queries table to store all analysis requests with user info, timestamp, subscription status, and output
export const userQueries = pgTable("user_queries", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  address: text("address").notNull(),
  eircode: varchar("eircode", { length: 10 }),
  county: varchar("county", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 20 }).notNull(), // 'free', 'premium', etc.
  analysisOutput: jsonb("analysis_output"), // Store the complete PropertyData JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_user_queries_user_id").on(table.userId),
  index("idx_user_queries_created_at").on(table.createdAt),
  index("idx_user_queries_subscription").on(table.subscriptionStatus),
]);

// User schemas for signup and login
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  propertyAreaInterested: z.string().min(2, "Property area of interest is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Feedback schemas
export const sectionFeedbackSchema = z.object({
  propertyAddress: z.string().min(1, "Property address is required"),
  propertyEircode: z.string().optional(),
  sectionName: z.string().min(1, "Section name is required"),
  feedbackText: z.string().min(1, "Feedback text is required"),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type UserSearch = typeof userSearches.$inferSelect;
export type InsertUserSearch = typeof userSearches.$inferInsert;
export type PropertyRegisterEntry = typeof propertyRegisterData.$inferSelect;
export type InsertPropertyRegisterEntry = typeof propertyRegisterData.$inferInsert;
export type SectionFeedback = typeof sectionFeedback.$inferSelect;
export type InsertSectionFeedback = typeof sectionFeedback.$inferInsert;
export type SectionFeedbackInput = z.infer<typeof sectionFeedbackSchema>;
export type UserQuery = typeof userQueries.$inferSelect;
export type InsertUserQuery = typeof userQueries.$inferInsert;
export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type PropertyData = z.infer<typeof propertyDataSchema>;

// New comprehensive analysis types
export type CommuteAndDistance = z.infer<typeof commuteAndDistanceSchema>;
export type Safety = z.infer<typeof safetySchema>;
export type FloodAndCoastal = z.infer<typeof floodAndCoastalSchema>;
export type HousePrices = z.infer<typeof housePricesSchema>;
export type Education = z.infer<typeof educationSchema>;
export type RetailAndLeisure = z.infer<typeof retailAndLeisureSchema>;
export type InvestmentAndRental = z.infer<typeof investmentAndRentalSchema>;
export type FamilyAndLifestyle = z.infer<typeof familyAndLifestyleSchema>;
export type FinancialAndRegulatory = z.infer<typeof financialAndRegulatorySchema>;
export type InfrastructureAndUtilities = z.infer<typeof infrastructureAndUtilitiesSchema>;
export type OtherConsiderations = z.infer<typeof otherConsiderationsSchema>;
export type SummaryDataSources = z.infer<typeof summaryDataSourcesSchema>;

// Legacy types for backward compatibility
export type LocationDetails = z.infer<typeof locationDetailsSchema>;
export type ScenicAccess = z.infer<typeof scenicAccessSchema>;
export type Traffic = z.infer<typeof trafficSchema>;
export type PropertyMetrics = z.infer<typeof propertyMetricsSchema>;
export type FamilyLifestyle = z.infer<typeof familyLifestyleSchema>;
export type InvestmentOutlook = z.infer<typeof investmentOutlookSchema>;
export type LocalEvent = z.infer<typeof localEventSchema>;
export type RecentNews = z.infer<typeof recentNewsSchema>;
