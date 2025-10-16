import GridBackground from "@/components/GridBackground"

export default function WorkletTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Grid Worklet Test</h1>

      <GridBackground
        gridSize={32}
        verticalColor="rgb(100, 100, 255)"
        horizontalColor="rgb(255, 100, 100)"
        evenOdd="odd"
        gridOffset="centre"
        className="min-h-96 p-8 border rounded"
      >
        <div className="bg-white/80 p-4 rounded">
          <h2 className="text-xl font-semibold">Grid Background Active</h2>
          <p>
            This content is displayed over a CSS Paint Worklet grid background.
          </p>
          <p>The worklet is loaded at runtime from TypeScript source code.</p>
        </div>
      </GridBackground>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Different Grid Settings</h3>
        <GridBackground
          gridSize={16}
          verticalColor="rgb(0, 255, 0)"
          horizontalColor="rgb(255, 0, 255)"
          evenOdd="even"
          gridOffset="left"
          className="h-48 p-4 border rounded"
        >
          <div className="bg-black/10 p-2 rounded text-sm">
            Smaller grid, different colors
          </div>
        </GridBackground>
      </div>
    </div>
  )
}
