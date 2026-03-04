import { useState, useRef, useCallback } from "react";
import { MessageCircle, Upload, Check, Move } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import customDesign1 from "@/assets/custom-tshirt-design-1.jpg";
import customDesign2 from "@/assets/custom-tshirt-design-2.jpg";
import customDesign3 from "@/assets/custom-tshirt-design-3.jpg";
import customDesign4 from "@/assets/custom-tshirt-design-4.jpg";
import customDesign5 from "@/assets/custom-tshirt-design-5.jpg";
import customDesign6 from "@/assets/custom-tshirt-design-6.jpg";

const designs = [
  { id: 1, name: "Urban Graffiti", image: customDesign1, description: "Bold graffiti-style artwork for street culture enthusiasts.", price: 1899 },
  { id: 2, name: "Midnight Abstract", image: customDesign2, description: "Abstract geometric patterns with a dark urban edge.", price: 1999 },
  { id: 3, name: "Retro Wave", image: customDesign3, description: "Retro synthwave-inspired design with vibrant neon tones.", price: 1799 },
  { id: 4, name: "Street Typography", image: customDesign4, description: "Custom street-style typography with bold lettering.", price: 1899 },
  { id: 5, name: "Minimalist Logo", image: customDesign5, description: "Clean minimalist logo placement for subtle fashion.", price: 1699 },
  { id: 6, name: "Floral Dark", image: customDesign6, description: "Dark floral patterns blending nature with urban aesthetics.", price: 1999 },
];

const sizes = ["S", "M", "L", "XL", "2XL"];

const shirtColors = [
  { name: "White", hex: "#f5f5f5", dark: false },
  { name: "Black", hex: "#1a1a1a", dark: true },
  { name: "Navy", hex: "#1e3a5f", dark: true },
  { name: "Red", hex: "#b91c1c", dark: true },
  { name: "Grey", hex: "#6b7280", dark: true },
  { name: "Sky Blue", hex: "#7dd3fc", dark: false },
  { name: "Olive", hex: "#4d7c0f", dark: true },
  { name: "Maroon", hex: "#7f1d1d", dark: true },
  { name: "Beige", hex: "#d4c5a9", dark: false },
];

const CustomTShirtDesigns = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(shirtColors[0]);
  const [quantity, setQuantity] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"gallery" | "custom">("gallery");
  const [side, setSide] = useState<"front" | "back">("front");
  const [designScale, setDesignScale] = useState(50);
  const [designPos, setDesignPos] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setDesignPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getRelativePos = useCallback((clientX: number, clientY: number) => {
    if (!previewRef.current) return null;
    const rect = previewRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) };
  }, []);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const pos = getRelativePos(e.clientX, e.clientY);
    if (pos) setDesignPos(pos);
  }, [isDragging, getRelativePos]);

  const startingPrice = 2499;
  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to order a Custom T-Shirt:\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor.name}\n• Side: ${side}\n• Qty: ${quantity}\n• Design: ${fileName || "Will share on chat"}\n• Starting Price: PKR ${startingPrice.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom <span className="text-gradient-neon">T-Shirts</span></h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">Browse ready-to-print designs or upload your own custom design with live preview.</p>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            <button onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2.5 rounded-sm text-sm font-semibold border transition-all ${activeTab === "gallery" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
              Design Gallery
            </button>
            <button onClick={() => setActiveTab("custom")}
              className={`px-6 py-2.5 rounded-sm text-sm font-semibold border transition-all ${activeTab === "custom" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
              Upload Your Design
            </button>
          </div>

          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((d) => {
                const msg = encodeURIComponent(`Assalamualaikum MG Brands!\nI want to order the "${d.name}" T-Shirt design.\nPrice: PKR ${d.price.toLocaleString()}`);
                return (
                  <div key={d.id} className="bg-card border border-border rounded-sm overflow-hidden card-hover shadow-sm">
                    <div className="aspect-[3/4] overflow-hidden bg-white">
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-body font-semibold text-foreground mb-1">{d.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{d.description}</p>
                      <p className="text-primary font-bold text-lg mb-3">PKR {d.price.toLocaleString()}</p>
                      <a href={`https://wa.me/923271497570?text=${msg}`} target="_blank" rel="noopener noreferrer"
                        className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-2.5 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                        <MessageCircle size={16} /> Order Now
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "custom" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Left: Live Preview */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">★</span>
                  Live Preview
                </h2>

                {/* Front / Back Toggle */}
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setSide("front")}
                    className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all ${side === "front" ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    Front
                  </button>
                  <button onClick={() => setSide("back")}
                    className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all ${side === "back" ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    Back
                  </button>
                </div>

                {/* Shirt Preview */}
                <div
                  ref={previewRef}
                  className="relative border border-border rounded-sm overflow-hidden aspect-[3/4] cursor-crosshair select-none touch-none"
                  style={{ backgroundColor: selectedColor.hex }}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                >
                  {/* Shirt silhouette overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 200 260" className="w-4/5 h-4/5 opacity-15" fill={selectedColor.dark ? "#ffffff" : "#000000"}>
                      {side === "front" ? (
                        <path d="M40,30 L20,50 L5,95 L30,100 L35,70 L35,240 L165,240 L165,70 L170,100 L195,95 L180,50 L160,30 L130,25 Q100,45 70,25 Z" />
                      ) : (
                        <path d="M40,30 L20,50 L5,95 L30,100 L35,70 L35,240 L165,240 L165,70 L170,100 L195,95 L180,50 L160,30 L130,25 Q100,15 70,25 Z" />
                      )}
                    </svg>
                  </div>

                  {/* Side label */}
                  <div className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-sm ${selectedColor.dark ? "bg-white/20 text-white" : "bg-black/10 text-black/60"}`}>
                    {side.toUpperCase()}
                  </div>

                  {/* User design overlay */}
                  {designPreview && (
                    <div
                      className="absolute cursor-grab active:cursor-grabbing"
                      style={{
                        left: `${designPos.x}%`,
                        top: `${designPos.y}%`,
                        transform: "translate(-50%, -50%)",
                        width: `${designScale}%`,
                      }}
                      onPointerDown={handlePointerDown}
                    >
                      <img src={designPreview} alt="Your design" className="w-full h-auto object-contain pointer-events-none" draggable={false} />
                      <div className={`absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${selectedColor.dark ? "bg-white/30 text-white" : "bg-black/15 text-black/70"}`}>
                        <Move size={10} /> Drag to move
                      </div>
                    </div>
                  )}
                </div>

                {/* Design size slider */}
                {designPreview && (
                  <div className="mt-3">
                    <label className="text-sm text-muted-foreground font-medium mb-1 block">Design Size: {designScale}%</label>
                    <input
                      type="range" min={15} max={80} value={designScale}
                      onChange={(e) => setDesignScale(Number(e.target.value))}
                      className="w-full accent-[hsl(var(--primary))]"
                    />
                  </div>
                )}
              </div>

              {/* Right: Options */}
              <div className="space-y-6">
                {/* Upload */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Upload Your Design
                  </h2>
                  <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-6 cursor-pointer hover:border-primary transition-colors bg-card">
                    <Upload size={24} className="text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">{fileName || "Click to upload (JPG, PNG)"}</span>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileUpload} />
                  </label>
                  {designPreview && (
                    <div className="mt-3 flex items-center gap-3">
                      <img src={designPreview} alt="Preview" className="w-16 h-16 object-cover rounded-sm border border-border" />
                      <div>
                        <p className="text-sm text-foreground font-medium">{fileName}</p>
                        <button onClick={() => { setDesignPreview(null); setFileName(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                          className="text-xs text-destructive hover:underline">Remove</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Color */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Shirt Color: <span className="text-muted-foreground text-sm font-normal">{selectedColor.name}</span>
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {shirtColors.map((c) => (
                      <button key={c.name} onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                        style={{ backgroundColor: c.hex }} title={c.name} />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Select Size
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        className={`min-w-[44px] h-10 px-3 rounded-sm text-sm font-semibold border transition-all ${selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Quantity
                  </h2>
                  <div className="flex items-center border border-border rounded-sm w-fit">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">−</button>
                    <span className="w-12 text-center text-foreground font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">+</button>
                  </div>
                </div>

                {/* Order */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    Place Order
                  </h2>
                  <div className="bg-secondary/50 rounded-sm p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">Color: {selectedColor.name} · Size: {selectedSize || "—"}</p>
                        <p className="text-muted-foreground text-xs">Side: {side} · Qty: {quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground text-xs">Starting from</p>
                        <p className="text-primary font-bold text-2xl">PKR {startingPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <a href={`https://wa.me/923271497570?text=${whatsAppMsg}`} target="_blank" rel="noopener noreferrer"
                    className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                    <MessageCircle size={18} /> Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default CustomTShirtDesigns;
