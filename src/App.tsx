import React, { useState, useEffect } from 'react';
import { Calculator, Coins, TrendingUp, Receipt, Info } from 'lucide-react';

function App() {
  const [goldRate, setGoldRate] = useState(9140);
  const [weight, setWeight] = useState(40);
  const [wastagePercent, setWastagePercent] = useState(7);
  const [makingCharge, setMakingCharge] = useState(600);

  const [calculations, setCalculations] = useState({
    savarans: 0,
    basePrice: 0,
    wastageCharge: 0,
    totalMakingCharge: 0,
    subtotal: 0,
    gst: 0,
    totalPrice: 0
  });

  useEffect(() => {
    // Calculate savarans (1 savaran = 8 grams)
    const savarans = weight / 8;
    
    // Base price calculation
    const basePrice = weight * goldRate;
    
    // Wastage charge calculation
    const wastageCharge = basePrice * (wastagePercent / 100);
    
    // Making charge calculation
    const totalMakingCharge = weight * makingCharge;
    
    // Subtotal before GST
    const subtotal = basePrice + wastageCharge + totalMakingCharge;
    
    // GST calculation (3%)
    const gst = subtotal * 0.03;
    
    // Total price
    const totalPrice = subtotal + gst;

    setCalculations({
      savarans,
      basePrice,
      wastageCharge,
      totalMakingCharge,
      subtotal,
      gst,
      totalPrice
    });
  }, [goldRate, weight, wastagePercent, makingCharge]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatWeight = (grams: number) => {
    return grams.toFixed(1);
  };

  const formatSavarans = (savarans: number) => {
    return savarans.toFixed(2);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex flex-col">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-center">
          <Coins className="w-5 h-5 mr-2" />
          <h1 className="text-lg font-bold">Gold Calculator | தங்க கணிப்பான்</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
        {/* Total Price - Prominent */}
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-amber-500">
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">Total Price | மொத்த விலை</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {formatCurrency(calculations.totalPrice)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-amber-50 rounded-lg p-2">
                <div className="text-gray-600">Weight</div>
                <div className="font-semibold text-gray-800">{formatWeight(weight)}g</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <div className="text-gray-600">Savarans</div>
                <div className="font-semibold text-gray-800">{formatSavarans(calculations.savarans)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs - Compact Grid */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Gold Rate */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Gold Rate/g | விலை
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(Number(e.target.value))}
                  className="w-full pl-6 pr-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Weight | எடை (g)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                step="0.1"
              />
            </div>

            {/* Wastage */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Wastage % | வீணாக்கம்
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={wastagePercent}
                  onChange={(e) => setWastagePercent(Number(e.target.value))}
                  className="w-full px-2 pr-6 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  step="0.1"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">%</span>
              </div>
            </div>

            {/* Making Charge */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Making/g | செய்முறை
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  value={makingCharge}
                  onChange={(e) => setMakingCharge(Number(e.target.value))}
                  className="w-full pl-6 pr-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown - Compact */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center mb-3">
            <Receipt className="w-4 h-4 text-amber-600 mr-2" />
            <h3 className="text-sm font-semibold text-gray-800">Breakdown</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price</span>
              <span className="font-semibold">{formatCurrency(calculations.basePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wastage</span>
              <span className="font-semibold">{formatCurrency(calculations.wastageCharge)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Making</span>
              <span className="font-semibold">{formatCurrency(calculations.totalMakingCharge)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST (3%)</span>
              <span className="font-semibold">{formatCurrency(calculations.gst)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-blue-700 font-medium">Rate/Savaran</span>
                <span className="font-bold text-blue-800">
                  {formatCurrency(calculations.totalPrice / calculations.savarans || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info - Ultra Compact */}
        <div className="bg-amber-50 rounded-lg p-3">
          <div className="text-xs text-amber-800 space-y-1">
            <div>• 1 Savaran = 8g (TN standard)</div>
            <div>• GST: 3% • Making charges vary by design</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;