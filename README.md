# 🔗 URL Shortener Microservice

A production-grade HTTP URL Shortener microservice built for the **Affordmed Backend Campus Hiring Test**. This service provides efficient URL shortening with custom shortcodes, analytics tracking, and automatic expiration handling.

## Features

- **Custom Shortcodes**: Create personalized short URLs with custom aliases
- **Expiration Management**: Set validity periods for shortened URLs
- **Click Analytics**: Track clicks with referrer and location data
- **Production-Ready**: Comprehensive logging and error handling
- **RESTful API**: Clean, documented API endpoints
- **MongoDB Integration**: Persistent storage with Mongoose ODM

## 📁 Project Structure

```
12200262/
├── backend-test-submission/
│   ├── controller/
│   │   ├── createShortUrlController.js    # Handle URL creation
│   │   ├── redirectController.js          # Handle URL redirection
│   │   └── urlStatsController.js          # Handle analytics
│   ├── db/
│   │   └── connect.js                     # Database connection
│   ├── middleware/
│   │   └── log.middleware.js              # Request logging
│   ├── model/
│   │   └── url.model.js                   # URL data model
│   ├── route/
│   │   └── v1/
│   │       ├── url.api.js                 # API route definitions
│   │       └── v1.router.js               # Router configuration
│   ├── service/
│   │   └── url.service.js                 # Business logic
│   └── utils/
├── logging-middleware/
│   └── logger.js                          # Custom logger implementation
├── index.js                               # Application entry point
├── package.json
├── package-lock.json
└── README.md
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Logging** | Custom Axios-based logger |
| **Environment** | dotenv for configuration |
| **Authentication** | Token-based auth for logging |

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Affordmed credentials

### Quick Start

```bash
# Clone the repository
git clone https://github.com/aman3255/12200262.git
cd 12200262

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the service
npm run dev
```

## 🔐 Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGO_DB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name

# Affordmed Integration (Required for hiring test)
CLIENT_ID=your_affordmed_client_id
CLIENT_SECRET=your_affordmed_client_secret
ACCESS_CODE=your_affordmed_access_code
EMAIL=your_registered_email
NAME=YourName
ROLL_NO=your_roll_number
AFFORDMED_AUTH_TOKEN=your_jwt_bearer_token
```

## 📡 API Reference

### Create Short URL

**POST** `/api/v1/url/shorturls`

Creates a new shortened URL with optional customization.

**Request Body:**
```json
{
  "url": "https://example.com/some/very/long/path",
  "validity": 30,           // Optional: validity in days
  "shortcode": "custom123"  // Optional: custom shortcode
}
```

**Response (201 Created):**
```json
{
  "shortLink": "http://localhost:3000/custom123",
  "expiry": "2025-08-13T14:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid URL or duplicate shortcode
- `500 Internal Server Error`: Database or server error

### Redirect to Original URL

**GET** `/api/v1/url/:shortcode`

Redirects to the original URL and tracks analytics.

**Response:**
- `302 Found`: Successful redirect
- `404 Not Found`: Shortcode doesn't exist
- `410 Gone`: URL has expired

### Get URL Statistics

**GET** `/api/v1/url/shorturls/:shortcode`

Retrieves comprehensive analytics for a shortened URL.

**Response (200 OK):**
```json
{
  "originalUrl": "https://example.com/some/very/long/path",
  "createdAt": "2025-07-14T12:00:00.000Z",
  "expiry": "2025-08-13T12:00:00.000Z",
  "totalClicks": 15,
  "clickAnalytics": [
    {
      "timestamp": "2025-07-14T12:30:00.000Z",
      "referrer": "https://google.com",
      "location": "India"
    }
  ]
}
```


## Features Deep Dive

### Analytics Tracking
- **Click Counting**: Real-time click tracking
- **Referrer Detection**: Track traffic sources
- **Location Tracking**: Geographic analytics
- **Timestamp Logging**: Detailed access history

### Security & Validation
- **URL Validation**: Ensures valid URLs only
- **Shortcode Uniqueness**: Prevents collisions
- **Expiration Handling**: Automatic cleanup of expired URLs
- **Rate Limiting**: Built-in protection against abuse

### Logging & Monitoring
- **Request Logging**: All API requests logged
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time tracking
- **Affordmed Integration**: Centralized log management

---

## Thank You

Thank you for taking the time to review this repository.  
I appreciate the opportunity to showcase my skills through this project.

If you have any feedback or suggestions, I would love to hear from you.

---
