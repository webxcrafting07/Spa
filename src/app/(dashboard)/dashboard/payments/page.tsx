'use client'
import { useState, useEffect } from 'react'
import { CreditCard, Download, RefreshCcw, CheckCircle, XCircle } from 'lucide-react'

export default function CustomerPaymentsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real scenario, this would be an API call specifically for the customer's transactions
    // Reusing the admin transactions endpoint but it would need to filter by customer
    const mockData = [
      { id: 'TXN-001', date: '2024-12-15', amount: 4500, service: 'Deep Tissue Massage', status: 'COMPLETED', invoiceUrl: '#' },
      { id: 'TXN-002', date: '2024-12-01', amount: 3200, service: 'Gold Facial', status: 'COMPLETED', invoiceUrl: '#' },
      { id: 'TXN-003', date: '2024-11-20', amount: 2500, service: 'Swedish Massage', status: 'FAILED', invoiceUrl: null },
      { id: 'TXN-004', date: '2024-11-10', amount: 5000, service: 'Couple Spa Package', status: 'REFUNDED', invoiceUrl: null },
    ]
    
    setTimeout(() => {
      setTransactions(mockData)
      setIsLoading(false)
    }, 600)
  }, [])

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">Payment History</h1>
        <p className="text-cream/50 mt-1">View your past transactions and download invoices.</p>
      </div>

      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="text-center py-20 text-cream/50">
            <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading payments...
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-dark-800/50 border-b border-white/5 text-[10px] uppercase tracking-widest text-cream/40">
                <th className="p-4 md:p-6 font-medium">Transaction ID & Date</th>
                <th className="p-4 md:p-6 font-medium">Service</th>
                <th className="p-4 md:p-6 font-medium">Amount</th>
                <th className="p-4 md:p-6 font-medium">Status</th>
                <th className="p-4 md:p-6 font-medium text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-cream/70 divide-y divide-white/5">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-6">
                    <p className="font-medium text-cream">{txn.id}</p>
                    <p className="text-xs text-cream/40 mt-1">{new Date(txn.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </td>
                  <td className="p-4 md:p-6 text-cream">{txn.service}</td>
                  <td className="p-4 md:p-6 font-semibold text-gold-400">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 md:p-6">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg ${
                      txn.status === 'COMPLETED' ? 'bg-green-400/10 text-green-400' :
                      txn.status === 'FAILED' ? 'bg-red-400/10 text-red-400' :
                      'bg-orange-400/10 text-orange-400'
                    }`}>
                      {txn.status === 'COMPLETED' ? <CheckCircle size={12} /> : txn.status === 'FAILED' ? <XCircle size={12} /> : <RefreshCcw size={12} />}
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-6 text-right">
                    {txn.status === 'COMPLETED' ? (
                      <button className="text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-2 text-xs font-medium bg-gold-400/10 hover:bg-gold-400/20 px-4 py-2 rounded-lg">
                        <Download size={14} /> Download
                      </button>
                    ) : (
                      <span className="text-cream/20 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-cream/50">
                    <CreditCard size={32} className="mx-auto mb-4 opacity-50" />
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
