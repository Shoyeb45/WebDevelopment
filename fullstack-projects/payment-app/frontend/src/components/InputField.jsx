/**
 * Proper Input field
 * @param {type} 
 * @returns 
 */
export function InputField({
    type,         
    labelStyle,
    outerDivStyle,
    inputStyle,
    Icon,
    placeholder,
    id,
    pattern,
    disabled = false,
    value
  }) {
    return (
      <div className={outerDivStyle}>
        <label htmlFor={id} className={labelStyle}>
          {Icon}
        </label>
        <input
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          className={inputStyle}
          required
          {...(disabled ? {disabled: true} : {})}
          {...(pattern ? { pattern } : {})}
          {...(value ? {defaultValue: value} : {})}
        />
      </div>
    )
}