const fs = require("fs")
const path = require("path")

// Extract available icons from your Icon component
function getAvailableIcons() {
  const iconPath = path.join(process.cwd(), "src/components/ui/Icon/Icon.tsx")
  const content = fs.readFileSync(iconPath, "utf8")

  // Extract icon names from ICON_REGISTRY or ICONS object
  const registryMatch = content.match(
    /const (?:ICON_REGISTRY|ICONS) = {([\s\S]*?)} as const|const (?:ICON_REGISTRY|ICONS):\s*Record<[\s\S]*?> = {([\s\S]*?)}/
  )
  if (!registryMatch) {
    throw new Error("Could not find ICON_REGISTRY or ICONS object in Icon.tsx")
  }

  const iconBlock = registryMatch[1] || registryMatch[2]

  // Parse icon names (handles both object shorthand and key: value format)
  const iconNames = iconBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("//"))
    .map((line) => {
      // Handle both "FaHome," and "FaHome: FaHome," formats
      const match = line.match(/^(Fa\w+)(?::|\s*,|\s*$)/)
      return match ? match[1] : null
    })
    .filter(Boolean)

  return iconNames
}

// Sync with Storyblok Datasource API
async function syncIconDatasource() {
  const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_API_TOKEN
  const SPACE_ID = process.env.STORYBLOK_SPACE_ID
  const DATASOURCE_ID = process.env.STORYBLOK_DATASOURCE_ID

  if (!MANAGEMENT_TOKEN || !SPACE_ID || !DATASOURCE_ID) {
    throw new Error(
      "Missing required environment variables: STORYBLOK_MANAGEMENT_API_TOKEN, STORYBLOK_SPACE_ID, STORYBLOK_DATASOURCE_ID"
    )
  }

  try {
    console.log("🔍 Extracting available icons from Icon.tsx...")
    const availableIcons = getAvailableIcons()

    console.log("📋 Found icons:", JSON.stringify(availableIcons, null, 2))

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
    const currentIcons = new Set(availableIcons)
    const existingIcons = new Set(existingEntries.map((entry) => entry.value))

    const toAdd = availableIcons.filter((icon) => !existingIcons.has(icon))
    const toRemove = existingEntries.filter(
      (entry) => !currentIcons.has(entry.value)
    )

    console.log(`➕ Icons to add: ${toAdd.length}`)
    console.log(`➖ Icons to remove: ${toRemove.length}`)

    // Add new icons
    for (const iconName of toAdd) {
      console.log(`➕ Adding icon: ${iconName}`)

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
              name: iconName,
              value: iconName,
              datasource_id: DATASOURCE_ID,
            },
          }),
        }
      )

      if (!addResponse.ok) {
        const errorText = await addResponse.text()
        console.error(
          `❌ Failed to add ${iconName}: ${addResponse.statusText} - ${errorText}`
        )
      } else {
        console.log(`✅ Added ${iconName}`)
      }
    }

    // Remove old icons
    for (const entry of toRemove) {
      console.log(`➖ Removing icon: ${entry.value}`)

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
    }

    console.log("✅ Successfully synced icon datasource with Storyblok!")
    console.log(`🎨 Final count: ${availableIcons.length} icons`)

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
    console.error("❌ Error syncing icon datasource:", error.message)
    process.exit(1)
  }
}

// CLI execution
if (require.main === module) {
  syncIconDatasource()
}

module.exports = { syncIconDatasource, getAvailableIcons }
