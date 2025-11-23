import { Button } from '@/components/livekit/button';
import { useState } from 'react';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

function Modal({ open, onClose, title, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[min(680px,95%)] rounded-2xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 dark:bg-black/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
  { id: 'latte', name: 'Velvet Latte', desc: 'Creamy espresso with steamed milk', price: '3.50' },
  { id: 'capp', name: 'Cappuccino Bliss', desc: 'Foamy, rich, and perfect', price: '3.00' },
  { id: 'cold', name: 'Iced Cold Brew', desc: 'Bold, chilled, smooth', price: '3.75' },
  { id: 'matcha', name: 'Matcha Magic', desc: 'Ceremonial-grade matcha delight', price: '4.00' },
];

export const WelcomeView = ({ startButtonText, onStartCall, ref }: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(item: any) {
    setCart((c) => [...c, item]);
  }

  function clearCart() {
    setCart([]);
  }

  function placeOrder() {
    // simple local confirmation - persist to localStorage
    const id = `order_${Date.now()}`;
    const payload = { id, items: cart, total: cart.reduce((s, i) => s + Number(i.price), 0).toFixed(2) };
    try {
      localStorage.setItem(id, JSON.stringify(payload));
    } catch (e) {
      // ignore
    }
    clearCart();
    setOrderOpen(false);
    alert(`Thanks! Order placed (${payload.total}$). Confirmation: ${id}`);
  }

  return (
    <div ref={ref} className="min-h-[60vh] flex items-center justify-center px-6">
      <section className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Background image + gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,189,89,0.12), rgba(255,105,135,0.12)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80')",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-8 md:p-12 bg-gradient-to-b from-white/70 to-white/40 dark:from-black/40 dark:to-black/20">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Brew & Bean Cafe
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-prose">
              Handcrafted coffee, delightful conversations. Chat live with your barista AI and place your order with voice.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" onClick={onStartCall} className="font-mono">
                {startButtonText}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setMenuOpen(true)}>
                View Menu
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setOrderOpen(true)}>
                Order Now
              </Button>
              <Button variant="ghost" size="lg" onClick={() => setAboutOpen(true)}>
                About
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-r from-amber-400 to-pink-400 p-1">
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=200&q=60"
                  alt="coffee"
                  className="w-16 h-16 rounded-full object-cover block"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open • 7:00 AM — 6:00 PM</p>
                <p className="text-sm text-muted-foreground">Free wifi • Cozy seating • Vegan options</p>
              </div>
            </div>
          </div>

          <aside className="w-full md:w-96 bg-white/70 dark:bg-black/60 rounded-2xl p-4 ring-1 ring-black/5">
            <h4 className="font-bold text-lg">Today's Specials</h4>
            <ul className="mt-3 space-y-3">
              {MENU_ITEMS.slice(0, 3).map((m) => (
                <li key={m.id} className="flex items-start gap-3">
                  <img
                    src={`https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=160&q=60`}
                    alt={m.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold">{m.name}</h5>
                      <span className="text-sm text-muted-foreground">${m.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                    <div className="mt-2">
                      <Button size="sm" variant="primary" onClick={() => addToCart(m)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-muted-foreground">Cart: {cart.length} items</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setOrderOpen(true)}>
                  Checkout
                </Button>
                <Button size="sm" variant="ghost" onClick={() => clearCart()}>
                  Clear
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <footer className="relative z-10 p-4 text-center text-xs text-muted-foreground">
          <div className="max-w-2xl mx-auto">
            <p>
              Need help? Visit the <a className="underline" href="/">help center</a> or start a live session.
            </p>
          </div>
        </footer>
      </section>

      {/* Modals */}
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Our Menu">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MENU_ITEMS.map((m) => (
            <div key={m.id} className="p-3 rounded-lg bg-gradient-to-r from-white to-white/60 ring-1 ring-black/5">
              <h4 className="font-semibold">{m.name} <span className="text-sm text-muted-foreground">${m.price}</span></h4>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
              <div className="mt-3">
                <Button size="sm" variant="primary" onClick={() => addToCart(m)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={orderOpen} onClose={() => setOrderOpen(false)} title="Your Order">
        <div>
          {cart.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty. Add items from the menu.</p>
          ) : (
            <div className="space-y-3">
              {cart.map((c, i) => (
                <div key={`${c.id}-${i}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">{c.desc}</div>
                  </div>
                  <div className="text-sm">${c.price}</div>
                </div>
              ))}

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between font-semibold">
                  <div>Total</div>
                  <div>${cart.reduce((s, i) => s + Number(i.price), 0).toFixed(2)}</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="primary" onClick={placeOrder}>Place Order</Button>
                  <Button variant="outline" onClick={() => clearCart()}>Clear</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} title="About Brew & Bean">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Brew & Bean is a cozy, AI-powered coffee experience. Use voice to chat with our barista and place your order hands-free.
          </p>
          <p className="text-sm text-muted-foreground">Follow us on social media for seasonal specials and playlists.</p>
        </div>
      </Modal>
    </div>
  );
};
