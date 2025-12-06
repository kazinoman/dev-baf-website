import { z } from "zod";

// Step-based validation schemas
export const personalInfoSchema = z.object({
  athleteFullName: z.string().min(2, "Full name is required"),
  athleteFatherName: z.string().min(2, "Father's name is required"),
  athleteMotherName: z.string().min(2, "Mother's name is required"),
  athleteEmail: z.string().email("Invalid email address"),
  athleteContactNo: z.string().regex(/^\+?[0-9]{10,}$/, "Invalid contact number"),
  athleteDob: z.string().min(1, "Date of birth is required"),
  athleteGender: z.string().min(1, "Gender is required"),
  athleteAlternateContactNo: z.string().optional().or(z.literal("")),
  instituteId: z.string().optional().or(z.literal("")),
});

export const identitySchema = z.object({
  identifierType: z.string().min(1, "Identifier type is required"),
  identifierNumber: z.string().min(1, "ID number is required"),
  identifierImages: z.array(z.any()).min(1, "At least one image is required"),
});

export const bengaliDetailsSchema = z.object({
  athleteFullNameInBengali: z.string().min(2, "Bengali name is required"),
  athleteFatherNameInBengali: z.string().min(2, "Bengali father's name is required"),
  athleteMotherNameInBengali: z.string().min(2, "Bengali mother's name is required"),
});

export const addressesSchema = z.object({
  addresses: z
    .array(
      z.object({
        id: z.number(),
        athleteAddressDistrictId: z.string().min(1, "District is required"),
        athleteAddressSubDistrictId: z.string().min(1, "Sub-district is required"),
        athleteAddressPostalCode: z.string().min(1, "Postal code is required"),
        athleteAddressArea: z.string().min(1, "Area is required"),
        athleteAddressType: z.string().min(1, "Address type is required"),
      })
    )
    .min(1, "At least one address is required"),
});

export const documentsSchema = z.object({
  documents: z
    .array(
      z.object({
        id: z.number(),
        athleteDocName: z.string().min(1, "Document name is required"),
        athleteDocRelatedId: z.string().min(1, "Document ID is required"),
        athleteDocPhysicalPathUrl: z.string().min(1, "Document file is required"),
        docCategoryId: z.string().min(1, "Document category is required"),
      })
    )
    .min(1, "At least one document is required"),
});

// Full form schema for final submission
export const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...identitySchema.shape,
  ...bengaliDetailsSchema.shape,
  ...addressesSchema.shape,
  ...documentsSchema.shape,
});

export type FormData = z.infer<typeof formSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type IdentityFormData = z.infer<typeof identitySchema>;
export type BengaliDetailsFormData = z.infer<typeof bengaliDetailsSchema>;
export type AddressesFormData = z.infer<typeof addressesSchema>;
export type DocumentsFormData = z.infer<typeof documentsSchema>;

// to Show error message
export const stepFieldGroups: (keyof FormData)[][] = [
  // STEP 0: Personal Info
  [
    "athleteFullName",
    "athleteFatherName",
    "athleteMotherName",
    "athleteEmail",
    "athleteContactNo",
    "athleteDob",
    "athleteGender",
    "athleteAlternateContactNo",
    "instituteId",
  ],

  // STEP 1: Identity
  ["identifierType", "identifierNumber", "identifierImages"],

  // STEP 2: Bengali Details
  ["athleteFullNameInBengali", "athleteFatherNameInBengali", "athleteMotherNameInBengali"],

  // STEP 3: Addresses (array)
  ["addresses"],

  // STEP 4: Documents (array)
  ["documents"],
];
