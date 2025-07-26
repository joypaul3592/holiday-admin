"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";
import { Input } from "@/components/ui/input/Input";
import { Textarea } from "@/components/ui/textarea/Textarea";
import { Calendar } from "@/components/ui/calender/Calender";
import { MultipleSearchSelect } from "@/components/ui/select/MultipleSearchSelect";
import { LuTag } from "react-icons/lu";
import Link from "next/link";
import { Icon } from "@iconify/react";

const discountTypeOptions = [
  { value: "flat", label: "Flat Amount" },
  { value: "percentage", label: "Percentage" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "expired", label: "Expired" },
];

export default function CreateCouponForm({ createModal, onCouponCreate }) {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "flat",
    discountValue: "",
    applicablePackages: [],
    minOrderAmount: "",
    isPublic: true,
    eligibleUsers: "",
    usageLimit: "",
    expiresAt: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
      isValid = false;
    }
    if (!formData.type) {
      newErrors.type = "Type is required";
      isValid = false;
    }
    if (!formData.discountValue || isNaN(formData.discountValue)) {
      newErrors.discountValue = "Valid discount value is required";
      isValid = false;
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    if (!formData.expiresAt) {
      newErrors.expiresAt = "Expiration date is required";
      isValid = false;
    }

    if (!formData.isPublic && !formData.eligibleUsers.trim()) {
      newErrors.eligibleUsers = "Eligible users required for private coupon";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCouponCreate(formData);
      toast.success("Coupon created successfully!");
      createModal.close();
      setFormData({
        code: "",
        description: "",
        type: "flat",
        discountValue: "",
        applicablePackages: "",
        minOrderAmount: "",
        isPublic: true,
        eligibleUsers: "",
        usageLimit: "",
        expiresAt: "",
        status: "active",
      });
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <div className="bg-white minBody p-5 rounded-lg dark:bg-[#010611] dark:text-white space-y-5">
      <div className="between mb-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white dark:font-medium">
          Create Coupon
        </h1>
        <Link
          href="/coupon"
          className="text-sm font-medium px-3 py-1.5 rounded bg-gray-100 dark:bg-[#161F2D] center gap-2"
        >
          <Icon icon="mynaui:arrow-left" className="size-4" />
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4  border border-gray-200 p-5 rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Coupon Code *"
            placeholder="Enter coupon code"
            value={formData.code}
            onValueChange={(value) => handleChange("code", value)}
            error={errors.code}
            className="h-12"
          />

          <Select
            label="Type"
            options={discountTypeOptions}
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
            error={errors.type}
            className="h-12"
          />

          <Input
            label={
              formData.type === "percentage"
                ? "Discount Value (%) *"
                : "Discount Value ($) *"
            }
            type="number"
            placeholder={formData.type === "percentage" ? "10" : "20"}
            value={formData.discountValue}
            onValueChange={(value) => handleChange("discountValue", value)}
            error={errors.discountValue}
            className="h-12"
          />

          <div>
            <MultipleSearchSelect
              label="Applicable Packages"
              placeholder="Select your Packages"
              searchPlaceholder="Search for Packages..."
              options={[
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
              ]}
              startIcon={<LuTag className="h-4 w-4" />}
              fullWidth
              value={formData.applicablePackages}
              onValueChange={(value) =>
                handleChange("applicablePackages", value)
              }
              className="h-12"
            />
          </div>

          <Input
            label="Minimum Order Amount"
            type="number"
            placeholder="0.00"
            value={formData.minOrderAmount}
            onValueChange={(value) => handleChange("minOrderAmount", value)}
            className="h-12"
          />

          <div>
            <Calendar
              label="Expiry Date"
              value={formData.expiresAt}
              onChange={(value) => handleChange("expiresAt", value)}
              minDate={new Date()}
              required
              inputClass="h-12 dark:border-[#475569]"
            />
          </div>

          <Select
            label="Is Public?"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            value={formData.isPublic}
            onValueChange={(value) => handleChange("isPublic", value)}
            className="h-12"
          />

          {!formData.isPublic && (
            <MultipleSearchSelect
              label="Eligible Users"
              placeholder="Select your users"
              searchPlaceholder="Search for user..."
              options={[
                { value: "user1", label: "Arif Shikder" },
                { value: "user2", label: "Moshiur Rahman" },
                { value: "user3", label: "Jannatul Ferdous" },
                { value: "user4", label: "Tariqul Islam" },
                { value: "user5", label: "Sadia Hossain" },
                { value: "user6", label: "Rahim Uddin" },
                { value: "user7", label: "Farhana Akter" },
                { value: "user8", label: "Md. Shahin Alam" },
                { value: "user9", label: "Nusrat Jahan" },
                { value: "user10", label: "Tanvir Hasan" },
              ]}
              startIcon={<LuTag className="h-4 w-4" />}
              fullWidth
              value={formData.eligibleUsers}
              onValueChange={(value) => handleChange("eligibleUsers", value)}
              className="h-12"
            />
          )}

          <Select
            label="Status"
            options={statusOptions}
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
            error={errors.status}
            className="h-12"
          />

          <Textarea
            label="Description"
            placeholder="Enter coupon description"
            value={formData.description}
            onValueChange={(value) => handleChange("description", value)}
          />
          <Input
            label="Usage Limit"
            type="number"
            placeholder="100"
            value={formData.usageLimit}
            onValueChange={(value) => handleChange("usageLimit", value)}
            className="h-12"
          />
        </div>

        <div className="flex justify-end gap-3 ">
          <Button
            type="button"
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary text-white hover:bg-[#47a787]"
          >
            Create Coupon
          </Button>
        </div>
      </form>
    </div>
  );
}
