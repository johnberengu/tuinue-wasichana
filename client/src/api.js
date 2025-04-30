const BASE_URL = "http://localhost:5000/api";  

export async function fetchDonations() {
  try {
    const response = await fetch(`${BASE_URL}/donations/`);
    if (!response.ok) {
      throw new Error("Failed to fetch donations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
}
