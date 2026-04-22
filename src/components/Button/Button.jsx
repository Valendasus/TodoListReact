import './button.css'

export default function Button({ className = '', type='button', children, onClick, isDisabled }) {
	return (
		<button 
		className={`button ${className}`}
		type={type} onClick={onClick} disabled={isDisabled}>
			{children}
		</button>
	)
}