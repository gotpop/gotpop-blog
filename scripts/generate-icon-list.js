const fs = require("fs")
const path = require("path")

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

function generateIconList() {
  try {
    console.log("🔍 Extracting available icons from Icon.tsx...")
    const availableIcons = getAvailableIcons()

    console.log(`📋 Found ${availableIcons.length} icons:`)
    console.log("")

    // Format for manual copy-paste into Storyblok
    console.log("📋 Copy this list for manual Storyblok datasource import:")
    console.log("═".repeat(60))

    availableIcons.forEach((iconName, index) => {
      console.log(`${index + 1}. Name: ${iconName}, Value: ${iconName}`)
    })

    console.log("═".repeat(60))
    console.log("")

    // Also generate CSV format
    console.log("📊 CSV format for import:")
    console.log("name,value")
    availableIcons.forEach((iconName) => {
      console.log(`${iconName},${iconName}`)
    })

    console.log("")
    console.log("📝 JSON format for API:")
    const jsonFormat = availableIcons.map((iconName) => ({
      name: iconName,
      value: iconName,
    }))
    console.log(JSON.stringify(jsonFormat, null, 2))

    // Write to file for easy access
    const outputPath = path.join(process.cwd(), "generated-icons.json")
    fs.writeFileSync(outputPath, JSON.stringify(jsonFormat, null, 2))
    console.log("")
    console.log(`💾 Also saved to: ${outputPath}`)
  } catch (error) {
    console.error("❌ Error generating icon list:", error.message)
    process.exit(1)
  }
}

generateIconList()
