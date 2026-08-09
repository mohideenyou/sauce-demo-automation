class CustomerApi {
  constructor(request) {
    this.request = request;
    this.baseUrl = process.env.CUSTOMER_API_BASE_URL;
    this.token = process.env.CUSTOMER_API_TOKEN;
  }

  isConfigured() {
    return Boolean(this.baseUrl && this.token);
  }

  async createTestUser(user) {
    this.requireConfiguration();

    const response = await this.request.post(`${this.baseUrl}/customers`, {
      headers: this.authHeaders(),
      data: user,
    });

    if (!response.ok()) {
      throw new Error(`Create test user failed with status ${response.status()}`);
    }

    return response.json();
  }

  async deleteTestUser(customerId) {
    this.requireConfiguration();

    const response = await this.request.delete(`${this.baseUrl}/customers/${customerId}`, {
      headers: this.authHeaders(),
    });

    if (!response.ok()) {
      throw new Error(`Delete test user failed with status ${response.status()}`);
    }
  }

  authHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  requireConfiguration() {
    if (!this.isConfigured()) {
      throw new Error('Set CUSTOMER_API_BASE_URL and CUSTOMER_API_TOKEN before using CustomerApi.');
    }
  }
}

module.exports = { CustomerApi };
