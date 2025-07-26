import moment from "moment";
import { LuTag } from "react-icons/lu";
import { Input } from "@/components/ui/input/Input";
import { Modal } from "@/components/ui/modal/Modal";
import { MultipleSearchSelect } from "@/components/ui/select/MultipleSearchSelect";

export default function CouponView({ viewModal, selectedCoupon }) {
  // Dummy package data
  const dummyPackages = [
    { value: "pk1", label: "Bangkok Explorer - 5 Days" },
    { value: "pk2", label: "Paris Romantic Getaway" },
    { value: "pk3", label: "Bali Beach Retreat" },
    { value: "pk4", label: "New York City Highlights" },
    { value: "pk5", label: "Dubai Desert Adventure" },
    { value: "pk6", label: "Tokyo Cultural Tour" },
    { value: "pk7", label: "London City Experience" },
    { value: "pk8", label: "Maldives Honeymoon Package" },
    { value: "pk9", label: "Rome & Venice Historic Tour" },
    { value: "pk10", label: "Swiss Alps Family Escape" },
  ];

  // Filter selected packages
  const selectedPackages = dummyPackages.filter((pkg) =>
    selectedCoupon?.applicablePackages?.includes(pkg.value)
  );

  const fields = [
    { label: "Code", value: selectedCoupon?.code },
    { label: "Description", value: selectedCoupon?.description },
    { label: "Coupon Type", value: selectedCoupon?.couponType },
    { label: "Discount Value", value: selectedCoupon?.discountValue },
    {
      label: "Expiry Date",
      value: moment(selectedCoupon?.expiryDate).format(
        "DD MMMM YYYY [at] hh:mm A"
      ),
    },
    { label: "Status", value: selectedCoupon?.status },
    { label: "Usage Limit", value: selectedCoupon?.usageLimit },
  ];

  return (
    <Modal
      open={viewModal.isOpen}
      onClose={viewModal.close}
      title="View Coupon"
      size="xxlarge"
    >
      {selectedCoupon && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-0.5">
          <MultipleSearchSelect
            label="Applicable Packages"
            placeholder="Select your Packages"
            searchPlaceholder="Search for Packages..."
            options={dummyPackages}
            startIcon={<LuTag className="h-4 w-4" />}
            fullWidth
            value={selectedPackages.map((pkg) => pkg.value)}
            readOnly
            className="h-12"
          />
          {fields.map(({ label, value }) => (
            <Input
              key={label}
              label={label}
              value={value}
              readOnly
              className="bg-gray-50 h-12 dark:bg-transparent dark:border-[#475569]"
              fullWidth
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
