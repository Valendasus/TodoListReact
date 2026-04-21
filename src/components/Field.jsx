export default function Field({ className='', label, id, type, onInput, value, error, ref }) {
	return (
    <div className={`field ${className}`}>
      <label
        className='field__label'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`field__input ${error ? 'is-invalid': ''}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
        ref={ref}
      />
      {error && <span className='field__error' title={error}>{error}</span>}
    </div>
	)
}