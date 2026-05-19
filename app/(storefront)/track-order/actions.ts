"use server";

import { createServiceClient } from "@/lib/supabase/service";

export interface OrderResult {
  order_number: string;
  first_name: string;
  status: string;
  total: number;
  created_at: string;
  lines: { product_name: string; color: string; size: string; qty: number; unit_price: number }[];
}

export interface LookupState {
  error?: string;
  order?: OrderResult;
}

export async function lookupOrder(_prev: LookupState | null, formData: FormData): Promise<LookupState> {
  const rawNumber = (formData.get("order_number") as string | null)?.trim().toUpperCase() ?? "";
  const rawEmail  = (formData.get("email") as string | null)?.trim().toLowerCase() ?? "";

  if (!rawNumber || !rawEmail) {
    return { error: "Please enter your order number and email address." };
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("orders")
    .select("order_number, first_name, status, total, created_at, order_lines(product_name, color, size, qty, unit_price)")
    .eq("order_number", rawNumber)
    .eq("email", rawEmail)
    .single() as unknown as {
      data: {
        order_number: string;
        first_name: string;
        status: string;
        total: number;
        created_at: string;
        order_lines: OrderResult["lines"];
      } | null;
      error: unknown;
    };

  if (error || !data) {
    return { error: "No order found with that order number and email. Please check your details and try again." };
  }

  return {
    order: {
      order_number: data.order_number,
      first_name: data.first_name,
      status: data.status,
      total: data.total,
      created_at: data.created_at,
      lines: data.order_lines ?? [],
    },
  };
}
