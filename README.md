# Hairbotics

## AI-Powered Hair Analysis & Product Recommendation SaaS Platform

![Hairbotics Logo](https://github.com/Ritika5703/hairbotics/raw/main/assets/logo.png)

## Overview

Hairbotics is a SaaS platform that leverages AI for comprehensive hair health analysis and personalized product recommendations. Users upload images of their hair, and our advanced machine learning algorithms analyze them for various conditions including dandruff, thinning/balding, overall health, and greasy roots. Based on this analysis, the system provides tailored hair care advice and recommends relevant products from major e-commerce platforms.

## Features

### Core Analysis

- **Hair Health Analysis**: Analyzes uploaded hair images and provides percentage assessments of:
  - Dandruff presence
  - Hair thinning/balding
  - Overall hair health
  - Greasy roots
- **Personalized Recommendations**: Offers customized hair care advice based on detected conditions

- **Product Suggestions**: Recommends relevant hair care products from:
  - Amazon
  - Alibaba
  - Jumia

### User Management

- **Secure Authentication**: User accounts with Clerk authentication
- **Personalized Dashboard**: Custom user interface showing analysis history and recommendations

### History & Tracking

- **Image History**: View all previously analyzed hair images with results
- **Analysis Timeline**: Track hair condition changes over time
- **Detailed Records**: Access comprehensive analysis details for each image
- **Exportable Reports**: Download and print analysis reports in a professional format

### E-commerce Integration

- **Direct Product Links**: Quick access to recommended products
- **Payment Processing**: Secure transactions via Stripe integration

## How It Works

1. **Sign Up**: Create a personal account for tracking your hair health journey
2. **Upload**: Upload an image of your hair through the intuitive interface
3. **Analysis**: Our AI algorithm processes the image to detect various hair conditions
4. **Results**: Review detailed percentage breakdowns of different hair conditions
5. **Recommendations**: Receive personalized hair care advice
6. **Shopping**: Browse and purchase recommended products from major e-commerce platforms
7. **Track Progress**: Monitor improvement over time with the history feature

## Technologies Used

### Frontend

- React 19 with TypeScript
- Vite for fast development and building
- Tailwind CSS for responsive design
- Framer Motion for smooth animations
- Three.js with React Three Fiber for 3D effects
- Clerk for secure user authentication
- Stripe Elements for payment processing

### Backend

- Node.js with Express
- MongoDB with Mongoose for data storage
- TensorFlow.js for image analysis and machine learning
- OpenAI integration for recommendation generation
- Multer for file uploads
- Stripe API for payment processing

### AI/ML Components

- TensorFlow.js for image processing
- Teachable Machine for image classification
- OpenAI API for generating personalized recommendations

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- NPM or Yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Ritika5703/hairbotics.git

# Navigate to the backend directory
cd hairbotics/backend

# Install dependencies
npm install

# Create a .env file with the following variables:
# MONGODB_URI=your_mongodb_connection_string
# OPENAI_API_KEY=your_openai_api_key
# STRIPE_SECRET_KEY=your_stripe_secret_key
# CLERK_SECRET_KEY=your_clerk_secret_key

# Start the backend server
npm start
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## User Features

### Dashboard

The user dashboard provides a comprehensive overview of hair health and analysis.

### Image Analysis

Upload images and receive instant AI-powered analysis of your hair condition.

### History Tracking

Access your complete history of hair analyses:

- View all previously analyzed images
- Check confidence scores for each analysis
- See detailed recommendations for each analysis
- Track changes in hair health over time
- Download or print professional reports for each analysis
- Re-analyze previous images with improved algorithms

## Business Model

Hairbotics operates as a Software-as-a-Service (SaaS) platform with:

- Free tier with limited analyses
- Premium subscription for unlimited analyses and advanced features
- Enterprise solutions for salons and hair care professionals

## Deployment

The application can be deployed using platforms like Vercel, Netlify, or Heroku.

```bash
# Build the frontend
cd frontend
npm run build

# The backend can be deployed to services like Heroku or Railway
```

## Future Enhancements

- Mobile application with React Native
- Hair growth tracking with comparative analysis
- Advanced hair texture and type classification
- Expanded product recommendation database with direct purchase options
- Virtual try-on for hairstyles using AR technology
- Subscription model with tiered pricing
- API access for third-party integrations
- Professional dashboard for hair stylists and salons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Ritika - [GitHub Profile](https://github.com/Ritika5703)

Project Link: [https://github.com/Ritika5703/hairbotics](https://github.com/Ritika5703/hairbotics)
