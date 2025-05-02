# Skin Disease Detection MERN Application

This project is a comprehensive MERN (MongoDB, Express, React, Node.js) application for skin disease detection using a machine learning model. The application allows users to upload images of skin conditions, which are then analyzed by a machine learning model to detect potential skin diseases.

## Project Structure

- **frontend/** - React frontend application
- **backend/** - Node.js/Express backend API
- **Model/** - Python Flask API for the ML model

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Python 3.8 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email_id
   EMAIL_PASSWORD=your_app_password
   ```

4. Start the backend server:
   ```
   npm start
   ```

### ML Model Setup

1. For Windows users, you can use the provided batch file to install dependencies:
   ```
   install_ml_dependencies.bat
   ```

   Or manually install dependencies:
   ```
   cd Model
   pip install -r python_requirements.txt
   ```

2. Make sure the model file `skin_disease_model_ISIC_densenet.h5` is in the Model folder

3. Start the Flask server:
   ```
   cd Model
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_BACKEND_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm start
   ```

## Quick Start

For Windows users, you can use the provided batch file to start both the backend and ML model servers:

```
start_servers.bat
```

## Features

- User authentication (patient and doctor roles)
- Upload skin images for disease detection
- View detection history
- Find and book appointments with dermatologists
- Doctor dashboard to manage appointments
- Patient profiles and medical history

## ML Model

The machine learning model uses a MobileNetV2 architecture to classify skin diseases into the following categories:

- Actinic keratosis
- Atopic Dermatitis
- Benign keratosis
- Dermatofibroma
- Melanocytic nevus
- Melanoma
- Squamous cell carcinoma
- Tinea Ringworm Candidiasis
- Vascular lesion

Note: The current implementation uses a pre-trained model for demonstration purposes. In a production environment, you would fine-tune this model on a skin disease dataset for better accuracy.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **ML Model**: TensorFlow, Flask, OpenCV
- **Authentication**: JWT
- **Image Storage**: Cloudinary

## License

This project is licensed under the MIT License.


# ML Model Integration Guide

This guide explains how the ML model has been integrated into the MERN application for skin disease detection.

## Overview of Changes

1. **Created a New ML Model**
   - Used a pre-trained MobileNetV2 model from TensorFlow
   - Implemented a Flask API to serve predictions
   - Added proper error handling and logging

2. **Updated Backend Integration**
   - Modified the detectionHistoryController.js to communicate with the ML model API
   - Added confidence score handling
   - Updated the DetectionHistory model to store confidence scores

3. **Enhanced Frontend Display**
   - Updated Dashboard.jsx to display confidence scores
   - Improved DetectionHistory.jsx to show confidence information
   - Enhanced the UI for better user experience

## How to Run the Application

### Step 1: Install Python Dependencies

Run the provided batch file:
```
install_ml_dependencies.bat
```

Or manually install dependencies:
```
cd Model
pip install -r python_requirements.txt
```

### Step 2: Start the ML Model Server

```
cd Model
python app.py
```

### Step 3: Start the Backend Server

```
cd backend
npm start
```

### Step 4: Start the Frontend Server

```
cd frontend
npm start
```

Alternatively, you can use the provided batch file to start both the backend and ML model servers:
```
start_servers.bat
```

## Testing the ML Model

You can test the ML model API directly using the provided test script:

```
cd Model
python test_model.py test_image.jpg
```

## How the Integration Works

1. When a user uploads an image on the frontend, it's sent to the backend's `/detection-history/upload` endpoint
2. The backend uploads the image to Cloudinary for storage
3. The backend then sends the image to the ML model's API at `http://localhost:7000/predict`
4. The ML model processes the image and returns a prediction with confidence score
5. The backend saves the prediction and confidence to the database and returns it to the frontend
6. The frontend displays the prediction and confidence to the user

## Implementation Notes

- The current ML model implementation uses a pre-trained model for demonstration purposes
- In a production environment, you would fine-tune this model on a skin disease dataset for better accuracy
- The confidence scores are currently simulated for demonstration purposes

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that the ML model server is running on port 7000
3. Verify that the backend server is running on port 5000
4. Check the console logs for any error messages
5. Make sure the image format is supported (JPG, PNG, JPEG)

## Future Improvements

1. Train the model on a real skin disease dataset for better accuracy
2. Implement model versioning and tracking
3. Add more detailed disease information and treatment recommendations
4. Implement a caching mechanism for faster predictions
5. Add support for multiple image uploads and batch processing
