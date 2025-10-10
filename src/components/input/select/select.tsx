import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import styles from '@/components/input/select/select.module.scss';

type SelectOption = { value: string; label: string };

interface SelectProps {
  onRoleFilter: (role: string) => void;
  value?: string;
  options: SelectOption[];
}

function Select({ onRoleFilter, value, options }: SelectProps) {
  const firstValue = options[0]?.value ?? 'all';
  const [selectedValue, setSelectedValue] = useState<string>(value ?? firstValue);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    setSelectedValue(next);
    onRoleFilter(next);
  };

  const clearSelection = () => {
    setSelectedValue(firstValue);
    onRoleFilter(firstValue);
  };

  return (
    <div className={styles.selectContainer}>
      <select
        id="role-select"
        name="role"
        value={selectedValue}
        onChange={handleChange}
        className={`${styles.select} ${selectedValue !== firstValue ? styles.selectActive : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      
      {selectedValue === firstValue && (
        <div className={styles.selectIcon} data-testid="select-arrow">
          <ChevronDown size={16} />
        </div>
      )}
      
      {selectedValue !== firstValue && (
        <button onClick={clearSelection} className={styles.clearButton} aria-label="Clear selection">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default Select;
