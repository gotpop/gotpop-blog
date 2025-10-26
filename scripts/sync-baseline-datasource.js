// Fetch available baseline features from web-features repository
async function getAvailableFeatures() {
  try {
    console.log("🔍 Fetching available baseline features...")
    
    // Fetch from the web-features repository API
    const response = await fetch(
      "https://api.github.com/repos/web-platform-dx/web-features/contents/features",
      {
        headers: {
          "User-Agent": "gotpop-blog-baseline-sync/1.0",
          "Accept": "application/vnd.github.v3+json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch features from GitHub API: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    // Extract feature names from .yml files
    const webFeatures = data
      .filter((file) => file.name.endsWith(".yml") && file.type === "file")
      .map((file) => file.name.replace(".yml", ""))

    // Add custom features that aren't in web-features yet
    const customFeatures = [
      "text-box-trim",
      // Add more custom features here as needed
    ]

    const allFeatures = [...webFeatures, ...customFeatures].sort()

    console.log(`📋 Found ${webFeatures.length} web-features + ${customFeatures.length} custom features = ${allFeatures.length} total`)
    return allFeatures
  } catch (error) {
    console.error("❌ Error fetching baseline features:", error.message)
    throw error
  }
}

// Sync with Storyblok Datasource API
async function syncBaselineDatasource() {
  const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_API_TOKEN
  const SPACE_ID = process.env.STORYBLOK_SPACE_ID
  const DATASOURCE_ID = "105688036026108" // baseline-status datasource ID

  if (!MANAGEMENT_TOKEN || !SPACE_ID) {
    throw new Error(
      "Missing required environment variables: STORYBLOK_MANAGEMENT_API_TOKEN, STORYBLOK_SPACE_ID"
    )
  }

  try {
    const availableFeatures = await getAvailableFeatures()

    // Get existing datasource entries
    console.log("📡 Fetching existing datasource entries...")
    const getResponse = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/datasource_entries?datasource_id=${DATASOURCE_ID}`,
      {
        headers: {
          Authorization: MANAGEMENT_TOKEN,
          "Content-Type": "application/json",
        },
      }
    )

    if (!getResponse.ok) {
      throw new Error(
        `Failed to fetch datasource entries: ${getResponse.statusText}`
      )
    }

    const existingData = await getResponse.json()
    const existingEntries = existingData.datasource_entries || []

    console.log(`📊 Found ${existingEntries.length} existing entries`)

    // Determine what needs to be added/removed
    const currentFeatures = new Set(availableFeatures)
    const existingFeatures = new Set(existingEntries.map((entry) => entry.value))

    const toAdd = availableFeatures.filter((feature) => !existingFeatures.has(feature))
    const toRemove = existingEntries.filter(
      (entry) => !currentFeatures.has(entry.value)
    )

    console.log(`➕ Features to add: ${toAdd.length}`)
    console.log(`➖ Features to remove: ${toRemove.length}`)

    // Add new features
    for (const featureName of toAdd) {
      console.log(`➕ Adding feature: ${featureName}`)

      const addResponse = await fetch(
        `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/datasource_entries`,
        {
          method: "POST",
          headers: {
            Authorization: MANAGEMENT_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasource_entry: {
              name: featureName,
              value: featureName,
              datasource_id: DATASOURCE_ID,
            },
          }),
        }
      )

      if (!addResponse.ok) {
        const errorText = await addResponse.text()
        console.error(
          `❌ Failed to add ${featureName}: ${addResponse.statusText} - ${errorText}`
        )
      } else {
        console.log(`✅ Added ${featureName}`)
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Remove old features
    for (const entry of toRemove) {
      console.log(`➖ Removing feature: ${entry.value}`)

      const deleteResponse = await fetch(
        `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/datasource_entries/${entry.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: MANAGEMENT_TOKEN,
          },
        }
      )

      if (!deleteResponse.ok) {
        console.error(
          `❌ Failed to remove ${entry.value}: ${deleteResponse.statusText}`
        )
      } else {
        console.log(`✅ Removed ${entry.value}`)
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log("✅ Successfully synced baseline-status datasource with Storyblok!")
    console.log(`🎯 Final count: ${availableFeatures.length} features`)

    // Show a sample of the features
    console.log("📝 Sample features:", availableFeatures.slice(0, 10).join(", "))
    if (availableFeatures.length > 10) {
      console.log(`... and ${availableFeatures.length - 10} more`)
    }

    // Verify final state
    const verifyResponse = await fetch(
      `https://api.storyblok.com/v2/cdn/datasource_entries?datasource=${DATASOURCE_ID}&token=${process.env.NEXT_PUBLIC_STORYBLOK_PUBLIC_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (verifyResponse.ok) {
      const verifyData = await verifyResponse.json()
      console.log(
        `🔍 Verification: ${verifyData.datasource_entries.length} entries in datasource`
      )
    }
  } catch (error) {
    console.error("❌ Error syncing baseline-status datasource:", error.message)
    process.exit(1)
  }
}

// CLI execution
if (require.main === module) {
  syncBaselineDatasource()
}

module.exports = { syncBaselineDatasource, getAvailableFeatures }