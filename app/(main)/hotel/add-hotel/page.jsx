"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Textarea } from "@/components/ui/textarea/Textarea";
import { SearchSelect } from "@/components/ui/select/SearchSelect";
import Link from "next/link";

export default function AddHotelPage() {
  const [formData, setFormData] = useState({
    title: "",
    images: [],
    country: "",
    city: "",
    rating: "",
    overview: "",
    highlights: [""],
    goodToKnow: [""],
  });

  const [errors, setErrors] = useState({});

  const countryOptions = [
    { value: "usa", label: "United States" },
    { value: "japan", label: "Japan" },
    { value: "bangladesh", label: "Bangladesh" },
  ];

  const cityOptions = {
    usa: [
      { value: "newyork", label: "New York" },
      { value: "losangeles", label: "Los Angeles" },
    ],
    japan: [
      { value: "tokyo", label: "Tokyo" },
      { value: "osaka", label: "Osaka" },
    ],
    bangladesh: [
      { value: "dhaka", label: "Dhaka" },
      { value: "chittagong", label: "Chittagong" },
    ],
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          {
            file,
            url: imageUrl,
            publicId: `temp_${Date.now()}_${Math.random()}`,
          },
        ],
      }));
    });

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateArrayField = (key, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (key) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeArrayField = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Hotel title is required";
      isValid = false;
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required";
      isValid = false;
    }

    if (!formData.overview.trim()) {
      newErrors.overview = "Overview is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Hotel Data:", formData);
      // You can proceed with API call or navigation here
    } else {
      console.warn("Validation failed");
    }
  };

  return (
    <div className="bg-white dark:bg-[#010611] min-h-screen p-6 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6  ">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Create Hotel
        </h1>
        <Link
          href="/manage-hotel"
          className="text-primary hover:text-gray-800 center gap-2 text-sm"
        >
          <Icon icon="lucide:arrow-left" className="size-5" />
          All Hotels
        </Link>
      </div>

      <div className=" p-6 bg-white dark:bg-[#161F2D] rounded-xl border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotel Title */}
            <Input
              label="Hotel Title"
              placeholder="Enter hotel name"
              value={formData.title}
              onValueChange={(val) => handleInputChange("title", val)}
              requiredSign
              error={errors.title}
            />

            {/* Rating */}
            <Input
              label="Rating (out of 5)"
              type="number"
              placeholder="4.5"
              value={formData.rating}
              onValueChange={(val) => handleInputChange("rating", val)}
              requiredSign
              error={errors.rating}
            />

            {/* Country & City */}

            <SearchSelect
              label="Country"
              options={countryOptions}
              value={formData.country}
              onValueChange={(val) => {
                handleInputChange("country", val);
                handleInputChange("city", "");
              }}
              requiredSign
              error={errors.country}
            />
            <SearchSelect
              label="City"
              options={
                formData.country ? cityOptions[formData.country] || [] : []
              }
              value={formData.city}
              onValueChange={(val) => handleInputChange("city", val)}
              requiredSign
              error={errors.city}
            />

            {/* Highlights */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">
                Hotel Highlights
              </label>
              <div className="space-y-3">
                {formData.highlights.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      placeholder="e.g., Rooftop pool"
                      value={item}
                      onValueChange={(val) =>
                        updateArrayField("highlights", index, val)
                      }
                      fullWidth
                    />
                    {formData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField("highlights", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon icon="lucide:trash-2" className="size-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("highlights")}
                  className="text-sm text-gray-600 hover:text-primary mt-2 flex items-center gap-1"
                >
                  <Icon icon="lucide:plus" className="size-4" />
                  Add Highlight
                </button>
              </div>
            </div>

            {/* Good to Know */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">
                Good to Know
              </label>
              <div className="space-y-3">
                {formData.goodToKnow.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      placeholder="e.g., No pets allowed"
                      value={item}
                      onValueChange={(val) =>
                        updateArrayField("goodToKnow", index, val)
                      }
                      fullWidth
                    />
                    {formData.goodToKnow.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField("goodToKnow", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon icon="lucide:trash-2" className="size-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("goodToKnow")}
                  className="text-sm text-gray-600 hover:text-primary mt-2 flex items-center gap-1"
                >
                  <Icon icon="lucide:plus" className="size-4" />
                  Add Info
                </button>
              </div>
            </div>
          </div>
          {/* Overview */}
          <Textarea
            label="Overview / Description"
            placeholder="Write a short summary of the hotel..."
            value={formData.overview}
            onValueChange={(val) => handleInputChange("overview", val)}
            requiredSign
            error={errors.overview}
            minRows={6}
          />

          {/* Image Upload */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:image" className="size-4 text-primary" />
              <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                Hotel Images
              </h2>
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="hotel-image-upload"
              />
              <label htmlFor="hotel-image-upload" className="cursor-pointer">
                <Icon
                  icon="lucide:image-plus"
                  className="mx-auto h-12 w-12 text-gray-400 mb-3"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Click to upload images or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, up to 10MB each
                </p>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Hotel image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Icon icon="lucide:x" className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.images && (
              <p className="text-xs text-red-500 error-message">
                {errors.images}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <Button type="submit" className="h-10 px-6">
              Submit Hotel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
