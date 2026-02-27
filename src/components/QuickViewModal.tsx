import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, open, onClose }: QuickViewModalProps) => {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-display text-2xl text-foreground">{product.name}</h3>
          <p className="text-primary font-bold text-2xl">PKR {product.price.toLocaleString()}</p>
          <p className="text-muted-foreground text-sm">
            Premium quality {product.category === "hoodies" ? "hoodie" : "t-shirt"} from MG Brands Pakistan. Comfortable, stylish and made for the bold.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground py-3 font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 rounded-sm"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <a
              href={`https://wa.me/923291497570?text=${encodeURIComponent(`Hi MG Brands! I'm interested in ${product.name} (PKR ${product.price.toLocaleString()})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-foreground px-4 py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
