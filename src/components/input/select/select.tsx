import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './select.module.scss';
import { 
  ALL_ROLES_OPTION, 
  ADMIN_ROLE_OPTION, 
  MODERATOR_ROLE_OPTION, 
  USER_ROLE_OPTION 
} from '@/consts/text.const';

interface SelectProps {
  onRoleFilter: (role: string) => void;
  value?: string;
}

function Select({ onRoleFilter, value = 'all' }: SelectProps) {
  const [selectedRole, setSelectedRole] = useState<string>(value);

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
        <option value="all">{ALL_ROLES_OPTION}</option>
        <option value="admin">{ADMIN_ROLE_OPTION}</option>
        <option value="moderator">{MODERATOR_ROLE_OPTION}</option>
        <option value="user">{USER_ROLE_OPTION}</option>
      </select>
      
      {selectedRole === 'all' && (
        <div className={styles.selectIcon} data-testid="select-arrow">
          <ChevronDown size={16} />
        </div>
      )}
      
      {selectedRole !== 'all' && (
        <button onClick={clearRole} className={styles.clearButton}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}

export default Select;
