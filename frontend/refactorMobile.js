const fs = require('fs');
const path = require('path');

// 1. Update index.css
let indexCss = fs.readFileSync('c:/website_royal_cleaning/websitee/frontend/src/index.css', 'utf8');
indexCss = indexCss.replace(/--primary: 144 65% 24%; \/\* Forest Green \(#166534\) \*\//, '--primary: 212 73% 15%; /* Deep Royal Navy (#0B2545) */');
indexCss = indexCss.replace(/--accent: 142 71% 45%; \/\* Emerald Green \(#22c55e\) \*\//, '--accent: 211 72% 26%; /* Vibrant Royal Blue (#134074) */');
indexCss += `\n
/* Mobile Carousel */
.mobile-snap-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.mobile-snap-carousel::-webkit-scrollbar { display: none; }
.snap-item { scroll-snap-align: center; flex-shrink: 0; }
`;
fs.writeFileSync('c:/website_royal_cleaning/websitee/frontend/src/index.css', indexCss);

// 2. Update Header.js
let headerJs = fs.readFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/Header.js', 'utf8');
headerJs = headerJs.replace(/bg-white\/80 backdrop-blur-sm border-b border-slate-100\/60/, 'bg-white/90 backdrop-blur-md border-b border-slate-200');
headerJs = headerJs.replace(/text-\[\#0F172A\]/g, 'text-[#0B2545]');
headerJs = headerJs.replace(/text-\[\#166534\]/g, 'text-[#0B2545]');
fs.writeFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/Header.js', headerJs);

// 3. Update ServicesOverview.js (Cards)
let servicesJs = fs.readFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/sections/ServicesOverview.js', 'utf8');
// Update standard layout to the native one
servicesJs = servicesJs.replace(/className="group relative bg-white rounded-3xl/g, 'className="group relative bg-white rounded-[16px] shadow-[0_4px_20px_-2px_rgba(11,37,69,0.06)] border border-[#F1F5F9]');
servicesJs = servicesJs.replace(/rounded-t-3xl/g, 'rounded-t-[16px]');
servicesJs = servicesJs.replace(/text-\[\#166534\]/g, 'text-[#0B2545]');
servicesJs = servicesJs.replace(/bg-\[\#166534\]/g, 'bg-[#F59E0B]');
servicesJs = servicesJs.replace(/hover:bg-\[\#14532d\]/g, 'hover:bg-[#D97706]');
fs.writeFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/sections/ServicesOverview.js', servicesJs);

// 4. Update TestimonialsSection.js
let testJs = fs.readFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/sections/TestimonialsSection.js', 'utf8');
testJs = testJs.replace(/<div className="relative max-w-4xl mx-auto mb-10">/g, '<div className="relative max-w-4xl mx-auto mb-10 mobile-snap-carousel px-4">');
testJs = testJs.replace(/className="bg-white rounded-3xl p-8 md:p-10/g, 'className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100 min-w-[85vw] md:min-w-0 snap-item mr-4');
testJs = testJs.replace(/text-\[\#166534\]/g, 'text-[#0B2545]');
testJs = testJs.replace(/bg-\[\#166534\]/g, 'bg-[#0B2545]');
fs.writeFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/sections/TestimonialsSection.js', testJs);

// 5. Update FloatingContact.js
if (fs.existsSync('c:/website_royal_cleaning/websitee/frontend/src/components/FloatingContact.js')) {
  let floatJs = fs.readFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/FloatingContact.js', 'utf8');
  floatJs = floatJs.replace(/bg-white shadow-\[0_-4px_20px_rgba\(0,0,0,0\.08\)\]/g, 'bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)] h-[64px] items-center');
  floatJs = floatJs.replace(/bg-\[\#166534\]/g, 'bg-[#F59E0B]');
  floatJs = floatJs.replace(/hover:bg-\[\#14532d\]/g, 'hover:bg-[#D97706]');
  fs.writeFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/FloatingContact.js', floatJs);
}

// 6. Update ContactSection.js
let contactJs = fs.readFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/sections/ContactSection.js', 'utf8');
contactJs = contactJs.replace(/className="w-full bg-white\/50 border border-slate-200/g, 'className="w-full bg-white/50 border border-slate-200 text-[16px] min-h-[48px] rounded-[12px]');
fs.writeFileSync('c:/website_royal_cleaning/websitee/frontend/src/components/sections/ContactSection.js', contactJs);

console.log("Mobile refactoring applied successfully.");
