const API_BASE_URL = "http://127.0.0.1:8000";

function getAuthHeaders(): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
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
    const res = await fetch(`${API_BASE_URL}/api/auth/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Signup failed");
    }
    return res.json();
  },

  async createMemoir(payload: MemoirCreatePayload) {
    const res = await fetch(`${API_BASE_URL}/api/memoirs/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Failed to create memoir"); // ✅ Now exposes the exact backend error!
    }
    return res.json();
  },

  async getMemoirFeed(memoirId: string) {
    const res = await fetch(`${API_BASE_URL}/api/memoirs/${memoirId}/feed/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch memoir feed");
    return res.json();
  },

  async createMemory(payload: MemoryCreatePayload) {
    const res = await fetch(`${API_BASE_URL}/api/memories`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(
        JSON.stringify(errData.detail) ||
          errData.message ||
          "Failed to create memory",
      );
    }
    return res.json();
  },

  async getPresignedUrl(payload: PresignedUrlPayload) {
    const res = await fetch(`${API_BASE_URL}/api/media/presigned-url/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Failed to get presigned URL");
    }

    const responseJson = await res.json();

    return responseJson.data || responseJson;
  },

  async registerMediaMetadata(payload: MediaMetadataPayload) {
    const res = await fetch(`${API_BASE_URL}/api/media/metadata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Failed to register media metadata");
    }

    const responseJson = await res.json();

    return responseJson.data || responseJson;
  },

  async deleteMemory(memoryId: string) {
    const res = await fetch(`${API_BASE_URL}/api/memories/${memoryId}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete memory");
    return res.json();
  },

  async login(payload: { email: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Login failed");
    }
    return res.json();
  },
};
