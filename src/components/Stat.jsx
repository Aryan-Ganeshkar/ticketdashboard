export default function Stat({ title, value, icon, color = 'border-blue-600', pill }) {
  const bgPill = color.replace('border-', 'bg-').replace('600', '100')
  const textPill = color.replace('border-', 'text-')
  return (
    <div className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgPill} ${textPill}`}>
          {icon}
        </div>
      </div>
      {pill ? <div className="mt-3 text-xs text-gray-500">{pill}</div> : null}
    </div>
  )
}
