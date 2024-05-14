import styles from './FormInput.module.scss';

interface FormInputProps {
  type?: string;
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  type = 'text',
  placeholder = 'type something...',
  handleChange,
}: FormInputProps) => {
  return (
    <input
      className={styles.formInput}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default FormInput;
