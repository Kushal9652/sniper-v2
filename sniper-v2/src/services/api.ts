import { User } from '../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('sniper_token');
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.',
      };
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse<User & { token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(username: string, email: string, password: string): Promise<ApiResponse<User & { token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/me');
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // API Keys endpoints
  async getApiKeys(): Promise<ApiResponse<any[]>> {
    return this.request('/api-keys');
  }

  async createApiKey(name: string, service: string, key: string): Promise<ApiResponse<any>> {
    return this.request('/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name, service, key }),
    });
  }

  async deleteApiKey(keyId: string): Promise<ApiResponse> {
    return this.request(`/api-keys/${keyId}`, {
      method: 'DELETE',
    });
  }

  // Scans endpoints
  async getScans(): Promise<ApiResponse<any[]>> {
    return this.request('/scans');
  }

  async createScan(scanData: any): Promise<ApiResponse<any>> {
    return this.request('/scans', {
      method: 'POST',
      body: JSON.stringify(scanData),
    });
  }

  async getScan(scanId: string): Promise<ApiResponse<any>> {
    return this.request(`/scans/${scanId}`);
  }

  async deleteScan(scanId: string): Promise<ApiResponse> {
    return this.request(`/scans/${scanId}`, {
      method: 'DELETE',
    });
  }

  // Tools endpoints
  async getTools(): Promise<ApiResponse<any[]>> {
    return this.request('/tools');
  }

  async runTool(toolName: string, params: any): Promise<ApiResponse<any>> {
    return this.request(`/tools/${toolName}/run`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

export default new ApiService();
