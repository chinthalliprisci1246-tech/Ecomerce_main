import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function FooterTop() {
  return (
    <div className="w-full border-y border-gray-200 py-5 ">
      <div className="max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-5 px-10">

        {/* Visit Us */}
        <div className="flex items-start gap-4 ">
          <MapPin className="text-green-600" size={28} />
          <div>
            <h3 className="font-semibold text-sm">Visit Us</h3>
            <p className="text-gray-500 text-xs">
              New Orleans, USA
            </p>
          </div>
        </div>

        {/* Call Us */}
        <div className="flex items-start gap-4">
          <Phone className="text-green-600" size={28} />
          <div>
            <h3 className="font-semibold text-sm">Call Us</h3>
            <p className="text-gray-500 text-xs">
              +1 270 956 648
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-4">
          <Clock className="text-green-600" size={28} />
          <div>
            <h3 className="font-semibold text-sm">Working Hours</h3>
            <p className="text-gray-500 text-xs">
              Mon - Sat: 10:00 AM - 7:00 PM
            </p>
          </div>
        </div>

        {/* Email Us */}
        <div className="flex items-start gap-4">
          <Mail className="text-green-600" size={28} />
          <div>
            <h3 className="font-semibold text-sm">Email Us</h3>
            <p className="text-gray-500 text-xs">
              shopcart@gmail.com
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}