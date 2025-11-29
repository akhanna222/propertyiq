# PropertyIQ - Intelligent Property Analysis Platform

## Overview

PropertyIQ is a comprehensive property analysis platform for Irish real estate that provides intelligent insights through AI-powered data aggregation. The application serves as a real estate intelligence assistant that helps homebuyers evaluate specific properties by analyzing location details, traffic patterns, investment outlook, and lifestyle factors.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Payment Processing**: Stripe integration for subscription management
- **API Integration**: OpenAI API for property analysis enhancement

### Data Storage
- **Database**: PostgreSQL hosted on Neon (serverless)
- **ORM**: Drizzle with schema-first approach
- **Migrations**: Managed through drizzle-kit
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

## Key Components

### Database Schema
- **Properties Table**: Stores comprehensive property data including location details, scenic access, traffic analysis, property metrics, family lifestyle factors, investment outlook, local events, and recent news
- **Users Table**: Manages user authentication, subscription status, and usage tracking
- **Sessions Table**: Handles user session management

### Authentication System
- **Provider**: Email/password authentication with bcrypt hashing
- **Session Management**: Secure cookie-based sessions with PostgreSQL storage
- **Authorization**: Route-level protection with middleware

### Property Analysis Engine
- **Data Sources**: Aggregates from multiple public APIs and databases
- **AI Enhancement**: OpenAI integration for intelligent property insights
- **Structured Output**: Returns normalized JSON with comprehensive property metrics

### Subscription Management
- **Payment Processor**: Stripe with webhooks for subscription events
- **Usage Tracking**: Free tier with 3 analyses, premium unlimited access
- **Billing**: Automated subscription lifecycle management

## Data Flow

1. **User Authentication**: Users authenticate via email/password signup and login with secure bcrypt hashing
2. **Property Search**: Users input property address or Eircode for analysis
3. **Data Aggregation**: System queries multiple data sources and APIs
4. **AI Processing**: OpenAI enhances raw data with intelligent insights
5. **Result Display**: Comprehensive property analysis displayed in structured cards
6. **Usage Tracking**: System tracks analysis usage against subscription limits

## External Dependencies

### Core Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Email/Password Auth**: Simple authentication with PostgreSQL storage
- **Stripe**: Payment processing and subscription management
- **OpenAI**: AI-powered property analysis enhancement

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Pre-built accessible UI components

### APIs and Data Sources
- **Google Maps API**: Location and mapping data
- **Irish Property Price Register**: Official property transaction data
- **CSO.ie**: Central Statistics Office data
- **TomTom Traffic API**: Real-time traffic and commute data

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles Node.js server to `dist/index.js`
- **Database**: Drizzle migrations applied during deployment

### Environment Configuration
- **Development**: Local development with Vite dev server and tsx
- **Production**: Express serves static assets and API routes
- **Database**: Environment-based connection strings

### Replit Integration
- **Development Mode**: Enhanced with cartographer and runtime error overlay
- **Environment Variables**: Managed through Replit secrets
- **Domain Management**: Configured for custom domain deployment

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
- June 30, 2025. Updated color scheme to orange and white theme with Gen Z aesthetic
- June 30, 2025. Changed to light Apple-style theme with neutral gray and blue colors
- June 30, 2025. Updated to clean white/gray theme with charcoal black text throughout, improved GPT-4o prompts for structured amenity data
- June 30, 2025. Added Resend email integration for subscription notifications and updated Stripe to use production keys for €10/month premium subscriptions
- June 30, 2025. Completely removed all Replit authentication references - now uses pure email/password authentication with PostgreSQL sessions
- July 1, 2025. Implemented comprehensive email verification system using Resend API with memory-based token storage, requiring email verification before property analysis
- July 2, 2025. Fixed Stripe subscription payment flow - resolved navigation permission errors by using 'redirect: if_required' and wouter navigation instead of external redirects. Premium subscriptions now properly activate with unlimited property analysis access.
- July 2, 2025. Fixed PropertyDataTable year filtering to auto-select most recent available year with actual CSV data. Fixed DataCollectionLoader animation to properly stop after completion. System now correctly prioritizes PropertyRegister.ie CSV data over AI estimates with proper year-based filtering showing 2025 records when available.
- July 2, 2025. Enhanced commute time analysis with specific peak and off-peak timing details. Updated GPT-4o prompts to generate realistic travel times with 50-75% longer peak vs off-peak periods. Created EnhancedCommuteDisplay component with color-coded sections (green for off-peak, orange for peak) and route information. Reorganized distance metrics and transport accessibility into a combined horizontal layout for better space utilization.
- July 2, 2025. Updated GPT-4o prompts to ensure all news links and current events reference 2025 as the current year instead of 2024. Modified rental pricing, crime statistics, infrastructure plans, and timeframe references to reflect 2025 as the current year throughout the analysis.
- July 2, 2025. Added Daft.ie property listings integration to GPT-4o analysis. System now generates 5-8 current property listings from the same area with real Daft.ie URLs, prices, listing dates, property types, and bedroom counts. Displays in Investment section with clickable links and green-themed styling for easy identification of similar properties for sale.
- July 2, 2025. Implemented comprehensive user query storage system. All property analysis requests are now stored in the database with user ID, timestamp, subscription status, and complete analysis output. Updated Eircode example to A11 AB11 format. Modified UI to clear analysis output when analyze button is clicked, ensuring fresh display for each analysis while maintaining backend storage.
- July 2, 2025. Added collapsible search history sidebar displaying previously analyzed property addresses. Users can click on any historical search to instantly retrieve and display the complete analysis results. Includes address truncation, relative timestamps, eircode/county display, and responsive design with smooth animations. Auto-refreshes after new property analyses.
- July 2, 2025. Removed current news links section completely from property analysis. Streamlined single GPT-4o call approach now generates comprehensive analysis without news components, maintaining efficient token usage and coherent output structure. Fixed Stripe subscription integration with updated active price ID.
- July 2, 2025. Fixed hardcoded commute time template issue by removing static example values from GPT-4o prompt. System now generates location-specific travel times based on actual distance and road access. Imported missing 2025 PropertyRegister.ie CSV data (7,100 records) - now includes 19 Sandymount property sales for 2025 data display.
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Theme preference: Clean white and gray theme with charcoal black text throughout all components
App name preference: PropertyIQ (requires Replit project name change in settings)
```