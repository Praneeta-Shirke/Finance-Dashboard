import { useFinance } from '../context/FinanceContext';

function RoleSwitcher() {
  const { role, setRole } = useFinance();

  const handleChange = event => {
    setRole(event.target.value);
  };

  return (
    <label className="role-switcher">
      <select value={role} onChange={handleChange}>
        <option value="Viewer">Viewer</option>
        <option value="Admin">Admin</option>
      </select>
    </label>
  );
}

export default RoleSwitcher;
