// lib/actions.ts

export async function submitEarlyAccess(
  name: string,
  email: string
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      "https://pwldx7xdpbsnlzmjp534n2cuvu0xrzaz.lambda-url.me-south-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
        // signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    return response;
  } finally {
    clearTimeout(timeoutId); // Cleanup to avoid memory leak
  }
}
