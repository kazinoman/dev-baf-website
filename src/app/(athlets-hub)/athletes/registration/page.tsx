"use client";

import { useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormSetValue,
  Control,
  useFieldArray,
} from "react-hook-form";
import { motion } from "framer-motion";
import TwoStepDistrictSelect from "@/components/ui/TwoStepSearchableSelect";
import ImageUploadField from "@/components/ui/ImageUploadField";
import { BookText, FileChartLine, Globe, ListMinus, MapPin, ShieldCheck, User } from "lucide-react";
import DocumentForm from "@/components/ui/documentForm";

// ================= Type ===================

export interface AthleteFormDto {
  AthleteGenData?: AthleteGeneralDto;
  identifierVerification: IdentifierVerification,
  AthleteCoreDataInBengali?: AthleteCoreDataInBengaliDto;
  AthleteAddresses?: AthleteAddressDto[];
  AthleteDocuments?: AthleteDocumentDto[];

  address: string;
  city: string;
  postalCode: string;
  nidFile: FileList;
  photo: FileList;
  permanentDistrict: string;
  AthleteDocPhysicalPathUrl: FileList | null;
}

export interface AthleteGeneralDto {
  AthleteFullName?: string;
  AthleteFatherName?: string;
  AthleteMotherName?: string;
  AthleteEmail?: string;
  AthleteContactNo?: string;
  AthleteDob?: string;
  AthleteGender?: string;
  AthleteAlternateContactNo?: string;
  InstituteId?: number;
}

export interface AthleteCoreDataInBengaliDto {
  AthleteFullNameInBengali?: string;
  AthleteFatherNameInBengali?: string;
  AthleteMotherNameInBengali?: string;
}

export interface AthleteDocumentDto {
  AthleteDocName?: string;
  AthleteDocRelatedId?: string;
  AthleteDocPhysicalPathUrl?: string;
  DocCategoryId?: number | null;
}

export interface AthleteAddressDto {
  AthleteAddressDistrictId?: number;
  AthleteAddressSubDistrictId?: number;
  AthleteAddressPostalCode?: number;
  AthleteAddressArea?: string;
  AthleteAddressType?: number;
}

interface IdentifierVerification {
  identifierType: number;
  idNumber: number;
  identifierDocumentImages: File[] | string[]
}

// ============== Type form ===========
type FormData = {
  phone: string;
  dob: string;
  gender: "male" | "female";
  nid: string;
  address: string;
  city: string;
  postalCode: string;
  nidFile: FileList;
  photo: FileList;
};

const DISTRICTS = [
  { id: 1, name: "Bagerhat" },
  { id: 2, name: "Bandarban" },
  { id: 3, name: "Dhaka" },
  { id: 4, name: "Chattogram" },
  { id: 5, name: "Rajshahi" },
  { id: 6, name: "Khulna" },
  { id: 7, name: "Sylhet" },
  { id: 8, name: "Rangpur" },
];

interface TDocuments {
  AthleteDocName: string;
  AthleteDocRelatedId: string;
  AthleteDocPhysicalPathUrl: File | null;
  DocCategoryId: 1;
}

const tabledata = [
  { id: 1, name: "Milon Ahmed", age: 24, country: "Bangladesh" },
  { id: 2, name: "John Doe", age: 28, country: "USA" },
  { id: 3, name: "Jane Smith", age: 22, country: "UK" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Doc Name" },
  { key: "age", label: "Doc Related" },
  { key: "country", label: "Doc Category" },
  { key: "actions", label: "Actions" },
];

export default function MultiStepForm() {
  const [step3Error, setStep3Error] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<number>(1);
  const [presentAddressArea, setPresentAddressArea] = useState<string>("");
  const [permanentAddressArea, setpermanentAddressArea] = useState("");
  const [presendPostalCode, setPresendPostalCode] = useState("");
  const [permanentPostalCode, setpermanentPostalCode] = useState("");
  const [error, setError] = useState("");
  const [presentDistrict, setpresentDistrict] = useState<number>(0);
  const [permanentDistrict, setpermanentDistrict] = useState<number>(0);
  const [presentSubDistrict, setpresentSubDistrict] = useState<number>(0);
  const [permanentSubDistrict, setPermanentSubDistrict] = useState<number>(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isSubmitted },
    setValue,
    control,
    watch,
    reset,
  } = useForm<AthleteFormDto>({
    // mode: "onTouched",
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    // shouldUnregister: true,
    defaultValues: {
      AthleteDocuments: [
        { AthleteDocName: "", AthleteDocRelatedId: "", DocCategoryId: null },
      ],
    },
  });
  const [documentsArray, setDocumentsArray] = useState<TDocuments[]>([]);

  const handleAddDocument = () => {
    // Get values from your form
    const docName = watch("AthleteDocuments.0.AthleteDocName");
    const docRelatedId = watch("AthleteDocuments.0.AthleteDocRelatedId");
    const docCategory = watch("AthleteDocuments.0.DocCategoryId");
    // const docFile = watch("AthleteDocuments.0.AthleteDocPhysicalPathUrl");
    const docFile = watch("AthleteDocPhysicalPathUrl");
    const file = docFile?.[0];

    console.log({ docFile, file });

    if (!docFile || docFile.length === 0) return;

    const newDoc = {
      AthleteDocName: docName,
      AthleteDocRelatedId: docRelatedId,
      DocCategoryId: Number(docCategory),
      AthleteDocPhysicalPathUrl: file,
    };

    // console.log({newDoc})

    setDocumentsArray([...documentsArray, newDoc as unknown as TDocuments]);

    // Clear input fields for next document
    setValue("AthleteDocuments.0.AthleteDocName", "");
    setValue("AthleteDocuments.0.AthleteDocRelatedId", "");
    setValue("AthleteDocuments.0.DocCategoryId", 1);
    setValue("AthleteDocPhysicalPathUrl", null);

    // Reset the actual file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger([
        "AthleteGenData.AthleteFullName",
        "AthleteGenData.AthleteFatherName",
        "AthleteGenData.AthleteMotherName",
        "AthleteGenData.AthleteContactNo",
        "AthleteGenData.AthleteEmail",
        "AthleteGenData.AthleteDob",
        "AthleteGenData.AthleteGender",
        "AthleteGenData.AthleteAlternateContactNo",
        "AthleteGenData.InstituteId",
        // "AthleteCoreDataInBengali.AthleteFullNameInBengali",
        // "AthleteCoreDataInBengali.AthleteFatherNameInBengali",
        // "AthleteCoreDataInBengali.AthleteMotherNameInBengali",
      ]);
    }

    if(step === 2) {
      valid = await trigger([])
    }

    if (step === 3) {
      valid = await trigger([
         "AthleteCoreDataInBengali.AthleteFullNameInBengali",
        "AthleteCoreDataInBengali.AthleteFatherNameInBengali",
        "AthleteCoreDataInBengali.AthleteMotherNameInBengali",
      ]);
    }

    if(step === 4) {
      valid = true
    }

    if (step === 5) {
      const isValid = await trigger([
        "AthleteDocuments.0.AthleteDocName",
        "AthleteDocuments.0.AthleteDocRelatedId",
        "AthleteDocuments.0.DocCategoryId",
      ]);

      setStep3Error(!isValid);
      if (!isValid) return;
    }

    if (valid) setStep((prev) => prev + 1);
  };



  const prevStep = () => setStep((prev) => prev - 1);



  const onSubmit: SubmitHandler<AthleteFormDto> = (data) => {
    const finalData = {
      ...data,
      // nidFile,
      // photo: photoFile,
    };

    // console.log("Data:", data);

    const newDoc = {
      AthleteDocName: data?.AthleteDocuments?.[0]?.AthleteDocName,
      AthleteDocRelatedId: data?.AthleteDocuments?.[0]?.AthleteDocRelatedId,
      DocCategoryId: Number(data?.AthleteDocuments?.[0]?.DocCategoryId),
      AthleteDocPhysicalPathUrl: data.AthleteDocPhysicalPathUrl?.[0],
    };

    const updatedDocs = [...documentsArray, newDoc as TDocuments];

    const athleteForm = {
      athleteGenData: {
        athleteFullName: data.AthleteGenData?.AthleteFullName,
        athleteFatherName: data.AthleteGenData?.AthleteFatherName,
        athleteMotherName: data.AthleteGenData?.AthleteMotherName,
        athleteEmail: data.AthleteGenData?.AthleteEmail,
        athleteContactNo: data?.AthleteGenData?.AthleteContactNo,
        athleteDob: data.AthleteGenData?.AthleteDob,
        athleteGender: data?.AthleteGenData?.AthleteGender,
        athleteAlternateContactNo:
          data.AthleteGenData?.AthleteAlternateContactNo,
        instituteId: data.AthleteGenData?.InstituteId,
      },
      athleteCoreDataInBengali: {
        athleteFullNameInBengali:
          data.AthleteCoreDataInBengali?.AthleteFullNameInBengali,
        athleteFatherNameInBengali:
          data.AthleteCoreDataInBengali?.AthleteFatherNameInBengali,
        athleteMotherNameInBengali:
          data.AthleteCoreDataInBengali?.AthleteMotherNameInBengali,
      },
      athleteAddresses: [
        {
          athleteAddressDistrictId: presentDistrict,
          athleteAddressSubDistrictId: presentSubDistrict,
          athleteAddressPostalCode: Number(presendPostalCode),
          athleteAddressArea: presentAddressArea,
          athleteAddressType: 1,
        },
        {
          athleteAddressDistrictId: permanentDistrict,
          athleteAddressSubDistrictId: permanentSubDistrict,
          athleteAddressPostalCode: Number(permanentPostalCode),
          athleteAddressArea: permanentAddressArea,
          athleteAddressType: 1,
        },
      ],
      athleteDocuments: updatedDocs,
      identifierVerification: {
        identifierType: Number(data?.identifierVerification.identifierType),
        idNumber: data?.identifierVerification?.idNumber
      }
    };

    console.log("Final Submitted:", athleteForm);
    // console.log("Final Submitted Data:", finalData);

    // console.log({
    //   presentDistrict,
    //   presentSubDistrict,
    //   presendPostalCode,
    //   presentAddressArea,
    //   permanentDistrict,
    //   permanentSubDistrict,
    //   permanentPostalCode,
    //   permanentAddressArea,
    // });

    setDocumentsArray(updatedDocs);

    //  Form reset
    // reset();
  };

  const handleChangePresendPostalCode = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPresendPostalCode(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  const handleChangePermanentPostalCode = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setpermanentPostalCode(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  // Address area
  const handleChangepresendAddressArea = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPresentAddressArea(e.target.value);
  };
  const handleChangepermanentAddressArea = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setpermanentAddressArea(e.target.value);
  };

  const handleSelectdata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setpermanentDistrict(presentDistrict);
      setPermanentSubDistrict(presentSubDistrict);
      setpermanentPostalCode(presendPostalCode);
      setpermanentAddressArea(presentAddressArea);
    } else {
      setpermanentDistrict(0);
      setPermanentSubDistrict(0);
      setpermanentPostalCode("");
      setpermanentAddressArea("");
    }
  };

  //  console.log({documentsArray})

  return (
    <div className="min-h-screen p-6 pt-40 bg-white grid grid-cols-12 ">
 
      <div className="col-span-4 flex justify-center items-center">
        <h1>Content</h1>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-lg p-8 col-span-8">
        {/* Steps Header */}
        <div className="flex justify-between mb-10">
          {[
            { id: 1, label: "Information", icon: <User /> },
            { id: 2, label: "Identifier", icon: <ShieldCheck /> },
             
            { id: 3, label: "বাংলায় তথ্য", icon: <Globe />},
            { id: 4, label: "Address", icon: <MapPin /> },
            { id: 5, label: "Documents", icon: <BookText /> },
          ].map((item) => (
            <div key={item.id} className="flex flex-col items-center w-full">
              <div
                onClick={() => setStep(item.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold border-2 ${
                  step === item.id
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {item.icon}
                
              </div>
              <span
                className={`mt-2 text-sm ${
                  step === item.id ? "text-green-600" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* STEP 1 - PERSONAL INFO */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium">
                    Full Name
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register("AthleteGenData.AthleteFullName", {
                      required: "Full Name is required",
                    })}
                    placeholder="Enter Full Name"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />
                  {errors.AthleteGenData?.AthleteFullName && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteFullName.message}
                    </p>
                  )}
                </div>

                {/* Bangla Athlete Name  */}

                {/* <div>
                  <label className="block text-sm font-medium">
                    ক্রীড়াবিদ পূর্ণ নাম (বাংলায়)
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register(
                      "AthleteCoreDataInBengali.AthleteFullNameInBengali",
                      { required: "বাংলায় পূর্ণ নাম আবশ্যক" }
                    )}
                    placeholder="পূর্ণ নাম লিখুন (বাংলায়)"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />

                  {errors.AthleteCoreDataInBengali
                    ?.AthleteFullNameInBengali && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteCoreDataInBengali
                          ?.AthleteFullNameInBengali?.message
                      }
                    </p>
                  )}
                </div> */}

                {/* Father Name  */}
                <div>
                  <label className="block text-sm font-medium">
                    Father Name
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register("AthleteGenData.AthleteFatherName", {
                      required: "Father Name is required",
                    })}
                    placeholder="Enter Father Name"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />
                  {errors.AthleteGenData?.AthleteFatherName && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteFatherName.message}
                    </p>
                  )}
                </div>

                {/* Father Name Bangali  */}
                {/* <div>
                  <label className="block text-sm font-medium">
                    পিতার নাম নাম (বাংলায়)
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register(
                      "AthleteCoreDataInBengali.AthleteFatherNameInBengali",
                      { required: "পিতার নাম আবশ্যক" }
                    )}
                    placeholder="পিতার নাম লিখুন (বাংলায়)"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />

                  {errors.AthleteCoreDataInBengali
                    ?.AthleteFatherNameInBengali && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteCoreDataInBengali
                          ?.AthleteFatherNameInBengali?.message
                      }
                    </p>
                  )}
                </div> */}

                {/* Mother Name  English */}
                <div>
                  <label className="block text-sm font-medium">
                    Mother Name
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register("AthleteGenData.AthleteMotherName", {
                      required: "Mother Name is required",
                    })}
                    placeholder="Enter Mother Name"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />
                  {errors.AthleteGenData?.AthleteMotherName && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteMotherName.message}
                    </p>
                  )}
                </div>

                {/* Mother Name Bangali  */}
                {/* <div>
                  <label className="block text-sm font-medium">
                    মাতার নাম (বাংলায়)
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register(
                      "AthleteCoreDataInBengali.AthleteMotherNameInBengali",
                      { required: "মাতার নাম আবশ্যক" }
                    )}
                    placeholder="মাতার নাম লিখুন (বাংলায়)"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />

                  {errors.AthleteCoreDataInBengali
                    ?.AthleteMotherNameInBengali && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteCoreDataInBengali
                          ?.AthleteMotherNameInBengali?.message
                      }
                    </p>
                  )}
                </div> */}

                {/* Email   */}
                <div>
                  <label className="block text-sm font-medium">
                    Email
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    type="email"
                    {...register("AthleteGenData.AthleteEmail", {
                      required: "Email is required",
                    })}
                    placeholder="Enter Email"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {errors.AthleteGenData?.AthleteEmail && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteEmail.message}
                    </p>
                  )}
                </div>

                {/* Contact No. */}
                <div>
                  <label className="block text-sm font-medium">
                    Contact No
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register("AthleteGenData.AthleteContactNo", {
                      required: "Contact Number is required",
                    })}
                    placeholder="Enter Contact No"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {errors.AthleteGenData?.AthleteContactNo && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteContactNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Date of Birth
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    type="date"
                    {...register("AthleteGenData.AthleteDob", {
                      required: "Date of birth is required",
                    })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {errors.AthleteGenData?.AthleteDob && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteDob.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Gender
                    <span className="text-red-600"> *</span>
                  </label>
                  <select
                    {...register("AthleteGenData.AthleteGender", {
                      required: "Gender is required",
                    })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  {errors.AthleteGenData?.AthleteGender && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteGender.message}
                    </p>
                  )}
                </div>

                {/* AthleteAlternateContactNo Contact No. */}
                <div>
                  <label className="block text-sm font-medium">
                    Alternate Contact No <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("AthleteGenData.AthleteAlternateContactNo", {
                      required: "Alternate Contact No is required",
                    })}
                    placeholder="Enter Alternate Contact No"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {errors?.AthleteGenData?.AthleteAlternateContactNo && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteGenData?.AthleteAlternateContactNo.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
            <h2 className="text-xl font-semibold">Identifier Verification</h2>


             <div>
                  <label className="block text-sm font-medium">
                    Identifier Type
                    <span className="text-red-600"> *</span>
                  </label>
                  <select
                    {...register("identifierVerification.identifierType", {
                      required: "Identifier Type is required",
                    })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Identifier Type</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                  </select>
                  {errors.identifierVerification?.identifierType && (
                    <p className="text-red-500 text-sm">
                      {errors.identifierVerification?.identifierType.message}
                    </p>
                  )}
                </div>


                <div>
                  <label className="block text-sm font-medium">
                    ID Number <span className="text-red-600"> *</span>
                  </label>
                  <input
                    type="number"
                    {...register("identifierVerification.idNumber", {
                      required: "ID Number is required",
                    })}
                    placeholder="Enter Alternate Contact No"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {errors?.identifierVerification?.idNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.identifierVerification?.idNumber.message}
                    </p>
                  )}
                </div>

                 

            </motion.div>
          )}

          {/* STEP 2 - ADDRESS */}
            {
              step === 3 && (
                <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
             <h1>ব্যক্তিগত তথ্য বাংলায়</h1>


                {/* Athletes Name Bangla */}
                 <div>
                  <label className="block text-sm font-medium">
                    ক্রীড়াবিদ পূর্ণ নাম (বাংলায়)
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register(
                      "AthleteCoreDataInBengali.AthleteFullNameInBengali",
                      { required: "বাংলায় পূর্ণ নাম আবশ্যক" }
                    )}
                    placeholder="পূর্ণ নাম লিখুন (বাংলায়)"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />

                  {errors.AthleteCoreDataInBengali
                    ?.AthleteFullNameInBengali && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteCoreDataInBengali
                          ?.AthleteFullNameInBengali?.message
                      }
                    </p>
                  )}
                </div>

                {/* Father Name Bangla  */}
                <div>
                  <label className="block text-sm font-medium">
                    পিতার নাম নাম (বাংলায়)
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register(
                      "AthleteCoreDataInBengali.AthleteFatherNameInBengali",
                      { required: "পিতার নাম আবশ্যক" }
                    )}
                    placeholder="পিতার নাম লিখুন (বাংলায়)"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />

                  {errors.AthleteCoreDataInBengali
                    ?.AthleteFatherNameInBengali && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteCoreDataInBengali
                          ?.AthleteFatherNameInBengali?.message
                      }
                    </p>
                  )}
                </div>

                {/* Mother Name Bangla  */}
                  <div>
                  <label className="block text-sm font-medium">
                    মাতার নাম (বাংলায়)
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register(
                      "AthleteCoreDataInBengali.AthleteMotherNameInBengali",
                      { required: "মাতার নাম আবশ্যক" }
                    )}
                    placeholder="মাতার নাম লিখুন (বাংলায়)"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />

                  {errors.AthleteCoreDataInBengali
                    ?.AthleteMotherNameInBengali && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteCoreDataInBengali
                          ?.AthleteMotherNameInBengali?.message
                      }
                    </p>
                  )}
                </div>

            </motion.div>
              )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Address Information</h2>

              <h4 className="text-md font-semibold">Present Address </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select District <span className="text-red-600"> *</span>
                  </label>
                  <TwoStepDistrictSelect
                    name="presentDistrict"
                    firstValue={presentDistrict}
                    setFirstValue={setpresentDistrict}
                    setValue={setValue}
                    placeholder="Select District"
                    DISTRICTS={DISTRICTS}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Upazila
                    <span className="text-red-600"> *</span>
                  </label>

                  <TwoStepDistrictSelect
                    name="presentSubDistrict"
                    firstValue={presentSubDistrict}
                    setFirstValue={setpresentSubDistrict}
                    setValue={setValue}
                    placeholder="Select sub District"
                    DISTRICTS={DISTRICTS}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Postal Code
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    type="number"
                    value={presendPostalCode || ""}
                    placeholder="Enter Postal Code"
                    onChange={handleChangePresendPostalCode}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">
                  Address Area
                  <span className="text-red-600"> *</span>
                </label>
                <input
                  type="text"
                  value={presentAddressArea}
                  placeholder="Enter Address Area"
                  onChange={handleChangepresendAddressArea}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <div className="flex gap-4">
                <h4 className="text-md font-semibold">Permanent Address</h4>

                <div
                  onChange={handleSelectdata}
                  className="flex justify-start items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="coding"
                    name="interest"
                    value="coding"
                  />
                  <label htmlFor="coding">Are you use same address</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select District
                    <span className="text-red-600"> *</span>
                  </label>
                  <TwoStepDistrictSelect
                    name="permanentDistrict"
                    firstValue={permanentDistrict}
                    setFirstValue={setpermanentDistrict}
                    setValue={setValue}
                    placeholder="Select District"
                    DISTRICTS={DISTRICTS}
                  />

                  {errors.permanentDistrict && (
                    <p className="text-red-600">
                      {errors.permanentDistrict.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Upazila
                    <span className="text-red-600"> *</span>
                  </label>

                  <TwoStepDistrictSelect
                    name="permanentSubDistrict"
                    firstValue={permanentSubDistrict}
                    setFirstValue={setPermanentSubDistrict}
                    setValue={setValue}
                    placeholder="Select sub District"
                    DISTRICTS={DISTRICTS}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Postal Code
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    type="number"
                    value={permanentPostalCode || ""}
                    placeholder="Enter Postal Code"
                    onChange={handleChangePermanentPostalCode}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">
                  Address Area
                  <span className="text-red-600"> *</span>
                </label>
                <input
                  type="text"
                  value={permanentAddressArea}
                  placeholder="Enter Address Area"
                  onChange={handleChangepermanentAddressArea}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </motion.div>
          )}

          {/* STEP 3 - DOCUMENT */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Upload Documents</h2>

              <ImageUploadField
                name="AthleteDocPhysicalPathUrl"
                inputRef={fileInputRef}
                control={control}
                label="Doc File"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Doc Name
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register("AthleteDocuments.0.AthleteDocName", {
                      required: "Document Name is required",
                    })}
                    placeholder="Enter Athlete Document Name"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />
                  {/* {errors.AthleteDocuments?.[0]?.AthleteDocName?.message && (
                    <p className="text-red-500 text-sm">
                      {errors?.AthleteDocuments?.[0]?.AthleteDocName.message}
                    </p>
                  )} */}

                  {errors.AthleteDocuments?.[0]?.AthleteDocName && touchedFields.AthleteDocuments?.[0]?.AthleteDocName && (
                      <p className="text-red-500 text-sm">
                        {errors.AthleteDocuments[0].AthleteDocName?.message}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Doc Related Id
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    {...register("AthleteDocuments.0.AthleteDocRelatedId", {
                      required: "Doc id is required",
                    })}
                    placeholder=" Doc Related Id"
                    className="w-full mt-1 px-4 py-2 border rounded-lg "
                  />
                  {errors.AthleteDocuments?.[0]?.AthleteDocRelatedId && touchedFields.AthleteDocuments?.[0]?.AthleteDocRelatedId && (
                    <p className="text-red-500 text-sm">
                      {
                        errors.AthleteDocuments?.[0]?.AthleteDocRelatedId
                          .message
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Doc Category
                    <span className="text-red-600"> *</span>
                  </label>
                  <select
                    {...register("AthleteDocuments.0.DocCategoryId", {
                      required: "Doc Category id is required",
                    })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Doc Category</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                  </select>
                  {errors.AthleteDocuments?.[0]?.DocCategoryId && touchedFields.AthleteDocuments?.[0]?.DocCategoryId && (
                    <p className="text-red-500 text-sm">
                      {errors.AthleteDocuments?.[0]?.DocCategoryId.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddDocument}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add New Document
              </button>

              {/* This is Grid table  */}

              <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {documentsArray?.map((tr, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          {tr.AthleteDocName}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          {tr.AthleteDocRelatedId}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          {tr.DocCategoryId}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          <FileChartLine />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border rounded-lg text-gray-600"
              >
                Previous
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
