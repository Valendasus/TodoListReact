import styles from './Field.module.scss'

export default function Field({ className='', label, id, type, onInput, value, error, ref }) {
	return (
    <div className={`${styles.field} ${className}`}>
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ''}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
        ref={ref}
      />
      {error && <span className={styles.error} title={error}>{error}</span>}
    </div>
	)
}