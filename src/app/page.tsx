import WhatsAppButton from "@/components/Whatup";
import ImageSlider from "@/components/Imageslider";

import Mixitem from "@/components/Mixitem";

const HomePage = () => {
  return (
    <div >
      
<ImageSlider/>

<Mixitem category="mixitems"/>

      {/* WhatsApp Button (Fixed in Bottom-Right) */}
      <div className="absolute bottom-10 right-10">
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default HomePage;