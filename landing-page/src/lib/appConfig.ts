const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7000";

export type CompanyAddress = {
  _id: string;
  address: string;
  googleMapLocation: string;
};

export type AppConfig = {
  _id: string;
  appName: string;
  phoneNumber: string;
  email: string;
  companyAddress: CompanyAddress[];
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
  youtubeLink: string;
  whatsAppLink: string;
  googleFormLink: string;
  linkedinLink: string;
  googleAppStoreLink: string;
  appleAppStoreLink: string;
};

export async function getAppConfig(): Promise<AppConfig | null> {
  try {
    const res = await fetch(`${API_URL}/app-config/public`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as AppConfig) ?? null;
  } catch {
    return null;
  }
}
