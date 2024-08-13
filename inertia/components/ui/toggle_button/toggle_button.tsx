import { useEffect, useState } from 'react'

export function ToggleButton({
  defaultValue = false,
  onToggleAction,
}: {
  defaultValue?: boolean
  onToggleAction: (active: boolean) => void
}) {
  const [active, setActive] = useState(defaultValue)
  const handleToggleActive = () => setActive((prev) => !prev)
  const position = active ? 'right-0.5' : 'left-0.5'

  useEffect(() => {
    onToggleAction(active)
  }, [active])

  return (
    <button
      onClick={handleToggleActive}
      className={`w-12 h-7 rounded-full border border-2 relative ${active ? 'bg-blue-5 border-blue-5' : 'bg-gray-1 border-gray-1'}`}
    >
      <div className={`h-5 w-5 rounded-full bg-white absolute top-0.5 ${position}`}></div>
    </button>
  )
}
