import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Users, 
  FileText, 
  ShieldAlert, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  PlusCircle, 
  Search, 
  Building2, 
  FileSpreadsheet,
  Menu,
  X,
  Home,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Global Currency State
  const [currency, setCurrency] = useState('USD');
  
  const currencies = {
    USD: { symbol: '$', rate: 1, name: 'US Dollar ($)' },
    INR: { symbol: '₹', rate: 83, name: 'Indian Rupee (₹)' },
    EUR: { symbol: '€', rate: 0.92, name: 'Euro (€)' },
    GBP: { symbol: '£', rate: 0.79, name: 'British Pound (£)' },
    JPY: { symbol: '¥', rate: 155, name: 'Japanese Yen (¥)' },
    CAD: { symbol: 'CA$', rate: 1.35, name: 'Canadian Dollar (CA$)' },
    AUD: { symbol: 'A$', rate: 1.52, name: 'Australian Dollar (A$)' }
  };

  const currentCurrencyObj = currencies[currency] || currencies.USD;
  const currencySymbol = currentCurrencyObj.symbol;
  const fxRate = currentCurrencyObj.rate;

  const formatMoney = (amountInUSD) => {
    const converted = amountInUSD * fxRate;
    if (currency === 'INR') {
      return '₹' + Math.round(converted).toLocaleString('en-IN');
    }
    return currencySymbol + Math.round(converted).toLocaleString();
  };

  const [calcPrincipal, setCalcPrincipal] = useState(250000);
  const [calcRate, setCalcRate] = useState(7.5);
  const [calcTenure, setCalcTenure] = useState(15);

  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    loanType: 'Mortgage',
    amount: 150000,
    income: 80000,
    creditScore: 720,
    tenure: 15
  });
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');

  const [loans, setLoans] = useState([
    { id: 1, name: "Eleanor Vance", type: "Mortgage", amount: 350000, rate: 6.8, risk: "Low", status: "Active" },
    { id: 2, name: "Marcus Brody", type: "Commercial", amount: 750000, rate: 8.2, risk: "Medium", status: "Active" },
    { id: 3, name: "Sophia Martinez", type: "Personal", amount: 25000, rate: 11.5, risk: "High", status: "Under Review" },
    { id: 4, name: "David Kim", type: "Auto Loan", amount: 42000, rate: 7.1, risk: "Low", status: "Active" },
    { id: 5, name: "Rachel Adams", type: "Mortgage", amount: 480000, rate: 6.5, risk: "Low", status: "Active" }
  ]);

  const monthlyRate = calcRate / 100 / 12;
  const totalMonths = calcTenure * 12;
  const monthlyEMI = (calcPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1) || 0;
  const totalPayable = monthlyEMI * totalMonths;
  const totalInterest = totalPayable - calcPrincipal;

  const assetData = [
    { name: 'Mortgage', value: 6.2 },
    { name: 'Commercial', value: 3.8 },
    { name: 'Personal', value: 1.1 },
    { name: 'Auto Loan', value: 0.8 },
    { name: 'Student', value: 0.55 },
  ];
  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  const handleAppSubmit = (e) => {
    e.preventDefault();
    const dti = (appForm.amount / (appForm.income * (appForm.tenure / 2))) * 100;
    const risk = dti > 45 || appForm.creditScore < 650 ? 'High' : dti > 30 ? 'Medium' : 'Low';
    
    const newLoan = {
      id: loans.length + 1,
      name: appForm.name,
      type: appForm.loanType,
      amount: Number(appForm.amount),
      rate: appForm.creditScore > 750 ? 6.5 : 8.2,
      risk: risk,
      status: risk === 'High' ? 'Under Review' : 'Active'
    };

    setLoans([newLoan, ...loans]);
    setSubmittedStatus({ success: true, message: `Application processed successfully! Risk Score assigned: ${risk}` });
    setAppForm({ name: '', email: '', loanType: 'Mortgage', amount: 150000, income: 80000, creditScore: 720, tenure: 15 });
  };

  const filteredLoans = loans.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' || l.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      
      {/* Top Navigation Bar - Single Line Layout */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-md ${isDark ? 'border-slate-800 bg-slate-950/90' : 'border-slate-300 bg-white/95'}`}>
        <div className="max-w-[98rem] mx-auto px-4 h-16 flex items-center justify-between whitespace-nowrap">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('home')}>
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide flex items-center gap-1.5">
                ApexCapital <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full font-normal">Enterprise</span>
              </h1>
              <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Institutional Risk Operations</p>
            </div>
          </div>

          {/* Compact Nav Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 shrink-0">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'calculator', label: 'Calculator', icon: Calculator },
              { id: 'portfolio', label: 'Portfolio', icon: Users },
              { id: 'apply', label: 'New App', icon: PlusCircle },
              { id: 'risk', label: 'Risk Analytics', icon: ShieldAlert },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow' 
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Theme Switch, Currency Select & 3D Officer Badge */}
          <div className="flex items-center space-x-2.5 shrink-0">
            
            {/* Dark / Light Toggle Switch */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-white border-slate-300 text-indigo-600 hover:bg-slate-100 shadow-sm'
              }`}
              title="Toggle Dark / Light Mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span className="text-[11px]">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* Currency Selector */}
            <div className={`flex items-center space-x-1 border rounded-xl px-2 py-1 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-800 shadow-sm'}`}>
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-[11px] font-bold focus:outline-none cursor-pointer"
              >
                {Object.keys(currencies).map(code => (
                  <option key={code} value={code} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                    {currencies[code].name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3D Customized Officer Card for Khushi Bhootra */}
            <div className={`hidden sm:flex items-center space-x-2 pl-2 border-l ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5 shadow-md shrink-0">
                <div className={`w-full h-full rounded-[6px] flex items-center justify-center font-black text-[11px] text-white ${isDark ? 'bg-slate-950' : 'bg-slate-800'}`}>
                  KB
                </div>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black tracking-wide bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  Khushi Bhootra
                </p>
                <p className={`text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Portfolio Officer</p>
              </div>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-400">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Responsive Menu Drawer */}
        {mobileMenuOpen && (
          <nav className={`lg:hidden border-b px-4 py-3 space-y-1.5 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'calculator', label: 'Calculator', icon: Calculator },
              { id: 'portfolio', label: 'Portfolio', icon: Users },
              { id: 'apply', label: 'New Application', icon: PlusCircle },
              { id: 'risk', label: 'Risk Analytics', icon: ShieldAlert },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium ${
                    activeTab === tab.id ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-12 py-6">
            <div className="text-center space-y-5 max-w-3xl mx-auto py-8">
              <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" /> Multi-Currency Operations ({currency})
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Next-Generation Loan Portfolio & Risk Intelligence
              </h1>
              <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Empowering financial institutions with real-time portfolio tracking, automated DTI underwriting, reducing-balance loan calculators, and NPL default metrics.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105"
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab('calculator')}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm border transition-transform hover:scale-105 ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800 shadow-sm'}`}
                >
                  Try EMI Calculator
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border transition-all cursor-pointer ${isDark ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 shadow-md hover:shadow-xl'}`} onClick={() => setActiveTab('dashboard')}>
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl w-fit mb-3">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Live Portfolio Analytics</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Track total portfolio value, APR yield distribution, and asset class allocation with dynamic currency conversion ({currencySymbol}).
                </p>
              </div>

              <div className={`p-6 rounded-2xl border transition-all cursor-pointer ${isDark ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 shadow-md hover:shadow-xl'}`} onClick={() => setActiveTab('apply')}>
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl w-fit mb-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Automated Underwriting</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Instantly compute Debt-to-Income (DTI) metrics and dynamically assign loan risk tiers for applicants.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border transition-all cursor-pointer ${isDark ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 shadow-md hover:shadow-xl'}`} onClick={() => setActiveTab('risk')}>
                <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl w-fit mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Basel III Risk Compliance</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Monitor Non-Performing Loans (NPL), capital reserves, and stress test buffers for risk compliance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs font-semibold uppercase text-slate-400">Total Portfolio Value</p>
                <h3 className="text-2xl font-extrabold mt-1">{formatMoney(12450000)}</h3>
                <span className="text-xs text-emerald-500 flex items-center mt-2 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +8.4% from last month
                </span>
              </div>

              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs font-semibold uppercase text-slate-400">Active Originations</p>
                <h3 className="text-2xl font-extrabold mt-1">1,248</h3>
                <span className="text-xs text-emerald-500 flex items-center mt-2 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +12 new today
                </span>
              </div>

              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs font-semibold uppercase text-slate-400">Avg Portfolio APR</p>
                <h3 className="text-2xl font-extrabold mt-1">7.42%</h3>
                <span className="text-xs text-slate-400 mt-2 block font-medium">Stable yield margin</span>
              </div>

              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className="text-xs font-semibold uppercase text-slate-400">Default Rate (NPL)</p>
                <h3 className="text-2xl font-extrabold text-rose-500 mt-1">1.18%</h3>
                <span className="text-xs text-emerald-500 flex items-center mt-2 font-medium">
                  <TrendingDown className="w-3.5 h-3.5 mr-1" /> -0.2% improvement
                </span>
              </div>
            </div>

            <div className={`border rounded-2xl p-6 ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h2 className="text-lg font-bold mb-4">Portfolio Asset Distribution ({currencySymbol}M)</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
                    <XAxis dataKey="name" stroke={isDark ? "#94a3b8" : "#64748b"} />
                    <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#334155' : '#cbd5e1', borderRadius: '0.75rem', color: isDark ? '#fff' : '#0f172a' }} />
                    <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`border rounded-2xl p-6 space-y-6 ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-700/40">
                <Calculator className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-bold">Interactive Calculator</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Principal ({currencySymbol})</span>
                    <span className="font-bold">{formatMoney(calcPrincipal)}</span>
                  </div>
                  <input type="range" min="10000" max="1000000" step="5000" value={calcPrincipal} onChange={(e) => setCalcPrincipal(Number(e.target.value))} className="w-full accent-indigo-600 bg-slate-700 h-2 rounded-lg cursor-pointer" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Interest Rate (%)</span>
                    <span className="font-bold">{calcRate}%</span>
                  </div>
                  <input type="range" min="1" max="20" step="0.25" value={calcRate} onChange={(e) => setCalcRate(Number(e.target.value))} className="w-full accent-indigo-600 bg-slate-700 h-2 rounded-lg cursor-pointer" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Tenure (Years)</span>
                    <span className="font-bold">{calcTenure} Yrs</span>
                  </div>
                  <input type="range" min="1" max="30" step="1" value={calcTenure} onChange={(e) => setCalcTenure(Number(e.target.value))} className="w-full accent-indigo-600 bg-slate-700 h-2 rounded-lg cursor-pointer" />
                </div>
              </div>
            </div>

            <div className={`lg:col-span-2 border rounded-2xl p-6 flex flex-col justify-between ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div>
                <h3 className="text-lg font-bold mb-4">Calculated Results ({currency})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Monthly EMI</p>
                    <p className="text-2xl font-black text-indigo-500 mt-1">{formatMoney(monthlyEMI)}</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Total Interest</p>
                    <p className="text-2xl font-black text-amber-500 mt-1">{formatMoney(totalInterest)}</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Total Payable</p>
                    <p className="text-2xl font-black mt-1">{formatMoney(totalPayable)}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => alert(`Amortization schedule exported successfully in ${currency}!`)} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/35">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Schedule</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className={`border rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="p-6 border-b border-slate-700/40 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Active Loan Portfolio ({currency})</h2>
                <p className="text-xs text-slate-400">Live borrower management with dynamic FX conversion</p>
              </div>
              <div className="flex gap-3">
                <input 
                  type="text" placeholder="Search borrowers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className={`border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                />
                <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className={`border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'}`}>
                  <option value="All">All Risk</option>
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className={`text-xs font-semibold uppercase ${isDark ? 'bg-slate-900/60 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                  <tr>
                    <th className="px-6 py-4">Borrower Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount ({currencySymbol})</th>
                    <th className="px-6 py-4">Rate</th>
                    <th className="px-6 py-4">Risk Tier</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-700/50' : 'divide-slate-200'}`}>
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id} className={isDark ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'}>
                      <td className="px-6 py-4 font-semibold">{loan.name}</td>
                      <td className="px-6 py-4 text-slate-400">{loan.type}</td>
                      <td className="px-6 py-4 font-bold">{formatMoney(loan.amount)}</td>
                      <td className="px-6 py-4">{loan.rate}%</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">{loan.risk}</span></td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs border border-emerald-500/30 text-emerald-500">{loan.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* APPLY TAB */}
        {activeTab === 'apply' && (
          <div className={`max-w-2xl mx-auto border rounded-2xl p-8 space-y-6 shadow-xl ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'}`}>
            <h2 className="text-xl font-bold pb-4 border-b border-slate-700/40">New Loan Application ({currencySymbol})</h2>
            {submittedStatus && <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm rounded-xl">{submittedStatus.message}</div>}
            <form onSubmit={handleAppSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">Applicant Name</label>
                <input type="text" required value={appForm.name} onChange={(e) => setAppForm({...appForm, name: e.target.value})} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} placeholder="e.g. Aarav Sharma" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">Loan Type</label>
                  <select value={appForm.loanType} onChange={(e) => setAppForm({...appForm, loanType: e.target.value})} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Personal">Personal</option>
                    <option value="Auto Loan">Auto Loan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">Amount ({currencySymbol})</label>
                  <input type="number" required value={appForm.amount} onChange={(e) => setAppForm({...appForm, amount: e.target.value})} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30">Submit Application</button>
            </form>
          </div>
        )}

        {/* RISK TAB */}
        {activeTab === 'risk' && (
          <div className={`border rounded-2xl p-6 ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold mb-4">Risk Allocation & Basel III Metrics ({currency})</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={assetData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '0.75rem', borderColor: isDark ? '#334155' : '#cbd5e1', color: isDark ? '#fff' : '#0f172a' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </main>

      <footer className={`border-t py-4 text-center text-xs ${isDark ? 'border-slate-800 bg-slate-950 text-slate-500' : 'border-slate-200 bg-white text-slate-500'}`}>
        ApexCapital Enterprise Analytics Platform • Global Multi-Currency Risk Operations
      </footer>
    </div>
  );
}