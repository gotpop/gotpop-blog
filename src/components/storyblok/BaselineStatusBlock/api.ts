import "server-only"

export interface BaselineData {
  name?: string
  description?: string
  baseline?: {
    status: "widely" | "newly" | "limited" | "no_data"
    high_date?: string
    low_date?: string
  }
  browser_implementations?: {
    chrome?: string
    chrome_android?: string
    edge?: string
    firefox?: string
    firefox_android?: string
    safari?: string
    safari_ios?: string
  }
}

export async function fetchFeatureData(
  featureId: string
): Promise<BaselineData> {
  try {
    const url = new URL("https://api.webstatus.dev")
    url.pathname = `/v1/features/${featureId}`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "gotpop-blog-baseline-status/1.0",
      },
      // Cache for 24 hours
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      console.warn(
        `Failed to fetch baseline data for ${featureId}: ${response.status}`
      )
      return {}
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching baseline data for ${featureId}:`, error)
    return {}
  }
}
