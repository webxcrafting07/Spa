'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { TrendingUp, TrendingDown, Download, DollarSign } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { month: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
  { month: 'Feb', revenue: 38000, expenses: 25000, profit: 13000 },
  { month: 'Mar', revenue: 55000, expenses: 32000, profit: 23000 },
  { month: 'Apr', revenue: 61000, expenses: 35000, profit: 26000 },
  { month: 'May', revenue: 58000, expenses: 33000, profit: 25000 },
  { month: 'Jun', revenue: 72000, expenses: 40000, profit: 32000 },
  { month: 'Jul', revenue: 68000, expenses: 38000, profit: 30000 },
  { month: 'Aug', revenue: 85000, expenses: 44000, profit: 41000 },
  { month: 'Sep', revenue: 79000, expenses: 42000, profit: 37000 },
  { month: 'Oct', revenue: 92000, expenses: 48000, profit: 44000 },
  { month: 'Nov', revenue: 88000, expenses: 46000, profit: 42000 },
  { month: 'Dec', revenue: 123500, expenses: 55000, profit: 68500 },
]

// Removed hardcoded transactions

const expenses = [
  { category: 'Staff Salaries', amount: 253000, percent: 46 },
  { category: 'Products & Inventory', amount: 82000, percent: 15 },
  { category: 'Rent & Utilities', amount: 65000, percent: 12 },
  { category: 'Marketing', amount: 33000, percent: 6 },
  { category: 'Equipment', amount: 22000, percent: 4 },
  { category: 'Misc / Other', amount: 95000, percent: 17 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-cream/60 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.stroke }}>
            {p.name}: ₹{p.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminFinancePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [transactions, setTransactions] = useState<any[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true)

  const fetchTransactions = () => {
    fetch('/api/admin/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data.transactions || [])
        setLoadingTransactions(false)
      })
      .catch(() => setLoadingTransactions(false))
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleRefund = async (id: string) => {
    if (!confirm('Are you sure you want to refund this transaction?')) return
    const loadingToast = toast.loading('Processing refund...')
    try {
      const res = await fetch('/api/admin/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'REFUNDED' })
      })
      if (res.ok) {
        toast.success('Refund processed successfully', { id: loadingToast })
        fetchTransactions()
      } else {
        toast.error('Failed to process refund', { id: loadingToast })
      }
    } catch {
      toast.error('An error occurred', { id: loadingToast })
    }
  }

  const totalRevenue = monthlyData.reduce((a, m) => a + m.revenue, 0)
  const totalExpenses = monthlyData.reduce((a, m) => a + m.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Finance</h1>
          <p className="text-cream/50 mt-1 text-sm">Revenue, expenses & financial reports</p>
        </div>
        <button className="btn-outline-gold text-xs py-2.5 px-5 flex items-center gap-2">
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue (YTD)', value: totalRevenue, change: '+22%', up: true, color: 'text-gold-400', bg: 'bg-gold-400/10' },
          { label: 'Total Expenses (YTD)', value: totalExpenses, change: '+8%', up: false, color: 'text-red-400', bg: 'bg-red-400/10' },
          { label: 'Net Profit (YTD)', value: totalProfit, change: '+31%', up: true, color: 'text-green-400', bg: 'bg-green-400/10' },
        ].map(({ label, value, change, up, color, bg }) => (
          <div key={label} className="glass-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-cream/60">{label}</span>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <DollarSign size={15} className={color} />
              </div>
            </div>
            <p className={`font-display text-3xl font-bold ${color}`}>
              ₹{(value / 100000).toFixed(2)}L
            </p>
            <p className={`text-xs mt-2 flex items-center gap-1 ${up ? 'text-green-400' : 'text-red-400'}`}>
              {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {change} vs last year
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gold-400/10">
        {['overview', 'transactions', 'expenses', 'tax'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/50 hover:text-cream'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="font-display text-lg text-cream font-semibold mb-5">Revenue vs Expenses (2024)</h2>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.08)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => '₹' + v / 1000 + 'k'} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2} fill="url(#profGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'This Month Revenue', value: '₹1,23,500' },
              { label: 'This Month Expenses', value: '₹55,000' },
              { label: 'This Month Profit', value: '₹68,500' },
              { label: 'Profit Margin', value: '55.5%' },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-4 text-center">
                <p className="font-display text-xl font-bold text-gold-400">{value}</p>
                <p className="text-xs text-cream/50 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-luxury">
              <thead>
                <tr>
                  <th>Transaction ID</th><th>Customer</th><th>Service</th>
                  <th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id}>
                    <td className="font-mono text-xs text-gold-400">{t.id}</td>
                    <td className="font-medium text-cream">{t.customer}</td>
                    <td className="text-cream/70">{t.service}</td>
                    <td className="text-gold-400 font-semibold">₹{t.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="text-xs bg-dark-700 text-cream/60 px-2 py-1 rounded-full">{t.method}</span>
                    </td>
                    <td className="text-cream/50 text-xs">{new Date(t.date).toLocaleDateString()}</td>
                    <td>
                      <span className={
                        t.status === 'PAID' ? 'badge-confirmed' :
                        t.status === 'PENDING' ? 'badge-pending' : 'badge-cancelled'
                      }>{t.status}</span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button onClick={() => {
                          const w = window.open('', '_blank');
                          w?.document.write(`<h1>Invoice ${t.id}</h1><p>Customer: ${t.customer}</p><p>Service: ${t.service}</p><p>Amount: Rs.${t.amount}</p><p>Status: ${t.status}</p>`);
                          w?.document.close();
                          w?.print();
                        }} className="text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-400/30 px-2 py-1 rounded">
                          Invoice
                        </button>
                        {t.status === 'PAID' && (
                          <button onClick={() => handleRefund(t.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors border border-red-400/30 px-2 py-1 rounded">
                            Refund
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && !loadingTransactions && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-cream/40">No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h2 className="font-display text-lg text-cream font-semibold mb-5">Expense Breakdown (YTD)</h2>
            <div className="space-y-4">
              {expenses.map(e => (
                <div key={e.category}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-cream/80">{e.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-cream/50">{e.percent}%</span>
                      <span className="text-gold-400 font-semibold w-28 text-right">₹{e.amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full">
                    <div className="h-full bg-gold-gradient rounded-full transition-all" style={{ width: `${e.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gold-400/10 flex justify-between">
              <span className="font-semibold text-cream">Total Expenses</span>
              <span className="text-gold-400 font-bold text-lg">₹{totalExpenses.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h2 className="font-display text-lg text-cream font-semibold mb-5">Tax Summary (FY 2024–25)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Taxable Revenue', value: '₹8,45,200' },
                { label: 'GST Collected (18%)', value: '₹1,52,136' },
                { label: 'Income Tax Estimate', value: '₹62,500' },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <p className="font-display text-xl font-bold text-gold-400">{value}</p>
                  <p className="text-xs text-cream/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {['Q1 (Apr–Jun 2024)', 'Q2 (Jul–Sep 2024)', 'Q3 (Oct–Dec 2024)', 'Q4 (Jan–Mar 2025)'].map((q, i) => (
                <div key={q} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-cream">{q}</p>
                    <p className="text-xs text-cream/50 mt-0.5">GST Return — {i < 2 ? 'Filed' : i === 2 ? 'Due Jan 20' : 'Upcoming'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-400 font-semibold text-sm">₹{[28500, 31200, 52000, 0][i].toLocaleString('en-IN')}</p>
                    <span className={i < 2 ? 'badge-confirmed' : i === 2 ? 'badge-pending' : 'text-xs text-cream/40'}>
                      {i < 2 ? 'Filed' : i === 2 ? 'Pending' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-outline-gold text-sm mt-4 flex items-center gap-2">
              <Download size={15} /> Download Tax Report (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
