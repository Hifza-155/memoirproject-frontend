const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthHeaders(): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  return res;
}

interface ApiErrorDetail {
  loc?: (string | number)[];
  msg?: string;
}

interface ApiErrorResponse {
  detail?: string | ApiErrorDetail[];
  message?: string;
}

function parseErrorDetail(errData: ApiErrorResponse | null | undefined, defaultMessage: string): string {
  if (!errData) return defaultMessage;
  if (typeof errData.detail === "string") return errData.detail;

  if (Array.isArray(errData.detail)) {
    return errData.detail
      .map((err: ApiErrorDetail) => {
        const field = err.loc && err.loc.length > 0 ? err.loc[err.loc.length - 1] : "Field";
        return `${field}: ${err.msg || "Invalid value"}`;
      })
      .join(" | ");
  }

  if (errData.message) return errData.message;
  return defaultMessage;
}

export interface SignupPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface MemoirCreatePayload {
  subject_name: string;
  subject_born_on?: string;
  subject_died_on?: string;
  subject_is_living: boolean;
  description?: string;
  visibility?: string;
  comment_policy?: string;
  relationship?: string;
}

export interface MemoryCreatePayload {
  memoir_id: string;
  title: string;
  body_text?: string | null;
  status?: string;
  occurred_start?: string | null;
  occurred_end?: string | null;
  occurred_precision?: string | null;
  date_source?: string | null;
  media_asset_ids?: string[];
}

export interface PresignedUrlPayload {
  memoir_id: string;
  filename: string;
  file_type: string;
  kind: string;
}

export interface MediaMetadataPayload {
  memoir_id: string;
  storage_key: string;
  kind: string;
  mime_type: string;
  byte_size: number;
  original_filename: string;
  caption?: string;
  width_px?: number;
  height_px?: number;
  duration_ms?: number | null;
}

export const api = {
  async signup(payload: SignupPayload) {
    const res = await apiFetch("/api/auth/signup/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData: ApiErrorResponse = await res.json().catch(() => ({}));
      throw new Error(parseErrorDetail(errData, "Signup failed"));
    }
    return res.json();
  },

  async login(payload: { email: string; password: string }) {
    const res = await apiFetch("/api/auth/login/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData: ApiErrorResponse = await res.json().catch(() => ({}));
      throw new Error(parseErrorDetail(errData, "Login failed"));
    }
    return res.json();
  },

  async createMemoir(payload: MemoirCreatePayload) {
    const res = await apiFetch("/api/memoirs/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData: ApiErrorResponse = await res.json().catch(() => ({}));
      throw new Error(parseErrorDetail(errData, "Failed to create memoir"));
    }
    return res.json();
  },

  async getMemoirFeed(memoirId: string) {
    const res = await apiFetch(`/api/memoirs/${memoirId}/feed/`, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch memoir feed");
    return res.json();
  },

  async createMemory(payload: MemoryCreatePayload) {
    const res = await apiFetch("/api/memories/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData: ApiErrorResponse = await res.json().catch(() => ({}));
      throw new Error(parseErrorDetail(errData, "Failed to create memory"));
    }
    return res.json();
  },

  async getPresignedUrl(payload: PresignedUrlPayload) {
    const res = await apiFetch("/api/media/presigned-url/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData: ApiErrorResponse = await res.json().catch(() => ({}));
      throw new Error(parseErrorDetail(errData, "Failed to get presigned URL"));
    }

    const responseJson = await res.json();
    return responseJson.data || responseJson;
  },

  async registerMediaMetadata(payload: MediaMetadataPayload) {
    const res = await apiFetch("/api/media/metadata/", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData: ApiErrorResponse = await res.json().catch(() => ({}));
      throw new Error(parseErrorDetail(errData, "Failed to register media metadata"));
    }

    const responseJson = await res.json();
    return responseJson.data || responseJson;
  },

  async deleteMemory(memoryId: string) {
    const res = await apiFetch(`/api/memories/${memoryId}/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete memory");
    return res.json();
  },
};