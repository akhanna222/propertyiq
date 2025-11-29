import { db } from "./db";
import { properties, type InsertProperty } from "@shared/schema";

export async function seedDatabase() {
  // Check if data already exists
  const existingProperties = await db.select().from(properties).limit(1);
  if (existingProperties.length > 0) {
    console.log("Database already seeded");
    return;
  }

  console.log("Seeding database with property data...");

  const sampleProperties: InsertProperty[] = [
    {
      address: "18 Seagreen Park, Greystones, Co. Wicklow",
      eircode: "A63 NX62",
      locationDetails: {
        distance_to_dublin2_km: 24,
        car_commute_minutes: {
          peak: 65,
          off_peak: 48
        },
        dart_commute_minutes: 50,
        bus_routes: ["L1", "L2", "L3", "X2"],
        nearest_train_station: {
          name: "Greystones",
          distance_km: 2.1
        },
        nearby_hospitals: ["St. Vincent's University Hospital (13 km)"],
        source: "google.maps.api"
      },
      scenicAccess: {
        beach_distance_km: 1.0,
        mountain_distance_km: 3.5,
        scenic_views: ["Cliff Walk", "Bray Head", "Greystones South Beach"],
        source: "osm.org"
      },
      traffic: {
        avg_daily_commute_minutes: 36,
        dublin_congestion: {
          delay_seconds_per_10km: 40,
          time_lost_per_year_hours: 155,
          financial_loss_per_driver_eur: 6351
        },
        source: "tomtom.traffic.api"
      },
      propertyMetrics: {
        latest_sale_price_eur: 730000,
        last_sale_date: "2023-10",
        ber_rating: "A2",
        lpt_band: "E (€350k–450k)",
        management_fee: "None (freehold)",
        source: "propertypriceregister.ie"
      },
      familyLifestyle: {
        schools: [
          {
            name: "Greystones ETNS",
            type: "Primary",
            distance_km: 0.9
          },
          {
            name: "Temple Carrig Secondary",
            type: "Secondary",
            distance_km: 2.8
          }
        ],
        amenities_nearby: [
          "Supervalu (1.0 km)",
          "Tesco Express (0.9 km)",
          "Greystones Health Centre (1.2 km)",
          "Go Gym Greystones (1.4 km)",
          "Starbucks, Bear Paw Deli, and Donnybrook Fair (all within 1.5 km)"
        ],
        source: "google.maps.api"
      },
      investmentOutlook: {
        house_price_index: {
          2022: 5,
          2023: 8,
          2024: 5
        },
        new_projects: ["Marina Village", "Archers Wood (Cairn Homes)"],
        rental_yield_percent: 3.4,
        source: "daft.ie"
      },
      localEvents: [
        {
          name: "St. Patrick's Parade",
          date: "2025-03-17",
          type: "Festival",
          description: "Family-friendly parade through town centre.",
          source: "greystones.ie/events"
        },
        {
          name: "Greystones Christmas Market",
          date: "2024-11-16",
          type: "Seasonal Market",
          description: "Local crafts, food stalls, lights switch-on.",
          source: "greystones.ie/events"
        }
      ],
      recentNews: [
        {
          title: "Greystones Film Studio project delayed",
          summary: "€300M media campus faces planning and investment hurdles.",
          date: "2025-05-12",
          source: "irishtimes.com"
        },
        {
          title: "Cliff Walk temporarily closed due to landslip",
          summary: "Popular trail to Bray closed pending repairs.",
          date: "2024-06-18",
          source: "wicklownews.net"
        }
      ]
    },
    {
      address: "15 Fitzwilliam Square, Dublin 2",
      eircode: "D02 XY45",
      locationDetails: {
        distance_to_dublin2_km: 0,
        car_commute_minutes: {
          peak: 0,
          off_peak: 0
        },
        dart_commute_minutes: 5,
        bus_routes: ["1", "7", "11", "46A"],
        nearest_train_station: {
          name: "Pearse Station",
          distance_km: 0.8
        },
        nearby_hospitals: ["St. Vincent's University Hospital (2 km)", "Trinity Centre (1 km)"],
        source: "google.maps.api"
      },
      scenicAccess: {
        beach_distance_km: 8.0,
        mountain_distance_km: 15.0,
        scenic_views: ["St. Stephen's Green", "Trinity College", "Grand Canal"],
        source: "osm.org"
      },
      traffic: {
        avg_daily_commute_minutes: 15,
        dublin_congestion: {
          delay_seconds_per_10km: 60,
          time_lost_per_year_hours: 180,
          financial_loss_per_driver_eur: 7200
        },
        source: "tomtom.traffic.api"
      },
      propertyMetrics: {
        latest_sale_price_eur: 1250000,
        last_sale_date: "2024-02",
        ber_rating: "C1",
        lpt_band: "F (€450k–650k)",
        management_fee: "€2,400/year",
        source: "propertypriceregister.ie"
      },
      familyLifestyle: {
        schools: [
          {
            name: "St. Stephen's Green School",
            type: "Primary",
            distance_km: 0.5
          },
          {
            name: "Trinity Comprehensive",
            type: "Secondary",
            distance_km: 1.2
          }
        ],
        amenities_nearby: [
          "Tesco Metro (0.3 km)",
          "Fitzwilliam Clinic (0.2 km)",
          "David Lloyd Club (0.8 km)",
          "Restaurants and cafes (numerous within 0.5 km)"
        ],
        source: "google.maps.api"
      },
      investmentOutlook: {
        house_price_index: {
          2022: 7,
          2023: 12,
          2024: 8
        },
        new_projects: ["Dublin Docklands", "Fitzwilliam Quarter"],
        rental_yield_percent: 2.8,
        source: "daft.ie"
      },
      localEvents: [
        {
          name: "Dublin Fashion Festival",
          date: "2025-09-15",
          type: "Cultural",
          description: "Annual fashion showcase in city centre.",
          source: "dublin.ie/events"
        }
      ],
      recentNews: [
        {
          title: "New cycling lane approved for Fitzwilliam Square",
          summary: "Dublin City Council approves protected cycling infrastructure.",
          date: "2024-11-20",
          source: "independent.ie"
        }
      ]
    }
  ];

  try {
    await db.insert(properties).values(sampleProperties);
    console.log(`Successfully seeded ${sampleProperties.length} properties`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}