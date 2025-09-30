import hotel from "../assets/images/hotel.jpg";
import resort from "../assets/images/resort.jpg";
import palace from "../assets/images/palace.jpg";
import guestHouse from "../assets/images/guest-house.jpg";
import houseboat from "../assets/images/house-boat.jpg";
import lodge from "../assets/images/lodge.jpg";

const propertyTypes = {
  HOTEL: {
    type: "Hotel",
    description:
      "Modern rooms with complete facilities and 24/7 services for travelers.",
    image: hotel,
  },
  RESORT: {
    type: "Resort",
    description:
      "Luxury property offering spa services, leisure activities, and nature views.",
    image: resort,
  },
  GUEST_HOUSE: {
    type: "Guest House",
    description:
      "Homely property with budget-friendly stays and a welcoming atmosphere.",
    image: guestHouse,
  },
  HOUSE_BOAT: {
    type: "Houseboat",
    description:
      "Floating stay on water providing scenic views and a unique experience.",
    image: houseboat,
  },
  LODGE: {
    type: "Lodge",
    description:
      "Simple, cozy accommodation near nature, ideal for adventurers and hikers.",
    image: lodge,
  },
  PALACE: {
    type: "Palace",
    description:
      "Heritage property with luxury hospitality, historic charm, and royal appeal.",
    image: palace,
  },
};

export default propertyTypes;
