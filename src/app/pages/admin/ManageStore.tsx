import { useState, useEffect } from 'react';
import { db, DB_Product, DB_Order } from '../../data/database';
import { ShoppingBag, Package, Trash2, Edit, CheckCircle2, X, Plus, Search, TrendingUp, User, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export function ManageStore() {
  const [products, setProducts] = useState<DB_Product[]>([]);
  const [orders, setOrders] = useState<DB_Order[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('orders');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DB_Product | null>(null);

  useEffect(() => {
    setProducts(db.getTable('products'));
    setOrders(db.getTable('orders'));
  }, []);

  const handleDeleteProduct = (id: string) => {
    if (confirm('क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?')) {
      const updated = products.filter(p => p.id !== id);
      db.updateTable('products', updated);
      setProducts(updated);
      toast.success('उत्पाद हटा दिया गया है।');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: DB_Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    db.updateTable('orders', updated);
    setOrders(updated);
    toast.success(`ऑर्डर स्थिति अपडेट की गई: ${status}`);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const productData: DB_Product = {
      id: editingProduct?.id || `P-${Date.now()}`,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      salePrice: formData.get('salePrice') ? Number(formData.get('salePrice')) : undefined,
      category: formData.get('category') as string,
      imageUrl: formData.get('imageUrl') as string || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
      stock: Number(formData.get('stock')),
      isFeatured: formData.get('isFeatured') === 'on'
    };

    let updated;
    if (editingProduct) {
      updated = products.map(p => p.id === editingProduct.id ? productData : p);
    } else {
      updated = [productData, ...products];
    }

    db.updateTable('products', updated);
    setProducts(updated);
    setIsProductModalOpen(false);
    setEditingProduct(null);
    toast.success(editingProduct ? 'उत्पाद अपडेट सफल!' : 'नया उत्पाद जोड़ा गया!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border-b-4 border-primary shadow-sm">
         <div className="flex items-center gap-5">
            <div className="size-16 rounded-xl bg-primary flex items-center justify-center shadow-lg shrink-0">
               <ShoppingBag className="size-8 text-white" />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-800 leading-none tracking-tighter uppercase">समाज स्टोर प्रबंधन</h1>
               <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mt-1">Products & Order Fulfillment</p>
            </div>
         </div>
         
         <div className="flex bg-slate-50 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
               Orders ({orders.length})
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
               Products ({products.length})
            </button>
         </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-slate-800 tracking-widest flex items-center gap-3">
                 <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div> Recent Orders
              </h3>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                       <th className="px-8 py-5">Order ID</th>
                       <th className="px-8 py-5">Customer</th>
                       <th className="px-8 py-5">Total</th>
                       <th className="px-8 py-5">Status</th>
                       <th className="px-8 py-5 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 font-bold overflow-hidden">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-8 py-6 text-sm font-black text-slate-400">{order.id}</td>
                         <td className="px-8 py-6">
                            <div className="space-y-1">
                               <p className="text-sm font-black text-slate-800 flex items-center gap-2"><User className="size-3 text-primary" /> {order.customerDetails?.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2"><Phone className="size-3" /> {order.customerDetails?.phone}</p>
                               <p className="text-[9px] font-bold text-slate-400 flex items-center gap-2 line-clamp-1"><MapPin className="size-3" /> {order.customerDetails?.address}</p>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <span className="text-lg font-black text-primary italic">₹{order.total}</span>
                         </td>
                         <td className="px-8 py-6">
                            <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700 animate-pulse'
                            }`}>
                               {order.status}
                            </span>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                               {order.status === 'pending' && (
                                 <button 
                                   onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                                   className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2"
                                 >
                                    Ship Order <CheckCircle2 className="size-3" />
                                 </button>
                               )}
                               {order.status === 'shipped' && (
                                 <button 
                                   onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                   className="bg-primary text-white border border-primary px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 transition-all"
                                 >
                                    Mark Delivered
                                 </button>
                               )}
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-500">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-slate-800 tracking-widest flex items-center gap-3">
                 Product Catalog
              </h3>
              <button 
                onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all shadow-md active:scale-95"
              >
                <Plus className="size-4" /> Add Product
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {products.map((p) => (
                <div key={p.id} className="group bg-slate-50/50 rounded-2xl border border-slate-100 p-5 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all">
                   <div className="aspect-square rounded-xl overflow-hidden mb-5 bg-white border border-slate-100 relative">
                      <img src={p.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] font-black px-2 py-1 uppercase tracking-widest border border-slate-200">
                         Stock: {p.stock}
                      </div>
                   </div>
                   <div className="space-y-3">
                      <h4 className="font-black text-slate-800 uppercase text-xs leading-tight group-hover:text-primary transition-colors">{p.name}</h4>
                      <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                         <div className="flex flex-col">
                            {p.salePrice ? (
                               <>
                                  <span className="text-[10px] font-bold text-slate-400 line-through">₹{p.price}</span>
                                  <span className="text-lg font-black text-primary">₹{p.salePrice}</span>
                               </>
                            ) : (
                               <span className="text-lg font-black text-slate-900 italic">₹{p.price}</span>
                            )}
                         </div>
                         <div className="flex items-center gap-2">
                            <button onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }} className="size-9 bg-white text-slate-600 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                               <Edit className="size-4" />
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="size-9 bg-white text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                               <Trash2 className="size-4" />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Product Editor Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProductModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border-t-8 border-primary">
               <form onSubmit={handleSaveProduct} className="p-10 space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">
                        {editingProduct ? 'उत्पाद अपडेट करें' : 'नया उत्पाद जोड़े'}
                     </h3>
                     <button type="button" onClick={() => setIsProductModalOpen(false)} className="size-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-primary transition-all">
                        <X className="size-5" />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                     <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Product Name</label>
                        <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-slate-50 border border-transparent rounded-xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Price (MRP)</label>
                        <input type="number" name="price" defaultValue={editingProduct?.price} required className="w-full bg-slate-50 border border-transparent rounded-xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Sale Price (Offer)</label>
                        <input type="number" name="salePrice" defaultValue={editingProduct?.salePrice} className="w-full bg-slate-50 border border-transparent rounded-xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Category</label>
                        <input name="category" defaultValue={editingProduct?.category} required className="w-full bg-slate-50 border border-transparent rounded-xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Stock Qty</label>
                        <input type="number" name="stock" defaultValue={editingProduct?.stock} required className="w-full bg-slate-50 border border-transparent rounded-xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all" />
                     </div>
                     <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Image URL</label>
                        <input name="imageUrl" defaultValue={editingProduct?.imageUrl} className="w-full bg-slate-50 border border-transparent rounded-xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all" />
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-primary/10">
                        {editingProduct ? 'Update Product' : 'Add to Catalog'}
                     </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
