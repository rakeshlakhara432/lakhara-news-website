import { useState, useEffect } from 'react';
import { db, DB_Product } from '../../data/database';
import { mockProducts } from '../../data/mockData';
import { ShoppingBag, Zap, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationService } from '../../services/NotificationService';

export function StorePage() {
  const [products, setProducts] = useState<DB_Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DB_Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');

  useEffect(() => {
    const dbProducts = db.getTable('products');
    if (dbProducts.length === 0) {
      db.updateTable('products', mockProducts);
      setProducts(mockProducts);
    } else {
      setProducts(dbProducts);
    }
  }, []);

  const handleQuickBuy = (product: DB_Product) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
    setCheckoutStep('details');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Order Creation
    const orders = db.getTable('orders');
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: 'anonymous',
      items: [{ productId: selectedProduct!.id, quantity: 1, price: selectedProduct?.salePrice || selectedProduct!.price }],
      total: selectedProduct?.salePrice || selectedProduct!.price,
      status: 'pending' as const,
      paymentMethod: 'cod' as const,
      createdAt: new Date().toISOString(),
      customerDetails: {
        name: (e.target as any).name.value,
        phone: (e.target as any).phone.value,
        address: (e.target as any).address.value,
      }
    };
    db.updateTable('orders', [...orders, newOrder]);
    notificationService.sendNotification('order', 'New Order Placed', `Order #${newOrder.id} confirmed for ₹${newOrder.total}.`);
    setCheckoutStep('success');
    toast.success("Order Placed Successfully!");
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="traditional-header justify-center">
          समाज <span className="text-gray-900">स्टोर</span>
        </h1>
        <p className="text-gray-500 font-bold text-sm max-w-lg mx-auto">
          समाज के विशेष उत्पाद, डायरी और परिधान। शुद्धता और सेवा का संगम।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="card-traditional group">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
               <img 
                 src={product.imageUrl} 
                 alt={product.name} 
                 className="size-full object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               {product.salePrice && (
                 <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                   Special Offer
                 </div>
               )}
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black uppercase text-gray-900 leading-tight">{product.name}</h3>
                <p className="text-xs text-gray-500 font-bold line-clamp-2">{product.description}</p>
              </div>
              
              <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-col">
                  {product.salePrice ? (
                    <>
                      <span className="text-gray-400 line-through text-xs font-bold">₹{product.price}</span>
                      <span className="text-2xl font-black text-primary">₹{product.salePrice}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
                  )}
                </div>
                <button 
                  onClick={() => handleQuickBuy(product)}
                  className="bg-gray-950 text-white px-6 py-2.5 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-colors"
                >
                  <Zap className="size-3 fill-current" /> Express Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 border border-gray-100 p-8">
         <div className="flex items-start gap-4 p-4">
            <Truck className="size-6 text-primary shrink-0" />
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">Fast Delivery</h4>
               <p className="text-[10px] font-bold text-gray-400 mt-1">समाज के स्वयंसेवक द्वारा सुरक्षित होम डिलीवरी।</p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-4 border-y md:border-y-0 md:border-x border-gray-100">
            <ShieldCheck className="size-6 text-primary shrink-0" />
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">100% Quality</h4>
               <p className="text-[10px] font-bold text-gray-400 mt-1">प्रीमियम क्वालिटी और समाज की सेवा का लक्ष्य।</p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-4">
            <ShoppingBag className="size-6 text-primary shrink-0" />
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">Easy Return</h4>
               <p className="text-[10px] font-bold text-gray-400 mt-1">किसी भी समस्या होने पर आसान वापसी उपलब्ध।</p>
            </div>
         </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && selectedProduct && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden border-t-8 border-primary"
            >
              {checkoutStep === 'details' ? (
                <div className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Express Checkout</h2>
                    <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-primary">
                      <Zap className="size-5" />
                    </button>
                  </div>

                  <div className="flex gap-4 p-4 bg-gray-50 border border-gray-100">
                    <img src={selectedProduct.imageUrl} alt="" className="size-16 object-cover" />
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-xs">{selectedProduct.name}</h4>
                      <div className="text-primary font-black text-lg">₹{selectedProduct.salePrice || selectedProduct.price}</div>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmOrder} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5">Full Name</label>
                        <input name="name" required className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-bold focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5">Phone Number</label>
                        <input name="phone" required type="tel" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-bold focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5">Delivery Address</label>
                        <textarea name="address" required rows={3} className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-bold focus:border-primary outline-none" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full bg-primary text-white py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-700 transition-colors">
                        Confirm COD Order <CheckCircle2 className="size-4" />
                      </button>
                      <p className="text-[9px] text-center text-gray-400 mt-4 font-bold uppercase tracking-widest">
                        Pay on delivery (COD) &bull; Safe & Secure
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-12 text-center space-y-8 py-20">
                   <div className="size-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="size-10" />
                   </div>
                   <div className="space-y-3">
                      <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Order Placed!</h2>
                      <p className="text-gray-500 font-bold text-sm">आपका ऑर्डर सफलतापूर्वक प्राप्त हुआ है। जल्द ही आपसे संपर्क किया जाएगा।</p>
                   </div>
                   <button 
                     onClick={() => setIsCheckoutOpen(false)}
                     className="bg-gray-900 text-white px-10 py-3 font-black text-xs uppercase tracking-widest"
                   >
                     Continue Shopping
                   </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
