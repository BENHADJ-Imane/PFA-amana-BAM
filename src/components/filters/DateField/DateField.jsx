import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import './DateField.css';

// Champ personnalisé affiché à la place de l'input par défaut,
// pour reproduire le format "MM / JJ / AAAA" + icône calendrier des captures.
const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <button type="button" className="date-field-input" onClick={onClick} ref={ref}>
    <span className={value ? '' : 'date-field-placeholder'}>
      {value || placeholder}
    </span>
    <Calendar size={16} />
  </button>
));
CustomInput.displayName = 'CustomInput';

function DateField({ value, onChange, placeholder = 'MM / JJ / AAAA' }) {
  const dateValue = value ? new Date(`${value}T00:00:00`) : null;

  const handleChange = (date) => {
    if (!date) {
      onChange('');
      return;
    }
    // Format YYYY-MM-DD pour rester compatible avec notre logique de filtrage
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
  };

  return (
    <DatePicker
      selected={dateValue}
      onChange={handleChange}
      dateFormat="MM / dd / yyyy"
      customInput={<CustomInput placeholder={placeholder} />}
      isClearable={!!dateValue}
    />
  );
}

export default DateField;