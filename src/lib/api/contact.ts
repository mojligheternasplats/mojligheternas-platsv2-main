import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server-side contact sending
 * Works in:
 * - server components
 * - route handlers
 * - server actions
 */
export async function sendContactServer(
  payload: ContactPayload
): Promise<ContactResponse> {
  try {
    const res = await serverFetch<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    return res;
  } catch (error) {
    console.error('Contact API error (server):', error);
    return { success: false, error: 'CONTACT_SEND_FAILED' };
  }
}

/**
 * Client-side contact sending
 * Works in:
 * - forms in client components
 * - normal fetch calls in browser
 */
export async function sendContactClient(
  payload: ContactPayload
): Promise<ContactResponse> {
  try {
    const res = await clientFetch<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    // If backend returns: { message: "Message sent" }
    if (res?.message) {
      return {
        success: true,
        message: res.message,
      };
    }

    // If backend returns: { error: "..." }
    if (res?.error) {
      return {
        success: false,
        error: res.error,
      };
    }

    // Fallback safety
    return {
      success: true,
      message: 'Message sent successfully',
    };

  } catch (error) {
    console.error('Contact API error (client):', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

