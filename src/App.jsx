import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Zap, Battery, Layers, RotateCcw, Info } from 'lucide-react'
import './App.css'

function App() {
  // State for target application
  const [selectedApp, setSelectedApp] = useState('TENGs')

  // State for TENGs descriptors
  const [tengDS, setTengDS] = useState(2.5)
  const [tengFiberDiameter, setTengFiberDiameter] = useState(400)
  const [tengPorosity, setTengPorosity] = useState(70)

  // State for Li-ion Battery descriptors
  const [liionPorosity, setLiionPorosity] = useState(60)
  const [liionPoreSize, setLiionPoreSize] = useState(200)
  const [liionDS, setLiionDS] = useState(2.0)
  const [liionMW, setLiionMW] = useState(50000)

  // State for Supercapacitor descriptors
  const [scSSA, setScSSA] = useState(1500)
  const [scPorosity, setScPorosity] = useState(70)
  const [scPoreSize, setScPoreSize] = useState(20)
  const [scElectrolyteUptake, setScElectrolyteUptake] = useState(200)
  const [scMW, setScMW] = useState(50000)

  // Calculate predicted properties for TENGs
  const calculateTENGsProperties = () => {
    const outputVoltage = (tengDS / 3.0 * 30 + tengFiberDiameter / 1500 * 20 + tengPorosity / 100 * 50).toFixed(1)
    const outputCurrent = (tengDS / 3.0 * 15 + (1500 - tengFiberDiameter) / 1500 * 20 + tengPorosity / 100 * 15).toFixed(1)
    const powerDensity = (tengDS / 3.0 * 40 + tengPorosity / 100 * 40 + (1500 - tengFiberDiameter) / 1500 * 20).toFixed(1)
    const durability = Math.round(tengDS / 3.0 * 40000 + tengFiberDiameter / 1500 * 30000 + tengPorosity / 100 * 30000)
    const stability = Math.round(tengDS / 3.0 * 40 + tengFiberDiameter / 1500 * 30 + tengPorosity / 100 * 30)

    return {
      outputVoltage,
      outputCurrent,
      powerDensity,
      durability,
      stability
    }
  }

  // Calculate predicted properties for Li-ion Batteries
  const calculateLiionProperties = () => {
    const ionicConductivity = (liionPorosity / 100 * 5 + liionPoreSize / 500 * 3 + liionDS / 3.0 * 2).toFixed(2)
    const liTransference = (liionDS / 3.0 * 0.4 + liionPorosity / 100 * 0.3 + liionMW / 100000 * 0.1).toFixed(2)
    const stabilityWindow = (3.0 + liionDS / 3.0 * 1.5 + liionMW / 100000 * 0.5).toFixed(1)
    const cycleLife = Math.round(liionMW / 100000 * 500 + liionDS / 3.0 * 300 + liionPorosity / 100 * 200)
    const capacityRetention = Math.round(liionMW / 100000 * 50 + liionDS / 3.0 * 30 + liionPorosity / 100 * 20)

    return {
      ionicConductivity,
      liTransference,
      stabilityWindow,
      cycleLife,
      capacityRetention
    }
  }

  // Calculate predicted properties for Supercapacitors
  const calculateSupercapacitorProperties = () => {
    const energyDensity = (scSSA / 2500 * 60 + scPorosity / 100 * 30 + scElectrolyteUptake / 400 * 10).toFixed(2)
    const powerDensity = Math.round(scSSA / 2500 * 6000 + scPorosity / 100 * 3000 + scPoreSize / 50 * 1000)
    const specificCapacitance = Math.round(scSSA / 2500 * 300 + scPorosity / 100 * 150 + scElectrolyteUptake / 400 * 50)
    const cycleLife = Math.round(scMW / 100000 * 50000 + scSSA / 2500 * 30000 + scPorosity / 100 * 20000)
    const performanceScore = ((parseFloat(energyDensity) / 100 * 30) + (powerDensity / 10000 * 30) + (specificCapacitance / 500 * 40)).toFixed(1)

    return {
      energyDensity,
      powerDensity,
      specificCapacitance,
      cycleLife,
      performanceScore
    }
  }

  const properties = selectedApp === 'TENGs' 
    ? calculateTENGsProperties() 
    : selectedApp === 'Li-ion' 
    ? calculateLiionProperties() 
    : calculateSupercapacitorProperties()

  const resetParameters = () => {
    if (selectedApp === 'TENGs') {
      setTengDS(2.5)
      setTengFiberDiameter(400)
      setTengPorosity(70)
    } else if (selectedApp === 'Li-ion') {
      setLiionPorosity(60)
      setLiionPoreSize(200)
      setLiionDS(2.0)
      setLiionMW(50000)
    } else {
      setScSSA(1500)
      setScPorosity(70)
      setScPoreSize(20)
      setScElectrolyteUptake(200)
      setScMW(50000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cellulose Acetate High-Throughput Screening
          </h1>
          <p className="text-gray-600">
            Advanced machine learning platform for accelerating material discovery
          </p>
        </div>

        {/* Target Application Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Target Application</CardTitle>
            <CardDescription>Select the energy application to explore</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedApp('TENGs')}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  selectedApp === 'TENGs'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Zap className={`w-8 h-8 mb-3 ${selectedApp === 'TENGs' ? 'text-blue-600' : 'text-gray-400'}`} />
                <h3 className="font-semibold text-lg mb-1">TENGs</h3>
                <p className="text-sm text-gray-600">Triboelectric Nanogenerators</p>
              </button>

              <button
                onClick={() => setSelectedApp('Li-ion')}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  selectedApp === 'Li-ion'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Battery className={`w-8 h-8 mb-3 ${selectedApp === 'Li-ion' ? 'text-orange-600' : 'text-gray-400'}`} />
                <h3 className="font-semibold text-lg mb-1">Li-ion Batteries</h3>
                <p className="text-sm text-gray-600">Electrolytes & Separators</p>
              </button>

              <button
                onClick={() => setSelectedApp('Supercapacitors')}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  selectedApp === 'Supercapacitors'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Layers className={`w-8 h-8 mb-3 ${selectedApp === 'Supercapacitors' ? 'text-green-600' : 'text-gray-400'}`} />
                <h3 className="font-semibold text-lg mb-1">Supercapacitors</h3>
                <p className="text-sm text-gray-600">Energy Storage Devices</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Key Descriptors */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedApp === 'TENGs' && <Zap className="w-5 h-5 text-blue-600" />}
                  {selectedApp === 'Li-ion' && <Battery className="w-5 h-5 text-orange-600" />}
                  {selectedApp === 'Supercapacitors' && <Layers className="w-5 h-5 text-green-600" />}
                  <CardTitle>Key Descriptors for {selectedApp}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetParameters}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
              <CardDescription>Adjust the most influential parameters for this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* TENGs Descriptors */}
              {selectedApp === 'TENGs' && (
                <>
                  {/* Degree of Substitution */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Degree of Substitution (DS)</label>
                      <span className="text-sm font-semibold">{tengDS.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[tengDS]}
                      onValueChange={(value) => setTengDS(value[0])}
                      min={0.5}
                      max={3.0}
                      step={0.1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 0.5-3.0</p>
                    <p className="text-xs text-gray-600">Number of acetyl groups per anhydroglucose unit. Higher DS increases hydrophobicity and affects surface charge polarity, directly impacting triboelectric performance.</p>
                  </div>

                  {/* Fiber Diameter */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Fiber Diameter</label>
                      <span className="text-sm font-semibold">{tengFiberDiameter} nm</span>
                    </div>
                    <Slider
                      value={[tengFiberDiameter]}
                      onValueChange={(value) => setTengFiberDiameter(value[0])}
                      min={150}
                      max={1500}
                      step={10}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 150-1500 nm</p>
                    <p className="text-xs text-gray-600">Average diameter of electrospun fibers. Smaller diameters increase surface area and contact points, enhancing triboelectric charge transfer.</p>
                  </div>

                  {/* Porosity */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Porosity</label>
                      <span className="text-sm font-semibold">{tengPorosity} %</span>
                    </div>
                    <Slider
                      value={[tengPorosity]}
                      onValueChange={(value) => setTengPorosity(value[0])}
                      min={60}
                      max={95}
                      step={1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 60-95%</p>
                    <p className="text-xs text-gray-600">Volume fraction of pores within the material. Higher porosity increases surface roughness and effective contact area, improving triboelectric output.</p>
                  </div>
                </>
              )}

              {/* Li-ion Battery Descriptors */}
              {selectedApp === 'Li-ion' && (
                <>
                  {/* Porosity */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Porosity</label>
                      <span className="text-sm font-semibold">{liionPorosity} %</span>
                    </div>
                    <Slider
                      value={[liionPorosity]}
                      onValueChange={(value) => setLiionPorosity(value[0])}
                      min={40}
                      max={80}
                      step={1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 40-80%</p>
                    <p className="text-xs text-gray-600">Volume fraction of pores within the material. Higher porosity facilitates ion transport and electrolyte uptake.</p>
                  </div>

                  {/* Pore Size */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Pore Size</label>
                      <span className="text-sm font-semibold">{liionPoreSize} nm</span>
                    </div>
                    <Slider
                      value={[liionPoreSize]}
                      onValueChange={(value) => setLiionPoreSize(value[0])}
                      min={50}
                      max={500}
                      step={10}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 50-500 nm</p>
                    <p className="text-xs text-gray-600">Average pore diameter. Optimal pore size ensures efficient ion flow and prevents dendrite formation.</p>
                  </div>

                  {/* Degree of Substitution */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Degree of Substitution (DS)</label>
                      <span className="text-sm font-semibold">{liionDS.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[liionDS]}
                      onValueChange={(value) => setLiionDS(value[0])}
                      min={1.0}
                      max={3.0}
                      step={0.1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 1.0-3.0</p>
                    <p className="text-xs text-gray-600">Affects polymer chain flexibility and ion coordination sites.</p>
                  </div>

                  {/* Molecular Weight */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Molecular Weight (MW)</label>
                      <span className="text-sm font-semibold">{liionMW.toLocaleString()} g/mol</span>
                    </div>
                    <Slider
                      value={[liionMW]}
                      onValueChange={(value) => setLiionMW(value[0])}
                      min={10000}
                      max={100000}
                      step={1000}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 10,000-100,000 g/mol</p>
                    <p className="text-xs text-gray-600">Affects mechanical strength and processability.</p>
                  </div>
                </>
              )}

              {/* Supercapacitor Descriptors */}
              {selectedApp === 'Supercapacitors' && (
                <>
                  {/* Specific Surface Area */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Specific Surface Area</label>
                      <span className="text-sm font-semibold">{scSSA} m²/g</span>
                    </div>
                    <Slider
                      value={[scSSA]}
                      onValueChange={(value) => setScSSA(value[0])}
                      min={500}
                      max={2500}
                      step={50}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 500-2500 m²/g</p>
                    <p className="text-xs text-gray-600">Critical for ion diffusion and electrolyte uptake. High surface area in activated carbon derivatives increases capacitance.</p>
                  </div>

                  {/* Porosity */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Porosity</label>
                      <span className="text-sm font-semibold">{scPorosity} %</span>
                    </div>
                    <Slider
                      value={[scPorosity]}
                      onValueChange={(value) => setScPorosity(value[0])}
                      min={50}
                      max={90}
                      step={1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 50-90%</p>
                    <p className="text-xs text-gray-600">Controlled porosity is essential for optimal ion diffusion and electrolyte uptake in separators and electrodes.</p>
                  </div>

                  {/* Pore Size */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Pore Size</label>
                      <span className="text-sm font-semibold">{scPoreSize} nm</span>
                    </div>
                    <Slider
                      value={[scPoreSize]}
                      onValueChange={(value) => setScPoreSize(value[0])}
                      min={2}
                      max={50}
                      step={1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 2-50 nm</p>
                    <p className="text-xs text-gray-600">Affects ion accessibility and electrolyte retention. Micropores (&lt;2nm) for high capacitance, mesopores (2-50nm) for ion transport.</p>
                  </div>

                  {/* Electrolyte Uptake */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Electrolyte Uptake</label>
                      <span className="text-sm font-semibold">{scElectrolyteUptake} %</span>
                    </div>
                    <Slider
                      value={[scElectrolyteUptake]}
                      onValueChange={(value) => setScElectrolyteUptake(value[0])}
                      min={100}
                      max={400}
                      step={10}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 100-400%</p>
                    <p className="text-xs text-gray-600">Ability to absorb and retain electrolyte. Higher uptake improves ionic conductivity and overall performance.</p>
                  </div>

                  {/* Molecular Weight */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Molecular Weight (MW)</label>
                      <span className="text-sm font-semibold">{scMW.toLocaleString()} g/mol</span>
                    </div>
                    <Slider
                      value={[scMW]}
                      onValueChange={(value) => setScMW(value[0])}
                      min={20000}
                      max={100000}
                      step={1000}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-1">Range: 20,000-100,000 g/mol</p>
                    <p className="text-xs text-gray-600">Affects mechanical stability and flexibility. Important for flexible supercapacitor applications.</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Predicted Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {selectedApp === 'TENGs' && <Zap className="w-5 h-5 text-blue-600" />}
                {selectedApp === 'Li-ion' && <Battery className="w-5 h-5 text-orange-600" />}
                {selectedApp === 'Supercapacitors' && <Layers className="w-5 h-5 text-green-600" />}
                <CardTitle>Predicted Performance for {selectedApp}</CardTitle>
              </div>
              <CardDescription>Stage 1: Process-to-Architecture ML Model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* TENGs Performance */}
              {selectedApp === 'TENGs' && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Note:</h4>
                        <p className="text-sm text-blue-800">These predictions are based on simplified models for demonstration purposes. Actual performance may vary and should be validated experimentally.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Output Voltage */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Output Voltage</span>
                        <span className="text-sm font-bold text-blue-600">{properties.outputVoltage} V</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                          style={{ width: `${(parseFloat(properties.outputVoltage) / 100) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100 V</p>
                    </div>

                    {/* Output Current */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Output Current</span>
                        <span className="text-sm font-bold text-purple-600">{properties.outputCurrent} µA</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                          style={{ width: `${(parseFloat(properties.outputCurrent) / 50) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-50 µA</p>
                    </div>

                    {/* Power Density */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Power Density</span>
                        <span className="text-sm font-bold text-pink-600">{properties.powerDensity} µW/cm²</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-600 to-pink-400"
                          style={{ width: `${(parseFloat(properties.powerDensity) / 100) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100 µW/cm²</p>
                    </div>

                    {/* Durability */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Durability</span>
                        <span className="text-sm font-bold text-green-600">{properties.durability.toLocaleString()} cycles</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-green-400"
                          style={{ width: `${(properties.durability / 100000) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100,000 cycles</p>
                    </div>

                    {/* Stability */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Stability</span>
                        <span className="text-sm font-bold text-indigo-600">{properties.stability} %</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                          style={{ width: `${properties.stability}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100%</p>
                    </div>
                  </div>
                </>
              )}

              {/* Li-ion Battery Performance */}
              {selectedApp === 'Li-ion' && (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-900 mb-1">Note:</h4>
                        <p className="text-sm text-orange-800">These predictions are based on simplified models for demonstration purposes. Actual performance may vary and should be validated experimentally.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Ionic Conductivity */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Ionic Conductivity</span>
                        <span className="text-sm font-bold text-blue-600">{properties.ionicConductivity} mS/cm</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                          style={{ width: `${(parseFloat(properties.ionicConductivity) / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0.1-10 mS/cm</p>
                    </div>

                    {/* Li+ Transference Number */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Li+ Transference Number</span>
                        <span className="text-sm font-bold text-purple-600">{properties.liTransference}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                          style={{ width: `${(parseFloat(properties.liTransference) / 0.8) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0.1-0.8</p>
                    </div>

                    {/* Electrochemical Stability Window */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Electrochemical Stability Window</span>
                        <span className="text-sm font-bold text-green-600">{properties.stabilityWindow} V</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-green-400"
                          style={{ width: `${((parseFloat(properties.stabilityWindow) - 3) / (5 - 3)) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 3-5 V</p>
                    </div>

                    {/* Cycle Life */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Cycle Life</span>
                        <span className="text-sm font-bold text-pink-600">{properties.cycleLife} cycles</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-600 to-pink-400"
                          style={{ width: `${(properties.cycleLife / 1000) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-1000 cycles</p>
                    </div>

                    {/* Capacity Retention */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Capacity Retention</span>
                        <span className="text-sm font-bold text-indigo-600">{properties.capacityRetention} %</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                          style={{ width: `${properties.capacityRetention}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100%</p>
                    </div>
                  </div>
                </>
              )}

              {/* Supercapacitor Performance */}
              {selectedApp === 'Supercapacitors' && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">Note:</h4>
                        <p className="text-sm text-green-800">These predictions are based on simplified models for demonstration purposes. Actual performance may vary and should be validated experimentally.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Energy Density */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Energy Density</span>
                        <span className="text-sm font-bold text-blue-600">{properties.energyDensity} Wh/kg</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                          style={{ width: `${(parseFloat(properties.energyDensity) / 100) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100 Wh/kg</p>
                    </div>

                    {/* Power Density */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Power Density</span>
                        <span className="text-sm font-bold text-purple-600">{properties.powerDensity.toLocaleString()} W/kg</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                          style={{ width: `${(properties.powerDensity / 10000) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-10,000 W/kg</p>
                    </div>

                    {/* Specific Capacitance */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Specific Capacitance</span>
                        <span className="text-sm font-bold text-green-600">{properties.specificCapacitance} F/g</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-green-400"
                          style={{ width: `${(properties.specificCapacitance / 500) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-500 F/g</p>
                    </div>

                    {/* Cycle Life */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Cycle Life</span>
                        <span className="text-sm font-bold text-pink-600">{properties.cycleLife.toLocaleString()} cycles</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-600 to-pink-400"
                          style={{ width: `${(properties.cycleLife / 100000) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Range: 0-100,000 cycles</p>
                    </div>

                    {/* Overall Performance Score */}
                    <div className="bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Performance Score</span>
                        <span className="text-2xl font-bold text-pink-600">{properties.performanceScore}</span>
                      </div>
                      <p className="text-xs text-gray-600">Out of 100</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App

