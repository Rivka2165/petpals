// שדה אחד בטופס הכניסה / ההרשמה: תווית + תיבת קלט
export default function AuthField({ label, type = 'text', value, onChange, autoComplete }) {
  return (
    <label className="auth-label">
      {label}
      <input
        className="auth-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
      />
    </label>
  )
}
