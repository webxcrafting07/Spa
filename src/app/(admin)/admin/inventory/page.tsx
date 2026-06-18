'use client'
import { useState } from 'react'
import { Plus, Search, AlertTriangle, Package } from 'lucide-react'

const inventory = [
  { id: '1', name: 'Lavender Essential Oil', category: 'Spa Products', sku: 'SPA-001', qty: 45, minQty: 10, unit: 'bottles', cost: 850, selling: 1200, supplier: 'AromaWorld' },
  { id: '2', name: 'Hot Stone Set (12 pcs)', category: 'Equipment', sku: 'EQ-002', qty: 8, minQty: 5, unit: 'sets', cost: 3500, selling: 0, supplier: 'SpaEquip India' },
  { id: '3', name: 'L\'Oreal Hair Color - #5', category: 'Hair Products', sku: 'HP-003', qty: 4, minQty: 8, unit: 'tubes', cost: 420, selling: 650, supplier: 'LOreal Pro' },
  { id: '4', name: 'Gold Facial Serum', category: 'Skin Care', sku: 'SK-004', qty: 22, minQty: 5, unit: 'bottles', cost: 1800, selling: 2800, supplier: 'GoldSkin Labs' },
  { id: '5', name: 'Massage Oil - Almond', category: 'Spa Products', sku: 'SPA-005', qty: 38, minQty: 15, unit: 'litres', cost: 560, selling: 900, supplier: 'NaturalOils Co' },
  { id: '6', name: 'Keratin Treatment Kit', category: 'Hair Products', sku: 'HP-006', qty: 3, minQty: 6, unit: 'kits', cost: 2200, selling: 3500, supplier: 'HairPro India' },
  { id: '7', name: 'Disposable Towels (100 pk)', category: 'Consumables', sku: 'CN-007', qty: 12, minQty: 20, unit: 'packs', cost: 280, selling: 0, supplier: 'CleanSpa' },
  { id: '8', name: 'Wax (Soft) - Chocolate', category: 'Beauty Products', sku: 'BP-008', qty: 18, minQty: 8, unit: 'kg', cost: 650, selling: 950, supplier: 'WaxPro' },
]

const categories = ['All', 'Spa Products', 'Hair Products', 'Skin Care', 'Beauty Products', 'Equipment', 'Consumables']

export default function AdminInventoryPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const lowStock = inventory.filter(i => i.qty <= i.minQty)

  const filtered = inventory.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || i.category === activeCategory
    return matchSearch && matchCat
  })

  const totalValue = inventory.reduce((a, i) => a + i.cost * i.qty, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Inventory</h1>
          <p className="text-cream/50 mt-1 text-sm">{inventory.length} items · Stock value ₹{totalValue.toLocaleString('en-IN')}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2">
          <Plus size={15} /> Add Item
        </button>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="glass-card p-4 border-yellow-400/40 bg-yellow-400/5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-yellow-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-yellow-400 font-medium text-sm">Low Stock Alert — {lowStock.length} items need reordering</p>
            <p className="text-cream/60 text-xs mt-1">{lowStock.map(i => i.name).join(', ')}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: inventory.length, color: 'text-blue-400' },
          { label: 'Low Stock', value: lowStock.length, color: 'text-yellow-400' },
          { label: 'Stock Value', value: '₹' + (totalValue / 1000).toFixed(0) + 'k', color: 'text-gold-400' },
          { label: 'Categories', value: categories.length - 1, color: 'text-green-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <p className={`font-display text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-cream/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or SKU..." className="input-luxury pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                activeCategory === cat ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30' : 'glass-card text-cream/60 hover:text-cream'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-luxury">
            <thead>
              <tr>
                <th>Product</th><th>SKU</th><th>Category</th>
                <th>Stock</th><th>Min. Stock</th><th>Cost Price</th>
                <th>Selling Price</th><th>Supplier</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const isLow = item.qty <= item.minQty
                const isOut = item.qty === 0
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-gold-400/60 shrink-0" />
                        <span className="font-medium text-cream">{item.name}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-gold-400">{item.sku}</td>
                    <td>
                      <span className="text-xs bg-dark-700 text-cream/60 px-2 py-1 rounded-full">{item.category}</span>
                    </td>
                    <td>
                      <span className={`font-semibold ${isOut ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-green-400'}`}>
                        {item.qty} {item.unit}
                      </span>
                    </td>
                    <td className="text-cream/50">{item.minQty} {item.unit}</td>
                    <td className="text-cream/70">₹{item.cost.toLocaleString('en-IN')}</td>
                    <td className="text-gold-400">{item.selling > 0 ? '₹' + item.selling.toLocaleString('en-IN') : '—'}</td>
                    <td className="text-cream/60 text-xs">{item.supplier}</td>
                    <td>
                      <span className={
                        isOut ? 'badge-cancelled' :
                        isLow ? 'badge-pending' :
                        'badge-confirmed'
                      }>
                        {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80">
          <div className="glass-card w-full max-w-lg p-8">
            <h2 className="font-display text-xl text-cream font-bold mb-6">Add Inventory Item</h2>
            <div className="space-y-4">
              {[
                { label: 'Product Name', placeholder: 'e.g. Lavender Essential Oil' },
                { label: 'SKU', placeholder: 'e.g. SPA-001' },
                { label: 'Category', placeholder: 'e.g. Spa Products' },
                { label: 'Quantity', placeholder: '50' },
                { label: 'Min. Stock Level', placeholder: '10' },
                { label: 'Unit', placeholder: 'e.g. bottles, kg, packs' },
                { label: 'Cost Price (₹)', placeholder: '500' },
                { label: 'Selling Price (₹)', placeholder: '800' },
                { label: 'Supplier', placeholder: 'Supplier name' },
              ].map(({ label, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm text-cream/60 mb-1.5">{label}</label>
                  <input type="text" placeholder={placeholder} className="input-luxury" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-outline-gold text-sm flex-1 py-3">Cancel</button>
              <button onClick={() => setShowModal(false)} className="btn-gold text-sm flex-1 py-3">Add Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
