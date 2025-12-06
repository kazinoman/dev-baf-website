"use client";

import React, { useState } from "react";
import {
  User,
  Users,
  MapPin,
  FileText,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Calendar,
  Phone,
  Mail,
  Building,
  Globe,
  ShieldCheck,
  Image,
  ClipboardCheck,
  Edit3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function AthleteRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [declaration, setDeclaration] = useState({
    infoAccurate: false,
    termsAccepted: false,
  });
  const [formData, setFormData] = useState({
    general: {
      athleteFullName: "",
      athleteFatherName: "",
      athleteMotherName: "",
      athleteEmail: "",
      athleteContactNo: "",
      athleteDob: "",
      athleteGender: "",
      athleteAlternateContactNo: "",
      instituteId: "",
    },
    identity: {
      identifierType: "",
      identifierNumber: "",
      identifierImages: [],
    },
    bengali: {
      athleteFullNameInBengali: "",
      athleteFatherNameInBengali: "",
      athleteMotherNameInBengali: "",
    },
    addresses: [
      {
        id: 1,
        athleteAddressDistrictId: "",
        athleteAddressSubDistrictId: "",
        athleteAddressPostalCode: "",
        athleteAddressArea: "",
        athleteAddressType: "present",
      },
    ],
    documents: [
      {
        id: 1,
        athleteDocName: "",
        athleteDocRelatedId: "",
        athleteDocPhysicalPathUrl: "",
        docCategoryId: "",
      },
    ],
  });

  const steps = [
    { id: 0, title: "Personal Info", icon: User },
    { id: 1, title: "Identity", icon: ShieldCheck },
    { id: 2, title: "Bengali Details", icon: Globe },
    { id: 3, title: "Addresses", icon: MapPin },
    { id: 4, title: "Documents", icon: FileText },
    { id: 5, title: "Review", icon: ClipboardCheck },
  ];

  const identifierTypes = [
    { id: "nid", value: "National ID (NID)", placeholder: "Enter 10 or 17 digit NID number" },
    { id: "passport", value: "Passport", placeholder: "Enter passport number" },
    { id: "driving_license", value: "Driving License", placeholder: "Enter driving license number" },
    { id: "birth_certificate", value: "Birth Certificate", placeholder: "Enter 17 digit birth certificate number" },
  ];

  const districts = [
    { id: 1, value: "Dhaka" },
    { id: 2, value: "Chittagong" },
    { id: 3, value: "Rajshahi" },
    { id: 4, value: "Khulna" },
    { id: 5, value: "Sylhet" },
  ];

  const subDistricts = [
    { id: 1, value: "Mirpur" },
    { id: 2, value: "Gulshan" },
    { id: 3, value: "Dhanmondi" },
    { id: 4, value: "Uttara" },
  ];

  const institutes = [
    { id: 1, value: "National Sports Academy" },
    { id: 2, value: "Bangladesh Sports Institute" },
    { id: 3, value: "Olympic Training Center" },
  ];

  const docCategories = [
    { id: 1, value: "National ID" },
    { id: 2, value: "Birth Certificate" },
    { id: 3, value: "Passport" },
    { id: 4, value: "Educational Certificate" },
    { id: 5, value: "Sports Certificate" },
  ];

  const addressTypes = [
    { id: "present", value: "Present Address" },
    { id: "permanent", value: "Permanent Address" },
  ];

  const genderOptions = [
    { id: "male", value: "Male" },
    { id: "female", value: "Female" },
    { id: "other", value: "Other" },
  ];

  const getOptionName = (options, id) => {
    const option = options.find((o) => o.id == id);
    return option?.name || "—";
  };

  const updateGeneral = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: value },
    }));
  };

  const updateIdentity = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      identity: { ...prev.identity, [field]: value },
    }));
  };

  const addIdentityImage = (file) => {
    if (file) {
      const newImage = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
      };
      setFormData((prev: any) => ({
        ...prev,
        identity: {
          ...prev.identity,
          identifierImages: [...prev.identity.identifierImages, newImage],
        },
      }));
    }
  };

  const removeIdentityImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      identity: {
        ...prev.identity,
        identifierImages: prev.identity.identifierImages.filter((img: any) => img.id !== imageId),
      },
    }));
  };

  const updateBengali = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      bengali: { ...prev.bengali, [field]: value },
    }));
  };

  const updateAddress = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr)),
    }));
  };

  const addAddress = () => {
    const newId = Math.max(...formData.addresses.map((a) => a.id)) + 1;
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          id: newId,
          athleteAddressDistrictId: "",
          athleteAddressSubDistrictId: "",
          athleteAddressPostalCode: "",
          athleteAddressArea: "",
          athleteAddressType: "present",
        },
      ],
    }));
  };

  const removeAddress = (id) => {
    if (formData.addresses.length > 1) {
      setFormData((prev) => ({
        ...prev,
        addresses: prev.addresses.filter((addr) => addr.id !== id),
      }));
    }
  };

  const updateDocument = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc)),
    }));
  };

  const addDocument = () => {
    const newId = Math.max(...formData.documents.map((d) => d.id)) + 1;
    setFormData((prev) => ({
      ...prev,
      documents: [
        ...prev.documents,
        {
          id: newId,
          athleteDocName: "",
          athleteDocRelatedId: "",
          athleteDocPhysicalPathUrl: "",
          docCategoryId: "",
        },
      ],
    }));
  };

  const removeDocument = (id) => {
    if (formData.documents.length > 1) {
      setFormData((prev) => ({
        ...prev,
        documents: prev.documents.filter((doc) => doc.id !== id),
      }));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const canSubmit = declaration.infoAccurate && declaration.termsAccepted;

  const InputField = ({
    label,
    icon: Icon,
    type = "text",
    value,
    onChange,
    placeholder,
    required,
    disabled,
  }: {
    label: string;
    icon?: React.ElementType;
    type?: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed`}
        />
      </div>
    </div>
  );

  const SelectField = ({
    label,
    icon: Icon,
    value,
    onChange,
    options,
    placeholder,
    required,
  }: {
    label: string;
    icon?: React.ElementType;
    value: string;
    onChange: (val: string) => void;
    options: { id: string | number; value: string }[];
    placeholder?: string;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.value}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronRight size={18} className="rotate-90" />
        </div>
      </div>
    </div>
  );

  const TextAreaField = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
      />
    </div>
  );

  const ReviewItem = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 mt-1 sm:mt-0">{value || "—"}</span>
    </div>
  );

  const ReviewSection = ({ title, icon: Icon, color, stepIndex, children }) => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className={`flex items-center justify-between px-5 py-4 bg-${color}-50 border-b border-${color}-100`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${color}-100 rounded-lg`}>
            <Icon className={`text-${color}-600`} size={18} />
          </div>
          <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        <button
          onClick={() => setCurrentStep(stepIndex)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Edit3 size={14} />
          Edit
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <User className="text-emerald-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
          <p className="text-sm text-slate-500">Basic details about the athlete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <InputField
            disabled={false}
            label="Full Name"
            icon={User}
            value={formData.general.athleteFullName}
            onChange={(v) => updateGeneral("athleteFullName", v)}
            placeholder="Enter athlete's full name"
            required
          />
        </div>
        <InputField
          label="Father's Name"
          icon={Users}
          value={formData.general.athleteFatherName}
          onChange={(v) => updateGeneral("athleteFatherName", v)}
          placeholder="Enter father's name"
        />
        <InputField
          label="Mother's Name"
          icon={Users}
          value={formData.general.athleteMotherName}
          onChange={(v) => updateGeneral("athleteMotherName", v)}
          placeholder="Enter mother's name"
        />
        <InputField
          label="Email Address"
          icon={Mail}
          type="email"
          value={formData.general.athleteEmail}
          onChange={(v) => updateGeneral("athleteEmail", v)}
          placeholder="athlete@example.com"
          required
        />
        <InputField
          label="Contact Number"
          icon={Phone}
          type="tel"
          value={formData.general.athleteContactNo}
          onChange={(v) => updateGeneral("athleteContactNo", v)}
          placeholder="+880 1XXX-XXXXXX"
          required
        />
        <InputField
          label="Alternate Contact"
          icon={Phone}
          type="tel"
          value={formData.general.athleteAlternateContactNo}
          onChange={(v) => updateGeneral("athleteAlternateContactNo", v)}
          placeholder="+880 1XXX-XXXXXX"
        />
        <InputField
          label="Date of Birth"
          icon={Calendar}
          type="date"
          value={formData.general.athleteDob}
          onChange={(v) => updateGeneral("athleteDob", v)}
          required
        />
        <SelectField
          label="Gender"
          value={formData.general.athleteGender}
          onChange={(v) => updateGeneral("athleteGender", v)}
          options={genderOptions}
          placeholder="Select gender"
          required
        />
        <div className="md:col-span-2">
          <SelectField
            label="Institute"
            icon={Building}
            value={formData.general.instituteId}
            onChange={(v) => updateGeneral("instituteId", v)}
            options={institutes}
            placeholder="Select institute"
          />
        </div>
      </div>
    </div>
  );

  const renderIdentityVerification = () => {
    const selectedType = identifierTypes.find((t) => t.id === formData.identity.identifierType);

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <ShieldCheck className="text-cyan-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Identity Verification</h3>
            <p className="text-sm text-slate-500">Select your primary identification document</p>
          </div>
        </div>

        <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
          <p className="text-sm text-cyan-700">
            Please select one primary identification document and upload clear images of both front and back sides (if
            applicable).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Identifier Type"
            icon={ShieldCheck}
            value={formData.identity.identifierType}
            onChange={(v) => {
              updateIdentity("identifierType", v);
              updateIdentity("identifierNumber", "");
            }}
            options={identifierTypes}
            placeholder="Select identifier type"
            required
          />
          <InputField
            label="ID Number"
            value={formData.identity.identifierNumber}
            onChange={(v) => updateIdentity("identifierNumber", v)}
            placeholder={selectedType?.placeholder || "First select an identifier type"}
            required
            disabled={!formData.identity.identifierType}
          />
        </div>

        {formData.identity.identifierType && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <ShieldCheck className="text-cyan-500" size={18} />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">{selectedType?.value}</h4>
                <p className="text-sm text-slate-500 mt-1">
                  {formData.identity.identifierType === "nid" &&
                    "Upload front and back images of your National ID card."}
                  {formData.identity.identifierType === "passport" && "Upload the bio-data page of your passport."}
                  {formData.identity.identifierType === "driving_license" &&
                    "Upload front and back images of your driving license."}
                  {formData.identity.identifierType === "birth_certificate" &&
                    "Upload a clear image of your birth certificate."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Upload Document Images <span className="text-rose-500">*</span>
          </label>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e: any) => {
                Array.from(e.target.files).forEach((file) => addIdentityImage(file));
                e.target.value = "";
              }}
            />
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-cyan-400 hover:bg-cyan-50/30 transition-all duration-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-100 rounded-xl mb-4">
                <Upload className="text-cyan-600" size={24} />
              </div>
              <p className="text-slate-700 font-medium">Drop images here or click to upload</p>
              <p className="text-sm text-slate-400 mt-1">Supports: JPG, PNG, WEBP (Max 5MB each)</p>
            </div>
          </div>

          {formData.identity.identifierImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Uploaded Images ({formData.identity.identifierImages.length})
                </span>
                <button
                  onClick={() => updateIdentity("identifierImages", [])}
                  className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.identity.identifierImages.map((image: any, index) => (
                  <div key={image?.id} className="relative group">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={image.preview} alt={`Document ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button
                        onClick={() => removeIdentityImage(image.id)}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                      >
                        <Trash2 size={18} className="text-rose-500" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded-md">
                      <span className="text-xs text-white font-medium">{index + 1}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-slate-600 truncate">{image.name}</p>
                      <p className="text-xs text-slate-400">{formatFileSize(image.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <Image size={14} className="text-slate-500" />
              <span className="text-xs text-slate-600">Clear & Readable</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <Image size={14} className="text-slate-500" />
              <span className="text-xs text-slate-600">All corners visible</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <Image size={14} className="text-slate-500" />
              <span className="text-xs text-slate-600">No glare or shadows</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBengaliDetails = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Globe className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">বাংলায় তথ্য</h3>
          <p className="text-sm text-slate-500">Information in Bengali language</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
        <p className="text-sm text-blue-700">
          Please enter the following information in Bengali (বাংলা) for official documentation purposes.
        </p>
      </div>

      <div className="space-y-6">
        <InputField
          label="পূর্ণ নাম (Full Name in Bengali)"
          value={formData.bengali.athleteFullNameInBengali}
          onChange={(v) => updateBengali("athleteFullNameInBengali", v)}
          placeholder="বাংলায় পূর্ণ নাম লিখুন"
        />
        <InputField
          label="পিতার নাম (Father's Name in Bengali)"
          value={formData.bengali.athleteFatherNameInBengali}
          onChange={(v) => updateBengali("athleteFatherNameInBengali", v)}
          placeholder="বাংলায় পিতার নাম লিখুন"
        />
        <InputField
          label="মাতার নাম (Mother's Name in Bengali)"
          value={formData.bengali.athleteMotherNameInBengali}
          onChange={(v) => updateBengali("athleteMotherNameInBengali", v)}
          placeholder="বাংলায় মাতার নাম লিখুন"
        />
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <MapPin className="text-amber-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Addresses</h3>
            <p className="text-sm text-slate-500">Present and permanent address details</p>
          </div>
        </div>
        <button
          onClick={addAddress}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="space-y-6">
        {formData.addresses.map((address, index) => (
          <div key={address.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center bg-slate-200 text-slate-600 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                <span className="font-medium text-slate-700">Address {index + 1}</span>
              </div>
              {formData.addresses.length > 1 && (
                <button
                  onClick={() => removeAddress(address.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField
                label="Address Type"
                value={address.athleteAddressType}
                onChange={(v) => updateAddress(address.id, "athleteAddressType", v)}
                options={addressTypes}
                placeholder="Select type"
                required
              />
              <SelectField
                label="District"
                value={address.athleteAddressDistrictId}
                onChange={(v) => updateAddress(address.id, "athleteAddressDistrictId", v)}
                options={districts}
                placeholder="Select district"
                required
              />
              <SelectField
                label="Sub-District / Upazila"
                value={address.athleteAddressSubDistrictId}
                onChange={(v) => updateAddress(address.id, "athleteAddressSubDistrictId", v)}
                options={subDistricts}
                placeholder="Select sub-district"
              />
              <InputField
                label="Postal Code"
                type="number"
                value={address.athleteAddressPostalCode}
                onChange={(v) => updateAddress(address.id, "athleteAddressPostalCode", v)}
                placeholder="e.g., 1205"
              />
              <div className="md:col-span-2">
                <TextAreaField
                  label="Area / Street Address"
                  value={address.athleteAddressArea}
                  onChange={(v) => updateAddress(address.id, "athleteAddressArea", v)}
                  placeholder="Enter detailed address (House no., Road, Area)"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 rounded-lg">
            <FileText className="text-violet-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Supporting Documents</h3>
            <p className="text-sm text-slate-500">Upload additional certificates and documents</p>
          </div>
        </div>
        <button
          onClick={addDocument}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Document
        </button>
      </div>

      <div className="space-y-6">
        {formData.documents.map((doc, index) => (
          <div key={doc.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center bg-slate-200 text-slate-600 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                <span className="font-medium text-slate-700">Document {index + 1}</span>
              </div>
              {formData.documents.length > 1 && (
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField
                label="Document Category"
                value={doc.docCategoryId}
                onChange={(v) => updateDocument(doc.id, "docCategoryId", v)}
                options={docCategories}
                placeholder="Select category"
                required
              />
              <InputField
                label="Document Name"
                value={doc.athleteDocName}
                onChange={(v) => updateDocument(doc.id, "athleteDocName", v)}
                placeholder="e.g., SSC Certificate"
              />
              <InputField
                label="Document ID / Number"
                value={doc.athleteDocRelatedId}
                onChange={(v) => updateDocument(doc.id, "athleteDocRelatedId", v)}
                placeholder="e.g., Certificate number"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Upload Document</label>
                <div className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e: any) => {
                      const file = e.target.files[0];
                      if (file) {
                        updateDocument(doc.id, "athleteDocPhysicalPathUrl", file.name);
                      }
                    }}
                  />
                  <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-dashed border-slate-200 rounded-xl hover:border-violet-400 transition-colors cursor-pointer">
                    <Upload size={20} className="text-slate-400" />
                    <span className="text-sm text-slate-500 truncate">
                      {doc.athleteDocPhysicalPathUrl || "Choose file or drag & drop"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviewAndDeclaration = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <ClipboardCheck className="text-indigo-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Review & Declaration</h3>
          <p className="text-sm text-slate-500">Please review your information before submitting</p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
        <AlertCircle className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
        <div>
          <p className="text-sm font-medium text-amber-800">Please review all information carefully</p>
          <p className="text-sm text-amber-700 mt-1">
            Make sure all the details are correct before submitting. You can click "Edit" on any section to make
            changes.
          </p>
        </div>
      </div>

      {/* Review Sections */}
      <div className="space-y-5">
        {/* Personal Information */}
        <ReviewSection title="Personal Information" icon={User} color="emerald" stepIndex={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <ReviewItem label="Full Name" value={formData.general.athleteFullName} />
            <ReviewItem label="Father's Name" value={formData.general.athleteFatherName} />
            <ReviewItem label="Mother's Name" value={formData.general.athleteMotherName} />
            <ReviewItem label="Email" value={formData.general.athleteEmail} />
            <ReviewItem label="Contact Number" value={formData.general.athleteContactNo} />
            <ReviewItem label="Alternate Contact" value={formData.general.athleteAlternateContactNo} />
            <ReviewItem label="Date of Birth" value={formatDate(formData.general.athleteDob)} />
            <ReviewItem label="Gender" value={getOptionName(genderOptions, formData.general.athleteGender)} />
            <ReviewItem label="Institute" value={getOptionName(institutes, formData.general.instituteId)} />
          </div>
        </ReviewSection>

        {/* Identity Verification */}
        <ReviewSection title="Identity Verification" icon={ShieldCheck} color="cyan" stepIndex={1}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <ReviewItem
                label="Identifier Type"
                value={getOptionName(identifierTypes, formData.identity.identifierType)}
              />
              <ReviewItem label="ID Number" value={formData.identity.identifierNumber} />
            </div>
            {formData.identity.identifierImages.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-3">
                  Uploaded Documents ({formData.identity.identifierImages.length})
                </p>
                <div className="flex flex-wrap gap-3">
                  {formData.identity.identifierImages.map((img: any, idx) => (
                    <div
                      key={img.id}
                      className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200"
                    >
                      <img src={img.preview} alt={`Doc ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Bengali Details */}
        <ReviewSection title="বাংলায় তথ্য (Bengali Details)" icon={Globe} color="blue" stepIndex={2}>
          <div className="grid grid-cols-1 gap-x-8">
            <ReviewItem label="পূর্ণ নাম (Full Name)" value={formData.bengali.athleteFullNameInBengali} />
            <ReviewItem label="পিতার নাম (Father's Name)" value={formData.bengali.athleteFatherNameInBengali} />
            <ReviewItem label="মাতার নাম (Mother's Name)" value={formData.bengali.athleteMotherNameInBengali} />
          </div>
        </ReviewSection>

        {/* Addresses */}
        <ReviewSection title="Addresses" icon={MapPin} color="amber" stepIndex={3}>
          <div className="space-y-4">
            {formData.addresses.map((addr, idx) => (
              <div key={addr.id} className={idx > 0 ? "pt-4 border-t border-slate-100" : ""}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full text-xs font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {getOptionName(addressTypes, addr.athleteAddressType)}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pl-8">
                  <ReviewItem label="District" value={getOptionName(districts, addr.athleteAddressDistrictId)} />
                  <ReviewItem
                    label="Sub-District"
                    value={getOptionName(subDistricts, addr.athleteAddressSubDistrictId)}
                  />
                  <ReviewItem label="Postal Code" value={addr.athleteAddressPostalCode} />
                  <ReviewItem label="Area" value={addr.athleteAddressArea} />
                </div>
              </div>
            ))}
          </div>
        </ReviewSection>

        {/* Documents */}
        <ReviewSection title="Supporting Documents" icon={FileText} color="violet" stepIndex={4}>
          <div className="space-y-4">
            {formData.documents.map((doc, idx) => (
              <div key={doc.id} className={idx > 0 ? "pt-4 border-t border-slate-100" : ""}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-violet-100 text-violet-600 rounded-full text-xs font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {doc.athleteDocName || `Document ${idx + 1}`}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pl-8">
                  <ReviewItem label="Category" value={getOptionName(docCategories, doc.docCategoryId)} />
                  <ReviewItem label="Document ID" value={doc.athleteDocRelatedId} />
                  <ReviewItem label="File" value={doc.athleteDocPhysicalPathUrl} />
                </div>
              </div>
            ))}
          </div>
        </ReviewSection>
      </div>

      {/* Declaration Section */}
      <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <CheckCircle2 className="text-indigo-600" size={20} />
          </div>
          <h4 className="font-semibold text-slate-800">Declaration & Consent</h4>
        </div>

        <div className="space-y-4">
          {/* Declaration 1 */}
          <label className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-emerald-300 transition-colors">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={declaration.infoAccurate}
                onChange={(e) => setDeclaration((prev) => ({ ...prev, infoAccurate: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all">
                {declaration.infoAccurate && <Check size={14} className="text-white m-auto" />}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                I confirm that all information provided is accurate and truthful
              </p>
              <p className="text-xs text-slate-500 mt-1">
                I hereby declare that all the information provided in this registration form is true, complete, and
                accurate to the best of my knowledge. I understand that providing false information may result in
                disqualification.
              </p>
            </div>
          </label>

          {/* Declaration 2 */}
          <label className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-emerald-300 transition-colors">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={declaration.termsAccepted}
                onChange={(e) => setDeclaration((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all">
                {declaration.termsAccepted && <Check size={14} className="text-white m-auto" />}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">I accept the terms and conditions</p>
              <p className="text-xs text-slate-500 mt-1">
                I agree to the{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  privacy policy
                </a>
                . I consent to the collection and processing of my personal data for athlete registration and related
                purposes.
              </p>
            </div>
          </label>
        </div>

        {!canSubmit && (
          <div className="mt-4 flex items-center gap-2 text-amber-600">
            <AlertCircle size={16} />
            <p className="text-sm">Please accept both declarations to proceed with submission</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderIdentityVerification();
      case 2:
        return renderBengaliDetails();
      case 3:
        return renderAddresses();
      case 4:
        return renderDocuments();
      case 5:
        return renderReviewAndDeclaration();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 mb-4">
            <User className="text-white" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Athlete Registration</h1>
          <p className="text-slate-500 mt-2">Complete all sections to register a new athlete</p>
        </div>

        {/* Stepper */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center justify-between relative min-w-[600px]">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className="relative flex flex-col items-center group"
                >
                  <div
                    className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 
                    ${
                      isCompleted
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                        : isActive
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110"
                        : "bg-white text-slate-400 border-2 border-slate-200 group-hover:border-emerald-300"
                    }
                  `}
                  >
                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <span
                    className={`
                    mt-2 text-xs font-medium transition-colors whitespace-nowrap
                    ${isActive || isCompleted ? "text-emerald-600" : "text-slate-400"}
                  `}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 mb-6">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
              ${
                currentStep === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }
            `}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => {
                if (canSubmit) {
                  alert(
                    "🎉 Registration submitted successfully!\n\nThank you for registering. Your application is now under review."
                  );
                }
              }}
              disabled={!canSubmit}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all
                ${
                  canSubmit
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-200"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              <Check size={18} />
              Submit Registration
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              Next Step
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-8">
          All fields marked with <span className="text-rose-500">*</span> are required
        </p>
      </div>
    </div>
  );
}
