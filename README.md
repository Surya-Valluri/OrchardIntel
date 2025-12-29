# OrchardIntel: Apple Disease Detector with Planet Climate Risk Advisor

A React + TypeScript app for apple leaf disease prediction, dataset management, training simulation, climate risk analysis with Planet map viewer, and Supabase Edge Functions integration.

##  Features

### Disease Prediction
- 6 classes with confidence & treatment advice: Healthy, Apple Scab, Apple Rust, Powdery Mildew, Fire Blight, Black Rot
- Client-side preprocessing + enhancedClassifier (mock) or 
ealClassifier via Edge Function
- All class probabilities with top prediction highlighted

### Dataset Management
- Drag-and-drop folder upload (classified by subfolder: healthy/, pple_scab/, etc.)
- Train/Test/Validation dataset types
- Class distribution charts and metadata capture

### Model Training
- Configurable: epochs, batch size, learning rate, validation split, augmentation
- Real-time progress simulation in TrainingProgress
- Edge Function: 	rain-model

### Climate Risk Predictor  NEW
- Rule-based engine (diseases/pests) with Standard and Meta scoring
- Planet WMTS map viewer + Open-Meteo climate data
- Per-disease tie-breaker weights (~1.051.1)

### Authentication
- Supabase email/password + guest mode
- Feature-gated UI flows

##  Dataset Structure

`
your-dataset/
 healthy/          # image1.jpg, image2.png...
 apple_scab/
 apple_rust/
 powdery_mildew/
 fire_blight/
 black_rot/
`

Uses webkitRelativePath for auto-classification (Chrome/Edge).

##  Quick Start

`ash
# Install & dev
npm install
npm run dev

# Build
npm run build
npm run preview
`

Optional .env (frontend):
`ash
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
`
Planet API keys are configured in Supabase Edge Functions (not the frontend).

##  Project Structure

`
src/
 components/
    ImageUpload.tsx
    PredictionResults.tsx
    DatasetManager.tsx
    TrainingProgress.tsx
    ClimateRiskPredictor.tsx  
    PlanetMapViewer.tsx       
    Auth.tsx
 services/
    datasetService.ts
    modelService.ts
    predictionService.ts
    planetService.ts   (fetchPlanetInsights)
 utils/
     realClassifier.ts
     enhancedClassifier.ts
     climateRiskRules.ts (calculateDiseaseRisks / calculatePestRisks)
     imagePreprocessing.ts

supabase/functions/
 predict-disease/
 train-model/
 planet-proxy/       WMTS tiles
 planet-insights/    Climate data
`

##  Usage

### 1. Disease Prediction
`
Upload  Preprocess  Classify (mock/Edge)  Results + Treatment
`

### 2. Datasets
`
DatasetManager  Select type  Drag folder  Auto-classify
`

### 3. Training
`
Config params  Start  Live metrics (loss/accuracy)
`

### 4. Climate Risk 
`
Planet map  Auto-fill climate  Standard/Meta  Top risks
`

##  Climate Risk Engine

Scoring (0100):
- Standard: +20 per matched rule
- Meta: Continuous climate ranges

Risk Levels:
| Range  | Level  |
|--------|--------|
| 030   |  Low |
| 3170  |  Medium |
| 71100 |  High |

Tie-breaker: diseaseWeights in climateRiskRules.ts.

##  Supabase Setup

`ash
supabase functions deploy predict-disease train-model planet-proxy planet-insights
`

Function ENV:
`ash
PLANET_API_KEY=...
PLANET_CONFIG_ID_JK=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
`

Database: supabase/migrations/20251222061318_odd_trail.sql (schema/RLS/buckets).

##  Disease Classes

| Disease            | Severity | Description                     |
|--------------------|----------|---------------------------------|
| Healthy            |  Low   | Normal leaves                   |
| Apple Scab         |  High  | Dark fungal lesions             |
| Apple Rust         |  Medium| Orange cedar rust spots         |
| Powdery Mildew     |  Medium| White coating                   |
| Fire Blight        |  High  | Bacterial burn                  |
| Black Rot          |  High  | Brown spots + purple            |

##  Troubleshooting

| Issue            | Fix                                      |
|------------------|------------------------------------------|
| Planet 400       | Set PLANET_API_KEY in functions        |
| Folder upload    | Use Chrome/Edge and select a folder      |
| No climate data  | Mock fallback is active                  |
| Limited features | Add Supabase .env                      |

##  Contributing

`ash
git checkout -b feature/name
# Rule changes  add examples
git push && PR
`

**MIT License**  Issues welcome

---

##  Author
**Za.i.14**  Creator

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/Za.i.14)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/zai14)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=X&logoColor=white)](https://x.com/Za_i14)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=YouTube&logoColor=white)](https://youtube.com/@Za.i.14)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ZaidShabir67@gmail.com)

*Built with  for Crop Community  React + Supabase + Planet *
