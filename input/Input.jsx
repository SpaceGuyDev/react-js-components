import { useState, useEffect, useRef } from 'react';
import './styles/Input.css';

const Input = ({children, icon, type, name, label, value, onChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.name !== name) {
                setIsFocused(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [name]);

    return (
        <div
            className={`input${isFocused ? ' focused' : ''}`}
            onClick={() => {
                setIsFocused(true);
                inputRef.current.focus();
            }}
        >
            <div className="input-pre">
                {/* {children} */}
            </div>
            <input
                ref={inputRef}
                className={`${isFocused || inputRef.current.value.length !== 0 ? 'focused' : ''}`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
            />
            <div
                className={`input-label${isFocused || inputRef.current.value.length !== 0 ? ' focused' : ''}`}
            >
                {icon}
                {label}
            </div>
        </div>
    )
}

export default Input