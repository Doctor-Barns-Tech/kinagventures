'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from '@/components/admin/ImageUpload';

interface ShippingFee {
  id: string;
  product_name: string;
  price: number | null;
  shipping_fee: number;
  image_url: string | null;
  notes: string | null;
  created_at: string;
}

const inputClass =
  'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 text-sm bg-white transition-colors';

export default function AdminShippingFeesPage() {
  const [entries, setEntries] = useState<ShippingFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ShippingFee | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const [form, setForm] = useState({
    product_name: '',
    price: '',
    shipping_fee: '',
    image_url: '',
    notes: '',
  });

  useEffect(() => { fetchEntries(); }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('shipping_fees')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setEntries(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingEntry(null);
    setForm({ product_name: '', price: '', shipping_fee: '', image_url: '', notes: '' });
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (entry: ShippingFee) => {
    setEditingEntry(entry);
    setForm({
      product_name: entry.product_name,
      price: entry.price != null ? String(entry.price) : '',
      shipping_fee: String(entry.shipping_fee),
      image_url: entry.image_url ?? '',
      notes: entry.notes ?? '',
    });
    setFormError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.product_name.trim()) { setFormError('Product name is required.'); return; }
    const fee = parseFloat(form.shipping_fee);
    if (isNaN(fee) || fee < 0) { setFormError('Enter a valid shipping fee (0 or more).'); return; }
    const price = form.price !== '' ? parseFloat(form.price) : null;
    if (price !== null && (isNaN(price) || price < 0)) { setFormError('Enter a valid product price.'); return; }

    setSaving(true);
    setFormError('');

    const payload = {
      product_name: form.product_name.trim(),
      price: price,
      shipping_fee: fee,
      image_url: form.image_url.trim() || null,
      notes: form.notes.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = editingEntry
      ? await supabase.from('shipping_fees').update(payload).eq('id', editingEntry.id)
      : await supabase.from('shipping_fees').insert(payload);

    if (error) { setFormError(error.message); setSaving(false); return; }
    setSaving(false);
    setShowModal(false);
    fetchEntries();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('shipping_fees').delete().eq('id', id);
    setDeleteConfirmId(null);
    fetchEntries();
  };

  const filtered = entries.filter((e) =>
    e.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping Fees</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage products, prices and shipping fees visible to customers</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <i className="ri-add-line text-lg" /> Add Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total Products</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{entries.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Avg. Shipping Fee</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {entries.length > 0
              ? `GH₵${(entries.reduce((s, e) => s + Number(e.shipping_fee), 0) / entries.length).toFixed(2)}`
              : '—'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 col-span-2 sm:col-span-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">With Images</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {entries.filter((e) => e.image_url).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-gray-600"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mr-3" />
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <i className="ri-truck-line text-4xl text-gray-200 block mb-2" />
            <p className="text-gray-500 font-medium">No entries found</p>
            {!searchQuery && <p className="text-sm text-gray-400 mt-1">Click &ldquo;Add Entry&rdquo; to get started</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Shipping Fee</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Notes</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {entry.image_url ? (
                          <img src={entry.image_url} alt={entry.product_name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <i className="ri-image-line text-gray-400" />
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{entry.product_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-gray-900">
                      {entry.price != null ? `GH₵${Number(entry.price).toFixed(2)}` : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      {Number(entry.shipping_fee) === 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Free</span>
                      ) : (
                        <span className="font-semibold text-gray-900">GH₵{Number(entry.shipping_fee).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">
                      {entry.notes || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(entry)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <i className="ri-pencil-line" />
                        </button>
                        <button onClick={() => setDeleteConfirmId(entry.id)} className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <i className="ri-delete-bin-line" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-4">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editingEntry ? 'Edit Entry' : 'Add Product'}</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <ImageUpload
                label="Product Image"
                value={form.image_url}
                onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
                folder="shipping-fees"
                previewHeight={140}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.product_name}
                  onChange={(e) => setForm((f) => ({ ...f, product_name: e.target.value }))}
                  placeholder="e.g. Samsung TV 55 inch"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Product Price (GH₵)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Shipping Fee (GH₵) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.shipping_fee}
                    onChange={(e) => setForm((f) => ({ ...f, shipping_fee: e.target.value }))}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="e.g. Applies within Accra only"
                  className={inputClass}
                />
              </div>

              {formError && (
                <p className="text-sm text-red-600 flex items-center gap-1.5">
                  <i className="ri-error-warning-line" /> {formError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {editingEntry ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-2xl text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Entry</h3>
            <p className="text-sm text-gray-500 mb-6">This will permanently remove this entry. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
