export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  goal_amount: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectProgress = {
  project_id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  goal_amount: number;
  is_active: boolean;
  created_at: string;
  raised_amount: number;
  donor_count: number;
};

export type DonationStatus = "pending" | "success" | "failed" | "cancelled";

export type Donation = {
  id: string;
  project_id: string | null;
  donor_name: string | null;
  phone: string;
  amount: number;
  status: DonationStatus;
  mpesa_receipt_number: string | null;
  checkout_request_id: string | null;
  merchant_request_id: string | null;
  result_desc: string | null;
  created_at: string;
  updated_at: string;
};
