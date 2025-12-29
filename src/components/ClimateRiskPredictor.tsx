import React, { useState } from 'react';
import {
  calculateDiseaseRisks,
  calculatePestRisks,
  ClimateParams,
} from '../utils/climateRiskRules';
import PlanetMapViewer from './PlanetMapViewer';

type View = 'Diseases' | 'Pests';

export default function ClimateRiskPredictor(): JSX.Element {
  const [view, setView] = useState<View>('Diseases');
  const [riskModel, setRiskModel] = useState<'standard' | 'meta'>('standard');
  const [showStandardWarning, setShowStandardWarning] = useState(false);

  const [viewParams, setViewParams] = useState<any>({
    temperature: 20,
    rh: 75,
    weeklyRainfall: 10,
    leafWetness: 4,
    windSpeed: 5,
    soilMoisture: 50,
    canopyHumidity: 75,
    dustLevel: 'unknown',
    drainage: 'unknown',
    hasStandingWater48h: false,
    hasTempJump10C: false,
    hadDroughtThenHeavyRain: false,
  });

  const [results, setResults] = useState<any[]>([]);

  const handleChange = (k: string, value: any) => {
    setViewParams((p) => ({ ...p, [k]: value }));
  };

  const handlePredict = () => {
    const paramsForRules: any = {
      temperature: Number(viewParams.temperature),
      rh: Number(viewParams.rh),
      relativeHumidity: Number(viewParams.rh),
      weeklyRainfall: Number(viewParams.weeklyRainfall),
      rainfall: Number(viewParams.weeklyRainfall),
      leafWetness: Number(viewParams.leafWetness),
      wetnessHours: Number(viewParams.leafWetness),
      windSpeed: Number(viewParams.windSpeed),
      soilMoisture:
        viewParams.soilMoisture !== undefined
          ? Number(viewParams.soilMoisture)
          : undefined,
      canopyHumidity:
        viewParams.canopyHumidity !== undefined
          ? Number(viewParams.canopyHumidity)
          : undefined,
      dustLevel: viewParams.dustLevel,
      drainage: viewParams.drainage,
      hasStandingWater48h: !!viewParams.hasStandingWater48h,
      hasTempJump10C: !!viewParams.hasTempJump10C,
      hadDroughtThenHeavyRain: !!viewParams.hadDroughtThenHeavyRain,
      mode: riskModel,
    };

    const res =
      view === 'Diseases'
        ? calculateDiseaseRisks(paramsForRules as ClimateParams)
        : calculatePestRisks(paramsForRules as ClimateParams);
    setResults(res.slice(0, 10));
  };

  const handlePlanetAutoFill = (params: Partial<Record<string, any>>) => {
    setViewParams((p) => ({ ...p, ...params }));
  };

  const topResults = results.slice(0, 3);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-8"
      style={{ minHeight: 'calc(100vh - 120px)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Climate Risk Predictor
        </h2>
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('Diseases')}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === 'Diseases' ? 'bg-green-600 text-white' : 'text-gray-600'
            }`}
          >
            Diseases
          </button>
          <button
            onClick={() => setView('Pests')}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === 'Pests' ? 'bg-green-600 text-white' : 'text-gray-600'
            }`}
          >
            Pests
          </button>
        </div>
      </div>

      {/* 2-column layout: left form, right big map */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-6">
        {/* LEFT: climate inputs + switches */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Risk model</label>
              <select
                value={riskModel}
                onChange={(e) => setRiskModel(e.target.value as any)}
                className="px-3 py-1 border rounded-lg"
              >
                <option value="standard">Standard (rule-based)</option>
                <option value="meta">Meta (range-based)</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={viewParams.hasStandingWater48h}
                  onChange={(e) =>
                    handleChange('hasStandingWater48h', e.target.checked)
                  }
                />
                <span>Standing water &gt;48h</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={viewParams.hasTempJump10C}
                  onChange={(e) =>
                    handleChange('hasTempJump10C', e.target.checked)
                  }
                />
                <span>Temp jump &gt;10°C</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={viewParams.hadDroughtThenHeavyRain}
                  onChange={(e) =>
                    handleChange('hadDroughtThenHeavyRain', e.target.checked)
                  }
                />
                <span>Drought then heavy rain</span>
              </label>
            </div>
          </div>

          {riskModel === 'standard' && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowStandardWarning((v) => !v)}
                className="w-full text-left bg-white text-orange-600 px-0 py-1 text-xs font-semibold underline"
              >
                Warning
              </button>

              {showStandardWarning && (
                <p className="mt-1 text-[11px] text-gray-700">
                  The rule-based (Standard) model cannot reliably predict complex
                  conditions such as Collar/Root Rot, Necrotic Leaf Blotch, and
                  other scenarios that depend on soil drainage, rapid temperature
                  swings, or historical drought/standing-water flags. Select{' '}
                  <strong>Meta</strong> for range-based scoring.
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Temperature (°C)
              </label>
              <input
                type="number"
                value={viewParams.temperature}
                onChange={(e) =>
                  handleChange('temperature', Number(e.target.value))
                }
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relative Humidity (%)
              </label>
              <input
                type="number"
                value={viewParams.rh}
                onChange={(e) => handleChange('rh', Number(e.target.value))}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weekly Rainfall (mm/week)
              </label>
              <input
                type="number"
                value={viewParams.weeklyRainfall}
                onChange={(e) =>
                  handleChange('weeklyRainfall', Number(e.target.value))
                }
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Leaf / Fruit Wetness (hours)
              </label>
              <input
                type="number"
                value={viewParams.leafWetness}
                onChange={(e) =>
                  handleChange('leafWetness', Number(e.target.value))
                }
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Wind Speed (km/h)
              </label>
              <input
                type="number"
                value={viewParams.windSpeed}
                onChange={(e) =>
                  handleChange('windSpeed', Number(e.target.value))
                }
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Soil Moisture (%){' '}
                <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <input
                type="number"
                value={viewParams.soilMoisture}
                onChange={(e) =>
                  handleChange('soilMoisture', Number(e.target.value))
                }
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Canopy humidity (optional) (%)
              </label>
              <input
                type="number"
                value={viewParams.canopyHumidity}
                onChange={(e) =>
                  handleChange('canopyHumidity', Number(e.target.value))
                }
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dust Level
              </label>
              <select
                value={viewParams.dustLevel as any}
                onChange={(e) => handleChange('dustLevel', e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              >
                <option value="unknown">unknown</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drainage
              </label>
              <select
                value={viewParams.drainage as any}
                onChange={(e) => handleChange('drainage', e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              >
                <option value="unknown">unknown</option>
                <option value="good">good</option>
                <option value="poor">poor</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT: big Planet map viewer in the wider column */}
        <div className="h-full">
          <PlanetMapViewer
            initialLat={viewParams.latitude ?? 0}
            initialLon={viewParams.longitude ?? 0}
            configId="0dc5fcdc-69e2-4789-8511-6b0cc7efbff3"
            onAutoFill={handlePlanetAutoFill}
          />
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={handlePredict}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg font-semibold"
        >
          Predict Risk
        </button>
        <button
          onClick={() => {
            setResults([]);
          }}
          className="py-2 px-4 rounded-lg border"
        >
          Clear
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">
          Top {topResults.length} {view} Risk(s)
        </h3>
        {topResults.length === 0 && (
          <p className="text-sm text-gray-500">
            No results yet — press Predict Risk
          </p>
        )}
        <div className="space-y-3 mt-3">
          {topResults.map((r) => (
            <div key={r.name} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-md font-bold">{r.name}</div>
                  <div className="text-sm text-gray-600">
                    Score: {r.score} • Level:{' '}
                    <span
                      className={
                        r.level === 'High'
                          ? 'text-red-600'
                          : r.level === 'Medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }
                    >
                      {r.level}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <div className="font-medium">Matched factors:</div>
                {r.matchedFactors.length === 0 ? (
                  <div className="text-gray-500">
                    None of the monitored parameters matched the favourable
                    ranges.
                  </div>
                ) : (
                  <ul className="list-disc ml-5">
                    {r.matchedFactors.map((f: string) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
