import { forwardRef } from "react"

const FormField = forwardRef(({ label, type = "text", value, onChange, placeholder, readOnly, icon: Icon }, ref) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
        <Icon className="text-xl" />
      </div>
      <input
        ref={ref}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white text-slate-800 ${readOnly ? "bg-slate-100 text-slate-600 cursor-default" : ""}`}
      />
    </div>
  </div>
))

FormField.displayName = "FormField"

export default FormField
