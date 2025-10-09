import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import styles from './select.module.scss';

type SelectOption = { value: string; label: string };

interface SelectProps {
  onRoleFilter: (role: string) => void;
  value?: string;
  options: SelectOption[];
}

function Select({ onRoleFilter, value, options }: SelectProps) {
  const firstValue = options[0]?.value ?? 'all';
  const [selectedRole, setSelectedRole] = useState<string>(value ?? firstValue);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    setSelectedRole(role);
    onRoleFilter(role);
  };

  const clearRole = () => {
    setSelectedRole('all');
    onRoleFilter('all');
  };

  return (
    <div className={styles.selectContainer}>
      <select
        id="role-select"
        name="role"
        value={selectedRole}
        onChange={handleRoleChange}
        className={`${styles.select} ${selectedRole !== 'all' ? styles.selectActive : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      
      {selectedRole === firstValue && (
        <div className={styles.selectIcon} data-testid="select-arrow">
          <ChevronDown size={16} />
        </div>
      )}
      
      {selectedRole !== firstValue && (
        <button onClick={clearRole} className={styles.clearButton} aria-label="Clear role filter">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default Select;
