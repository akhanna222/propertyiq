import { apiRequest } from "./queryClient";
import type { PropertyData } from "@shared/schema";

export async function analyzeProperty(address: string, county?: string, eircode?: string): Promise<PropertyData> {
  const requestBody: any = { address };
  if (county) requestBody.county = county;
  if (eircode) requestBody.eircode = eircode;
  
  const response = await apiRequest("POST", "/api/analyze-property", requestBody);
  return response.json();
}

export async function searchProperties(query: string) {
  const response = await apiRequest("GET", `/api/properties/search?q=${encodeURIComponent(query)}`);
  return response.json();
}

export async function getPropertyById(id: number) {
  const response = await apiRequest("GET", `/api/properties/${id}`);
  return response.json();
}

export async function getPropertyByEircode(eircode: string) {
  const response = await apiRequest("GET", `/api/properties/eircode/${eircode}`);
  return response.json();
}
